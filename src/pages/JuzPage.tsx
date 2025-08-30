import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { quranApi } from '../services/quranApi';
import { Verse, Surah } from '../types/quran';
import { VerseCard } from '../components/quran/VerseCard';
import { AudioPlayer } from '../components/audio/AudioPlayer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';
import { TAFSIR_RESOURCE_ID, translationMap } from '../lib/i18n';
import { Skeleton } from '../components/common/Skeleton';
import { copyToClipboard } from '../lib/clipboard';
import { Toaster, toast } from '../components/common/Toaster';
import { CopyTextModal } from '../components/common/CopyTextModal';

const VerseCardSkeleton = () => (
  <div className="bg-white/30 dark:bg-space-200/20 border-b-2 border-gray-200/50 dark:border-space-100/50 p-4 rounded-xl">
    <div className="flex items-start justify-between mb-4">
      <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
      <div className="flex-1 px-4 text-right">
        <Skeleton className="h-8 w-full mb-2 rounded-md" />
        <Skeleton className="h-8 w-3/4 ml-auto rounded-md" />
      </div>
    </div>
    <Skeleton className="h-4 w-full rounded-md" />
  </div>
);

const surahCache = new Map<number, Surah>();

async function getSurahForVerse(verse: Verse): Promise<Surah> {
  const surahId = parseInt(verse.verseKey.split(':')[0], 10);
  if (surahCache.has(surahId)) {
    return surahCache.get(surahId)!;
  }
  const surahData = await quranApi.getSurah(surahId);
  if (surahData) {
    surahCache.set(surahId, surahData);
    return surahData;
  }
  return { id: surahId, nameArabic: `سورة ${surahId}`, nameEnglish: `Surah ${surahId}`, versesCount: 0, type: 'meccan', pages: [0,0], name: `Surah ${surahId}`, bismillahPre: false };
}

export function JuzPage() {
  const { juzId: juzIdStr } = useParams<{ juzId: string }>();
  const { t, language } = useLanguage();

  const juzId = parseInt(juzIdStr || '1', 10);

  const [verses, setVerses] = useState<Verse[]>([]);
  const [versesWithSurah, setVersesWithSurah] = useState<(Verse & { surah: Surah })[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedReciter] = useLocalStorage<string>('selected-reciter-id', '7');
  const [showTranslations] = useLocalStorage('show-translations', language !== 'ar');
  const [arabicFontSize] = useLocalStorage('arabic-font-size', 28);

  const [currentPlayingVerse, setCurrentPlayingVerse] = useState<Verse | null>(null);
  const [audioSrc, setAudioSrc] = useState<string>('');
  const [copyModalState, setCopyModalState] = useState({ isOpen: false, text: '' });

  const loadJuzData = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const translationIds = [translationMap[language], TAFSIR_RESOURCE_ID.toString()].filter(Boolean).join(',');
      const versesData = await quranApi.getVersesByJuz(id, { translations: translationIds, audio: selectedReciter });
      setVerses(versesData);
      
      const versesWithSurahData = await Promise.all(versesData.map(async (verse) => {
        const surah = await getSurahForVerse(verse);
        return { ...verse, surah };
      }));
      setVersesWithSurah(versesWithSurahData);

    } catch (error) {
      console.error('Error loading juz data:', error);
      toast.error(t('error_fetching_data'));
    } finally {
      setLoading(false);
    }
  }, [language, selectedReciter, t]);

  useEffect(() => {
    loadJuzData(juzId);
  }, [juzId, loadJuzData]);

  const playVerseAudio = useCallback((verse: Verse) => {
    if (verse.audio?.url) {
      const audioUrl = `https://verses.quran.com/${verse.audio.url}`;
      setCurrentPlayingVerse(verse);
      setAudioSrc(audioUrl);
    } else {
      toast.error(t('audio_player_error'));
    }
  }, [t]);

  const findVerseIndex = (verse: Verse | null) => {
    if (!verse) return -1;
    return verses.findIndex(v => v.id === verse.id);
  };

  const handleNext = () => {
    const currentIndex = findVerseIndex(currentPlayingVerse);
    if (currentIndex !== -1 && currentIndex < verses.length - 1) {
      playVerseAudio(verses[currentIndex + 1]);
    } else {
      setCurrentPlayingVerse(null);
      setAudioSrc('');
    }
  };

  const handlePrevious = () => {
    const currentIndex = findVerseIndex(currentPlayingVerse);
    if (currentIndex > 0) {
      playVerseAudio(verses[currentIndex - 1]);
    }
  };

  const handleCopyToClipboard = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      toast.success(t('copy_success'));
    } else {
      setCopyModalState({ isOpen: true, text: text });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {Array.from({ length: 10 }).map((_, i) => <VerseCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <CopyTextModal 
        isOpen={copyModalState.isOpen}
        onClose={() => setCopyModalState({ isOpen: false, text: '' })}
        textToCopy={copyModalState.text}
      />
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/30 dark:bg-space-200/20 dark:backdrop-blur-sm rounded-xl border border-gray-200 dark:border-space-100/50 p-4 mb-6 sticky top-4 z-20"
          >
            <div className="flex items-center justify-between">
              <Link to="/juzs" className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent-light hover:bg-gray-200 dark:hover:bg-space-100/50 rounded-full transition-colors" aria-label={t('back_to_juzs')}>
                <ArrowLeft size={22} />
              </Link>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-arabic">
                {t('juz_title', { number: juzId })}
              </h1>
              <div className="w-10"></div>
            </div>
          </motion.div>
          
          <div className="space-y-6">
            {versesWithSurah.map((item, index) => (
              <VerseCard
                key={item.verseKey}
                verse={item}
                surah={item.surah}
                index={index}
                showTranslation={showTranslations}
                arabicFontSize={arabicFontSize}
                onPlay={playVerseAudio}
                onCopy={handleCopyToClipboard}
                currentPlayingVerseKey={currentPlayingVerse?.verseKey}
              />
            ))}
          </div>
        </div>
        
        {audioSrc && currentPlayingVerse && (
          <AudioPlayer
            src={audioSrc}
            title={`${currentPlayingVerse.surah.nameArabic} - ${t('verse')} ${currentPlayingVerse.verseNumber}`}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onEnded={handleNext}
            autoPlay
          />
        )}
      </div>
    </>
  );
}
