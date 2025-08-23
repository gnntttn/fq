import React from 'react';
import { motion } from 'framer-motion';
import { Radio as RadioIcon, PlayCircle } from 'lucide-react';
import { Radio } from '../../types/radio';

interface RadioCardProps {
  radio: Radio;
  isPlaying: boolean;
  onClick: () => void;
  index: number;
}

export function RadioCard({ radio, isPlaying, onClick, index }: RadioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`block p-4 rounded-xl cursor-pointer transition-all duration-300 ${
        isPlaying 
          ? 'bg-primary/10 dark:bg-primary/20 ring-2 ring-primary dark:ring-accent-light shadow-lg dark:shadow-glow-md' 
          : 'bg-white/50 dark:bg-space-200/30 border border-gray-200 dark:border-space-100/50 hover:border-primary-light dark:hover:border-accent-dark'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isPlaying ? 'bg-primary dark:bg-accent-light' : 'bg-primary/10 dark:bg-primary/20'}`}>
            <RadioIcon className={`transition-colors ${isPlaying ? 'text-white dark:text-space-300' : 'text-primary dark:text-primary-light'}`} size={28} />
          </div>
          <h3 className="text-md font-bold text-gray-900 dark:text-gray-100">
            {radio.name}
          </h3>
        </div>
        {isPlaying && <PlayCircle size={24} className="text-primary dark:text-accent-light shrink-0" />}
      </div>
    </motion.div>
  );
}
