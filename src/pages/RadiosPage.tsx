import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Radio as RadioIcon } from 'lucide-react';
import { Radio } from '../types/radio';
import { RadioCard } from '../components/radios/RadioCard';
import { useLanguage } from '../context/LanguageContext';
import { Skeleton } from '../components/common/Skeleton';

const AudioPlayer = lazy(() => import('../components/audio/AudioPlayer').then(module => ({ default: module.AudioPlayer })));

const RadioCardSkeleton = () => (
    <div className="bg-white/30 dark:bg-space-200/20 border border-gray-200 dark:border-space-100/50 rounded-xl p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <Skeleton className="h-5 w-48 rounded" />
      </div>
    </div>
  );

export function RadiosPage() {
  const { t } = useLanguage();
  const [radios, setRadios] = useState<Radio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentRadio, setCurrentRadio] = useState<Radio | null>(null);

  useEffect(() => {
    const fetchRadios = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://mp3quran.net/api/v3/radios');
        setRadios(response.data.radios);
      } catch (err) {
        setError('Failed to load radio stations.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRadios();
  }, []);

  const handleRadioSelect = (radio: Radio) => {
    if (currentRadio?.id === radio.id) {
      setCurrentRadio(null);
    } else {
      setCurrentRadio(radio);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <RadioIcon className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('radios_page_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('radios_page_subtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-4 max-w-3xl mx-auto">
            {Array.from({ length: 8 }).map((_, i) => <RadioCardSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {radios.map((radio, index) => (
              <RadioCard
                key={radio.id}
                radio={radio}
                isPlaying={currentRadio?.id === radio.id}
                onClick={() => handleRadioSelect(radio)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
      
      <Suspense>
        {currentRadio && (
          <AudioPlayer
            src={currentRadio.url}
            title={`${t('playing_now')}: ${currentRadio.name}`}
            autoPlay
          />
        )}
      </Suspense>
    </div>
  );
}
