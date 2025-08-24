import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Play, MessageCircle, Library } from 'lucide-react';
import { Verse, Surah } from '../../types/quran';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useLanguage } from '../../context/LanguageContext';
import { TAFSIR_RESOURCE_ID } from '../../lib/i18n';

interface VerseCardProps {
  verse: Verse;
  surah: Surah;
  index: number;
  isPlaying?: boolean;
  onPlay?: () => void;
  showTranslation?: boolean;
  arabicFontSize: number;
}

export const VerseCard = React.memo(({ 
  verse, 
  surah, 
  index, 
  isPlaying, 
  onPlay,
  showTranslation = true,
  arabicFontSize
}: VerseCardProps) => {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('quran-bookmarks', []);
  const [showNote, setShowNote] = useState(false);
  const [showTafsir, setShowTafsir] = useState(false);
  const [note, setNote] = useLocalStorage(`note-${verse.verseKey}`, '');
  const { t } = useLanguage();
  
  const isBookmarked = bookmarks.includes(verse.verseKey);

  const toggleBookmark = () => {
    if (isBookmarked) {
      setBookmarks(bookmarks.filter(b => b !== verse.verseKey));
    } else {
      setBookmarks([...bookmarks, verse.verseKey]);
    }
  };

  const translation = verse.translations?.find(t => t.resource_id !== TAFSIR_RESOURCE_ID);
  const tafsir = verse.translations?.find(t => t.resource_id === TAFSIR_RESOURCE_ID);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.02 }}
      className={`bg-white/30 dark:bg-space-200/20 dark:backdrop-blur-sm rounded-xl transition-all duration-300 border ${
        isPlaying ? 'border-accent-light shadow-lg dark:shadow-glow-md' : 'border-gray-200 dark:border-space-100/50'
      }`}
    >
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <p 
            className="flex-1 text-2xl lg:text-3xl text-center font-arabic text-gray-900 dark:text-gray-100 leading-relaxed"
            style={{ fontSize: `${arabicFontSize}px`, lineHeight: 1.9 }}
          >
            {verse.textUthmani}
          </p>
          <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300 ${
            isPlaying ? 'bg-accent-light text-space-300 shadow-md dark:shadow-glow-sm' : 'bg-primary/80 dark:bg-primary/90 text-white'
          }`}>
            {verse.verseNumber}
          </div>
        </div>
        
        {showTranslation && translation && (
          <div className="border-t border-gray-200 dark:border-space-100/50 pt-3 mt-3">
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {translation.text}
            </p>
          </div>
        )}

        <div className="flex items-center justify-start gap-1 mt-3 border-t border-gray-200/50 dark:border-space-100/30 pt-3">
            {onPlay && (
              <button
                onClick={onPlay}
                className={`p-2 transition-colors rounded-full ${
                  isPlaying ? 'text-accent-light' : 'text-gray-500 dark:text-gray-400 hover:text-accent-light'
                }`}
                title={t('play_audio_title')}
              >
                <Play size={18} />
              </button>
            )}
            <button
              onClick={toggleBookmark}
              className={`p-2 transition-colors rounded-full ${
                isBookmarked ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-500 dark:text-gray-400 hover:text-yellow-400'
              }`}
              title={t(isBookmarked ? 'remove_bookmark_title' : 'add_bookmark_title')}
            >
              {isBookmarked ? <Bookmark className="fill-current" size={18} /> : <Bookmark size={18} />}
            </button>
            <button
              onClick={() => setShowNote(!showNote)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent-light transition-colors rounded-full"
              title={t('note_placeholder')}
            >
              <MessageCircle size={18} />
            </button>
            {tafsir && (
              <button
                onClick={() => setShowTafsir(!showTafsir)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent-light hover:bg-gray-200 dark:hover:bg-space-100/50 transition-colors rounded-full"
                title={t(showTafsir ? 'hide_tafsir' : 'show_tafsir')}
              >
                <Library size={18} />
              </button>
            )}
          </div>

        <AnimatePresence>
        {showTafsir && tafsir && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="border-t border-gray-200 dark:border-space-100/50 pt-4"
          >
            <h4 className="font-bold text-md mb-2 text-primary-dark dark:text-primary-light font-sans-arabic">{t('tafsir')} ({tafsir.resourceName})</h4>
            <p className="text-gray-700 dark:text-gray-300 text-md leading-relaxed font-sans-arabic" dir="rtl">
              {tafsir.text}
            </p>
          </motion.div>
        )}
        </AnimatePresence>

        <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="border-t border-gray-200 dark:border-space-100/50 pt-4"
          >
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('note_placeholder')}
              className="w-full p-3 border border-gray-300 dark:border-space-100 bg-gray-100 dark:bg-space-200/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-800 dark:text-gray-200"
              rows={3}
            />
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});
