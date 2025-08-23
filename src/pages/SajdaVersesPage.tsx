import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Loader } from 'lucide-react';
import { quranApi } from '../services/quranApi';
import { Verse, Surah } from '../types/quran';
import { VerseCard } from '../components/quran/VerseCard';
import { useLanguage } from '../context/LanguageContext';
import { TAFSIR_RESOURCE_ID, translationMap } from '../lib/i18n';
import { sajdaVerseKeys } from '../data/sajdaVerses';

type SajdaVerse = Verse & { surah: Surah };

export function SajdaVersesPage() {
  const { t, language } = useLanguage();
  const [sajdaVerses, setSajdaVerses] = useState<SajdaVerse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSajdaVerses = async () => {
      setLoading(true);
      const translationIds = [translationMap[language], TAFSIR_RESOURCE_ID.toString()].filter(Boolean).join(',');

      const promises = sajdaVerseKeys.map(async (key) => {
        const [surahIdStr] = key.split(':');
        const surahId = parseInt(surahIdStr, 10);
        
        const versePromise = quranApi.getVerseByKey(key, { translations: translationIds });
        const surahPromise = quranApi.getSurah(surahId);

        const [verseResult, surahResult] = await Promise.all([versePromise, surahPromise]);

        if (verseResult && surahResult) {
          return { ...verseResult.verse, surah: surahResult };
        }
        return null;
      });

      const results = (await Promise.all(promises)).filter(Boolean) as SajdaVerse[];
      setSajdaVerses(results);
      setLoading(false);
    };

    fetchSajdaVerses();
  }, [language]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <BookMarked className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('sajda_verses_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('sajda_verses_subtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin text-accent-light" size={48} />
          </div>
        ) : (
          <div className="space-y-6">
            {sajdaVerses.map((item, index) => (
              <VerseCard
                key={item.verseKey}
                verse={item}
                surah={item.surah}
                index={index}
                showTranslation={language !== 'ar'}
                arabicFontSize={28}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
