import React from 'react';
import { motion } from 'framer-motion';
import { Hand, PersonStanding } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { WorshipGuideCard } from '../components/worship/WorshipGuideCard';

export function WorshipGuidePage() {
  const { t } = useLanguage();

  const worshipLinks = [
    { to: '/worship-guide/wudu', title: t('worship_wudu_title'), subtitle: t('worship_wudu_subtitle'), icon: Hand, color: 'bg-blue-500' },
    { to: '/worship-guide/salah', title: t('worship_salah_title'), subtitle: t('worship_salah_subtitle'), icon: PersonStanding, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <PersonStanding className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('worship_guide_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('worship_guide_subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {worshipLinks.map((link, index) => (
            <WorshipGuideCard
              key={link.to}
              to={link.to}
              title={link.title}
              subtitle={link.subtitle}
              icon={link.icon}
              colorClass={link.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
