import React from 'react';
import { motion } from 'framer-motion';
import { Telescope } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { miracleTopics } from '../data/miracles';
import { MiracleTopicCard } from '../components/miracles/MiracleTopicCard';

export function MiraclesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Telescope className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('miracles_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('miracles_subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {miracleTopics.map((topic, index) => (
            <MiracleTopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
