import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader, ArrowLeft } from 'lucide-react';
import { quranApi } from '../services/quranApi';
import { Verse, Surah } from '../types/quran';
import { VerseCard } from '../components/quran/VerseCard';
import { useLanguage } from '../context/LanguageContext';
import { TAFSIR_RESOURCE_ID, translationMap } from '../lib/i18n';
import { prophetStories } from '../data/prophetStories';

type StoryVerse = Verse & { surah: Surah };

export function ProphetStoryPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const { t, language } = useLanguage();
  
  const story = prophetStories.find(s => s.id === storyId);
  
  const [storyVerses, setStoryVerses] = useState<StoryVerse[]>([]);
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
    if (!story) return;

    const fetchVerses = async () => {
      setLoading(true);
      const translationIds = [translationMap[language], TAFSIR_RESOURCE_ID.toString()].filter(Boolean).join(',');
      
      const allVerseKeys = story.verses.flatMap(parseVerseRange);

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

      const results = (await Promise.all(promises)).filter(Boolean) as StoryVerse[];
      setStoryVerses(results);
      setLoading(false);
    };

    fetchVerses();
  }, [story, language]);

  if (!story) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">لم يتم العثور على القصة</p>
      </div>
    );
  }

  const Icon = story.icon;

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
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
              <Icon className="text-primary-dark dark:text-primary-light" size={36} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('story_of_prophet')} {t(story.nameKey)}
          </h1>
           <Link to="/prophet-stories" className="mt-4 inline-flex items-center gap-2 text-primary dark:text-primary-light hover:text-accent-light transition-colors">
              <ArrowLeft size={16} />
              {t('back_to_prophet_stories')}
            </Link>
        </motion.div>

        <div className="space-y-6">
          {storyVerses.map((item, index) => (
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
