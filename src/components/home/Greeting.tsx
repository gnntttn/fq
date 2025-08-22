import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sun, Sunset, Flame } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Greeting() {
  const { t } = useLanguage();
  const [streak, setStreak] = useLocalStorage('daily-streak', 1);
  const [lastVisit, setLastVisit] = useLocalStorage('last-visit-date', '');

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return { text: t('greeting_morning'), icon: <Sunrise size={28} /> };
    } else if (hour < 18) {
      return { text: t('greeting_afternoon'), icon: <Sun size={28} /> };
    } else {
      return { text: t('greeting_evening'), icon: <Sunset size={28} /> };
    }
  };

  const { text, icon } = getGreeting();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/50 text-white rounded-2xl p-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 text-primary-dark dark:text-white">
            {icon}
            <h1 className="text-3xl font-bold">{text}</h1>
          </div>
          <p className="text-primary dark:text-primary-light/80 mt-1">{t('main_subtitle')}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-yellow-400 dark:text-yellow-300">
            <Flame className="fill-current" size={24} />
            <span className="text-4xl font-bold text-primary-dark dark:text-white">{streak}</span>
          </div>
          <p className="text-xs text-primary dark:text-primary-light/80 font-semibold">{t('streak_text')}</p>
        </div>
      </div>
    </motion.div>
  );
}
