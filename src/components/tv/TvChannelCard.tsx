import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Play } from 'lucide-react';
import { TvChannel } from '../../types/tv';

interface TvChannelCardProps {
  channel: TvChannel;
  onPlay: () => void;
  index: number;
}

export function TvChannelCard({ channel, onPlay, index }: TvChannelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onPlay}
      className="p-4 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 bg-white dark:bg-space-200 hover:dark:bg-space-100"
    >
      <div className="flex items-center justify-end gap-4 flex-1 text-right min-w-0">
        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 font-arabic truncate">
          {channel.name}
        </h3>
        <Tv size={28} className="text-primary-light flex-shrink-0" />
      </div>

      <div className="w-12 h-12 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0">
        <Play size={24} className="text-space-300 fill-current ml-1" />
      </div>
    </motion.div>
  );
}
