import React from 'react';
import { motion } from 'framer-motion';
import { Dua } from '../../types/dua';
import { useLanguage } from '../../context/LanguageContext';

interface DuaCardProps {
  dua: Dua;
  index: number;
}

export function DuaCard({ dua, index }: DuaCardProps) {
  const { language, dir } = useLanguage();

  const getTranslation = () => {
    switch (language) {
      case 'en': return dua.translation_en;
      case 'fr': return dua.translation_fr;
      default: return null;
    }
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
          {dua.arabic}
        </p>
        {getTranslation() && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed" dir={dir}>
            {getTranslation()}
          </p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-500 text-right" dir="ltr">
          Source: {dua.source}
        </p>
      </div>
    </motion.div>
  );
}
