import React from 'react';
import { motion } from 'framer-motion';
import { BookText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { glossaryTerms } from '../data/glossary';
import { GlossaryTermCard } from '../components/glossary/GlossaryTermCard';

export function GlossaryPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <BookText className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('glossary_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('glossary_subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {glossaryTerms.map((term, index) => (
            <GlossaryTermCard key={term.id} term={term} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
