import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BookOpenText } from 'lucide-react';
import { TafsirAudio, TafsirSeries } from '../types/tafsir';
import { TafsirSeriesCard } from '../components/tafsir/TafsirSeriesCard';
import { useLanguage } from '../context/LanguageContext';
import { Skeleton } from '../components/common/Skeleton';

const TafsirCardSkeleton = () => (
    <div className="bg-white/30 dark:bg-space-200/20 border border-gray-200 dark:border-space-100/50 rounded-xl p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div>
          <Skeleton className="h-5 w-48 mb-2 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </div>
    </div>
  );

export function TafsirListPage() {
  const { t } = useLanguage();
  const [series, setSeries] = useState<TafsirSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTafasir = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://mp3quran.net/api/v3/tafasir');
        const audios: TafsirAudio[] = response.data.tafasir;

        const groupedByName = audios.reduce((acc, audio) => {
          const key = `${audio.tafsir_name}_${audio.language}`;
          if (!acc[key]) {
            acc[key] = {
              name: audio.tafsir_name,
              language: audio.language,
              audios: [],
            };
          }
          acc[key].audios.push(audio);
          return acc;
        }, {} as { [key: string]: TafsirSeries });

        setSeries(Object.values(groupedByName));

      } catch (err) {
        setError('Failed to load Tafsir series.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTafasir();
  }, []);

  return (
    <div className="min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <BookOpenText className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('tafsir_page_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('tafsir_page_subtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-4 max-w-3xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => <TafsirCardSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {series.map((item, index) => (
              <TafsirSeriesCard
                key={`${item.name}-${item.language}`}
                series={item}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
