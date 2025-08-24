import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Settings } from 'lucide-react';
import { Surah } from '../../types/quran';
import { useLanguage } from '../../context/LanguageContext';

interface SurahPageHeaderProps {
  surah: Surah;
  onSettingsClick: () => void;
}

export const SurahPageHeader = React.memo(({ surah, onSettingsClick }: SurahPageHeaderProps) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/30 dark:bg-space-200/20 dark:backdrop-blur-sm rounded-xl border border-gray-200 dark:border-space-100/50 p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <Link
          to={surah.id < 114 ? `/surah/${surah.id + 1}` : '/surahs'}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent-light hover:bg-gray-200 dark:hover:bg-space-100/50 rounded-full transition-colors"
          aria-label="Next Surah"
        >
          <ArrowRight size={22} />
        </Link>
        
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-arabic">
            سورة {surah.nameArabic}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {surah.versesCount} {t('verse')}
          </p>
        </div>
        
        <button
          onClick={onSettingsClick}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent-light hover:bg-gray-200 dark:hover:bg-space-100/50 rounded-full transition-colors"
          aria-label={t('view_settings')}
        >
          <Settings size={22} />
        </button>
      </div>
    </motion.div>
  );
});
