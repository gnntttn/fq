import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader, ArrowLeft } from 'lucide-react';
import { quranApi } from '../services/quranApi';
import { Verse, Surah } from '../types/quran';
import { VerseCard } from '../components/quran/VerseCard';
import { useLanguage } from '../context/LanguageContext';
import { TAFSIR_RESOURCE_ID, translationMap } from '../lib/i18n';
import { miracleTopics } from '../data/miracles';

type MiracleVerse = Verse & { surah: Surah };

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

export function MiracleTopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const { t, language } = useLanguage();
  
  const topic = miracleTopics.find(c => c.id === topicId);
  
  const [themedVerses, setThemedVerses] = useState<MiracleVerse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!topic) return;

    const fetchVerses = async () => {
      setLoading(true);
      const translationIds = [translationMap[language], TAFSIR_RESOURCE_ID.toString()].filter(Boolean).join(',');

      const allVerseKeys = topic.verseKeys.flatMap(parseVerseRange);

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

      const results = (await Promise.all(promises)).filter(Boolean) as MiracleVerse[];
      setThemedVerses(results);
      setLoading(false);
    };

    fetchVerses();
  }, [topic, language]);

  if (!topic) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Topic not found</p>
      </div>
    );
  }

  const Icon = topic.icon;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-accent-light mx-auto" size={48} />
          <p className="mt-4 text-gray-700 dark:text-gray-300">{t('loading_verses')}</p>
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
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-violet-500/10 dark:bg-violet-500/20 rounded-full flex items-center justify-center">
              <Icon className="text-violet-600 dark:text-violet-400" size={36} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t(topic.titleKey)}
          </h1>
           <Link to="/miracles" className="mt-4 inline-flex items-center gap-2 text-primary dark:text-primary-light hover:text-accent-light transition-colors">
              <ArrowLeft size={16} />
              Back to Miracles
            </Link>
        </motion.div>

        <div className="space-y-6">
          {themedVerses.map((item, index) => (
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
      </div>
    </div>
  );
}
