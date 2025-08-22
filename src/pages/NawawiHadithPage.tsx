import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { nawawiHadiths } from '../data/nawawiHadiths';
import { HadithCard } from '../components/hadith/HadithCard';

export function NawawiHadithPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <ScrollText className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('nawawi_hadith_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('nawawi_hadith_subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {nawawiHadiths.map((hadith, index) => (
            <HadithCard key={hadith.id} hadith={hadith} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
