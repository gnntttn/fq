import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { companionStories } from '../data/companionStories';

export function CompanionStoryPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const { t } = useLanguage();
  
  const story = companionStories.find(c => c.id === storyId);

  if (!story) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Story not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-8">
            <Link to="/companion-stories" className="inline-flex items-center gap-2 text-primary dark:text-primary-light hover:text-accent-light transition-colors">
              <ArrowLeft size={16} />
              {t('back_to_companion_stories')}
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-arabic">
            {t(story.nameKey)}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">{t(story.titleKey)}</p>
          <div 
            className="prose dark:prose-invert prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t(story.contentKey) }}
          />
        </motion.div>
      </div>
    </div>
  );
}
