import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookUser, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { prophetStories } from '../data/prophetStories';

export function ProphetStoriesPage() {
  const { t, dir } = useLanguage();
  const ChevronIcon = dir === 'rtl' ? ChevronLeft : ChevronLeft;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <BookUser className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('prophet_stories_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('prophet_stories_subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {prophetStories.map((story, index) => {
            const Icon = story.icon;
            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/prophet-stories/${story.id}`}
                  className="block bg-white dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-xl p-4 transition-all duration-300 hover:border-primary-light dark:hover:border-accent-dark hover:shadow-lg dark:hover:shadow-glow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon className="text-primary-dark dark:text-primary-light" size={28} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {t(story.nameKey)}
                      </h3>
                    </div>
                    <ChevronIcon size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
