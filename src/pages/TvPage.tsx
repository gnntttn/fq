import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tv as TvIcon, Loader } from 'lucide-react';
import axios from 'axios';
import { TvChannel } from '../types/tv';
import { TvChannelCard } from '../components/tv/TvChannelCard';
import { VideoPlayer } from '../components/tv/VideoPlayer';
import { customTvChannels } from '../data/customTvChannels';
import { useLanguage } from '../context/LanguageContext';

const TV_API_URL = 'https://mp3quran.net/api/v3/live-tv';

export function TvPage() {
  const { t } = useLanguage();
  const [channels, setChannels] = useState<TvChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState<TvChannel | null>(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get(TV_API_URL);
        const apiChannelsData = response.data['live-tv'];
        if (Array.isArray(apiChannelsData)) {
          const apiChannels = apiChannelsData.map((channel: any) => ({
            id: channel.id,
            name: channel.name,
            url: channel.url,
          }));
          setChannels([...customTvChannels, ...apiChannels]);
        } else {
          console.warn('TV API did not return an array. Falling back to custom channels.');
          setChannels(customTvChannels);
        }
      } catch (error) {
        console.error('Error fetching TV channels:', error);
        setChannels(customTvChannels); // Fallback to custom channels
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <TvIcon className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('tv_page_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('tv_page_subtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin text-accent-light" size={48} />
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {channels.map((channel, index) => (
              <TvChannelCard
                key={channel.id}
                channel={channel}
                onPlay={() => setSelectedChannel(channel)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
      {selectedChannel && (
        <VideoPlayer
          url={selectedChannel.url}
          title={selectedChannel.name}
          onClose={() => setSelectedChannel(null)}
        />
      )}
    </div>
  );
}
