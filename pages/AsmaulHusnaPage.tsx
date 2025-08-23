import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { asmaulHusnaList } from '../data/asmaulhusna';
import { NameCard } from '../components/asmaulhusna/NameCard';

export function AsmaulHusnaPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Sparkles className="text-yellow-400 mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('asma_ul_husna_page_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('asma_ul_husna_page_subtitle')}
          </p>
        </motion.div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {asmaulHusnaList.map((name, index) => (
            <NameCard key={name.id} nameData={name} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
