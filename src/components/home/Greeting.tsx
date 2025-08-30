import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sun, Sunset } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const getGreeting = (t: (key: any) => string) => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return { text: t('greeting_morning'), icon: Sunrise };
  }
  if (hour < 18) {
    return { text: t('greeting_afternoon'), icon: Sun };
  }
  return { text: t('greeting_evening'), icon: Sunset };
};

export function Greeting() {
  const { t } = useLanguage();
  const [lastVisit, setLastVisit] = useLocalStorage('last-visit-date', '');
  const [streak, setStreak] = useLocalStorage('reading-streak', 0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastVisit === yesterdayStr) {
        setStreak(s => s + 1);
      } else {
        setStreak(1);
      }
      setLastVisit(today);
    }
  }, []);

  const { text, icon: Icon } = getGreeting(t);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-2xl p-6 flex items-center justify-between transition-all duration-300 hover:border-primary-light dark:hover:border-accent-dark hover:shadow-lg dark:hover:shadow-glow-sm"
    >
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Icon className="text-primary-dark dark:text-primary-light" size={28} />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{text}</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400">{t('main_subtitle')}</p>
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold text-primary dark:text-primary-light">{streak}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{t('streak_text')}</p>
      </div>
    </motion.div>
  );
}
