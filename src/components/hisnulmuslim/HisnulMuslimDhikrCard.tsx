import React from 'react';
import { motion } from 'framer-motion';
import { HisnulMuslimDhikr } from '../../types/hisnulMuslim';
import { useLanguage } from '../../context/LanguageContext';

interface HisnulMuslimDhikrCardProps {
  dhikr: HisnulMuslimDhikr;
  index: number;
}

export function HisnulMuslimDhikrCard({ dhikr, index }: HisnulMuslimDhikrCardProps) {
  const { language, dir } = useLanguage();

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
      className="bg-white/50 dark:bg-space-200/30 border border-gray-200 dark:border-space-100/50 rounded-2xl p-6"
    >
      <div className="space-y-4">
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
    </motion.div>
  );
}
