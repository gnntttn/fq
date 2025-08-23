import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookmarkX } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { quranApi } from '../services/quranApi';
import { Verse, Surah } from '../types/quran';
import { VerseCard } from '../components/quran/VerseCard';
import { useLanguage } from '../context/LanguageContext';
import { TAFSIR_RESOURCE_ID, translationMap } from '../lib/i18n';
import { VerseSkeleton } from '../components/common/Skeleton';

type BookmarkedVerse = Verse & { surah: Surah };

export function BookmarksPage() {
  const { t, language } = useLanguage();
  const [bookmarks] = useLocalStorage<string[]>('quran-bookmarks', []);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<BookmarkedVerse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      const translationIds = [translationMap[language], TAFSIR_RESOURCE_ID.toString()].filter(Boolean).join(',');

      const promises = bookmarks.map(async (key) => {
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

      const results = (await Promise.all(promises)).filter(Boolean) as BookmarkedVerse[];
      setBookmarkedVerses(results.reverse());
      setLoading(false);
    };

    if (bookmarks.length > 0) {
      fetchBookmarks();
    } else {
      setLoading(false);
      setBookmarkedVerses([]);
    }
  }, [bookmarks, language]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('bookmarks_page_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('bookmarks_page_subtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => <VerseSkeleton key={i} index={i} />)}
          </div>
        ) : bookmarkedVerses.length > 0 ? (
          <div className="space-y-6">
            {bookmarkedVerses.map((item, index) => (
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
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-gray-100/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-dashed border-gray-300 dark:border-space-100/50 rounded-2xl"
          >
            <BookmarkX className="text-gray-400 dark:text-gray-500 mx-auto" size={64} />
            <h2 className="mt-6 text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {t('no_bookmarks')}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {t('no_bookmarks_desc')}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
