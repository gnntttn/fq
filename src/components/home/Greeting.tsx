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
      return { text: t('greeting_morning'), icon: <Sunrise size={28} className="text-blue-600 dark:text-blue-300" /> };
    } else if (hour < 18) {
      return { text: t('greeting_afternoon'), icon: <Sun size={28} className="text-blue-600 dark:text-blue-300" /> };
    } else {
      return { text: t('greeting_evening'), icon: <Sunset size={28} className="text-blue-600 dark:text-blue-300" /> };
    }
  };

  const { text, icon } = getGreeting();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-100/60 dark:bg-blue-900/20 border border-blue-200/60 dark:border-blue-500/20 rounded-2xl p-6"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-1 text-yellow-500 dark:text-yellow-400">
            <span className="text-5xl font-bold text-gray-800 dark:text-white">{streak}</span>
            <Flame className="fill-current" size={24} />
          </div>
          <p className="text-xs text-blue-700 dark:text-blue-300 font-semibold mt-1">{t('streak_text')}</p>
        </div>
        
        <div className="text-right">
          <div className="flex items-center justify-end gap-3 text-blue-700 dark:text-white">
            <h1 className="text-3xl font-bold font-arabic">{text}</h1>
            {icon}
          </div>
          <p className="text-blue-600 dark:text-blue-300/80 mt-1 font-sans-arabic">{t('main_subtitle')}</p>
        </div>
      </div>
    </motion.div>
  );
}
