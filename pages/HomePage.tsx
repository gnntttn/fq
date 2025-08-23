import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookCopy, Users, BookOpen, ArrowLeft, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TasbeehCarousel } from '../components/home/TasbeehCarousel';
import { Greeting } from '../components/home/Greeting';
import { themedAyatCollections } from '../data/themedAyat';
import { RandomVerse } from '../components/home/RandomVerse';
import { QuranicInsights } from '../components/home/QuranicInsights';

export function HomePage() {
  const { t } = useLanguage();

  const quickActions = [
    { to: '/surahs', text: t('surahs'), icon: BookCopy },
    { to: '/juzs', text: t('juzs'), icon: BookOpen },
    { to: '/reciters', text: t('reciters'), icon: Users },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Greeting />
        
        <RandomVerse />
        
        <QuranicInsights />

        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.to}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link
                to={action.to}
                className="flex flex-col items-center justify-center bg-white dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-xl p-4 h-24 text-center transition-all duration-300 hover:border-primary-light dark:hover:border-accent-dark hover:shadow-lg dark:hover:shadow-glow-sm"
              >
                <action.icon className="text-primary-dark dark:text-primary-light mb-1" size={24} />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{action.text}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('featured_topics')}</h2>
            <Link to="/topics" className="text-sm font-semibold text-primary dark:text-primary-light hover:text-accent-light flex items-center gap-1">
              {t('view_all')} <ArrowLeft size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            {themedAyatCollections.slice(0, 2).map((collection) => {
              const Icon = collection.icon;
              return (
                <Link key={collection.id} to={`/topics/${collection.id}`} className="block bg-white dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-xl p-4 transition-all duration-300 hover:border-primary-light dark:hover:border-accent-dark hover:shadow-md dark:hover:shadow-glow-sm">
                  <div className="flex items-center gap-4">
                    <Icon className="text-primary-dark dark:text-primary-light" size={20} />
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{t(collection.titleKey)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
        
        <Link to="/rabbana-duas">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="block bg-white dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-xl p-6 transition-all duration-300 hover:border-primary-light dark:hover:border-accent-dark hover:shadow-lg dark:hover:shadow-glow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Heart className="text-red-500 dark:text-red-300" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t('rabbana_duas')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('rabbana_duas_desc')}</p>
                </div>
              </div>
              <ArrowLeft size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
            </div>
          </motion.div>
        </Link>
        
        <TasbeehCarousel />
      </div>
    </div>
  );
}
