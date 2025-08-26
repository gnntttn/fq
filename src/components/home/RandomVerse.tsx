import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Star, Loader } from 'lucide-react';
import { quranApi } from '../../services/quranApi';
import { Verse, Surah } from '../../types/quran';
import { useLanguage } from '../../context/LanguageContext';
import { verseOfTheDayKeys } from '../../data/verseOfTheDay';
import { TAFSIR_RESOURCE_ID, translationMap } from '../../lib/i18n';

type RandomVerseData = Verse & { surah: Surah };

const VerseSkeleton = () => (
  <div className="h-40 flex flex-col items-center justify-center animate-pulse">
    <div className="h-5 bg-gray-200 dark:bg-space-100 rounded-md w-1/3 mb-6"></div>
    <div className="h-8 bg-gray-200 dark:bg-space-100 rounded-md w-full mb-3"></div>
    <div className="h-8 bg-gray-200 dark:bg-space-100 rounded-md w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 dark:bg-space-100 rounded-md w-1/2"></div>
  </div>
);

export function RandomVerse() {
  const { t, language } = useLanguage();
  const [randomVerse, setRandomVerse] = useState<RandomVerseData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomVerse = async () => {
    setLoading(true);
    try {
      const randomIndex = Math.floor(Math.random() * verseOfTheDayKeys.length);
      const verseKey = verseOfTheDayKeys[randomIndex];

      const translationIds = [translationMap[language], TAFSIR_RESOURCE_ID.toString()].filter(Boolean).join(',');
      const [surahIdStr] = verseKey.split(':');
      
      const versePromise = quranApi.getVerseByKey(verseKey, { translations: translationIds });
      const surahPromise = quranApi.getSurah(parseInt(surahIdStr, 10));

      const [verseResult, surahPromiseResult] = await Promise.all([versePromise, surahPromise]);

      if (verseResult && surahPromiseResult) {
        setRandomVerse({ ...verseResult.verse, surah: surahPromiseResult });
      }
    } catch (error) {
      console.error("Error fetching random verse:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRandomVerse();
  }, [language]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary-light dark:hover:border-accent-dark hover:shadow-lg dark:hover:shadow-glow-sm"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t('random_verse_title')}</h2>
        <Star className="text-yellow-400" size={20} />
      </div>
      
      {loading ? (
        <VerseSkeleton />
      ) : randomVerse ? (
        <div>
          <p className="font-arabic text-3xl text-center font-bold text-gray-900 dark:text-gray-100 dark:text-shadow-glow-sm leading-loose mb-3" style={{ textShadow: '0 0 10px rgba(102, 252, 241, 0.3)' }}>
            {randomVerse.textUthmani}
          </p>
          <div className="text-center mt-4">
            <Link 
              to={`/surah/${randomVerse.surah.id}?verse=${randomVerse.verseNumber}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-primary-light hover:text-accent-light transition-colors"
            >
              <BookOpen size={16} />
              <span>{t('view_in_quran')} - {randomVerse.surah.nameArabic} ({randomVerse.verseKey})</span>
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">{t('no_results_found')}</p>
      )}
    </motion.div>
  );
}
