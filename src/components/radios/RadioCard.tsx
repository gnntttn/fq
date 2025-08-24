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
      onClick={onPlay}
      className={`p-4 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 ${
        isPlaying
          ? 'bg-space-100 ring-2 ring-accent-light shadow-glow-md'
          : 'bg-space-200 hover:bg-space-100'
      }`}
    >
      <div className="flex items-center justify-end gap-4 flex-1 text-right min-w-0">
        <h3 className="font-bold text-lg text-gray-100 font-arabic truncate">{radio.name}</h3>
        <span className="font-bold text-accent-light text-lg">((•))</span>
      </div>

      <div className="w-12 h-12 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0">
        {isPlaying ? (
          <Pause size={24} className="text-space-300 fill-current" />
        ) : (
          <Play size={24} className="text-space-300 fill-current ml-1" />
        )}
      </div>
    </motion.div>
  );
}
