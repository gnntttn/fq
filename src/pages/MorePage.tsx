import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AppWindow, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MoreLinkCard } from '../components/more/MoreLinkCard';
import { featureLinks } from '../data/features';

export function MorePage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const mainNavPaths = new Set(['/', '/quran/1', '/media', '/quiz', '/more']);

  const morePageLinks = featureLinks.filter(link => !mainNavPaths.has(link.to));

  const filteredLinks = morePageLinks.filter(link =>
    t(link.titleKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
    t(link.subtitleKey).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <AppWindow className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('more_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('more_subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 max-w-3xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('search_feature_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border border-gray-300 dark:border-space-100 bg-white dark:bg-space-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 dark:text-gray-200"
            />
          </div>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredLinks.map((link, index) => (
            <MoreLinkCard
              key={link.to}
              to={link.to}
              title={t(link.titleKey)}
              subtitle={t(link.subtitleKey)}
              Icon={link.icon}
              colorClass={link.color}
              index={index}
            />
          ))}
           {filteredLinks.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-10">{t('no_results_found')}</p>
            )}
        </div>
      </div>
    </div>
  );
}
