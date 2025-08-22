import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { TajweedRule } from '../../types/tajweed';
import { useLanguage } from '../../context/LanguageContext';

interface TajweedRuleCardProps {
  rule: TajweedRule;
  index: number;
}

export function TajweedRuleCard({ rule, index }: TajweedRuleCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();

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
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {t(rule.titleKey)}
        </h3>
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
            <div className="px-5 pb-4 pt-2 border-t border-gray-200 dark:border-space-100/50 space-y-4">
              <p className="text-gray-700 dark:text-gray-300 text-md leading-relaxed">
                {t(rule.explanationKey)}
              </p>
              {rule.example_ar && (
                <div className="bg-primary/5 dark:bg-primary/10 p-3 rounded-lg">
                  <p className="font-arabic text-xl text-center text-primary-dark dark:text-primary-light">{rule.example_ar}</p>
                  {rule.example_explanation_key && (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">{t(rule.example_explanation_key)}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
