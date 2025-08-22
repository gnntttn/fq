import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, Play, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';

interface ReadingPlan {
  type: 'khatmah';
  days: number;
  startDate: string;
  dailyWirdPages: number;
}

const TOTAL_PAGES_IN_QURAN = 604;

export function ReadingPlansPage() {
  const { t } = useLanguage();
  const [plan, setPlan] = useLocalStorage<ReadingPlan | null>('reading-plan', null);
  const [days, setDays] = useState(30);

  const createPlan = () => {
    const newPlan: ReadingPlan = {
      type: 'khatmah',
      days: days,
      startDate: new Date().toISOString().split('T')[0],
      dailyWirdPages: Math.ceil(TOTAL_PAGES_IN_QURAN / days),
    };
    setPlan(newPlan);
  };

  const today = new Date();
  const startDate = useMemo(() => plan ? new Date(plan.startDate) : today, [plan]);
  const currentDayOfPlan = useMemo(() => {
    if (!plan) return 0;
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }, [plan, startDate, today]);

  const progressPercentage = plan ? (currentDayOfPlan / plan.days) * 100 : 0;
  const startPage = plan ? (currentDayOfPlan - 1) * plan.dailyWirdPages + 1 : 0;
  const endPage = plan ? Math.min(currentDayOfPlan * plan.dailyWirdPages, TOTAL_PAGES_IN_QURAN) : 0;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Target className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('reading_plans_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('reading_plans_subtitle')}
          </p>
        </motion.div>

        {!plan ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t('create_khatmah_plan')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t('khatmah_plan_desc')}</p>
            
            <div className="mb-6">
              <label htmlFor="days" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{t('days_to_complete')}</label>
              <div className="flex items-center justify-center gap-4">
                <button onClick={() => setDays(d => Math.max(1, d - 1))} className="p-2 bg-gray-200 dark:bg-space-100 rounded-full">-</button>
                <input
                  type="number"
                  id="days"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                  className="w-24 text-center text-2xl font-bold bg-transparent border-b-2 border-primary dark:border-primary-light focus:outline-none"
                />
                <button onClick={() => setDays(d => d + 1)} className="p-2 bg-gray-200 dark:bg-space-100 rounded-full">+</button>
              </div>
            </div>

            <button
              onClick={createPlan}
              className="w-full flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg dark:shadow-glow-md text-lg"
            >
              <Play /> {t('start_plan')}
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            {currentDayOfPlan > plan.days ? (
              <div className="bg-green-100 dark:bg-green-500/20 border border-green-300 dark:border-green-500/50 rounded-2xl p-8 text-center">
                <CheckCircle className="text-green-500 mx-auto mb-4" size={56} />
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">{t('khatmah_plan_completed')}</h2>
                <p className="text-green-600 dark:text-green-400 mt-2">{t('khatmah_plan_completed_desc')}</p>
                <button
                  onClick={() => setPlan(null)}
                  className="mt-6 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  {t('create_new_plan')}
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{t('khatmah_progress')}</span>
                    <span className="font-bold text-primary dark:text-primary-light">{t('day_x_of_y', { x: currentDayOfPlan, y: plan.days })}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-space-100 rounded-full h-2.5">
                    <motion.div 
                      className="bg-primary h-2.5 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t('your_daily_reading')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{t('daily_wird_desc')}</p>
                  
                  <div className="bg-white dark:bg-space-200/50 border border-gray-200 dark:border-space-100/50 rounded-2xl p-8 inline-block">
                    <p className="text-lg text-gray-700 dark:text-gray-300">{t('read_from_page')}</p>
                    <p className="text-5xl font-bold text-primary dark:text-primary-light my-2">{startPage} {t('to_page')} {endPage}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">({plan.dailyWirdPages} {t('pages')})</p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={() => setPlan(null)}
                    className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    {t('cancel_plan')}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
