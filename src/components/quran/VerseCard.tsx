import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Play, Copy, MoreVertical } from 'lucide-react';
import { Verse, Surah } from '../../types/quran';
import { useLanguage } from '../../context/LanguageContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface VerseCardProps {
  verse: Verse;
  surah: Surah;
  index: number;
  showTranslation: boolean;
  arabicFontSize: number;
  onPlay?: (verse: Verse) => void;
  onCopy?: (text: string) => void;
  currentPlayingVerseKey?: string | null;
}

export const VerseCard = React.memo(({
  verse,
  surah,
  index,
  showTranslation,
  arabicFontSize,
  onPlay,
  onCopy,
  currentPlayingVerseKey,
}: VerseCardProps) => {
  const { t, language } = useLanguage();
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('quran-bookmarks', []);
  const isBookmarked = bookmarks.includes(verse.verseKey);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev =>
      isBookmarked ? prev.filter(b => b !== verse.verseKey) : [...prev, verse.verseKey]
    );
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlay) onPlay(verse);
  }

  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCopy) {
      const textToCopy = `"${verse.textUthmani}" - (سورة ${surah.nameArabic}، الآية ${verse.verseNumber})`;
      onCopy(textToCopy);
    }
  }

  const verseTranslation = verse.translations?.find(tr => tr.resource_id !== 16);
  const isPlaying = currentPlayingVerseKey === verse.verseKey;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white/30 dark:bg-space-200/20 border border-transparent p-4 rounded-xl transition-colors duration-300 ${isPlaying ? '!border-primary-light' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-4">
          <span className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary-dark dark:text-primary-light rounded-md flex items-center justify-center font-bold text-sm">
            {verse.verseNumber}
          </span>
        </div>

        <div className="flex-1 text-right">
          <p
            className="font-arabic leading-loose text-gray-900 dark:text-gray-100"
            style={{ fontSize: `${arabicFontSize}px` }}
          >
            {verse.textUthmani}
          </p>
        </div>
      </div>
      
      {showTranslation && verseTranslation && (
        <div className="mt-4 pt-4 border-t border-dashed border-gray-300/50 dark:border-space-100/50">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
            {verseTranslation.text.replace(/<[^>]+>/g, '')}
          </p>
        </div>
      )}

      <div className="flex items-center justify-end gap-1 mt-4 border-t border-gray-200/50 dark:border-space-100/50 pt-2">
        {onPlay && (
          <button
            onClick={handlePlayClick}
            className={`p-2 rounded-full transition-colors ${isPlaying ? 'text-accent-light' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-space-100/50'}`}
            title={t('play_audio_title')}
          >
            <Play size={18} />
          </button>
        )}
        <button
          onClick={toggleBookmark}
          className={`p-2 rounded-full transition-colors ${isBookmarked ? 'text-yellow-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-space-100/50'}`}
          title={isBookmarked ? t('remove_bookmark_title') : t('add_bookmark_title')}
        >
          <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
        </button>
        <button
          onClick={handleCopyClick}
          className="p-2 text-gray-500 dark:text-gray-400 rounded-full transition-colors hover:bg-gray-200/50 dark:hover:bg-space-100/50"
          title="Copy Verse"
        >
          <Copy size={18} />
        </button>
      </div>
    </motion.div>
  );
});
