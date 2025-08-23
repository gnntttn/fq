import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ThemedCollection } from '../../data/themedAyat';
import { useLanguage } from '../../context/LanguageContext';

interface TopicCardProps {
  collection: ThemedCollection;
  index: number;
}

export function TopicCard({ collection, index }: TopicCardProps) {
  const { t, dir } = useLanguage();
  const Icon = collection.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/topics/${collection.id}`}
        className="block bg-white dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-xl p-6 transition-all duration-300 hover:border-primary-light dark:hover:border-accent-dark hover:shadow-lg dark:hover:shadow-glow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon className="text-primary-dark dark:text-primary-light" size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {t(collection.titleKey)}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t(collection.descriptionKey)}
              </p>
            </div>
          </div>
          <ArrowLeft size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
        </div>
      </Link>
    </motion.div>
  );
}
