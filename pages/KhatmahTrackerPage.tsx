import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BookCheck, Loader } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { quranApi } from '../services/quranApi';
import { Surah } from '../types/quran';
import { useLanguage } from '../context/LanguageContext';

export function KhatmahTrackerPage() {
  const { t } = useLanguage();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedSurahs, setCompletedSurahs] = useLocalStorage<number[]>('khatmah-progress', []);

  useEffect(() => {
    const fetchSurahs = async () => {
      setLoading(true);
      const surahList = await quranApi.getSurahs();
      setSurahs(surahList);
      setLoading(false);
    };
    fetchSurahs();
  }, []);

  const toggleSurahCompletion = (surahId: number) => {
    setCompletedSurahs(prev => 
      prev.includes(surahId) ? prev.filter(id => id !== surahId) : [...prev, surahId]
    );
  };
  
  const resetProgress = () => {
    setCompletedSurahs([]);
  };

  const completionPercentage = surahs.length > 0 ? (completedSurahs.length / surahs.length) * 100 : 0;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-accent-light mx-auto" size={48} />
          <p className="mt-4 text-gray-700 dark:text-gray-300">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <BookCheck className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('khatmah_tracker_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('khatmah_tracker_subtitle')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800 dark:text-gray-200">{t('khatmah_progress')}</span>
            <span className="font-bold text-primary dark:text-primary-light">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-space-100 rounded-full h-2.5">
            <motion.div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
           {completionPercentage === 100 && (
            <div className="text-center mt-4">
              <p className="text-lg font-bold text-green-500 flex items-center justify-center gap-2">
                <CheckCircle /> {t('khatmah_completed')}
              </p>
              <button
                onClick={resetProgress}
                className="mt-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm"
              >
                {t('khatmah_reset')}
              </button>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {surahs.map((surah, index) => (
            <motion.div
              key={surah.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.01 }}
            >
              <label className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                completedSurahs.includes(surah.id) 
                ? 'bg-primary/10 dark:bg-primary/20 border-primary dark:border-primary-light' 
                : 'bg-gray-100 dark:bg-space-200/50 border-transparent'
              }`}>
                <input
                  type="checkbox"
                  checked={completedSurahs.includes(surah.id)}
                  onChange={() => toggleSurahCompletion(surah.id)}
                  className="hidden"
                />
                <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all duration-200 ${
                  completedSurahs.includes(surah.id) 
                  ? 'bg-primary border-primary' 
                  : 'bg-white dark:bg-space-100 border-gray-300 dark:border-space-100'
                }`}>
                  {completedSurahs.includes(surah.id) && <CheckCircle size={18} className="text-white" />}
                </div>
                <span className="font-arabic text-lg text-gray-800 dark:text-gray-200">{surah.id}. {surah.nameArabic}</span>
              </label>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
