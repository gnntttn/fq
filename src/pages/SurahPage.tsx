import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { quranApi } from '../services/quranApi';
import { Verse, Surah, Reciter } from '../types/quran';
import { VerseCard } from '../components/quran/VerseCard';
import { SurahPageHeader } from '../components/quran/SurahPageHeader';
import { SurahSettingsPanel } from '../components/quran/SurahSettingsPanel';
import { AudioPlayer } from '../components/audio/AudioPlayer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';
import { TAFSIR_RESOURCE_ID, translationMap } from '../lib/i18n';
import { Skeleton } from '../components/common/Skeleton';
import { toast } from '../components/common/Toaster';
import { copyToClipboard } from '../lib/clipboard';
import { CopyTextModal } from '../components/common/CopyTextModal';

const VerseCardSkeleton = () => (
  <div className="bg-white/30 dark:bg-space-200/20 border border-transparent p-4 rounded-xl">
    <div className="flex items-start gap-4">
      <Skeleton className="w-8 h-8 rounded-md shrink-0" />
      <div className="flex-1 text-right">
        <Skeleton className="h-8 w-full mb-2 rounded-md" />
        <Skeleton className="h-8 w-3/4 ml-auto rounded-md" />
      </div>
    </div>
    <div className="flex items-center justify-end gap-1 mt-4 border-t border-gray-200/50 dark:border-space-100/50 pt-2">
      <Skeleton className="w-8 h-8 rounded-full" />
      <Skeleton className="w-8 h-8 rounded-full" />
      <Skeleton className="w-8 h-8 rounded-full" />
    </div>
  </div>
);

export function SurahPage() {
  const { surahId: surahIdStr } = useParams<{ surahId: string }>();
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();

  const surahId = parseInt(surahIdStr || '1', 10);
  const highlightedVerseKey = searchParams.get('highlight');

  const [surah, setSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [selectedReciter, setSelectedReciter] = useLocalStorage<string>('selected-reciter-id', '7');
  const [showTranslations, setShowTranslations] = useLocalStorage('show-translations', language !== 'ar');
  const [arabicFontSize, setArabicFontSize] = useLocalStorage('arabic-font-size', 28);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [currentPlayingVerse, setCurrentPlayingVerse] = useState<Verse | null>(null);
  const [copyModalState, setCopyModalState] = useState({ isOpen: false, text: '' });

  const loadSurahData = useCallback(async (id: number, reciterId: string) => {
    setLoading(true);
    try {
      const translationIds = [translationMap[language], TAFSIR_RESOURCE_ID.toString()].filter(Boolean).join(',');
      
      const [surahData, versesData, recitersData] = await Promise.all([
        quranApi.getSurah(id),
        quranApi.getAllVersesBySurah(id, { translations: translationIds, audio: reciterId }),
        quranApi.getReciters()
      ]);

      setSurah(surahData);
      setVerses(versesData);
      setReciters(recitersData);
    } catch (error) {
      console.error('Error loading surah data:', error);
      toast.error(t('error_fetching_data'));
    } finally {
      setLoading(false);
    }
  }, [language, t]);

  useEffect(() => {
    loadSurahData(surahId, selectedReciter);
  }, [surahId, selectedReciter, loadSurahData]);

  useEffect(() => {
    if (highlightedVerseKey && !loading) {
      const element = document.getElementById(`verse-${highlightedVerseKey}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('bg-primary/20', 'dark:bg-primary/30', 'ring-2', 'ring-accent-light');
          setTimeout(() => {
            element.classList.remove('bg-primary/20', 'dark:bg-primary/30', 'ring-2', 'ring-accent-light');
          }, 3000);
        }, 300);
      }
    }
  }, [loading, highlightedVerseKey]);

  const playVerseAudio = useCallback((verse: Verse) => {
    if (currentPlayingVerse?.verseKey === verse.verseKey) {
      setCurrentPlayingVerse(null);
    } else if (verse.audio?.url) {
      setCurrentPlayingVerse(verse);
    } else {
      toast.error(t('audio_player_error'));
    }
  }, [currentPlayingVerse, t]);

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

  if (loading && !surah) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-20 w-full rounded-xl mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 7 }).map((_, i) => <VerseCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (!surah) {
    return <div className="text-center py-10">{t('surah_not_found')}</div>;
  }

  return (
    <>
      <CopyTextModal 
        isOpen={copyModalState.isOpen}
        onClose={() => setCopyModalState({ isOpen: false, text: '' })}
        textToCopy={copyModalState.text}
      />
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <SurahPageHeader surah={surah} onSettingsClick={() => setIsSettingsOpen(true)} />
          
          <div className="space-y-4">
            {!surah.bismillahPre && surah.id !== 9 && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center font-arabic text-2xl text-gray-800 dark:text-gray-200 py-4"
              >
                {t('bismillah')}
              </motion.p>
            )}
            {verses.map((verse, index) => (
              <div id={`verse-${verse.verseKey}`} key={verse.verseKey} className="rounded-xl transition-all duration-500">
                <VerseCard
                  verse={verse}
                  surah={surah}
                  index={index}
                  showTranslation={showTranslations}
                  arabicFontSize={arabicFontSize}
                  onPlay={playVerseAudio}
                  onCopy={handleCopyToClipboard}
                  currentPlayingVerseKey={currentPlayingVerse?.verseKey}
                />
              </div>
            ))}
          </div>
        </div>

        <SurahSettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          reciters={reciters}
          selectedReciter={selectedReciter}
          onReciterChange={setSelectedReciter}
          showTranslations={showTranslations}
          onShowTranslationsChange={setShowTranslations}
          fontSize={arabicFontSize}
          onFontSizeChange={setArabicFontSize}
        />
        
        {currentPlayingVerse && (
          <AudioPlayer
            src={currentPlayingVerse.audio?.url ? `https://verses.quran.com/${currentPlayingVerse.audio.url}` : undefined}
            title={`${surah.nameArabic} - ${t('verse')} ${currentPlayingVerse.verseNumber}`}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onEnded={handleNext}
            autoPlay={true}
          />
        )}
      </div>
    </>
  );
}
