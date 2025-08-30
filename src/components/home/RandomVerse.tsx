import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { quranApi } from '../../services/quranApi';
import { Verse, Surah } from '../../types/quran';
import { useLanguage } from '../../context/LanguageContext';
import { TAFSIR_RESOURCE_ID, translationMap } from '../../lib/i18n';
import { verseOfTheDayKeys } from '../../data/verseOfTheDay';
import { Skeleton } from '../common/Skeleton';

const VerseSkeleton = () => (
  <div className="p-6">
    <Skeleton className="h-6 w-3/4 mb-4 rounded-md" />
    <Skeleton className="h-4 w-full mb-2 rounded-md" />
    <Skeleton className="h-4 w-2/3 rounded-md" />
    <Skeleton className="h-4 w-1/4 mt-4 ml-auto rounded-md" />
  </div>
);

export function RandomVerse() {
  const { t, language } = useLanguage();
  const [verse, setVerse] = useState<Verse | null>(null);
  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);

  const randomVerseKey = useMemo(() => {
    return verseOfTheDayKeys[Math.floor(Math.random() * verseOfTheDayKeys.length)];
  }, []);

  useEffect(() => {
    const fetchVerse = async () => {
      setLoading(true);
      const translationIds = [translationMap[language]].filter(Boolean).join(',');
      
      const verseResult = await quranApi.getVerseByKey(randomVerseKey, { translations: translationIds });
      if (verseResult) {
        setVerse(verseResult.verse);
        const surahId = parseInt(verseResult.verse.verseKey.split(':')[0]);
        const surahData = await quranApi.getSurah(surahId);
        setSurah(surahData);
      }
      setLoading(false);
    };

    fetchVerse();
  }, [randomVerseKey, language]);

  const verseTranslation = verse?.translations?.find(tr => tr.resource_id !== TAFSIR_RESOURCE_ID);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-2xl transition-all duration-300 hover:border-primary-light dark:hover:border-accent-dark hover:shadow-lg dark:hover:shadow-glow-sm"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-primary-dark dark:text-primary-light" size={24} />
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t('random_verse_title')}</h2>
        </div>
        {loading ? (
          <VerseSkeleton />
        ) : verse && surah ? (
          <div>
            <p className="font-arabic text-2xl text-gray-900 dark:text-gray-100 leading-loose mb-3 text-center">
              {verse.textUthmani}
            </p>
            {language !== 'ar' && verseTranslation && (
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center mb-4">
                "{verseTranslation.text.replace(/<[^>]+>/g, '')}"
              </p>
            )}
            <div className="text-center">
              <Link to={`/surah/${surah.id}?highlight=${verse.verseKey}`} className="text-sm text-primary dark:text-primary-light hover:underline">
                ({language === 'ar' ? surah.nameArabic : surah.nameEnglish}: {verse.verseNumber})
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">{t('error_fetching_data')}</p>
        )}
      </div>
    </motion.div>
  );
}
