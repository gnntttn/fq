import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Repeat } from 'lucide-react';
import { Dhikr } from '../../types/adhkar';
import { useLanguage } from '../../context/LanguageContext';

interface DhikrCardProps {
  dhikr: Dhikr;
  index: number;
}

export function DhikrCard({ dhikr, index }: DhikrCardProps) {
  const { language, dir } = useLanguage();
  const [count, setCount] = useState(dhikr.count);
  const isCompleted = count === 0;

  useEffect(() => {
    setCount(dhikr.count);
  }, [dhikr]);

  const handleClick = () => {
    if (count > 0) {
      setCount(c => c - 1);
    }
  };

  const resetCount = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(dhikr.count);
  };

  const getTranslation = (field: 'translation' | 'virtue') => {
    const key = `${field}_${language}`;
    // @ts-ignore
    return dhikr[key] || dhikr[`${field}_en`];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handleClick}
      className={`relative border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isCompleted
          ? 'bg-green-100/50 dark:bg-green-500/10 border-green-400 dark:border-green-600'
          : 'bg-white/50 dark:bg-space-200/30 border-gray-200 dark:border-space-100/50 hover:border-primary dark:hover:border-accent-light'
      }`}
    >
      <div className="p-6 space-y-4">
        <p className="font-arabic text-2xl text-gray-900 dark:text-gray-100 leading-relaxed text-center">
          {dhikr.arabic}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed" dir={dir}>
          {getTranslation('translation')}
        </p>
        {getTranslation('virtue') && (
          <p className="text-xs italic text-gray-500 dark:text-gray-500" dir={dir}>
            {getTranslation('virtue')}
          </p>
        )}
      </div>
      <div className={`absolute top-3 right-3 flex items-center gap-2 transition-opacity duration-300 ${isCompleted ? 'opacity-100' : 'opacity-0'}`}>
        <CheckCircle size={20} className="text-green-500" />
      </div>
      <div className={`absolute bottom-3 left-3 flex items-center gap-2`}>
        <button 
          onClick={resetCount}
          className="p-1.5 text-gray-400 hover:text-accent-light bg-gray-100/50 dark:bg-space-100/50 rounded-full"
        >
          <Repeat size={14} />
        </button>
      </div>
      <div className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-white font-bold text-sm transition-all duration-300 ${isCompleted ? 'bg-green-500' : 'bg-primary'}`}>
        {count}
      </div>
    </motion.div>
  );
}
