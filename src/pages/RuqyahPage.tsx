import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Loader } from 'lucide-react';
import { quranApi } from '../services/quranApi';
import { Verse, Surah } from '../types/quran';
import { VerseCard } from '../components/quran/VerseCard';
import { useLanguage } from '../context/LanguageContext';
import { TAFSIR_RESOURCE_ID, translationMap } from '../lib/i18n';
import { ruqyahVerseKeys } from '../data/ruqyah';

type RuqyahVerse = Verse & { surah: Surah };

export function RuqyahPage() {
  const { t, language } = useLanguage();
  const [ruqyahVerses, setRuqyahVerses] = useState<RuqyahVerse[]>([]);
  const [loading, setLoading] = useState(true);

  const parseVerseRange = (range: string): string[] => {
    if (range.includes('-')) {
      const [startRange, end] = range.split('-');
      const [surah, start] = startRange.split(':');
      const verseKeys: string[] = [];
      for (let i = parseInt(start); i <= parseInt(end); i++) {
        verseKeys.push(`${surah}:${i}`);
      }
      return verseKeys;
    }
    return [range];
  };

  useEffect(() => {
    const fetchVerses = async () => {
      setLoading(true);
      const translationIds = [translationMap[language], TAFSIR_RESOURCE_ID.toString()].filter(Boolean).join(',');
      
      const allVerseKeys = ruqyahVerseKeys.flatMap(parseVerseRange);

      const promises = allVerseKeys.map(async (key) => {
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

      const results = (await Promise.all(promises)).filter(Boolean) as RuqyahVerse[];
      setRuqyahVerses(results);
      setLoading(false);
    };

    fetchVerses();
  }, [language]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <ShieldCheck className="text-green-500 mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('ruqyah_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t('ruqyah_subtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin text-accent-light" size={48} />
          </div>
        ) : (
          <div className="space-y-6">
            {ruqyahVerses.map((item, index) => (
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
