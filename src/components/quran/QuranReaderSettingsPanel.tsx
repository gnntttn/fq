import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { Reciter, Surah } from '../../types/quran';
import { useLanguage } from '../../context/LanguageContext';

interface QuranReaderSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  reciters: Reciter[];
  selectedReciter: string;
  onReciterChange: (id: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  surahs: Surah[];
  onSurahChange: (surahId: number) => void;
  onJuzChange: (juzNumber: number) => void;
}

export function QuranReaderSettingsPanel({
  isOpen,
  onClose,
  reciters,
  selectedReciter,
  onReciterChange,
  fontSize,
  onFontSizeChange,
  surahs,
  onSurahChange,
  onJuzChange,
}: QuranReaderSettingsPanelProps) {
  const { t, dir, language } = useLanguage();
  const MIN_FONT_SIZE = 20;
  const MAX_FONT_SIZE = 52;
  const juzs = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-50/80 dark:bg-space-300/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white/80 dark:bg-space-200/80 backdrop-blur-lg border border-gray-200 dark:border-space-100/50 rounded-2xl shadow-lg dark:shadow-glow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
            dir={dir}
          >
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-space-100/50 p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {t('view_settings')}
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent-light hover:bg-gray-200 dark:hover:bg-space-100/50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <label htmlFor="surah-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('select_surah_label')}
                </label>
                <select
                  id="surah-select"
                  onChange={(e) => onSurahChange(parseInt(e.target.value))}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-space-100 bg-gray-100 dark:bg-space-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 dark:text-gray-200"
                >
                  {surahs.map((surah) => (
                    <option key={surah.id} value={surah.id} className="bg-white dark:bg-space-200 text-gray-800 dark:text-gray-200">
                      {surah.id}. {language === 'ar' ? surah.nameArabic : surah.nameEnglish}
                    </option>
                  ))}
                </select>
              </div>

               <div>
                <label htmlFor="juz-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('select_juz_label')}
                </label>
                <select
                  id="juz-select"
                  onChange={(e) => onJuzChange(parseInt(e.target.value))}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-space-100 bg-gray-100 dark:bg-space-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 dark:text-gray-200"
                >
                  {juzs.map((juz) => (
                    <option key={juz} value={juz} className="bg-white dark:bg-space-200 text-gray-800 dark:text-gray-200">
                      {t('juz_number', { number: juz })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="reciter-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('reciter_select_label')}
                </label>
                <select
                  id="reciter-select"
                  value={selectedReciter}
                  onChange={(e) => onReciterChange(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-space-100 bg-gray-100 dark:bg-space-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 dark:text-gray-200"
                >
                  {reciters.map((reciter) => (
                    <option key={reciter.id} value={reciter.id} className="bg-white dark:bg-space-200 text-gray-800 dark:text-gray-200">
                      {language === 'ar' ? reciter.nameArabic : reciter.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('font_size')}
                </label>
                <div className="flex items-center justify-between bg-gray-100 dark:bg-space-300/50 border border-gray-300 dark:border-space-100 rounded-xl p-2">
                  <button 
                    onClick={() => onFontSizeChange(Math.max(MIN_FONT_SIZE, fontSize - 2))}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent-light hover:bg-gray-200 dark:hover:bg-space-100/50 rounded-full transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200 w-12 text-center">{fontSize}px</span>
                  <button 
                    onClick={() => onFontSizeChange(Math.min(MAX_FONT_SIZE, fontSize + 2))}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent-light hover:bg-gray-200 dark:hover:bg-space-100/50 rounded-full transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
