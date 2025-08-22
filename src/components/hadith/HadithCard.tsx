import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Hadith } from '../../types/hadith';
import { useLanguage } from '../../context/LanguageContext';

interface HadithCardProps {
  hadith: Hadith;
  index: number;
}

export function HadithCard({ hadith, index }: HadithCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, dir } = useLanguage();

  const getTranslation = (field: 'title' | 'hadith' | 'explanation') => {
    switch (language) {
      case 'en': return hadith[`${field}_en`];
      case 'fr': return hadith[`${field}_fr`];
      case 'ar': return hadith[`${field}_ar`];
      default: return hadith[`${field}_en`];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex items-center justify-between focus:outline-none focus-ring"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary-light dark:border-primary-dark text-primary-dark dark:text-primary-light rounded-lg flex items-center justify-center font-bold text-sm">
            {hadith.id}
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {getTranslation('title')}
          </h3>
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
            <div className="px-5 pb-4 pt-2 border-t border-gray-200 dark:border-space-100/50 space-y-4" dir={dir}>
              <p className={`text-gray-800 dark:text-gray-200 text-lg leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                {getTranslation('hadith')}
              </p>
              <div>
                <h4 className="font-bold text-md mb-1 text-primary-dark dark:text-primary-light">
                  {language === 'ar' ? 'الشرح' : language === 'fr' ? 'Explication' : 'Explanation'}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {getTranslation('explanation')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
