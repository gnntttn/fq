import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader } from 'lucide-react';
import { quranApi } from '../services/quranApi';
import { Verse, Surah } from '../types/quran';
import { VerseCard } from '../components/quran/VerseCard';
import { useLanguage } from '../context/LanguageContext';
import { TAFSIR_RESOURCE_ID, translationMap } from '../lib/i18n';
import { themedAyatCollections } from '../data/themedAyat';

type ThemedVerse = Verse & { surah: Surah };

export function ThemedAyatPage() {
  const { themeId } = useParams<{ themeId: string }>();
  const { t, language } = useLanguage();
  
  const collection = themedAyatCollections.find(c => c.id === themeId);
  
  const [themedVerses, setThemedVerses] = useState<ThemedVerse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!collection) return;

    const fetchVerses = async () => {
      setLoading(true);
      const translationIds = [translationMap[language], TAFSIR_RESOURCE_ID.toString()].filter(Boolean).join(',');

      const promises = collection.verses.map(async (key) => {
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

      const results = (await Promise.all(promises)).filter(Boolean) as ThemedVerse[];
      setThemedVerses(results);
      setLoading(false);
    };

    fetchVerses();
  }, [collection, language]);

  if (!collection) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">الموضوع غير موجود</p>
      </div>
    );
  }

  const Icon = collection.icon;

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
            {t(collection.titleKey)}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t(collection.descriptionKey)}
          </p>
           <Link to="/topics" className="mt-4 inline-flex items-center gap-2 text-primary dark:text-primary-light hover:text-accent-light transition-colors">
              <ArrowLeft size={16} />
              {t('back_to_topics')}
            </Link>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin text-accent-light" size={48} />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
