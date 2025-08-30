import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader, LucideIcon, BookCopy, Mic2, AppWindow, Radio, Tv } from 'lucide-react';
import { quranApi } from '../../services/quranApi';
import { SearchResult, Surah, Reciter } from '../../types/quran';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { featureLinks, FeatureLink } from '../../data/features';
import { Radio as RadioType } from '../../types/radio';
import { TvChannel } from '../../types/tv';
import axios from 'axios';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UnifiedSearchResultItem =
  | { type: 'verse'; data: SearchResult }
  | { type: 'surah'; data: Surah }
  | { type: 'reciter'; data: Reciter }
  | { type: 'feature'; data: FeatureLink }
  | { type: 'radio'; data: RadioType }
  | { type: 'tv'; data: TvChannel };

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UnifiedSearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  const allSurahs = useRef<Surah[]>([]);
  const allReciters = useRef<Reciter[]>([]);
  const allRadios = useRef<RadioType[]>([]);
  const allTvChannels = useRef<TvChannel[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { t, language, dir } = useLanguage();

  useEffect(() => {
    if (isOpen && !dataLoaded) {
      const loadAllData = async () => {
        setLoading(true);
        try {
          const [surahsRes, recitersRes, radiosRes, tvRes] = await Promise.all([
            quranApi.getSurahs(),
            quranApi.getReciters(),
            axios.get('https://mp3quran.net/api/v3/radios'),
            axios.get('https://mp3quran.net/api/v3/live-tv'),
          ]);
          allSurahs.current = surahsRes;
          allReciters.current = recitersRes;
          if (radiosRes.data && radiosRes.data.radios) allRadios.current = radiosRes.data.radios;
          if (tvRes.data && tvRes.data['live-tv']) allTvChannels.current = tvRes.data['live-tv'];
          setDataLoaded(true);
        } catch (error) {
          console.error("Error pre-loading search data:", error);
        } finally {
          setLoading(false);
        }
      };
      loadAllData();
    }
  }, [isOpen, dataLoaded]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      if (query.trim().length >= 2) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(searchDebounce);
  }, [query, dataLoaded]);

  const handleSearch = async () => {
    if (!query.trim() || !dataLoaded) return;
    
    setLoading(true);
    let combinedResults: UnifiedSearchResultItem[] = [];

    const lowerQuery = query.toLowerCase();
    const arQuery = query;

    const surahResults: UnifiedSearchResultItem[] = allSurahs.current
      .filter(s => s.nameArabic.includes(arQuery) || s.nameEnglish.toLowerCase().includes(lowerQuery))
      .map(s => ({ type: 'surah', data: s }));

    const reciterResults: UnifiedSearchResultItem[] = allReciters.current
      .filter(r => r.nameArabic.includes(arQuery) || r.name.toLowerCase().includes(lowerQuery))
      .map(r => ({ type: 'reciter', data: r }));
      
    const featureResults: UnifiedSearchResultItem[] = featureLinks
      .filter(f => t(f.titleKey).toLowerCase().includes(lowerQuery) || t(f.subtitleKey).toLowerCase().includes(lowerQuery))
      .map(f => ({ type: 'feature', data: f }));

    const radioResults: UnifiedSearchResultItem[] = allRadios.current
      .filter(r => r.name.toLowerCase().includes(lowerQuery) || r.name.includes(arQuery))
      .map(r => ({ type: 'radio', data: r }));

    const tvResults: UnifiedSearchResultItem[] = allTvChannels.current
      .filter(tv => tv.name.toLowerCase().includes(lowerQuery) || tv.name.includes(arQuery))
      .map(tv => ({ type: 'tv', data: tv }));

    combinedResults = [...surahResults, ...reciterResults, ...featureResults, ...radioResults, ...tvResults];

    try {
      const verseSearchResults = await quranApi.searchVerses(query, { size: 5 });
      const verseResults: UnifiedSearchResultItem[] = verseSearchResults.map(v => ({ type: 'verse', data: v }));
      combinedResults.unshift(...verseResults);
    } catch (error) {
      console.error('Verse search error:', error);
    }

    setResults(combinedResults);
    setLoading(false);
  };

  const handleResultClick = async (result: UnifiedSearchResultItem) => {
    let path = '';
    switch (result.type) {
      case 'verse':
        const verseDetails = await quranApi.getVerseByKey(result.data.verse.verseKey);
        if (verseDetails) {
          path = `/quran/${verseDetails.verse.page}?highlight=${result.data.verse.verseKey}`;
        }
        break;
      case 'surah':
        path = `/quran/${result.data.pages[0]}`;
        break;
      case 'reciter':
        path = `/reciters`;
        break;
      case 'feature':
        path = result.data.to;
        break;
      case 'radio':
        path = '/media';
        break;
      case 'tv':
        path = '/media';
        break;
    }
    if (path) {
      navigate(path);
    }
    onClose();
  };
  
  const highlightText = (text: string, highlights: string[]) => {
    if (!highlights || !Array.isArray(highlights) || highlights.length === 0) {
      return text;
    }
    let highlightedText = text;
    highlights.forEach(highlight => {
      const regex = new RegExp(`(${highlight})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-primary/20 dark:bg-primary/30 text-accent-light rounded-sm px-1">$1</mark>');
    });
    return highlightedText;
  };

  const resultIcons: { [key: string]: LucideIcon } = {
    verse: BookCopy,
    surah: BookCopy,
    reciter: Mic2,
    feature: AppWindow,
    radio: Radio,
    tv: Tv,
  };

  const getResultTitle = (item: UnifiedSearchResultItem): string => {
    switch (item.type) {
      case 'verse': return `${t('surah')} ${item.data.surah.nameArabic} - ${t('verse')} ${item.data.verse.verseNumber}`;
      case 'surah': return language === 'ar' ? item.data.nameArabic : item.data.nameEnglish;
      case 'reciter': return language === 'ar' ? item.data.nameArabic : item.data.name;
      case 'feature': return t(item.data.titleKey);
      case 'radio': return item.data.name;
      case 'tv': return item.data.name;
    }
  };

  const getResultSubtitle = (item: UnifiedSearchResultItem): string | JSX.Element => {
    switch (item.type) {
      case 'verse': return <div dangerouslySetInnerHTML={{ __html: highlightText(item.data.verse.textUthmani, item.data.highlights) }} />;
      case 'surah': return `${item.data.versesCount} ${t('verse')}`;
      case 'reciter': return item.data.style || '';
      case 'feature': return t(item.data.subtitleKey);
      case 'radio': return t('search_category_radios');
      case 'tv': return t('search_category_tv');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-50/80 dark:bg-space-300/80 backdrop-blur-md z-50 flex items-start justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-white/80 dark:bg-space-200/80 backdrop-blur-lg border border-gray-200 dark:border-space-100/50 rounded-2xl shadow-lg dark:shadow-glow-lg w-full max-w-2xl mt-20"
            onClick={(e) => e.stopPropagation()}
            dir={dir}
          >
            <div className="flex items-center border-b border-gray-200 dark:border-space-100/50 p-4">
              <div className="flex-1 relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={t('search_global_placeholder')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 dark:border-space-100 bg-gray-100/50 dark:bg-space-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 dark:text-gray-200"
                />
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent-light hover:bg-gray-200 dark:hover:bg-space-100/50 rounded-full transition-colors mx-2"
              >
                <X size={24} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {loading && !results.length ? (
                <div className="p-8 text-center">
                  <Loader className="animate-spin text-accent-light mx-auto" size={32} />
                </div>
              ) : results.length > 0 ? (
                <div className="p-2">
                  {results.map((item, index) => {
                    const Icon = resultIcons[item.type];
                    return (
                      <motion.div
                        key={`${item.type}-${(item.data as any).id || index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer"
                        onClick={() => handleResultClick(item)}
                      >
                        <div className="w-9 h-9 bg-gray-200 dark:bg-space-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="text-gray-600 dark:text-gray-300" size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-md font-semibold text-gray-800 dark:text-gray-100 truncate">{getResultTitle(item)}</p>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate font-arabic">
                            {getResultSubtitle(item)}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : query.trim().length >= 2 ? (
                <div className="p-8 text-center text-gray-500">
                  {t('no_results_found')}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  {t('search_global_subtitle')}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
