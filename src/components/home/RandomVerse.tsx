import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Star } from 'lucide-react';
import { quranApi } from '../../services/quranApi';
import { Verse, Surah } from '../../types/quran';
import { useLanguage } from '../../context/LanguageContext';
import { verseOfTheDayKeys } from '../../data/verseOfTheDay';
import { TAFSIR_RESOURCE_ID, translationMap } from '../../lib/i18n';
import { Skeleton } from '../common/Skeleton';

type RandomVerseData = Verse & { surah: Surah };

const VerseSkeleton = () => (
  <div className="h-32 flex flex-col items-center justify-center">
    <Skeleton className="h-8 w-3/4 mb-4 rounded-md" />
    <Skeleton className="h-4 w-1/2 mb-4 rounded-md" />
    <Skeleton className="h-4 w-1/3 rounded-md" />
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


  const translation = randomVerse?.translations?.find(tr => tr.resource_id !== TAFSIR_RESOURCE_ID);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary-light dark:hover:border-accent-dark hover:shadow-lg dark:hover:shadow-glow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <Star className="text-yellow-400" size={24} />
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t('random_verse_title')}</h2>
      </div>
      
      {loading ? (
        <VerseSkeleton />
      ) : randomVerse ? (
        <div>
          <p className="font-arabic text-2xl text-center font-bold text-gray-900 dark:text-gray-100 dark:text-shadow-glow-sm leading-loose mb-3" style={{ textShadow: '0 0 10px rgba(102, 252, 241, 0.3)' }}>
            {randomVerse.textUthmani}
          </p>
          {language !== 'ar' && translation && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-4">
              "{translation.text}"
            </p>
          )}
          <div className="text-center">
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
