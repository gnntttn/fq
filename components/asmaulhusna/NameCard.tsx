import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { AsmaulHusna } from '../../types/asmaulhusna';
import { useLanguage } from '../../context/LanguageContext';

interface NameCardProps {
  nameData: AsmaulHusna;
  index: number;
}

export function NameCard({ nameData, index }: NameCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const getMeaning = () => {
    switch (language) {
      case 'en': return nameData.meaning_en;
      case 'fr': return nameData.meaning_fr;
      case 'ar': return nameData.meaning_ar;
      default: return nameData.meaning_en;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className="bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex items-center justify-between focus:outline-none focus-ring"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary-light dark:border-primary-dark text-primary-dark dark:text-primary-light rounded-lg flex items-center justify-center font-bold text-sm">
            {nameData.id}
          </div>
          <div>
            <h3 className="text-xl font-bold font-arabic text-gray-900 dark:text-gray-100">
              {nameData.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
              {nameData.transliteration}
            </p>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="text-gray-500 dark:text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pt-2 border-t border-gray-200 dark:border-space-100/50">
              <p className="text-gray-700 dark:text-gray-300 text-md leading-relaxed">
                {getMeaning()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
