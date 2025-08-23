import React from 'react';
import { motion } from 'framer-motion';
import { GlossaryTerm } from '../../types/glossary';
import { useLanguage } from '../../context/LanguageContext';

interface GlossaryTermCardProps {
  term: GlossaryTerm;
  index: number;
}

export function GlossaryTermCard({ term, index }: GlossaryTermCardProps) {
  const { language } = useLanguage();

  const getDefinition = () => {
    switch (language) {
      case 'en': return term.definition_en;
      case 'fr': return term.definition_fr;
      case 'ar': return term.definition_ar;
      default: return term.definition_en;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-xl p-6"
    >
      <h3 className="text-xl font-bold text-primary dark:text-primary-light mb-2 font-arabic">{term.term_ar}</h3>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {getDefinition()}
      </p>
    </motion.div>
  );
}
