import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DuaCategory } from '../../types/dua';

interface DuaCategoryCardProps {
  category: DuaCategory;
  index: number;
}

export function DuaCategoryCard({ category, index }: DuaCategoryCardProps) {
  const { t, dir } = useLanguage();
  const ChevronIcon = dir === 'rtl' ? ChevronLeft : ChevronLeft;

  return (
    <motion.div
      initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/dua-library/${category.id}`}
        className="block bg-white dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-xl p-4 transition-all duration-300 hover:border-primary-light dark:hover:border-accent-dark hover:shadow-lg dark:hover:shadow-glow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-500/10 dark:bg-pink-500/20 rounded-lg flex items-center justify-center">
              <HeartHandshake className="text-pink-600 dark:text-pink-400" size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {t(category.title_key)}
            </h3>
          </div>
          <ChevronIcon size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
        </div>
      </Link>
    </motion.div>
  );
}
