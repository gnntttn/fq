import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { Radio } from '../../types/radio';

interface RadioCardProps {
  radio: Radio;
  isPlaying: boolean;
  onPlay: () => void;
  index: number;
}

export function RadioCard({ radio, isPlaying, onPlay, index }: RadioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-2xl p-4 transition-all duration-300 hover:border-primary-light dark:hover:border-accent-dark hover:shadow-lg dark:hover:shadow-glow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 font-arabic truncate">{radio.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs text-red-500 dark:text-red-400 font-semibold">LIVE</span>
          </div>
        </div>
        <button
          onClick={onPlay}
          className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isPlaying
              ? 'bg-accent-light/20 dark:bg-accent-light/10 ring-2 ring-accent-light'
              : 'bg-gray-200/50 dark:bg-space-100/50 hover:bg-primary/10 dark:hover:bg-primary/20'
          }`}
        >
          {isPlaying ? (
            <Pause size={28} className="text-accent-light fill-accent-light" />
          ) : (
            <Play size={28} className="text-primary dark:text-primary-light fill-primary dark:fill-primary-light ml-1" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
