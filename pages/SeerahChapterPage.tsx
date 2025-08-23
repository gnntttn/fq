import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { seerahChapters } from '../data/seerah';

export function SeerahChapterPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { t } = useLanguage();
  
  const chapter = seerahChapters.find(c => c.id === chapterId);

  if (!chapter) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Chapter not found</p>
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
            <Link to="/seerah" className="inline-flex items-center gap-2 text-primary dark:text-primary-light hover:text-accent-light transition-colors">
              <ArrowLeft size={16} />
              {t('back_to_seerah')}
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t(chapter.title_key)}
          </h1>
          <div 
            className="prose dark:prose-invert prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t(chapter.content_key) }}
          />
        </motion.div>
      </div>
    </div>
  );
}
