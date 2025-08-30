import React from 'react';
import { motion } from 'framer-motion';
import { Tv, PlayCircle } from 'lucide-react';
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onPlay}
      className="block p-4 rounded-xl cursor-pointer transition-all duration-300 bg-white dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 hover:border-primary-light dark:hover:border-accent-dark"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
            <Tv className="text-primary-dark dark:text-primary-light" size={28} />
          </div>
          <h3 className="text-md font-bold text-gray-900 dark:text-gray-100 font-arabic">
            {channel.name}
          </h3>
        </div>
        <PlayCircle size={28} className="text-gray-400 dark:text-gray-500" />
      </div>
    </motion.div>
  );
}
