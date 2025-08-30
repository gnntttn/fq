import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookHeadphones, Loader, Search } from 'lucide-react';
import axios from 'axios';
import { TafsirSeries } from '../../types/tafsir';
import { TafsirSeriesCard } from '../../components/tafsir/TafsirSeriesCard';
import { useLanguage } from '../../context/LanguageContext';
import { Skeleton } from '../../components/common/Skeleton';

const TAFSIR_API_URL = 'https://mp3quran.net/api/v3/tafasir';

export function TafsirListPage() {
  const { t, language } = useLanguage();
  const [tafsirs, setTafsirs] = useState<TafsirSeries[]>([]);
  const [filteredTafsirs, setFilteredTafsirs] = useState<TafsirSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTafsirs = async () => {
      try {
        const response = await axios.get(TAFSIR_API_URL, {
          params: { language: language === 'ar' ? 'ar' : 'eng' },
        });
        if (response.data && Array.isArray(response.data.tafasir)) {
          setTafsirs(response.data.tafasir);
          setFilteredTafsirs(response.data.tafasir);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        setError(t('error_fetching_data'));
        console.error('Error fetching tafsirs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTafsirs();
  }, [language, t]);

  useEffect(() => {
    const filtered = tafsirs.filter(tafsir =>
      tafsir.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTafsirs(filtered);
  }, [searchQuery, tafsirs]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <BookHeadphones className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('tafsir_page_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('tafsir_page_subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border border-gray-300 dark:border-space-100 bg-white dark:bg-space-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 dark:text-gray-200"
            />
          </div>
        </motion.div>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          {loading ? (
            <>
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
            </>
          ) : error ? (
             <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            filteredTafsirs.map((tafsir, index) => (
              <TafsirSeriesCard 
                key={tafsir.id}
                tafsir={tafsir} 
                index={index} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
