import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { quranApi } from '../services/quranApi';
import { Reciter } from '../types/quran';
import { ReciterCard } from '../components/quran/ReciterCard';
import { useLanguage } from '../context/LanguageContext';
import { Skeleton } from '../components/common/Skeleton';

const ReciterCardSkeleton = () => (
  <div className="bg-white dark:bg-space-200/30 border border-gray-200 dark:border-space-100/50 rounded-xl p-6">
    <div className="flex items-start justify-between">
      <div>
        <Skeleton className="h-5 w-32 mb-2 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>
      <Skeleton className="w-6 h-6 rounded-full" />
    </div>
  </div>
);

export function RecitersPage() {
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [filteredReciters, setFilteredReciters] = useState<Reciter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    loadReciters();
  }, []);

  useEffect(() => {
    filterReciters();
  }, [searchQuery, reciters]);

  const loadReciters = async () => {
    try {
      const data = await quranApi.getReciters();
      setReciters(data);
      setFilteredReciters(data);
    } catch (error) {
      console.error('Error loading reciters:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterReciters = () => {
    let filtered = reciters;
    if (searchQuery.trim()) {
      filtered = filtered.filter(reciter =>
        reciter.nameArabic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reciter.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredReciters(filtered);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('reciters_page_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('reciters_page_subtitle')}
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
              placeholder={t('search_reciter_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border border-gray-300 dark:border-space-100 bg-white dark:bg-space-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 dark:text-gray-200"
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <ReciterCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReciters.map((reciter, index) => (
              <ReciterCard key={reciter.id} reciter={reciter} index={index} />
            ))}
          </div>
        )}

        {!loading && filteredReciters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              {t('no_results_found')}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
