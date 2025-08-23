import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Loader } from 'lucide-react';
import { quranApi } from '../services/quranApi';
import { Verse, Surah } from '../types/quran';
import { VerseCard } from '../components/quran/VerseCard';
import { useLanguage } from '../context/LanguageContext';
import { TAFSIR_RESOURCE_ID, translationMap } from '../lib/i18n';
import { rabbanaDuas } from '../data/rabbanaDuas';

type DuaVerse = Verse & { surah: Surah };

export function RabbanaDuasPage() {
  const { t, language } = useLanguage();
  const [duaVerses, setDuaVerses] = useState<DuaVerse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDuas = async () => {
      setLoading(true);
      const translationIds = [translationMap[language], TAFSIR_RESOURCE_ID.toString()].filter(Boolean).join(',');

      const promises = rabbanaDuas.map(async (key) => {
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

      const results = (await Promise.all(promises)).filter(Boolean) as DuaVerse[];
      setDuaVerses(results);
      setLoading(false);
    };

    fetchDuas();
  }, [language]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Heart className="text-red-500 dark:text-red-400 mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('rabbana_duas_page_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('rabbana_duas_page_subtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin text-accent-light" size={48} />
          </div>
        ) : (
          <div className="space-y-6">
            {duaVerses.map((item, index) => (
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
