import React from 'react';
import { motion } from 'framer-motion';
import { Radio as RadioIcon, PlayCircle, PauseCircle } from 'lucide-react';
import { Radio } from '../../types/radio';

interface RadioCardProps {
  radio: Radio;
  onPlay: () => void;
  isPlaying: boolean;
  index: number;
}

export function RadioCard({ radio, onPlay, isPlaying, index }: RadioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onPlay}
      className={`block p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
        isPlaying 
          ? 'bg-primary/20 dark:bg-primary/30 border-primary-light dark:border-accent-dark' 
          : 'bg-white dark:bg-space-200/30 dark:backdrop-blur-sm border-gray-200 dark:border-space-100/50 hover:border-primary-light dark:hover:border-accent-dark'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isPlaying ? 'bg-primary/20' : 'bg-primary/10 dark:bg-primary/20'}`}>
            <RadioIcon className="text-primary-dark dark:text-primary-light" size={28} />
          </div>
          <h3 className="text-md font-bold text-gray-900 dark:text-gray-100 font-arabic">
            {radio.name}
          </h3>
        </div>
        {isPlaying ? (
          <PauseCircle size={28} className="text-accent-light" />
        ) : (
          <PlayCircle size={28} className="text-gray-400 dark:text-gray-500" />
        )}
      </div>
    </motion.div>
  );
}
