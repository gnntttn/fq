import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { seerahChapters } from '../data/seerah';
import { SeerahChapterCard } from '../components/seerah/SeerahChapterCard';

export function SeerahPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <BookOpen className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('seerah_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('seerah_subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {seerahChapters.map((chapter, index) => (
            <SeerahChapterCard key={chapter.id} chapter={chapter} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
