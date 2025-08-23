import React from 'react';
import { motion } from 'framer-motion';
import { Users2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { companionStories } from '../data/companionStories';
import { CompanionStoryCard } from '../components/companion/CompanionStoryCard';

export function CompanionStoriesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Users2 className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('companion_stories_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('companion_stories_subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {companionStories.map((story, index) => (
            <CompanionStoryCard key={story.id} story={story} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
