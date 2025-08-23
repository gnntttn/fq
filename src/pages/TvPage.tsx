import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Tv2, WifiOff } from 'lucide-react';
import { TvChannel } from '../types/tv';
import { TvChannelCard } from '../components/tv/TvChannelCard';
import { useLanguage } from '../context/LanguageContext';
import { Skeleton } from '../components/common/Skeleton';
import { customTvChannels } from '../data/customTvChannels';

const VideoPlayer = lazy(() => import('../components/tv/VideoPlayer').then(module => ({ default: module.VideoPlayer })));

const TvCardSkeleton = () => (
    <div className="bg-white/30 dark:bg-space-200/20 border border-gray-200 dark:border-space-100/50 rounded-xl p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <Skeleton className="h-5 w-48 rounded" />
      </div>
    </div>
  );

export function TvPage() {
  const { t } = useLanguage();
  const [channels, setChannels] = useState<TvChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<TvChannel | null>(null);

  useEffect(() => {
    const fetchChannels = async () => {
      setLoading(true);
      setError(null);
      let apiChannels: TvChannel[] = [];
      try {
        const response = await axios.get('https://mp3quran.net/api/v3/live-tv');
        if (response.data && Array.isArray(response.data.live_tv)) {
          apiChannels = response.data.live_tv;
        }
      } catch (err) {
        console.error("Error fetching TV channels:", err);
        // Don't set an error here, just proceed with an empty list from API
        // The custom channels will still be shown.
      } finally {
        // Prepend custom channels to the list from the API
        const combinedChannels = [...customTvChannels, ...apiChannels];
        // Ensure uniqueness based on channel name
        const uniqueChannels = Array.from(new Map(combinedChannels.map(item => [item.name, item])).values());
        
        setChannels(uniqueChannels);
        if (uniqueChannels.length === 0) {
            setError(t('tv_no_channels'));
        }
        setLoading(false);
      }
    };
    fetchChannels();
  }, [t]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4 max-w-3xl mx-auto">
          {Array.from({ length: 8 }).map((_, i) => <TvCardSkeleton key={i} />)}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-16">
          <WifiOff className="text-red-500 mx-auto" size={48} />
          <p className="mt-4 text-red-500 font-semibold">{error}</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4 max-w-3xl mx-auto">
        {channels.map((channel, index) => (
          <TvChannelCard
            key={channel.id}
            channel={channel}
            isPlaying={selectedChannel?.id === channel.id}
            onClick={() => setSelectedChannel(channel)}
            index={index}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Tv2 className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('tv_page_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('tv_page_subtitle')}
          </p>
        </motion.div>

        {renderContent()}
      </div>
      
      <Suspense>
        {selectedChannel && (
          <VideoPlayer
            url={selectedChannel.url}
            title={selectedChannel.name}
            isOpen={!!selectedChannel}
            onClose={() => setSelectedChannel(null)}
          />
        )}
      </Suspense>
    </div>
  );
}
