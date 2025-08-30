import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { TvChannel } from '../../types/tv';
import { TvChannelCard } from './TvChannelCard';
import { VideoPlayer } from './VideoPlayer';
import { customTvChannels } from '../../data/customTvChannels';
import { useLanguage } from '../../context/LanguageContext';
import { Skeleton } from '../common/Skeleton';

const TV_API_URL = 'https://mp3quran.net/api/v3/live-tv';

const TvChannelCardSkeleton = () => (
    <div className="block p-4 rounded-xl bg-white dark:bg-space-200/30 border border-gray-200 dark:border-space-100/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <Skeleton className="w-40 h-5 rounded-md" />
        </div>
        <Skeleton className="w-7 h-7 rounded-full" />
      </div>
    </div>
  );

export function TvTab() {
  const { t } = useLanguage();
  const [channels, setChannels] = useState<TvChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<TvChannel | null>(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        // We only use the custom channels as they are embeddable via iframe
        setChannels(customTvChannels);
      } catch (err) {
        setError(t('error_fetching_data'));
        console.error('Error setting up TV channels:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, [t]);

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <TvChannelCardSkeleton key={i} />)}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
