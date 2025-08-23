import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { worshipTopics } from '../data/worshipGuide';

export function WorshipTopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const { t } = useLanguage();
  
  const topic = worshipTopics.find(c => c.id === topicId);

  if (!topic) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Topic not found</p>
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
            <Link to="/worship-guide" className="inline-flex items-center gap-2 text-primary dark:text-primary-light hover:text-accent-light transition-colors">
              <ArrowLeft size={16} />
              {t('back_to_worship_guide')}
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-arabic">
            {t(topic.titleKey)}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">{t(topic.subtitleKey)}</p>
          
          <div className="space-y-8">
            {topic.sections.map((section, sIndex) => (
              <div key={sIndex}>
                <h2 className="text-2xl font-bold text-primary dark:text-primary-light mb-4 border-b-2 border-primary/20 pb-2">{t(section.titleKey)}</h2>
                <div className="space-y-4">
                  {section.steps.map((step, stIndex) => (
                    <motion.div
                      key={stIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (stIndex + 1) * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">{t(step.titleKey)}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{t(step.descriptionKey)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
