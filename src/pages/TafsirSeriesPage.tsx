import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpenText } from 'lucide-react';
import { TafsirAudio } from '../types/tafsir';
import { TafsirAudioCard } from '../components/tafsir/TafsirAudioCard';
import { useLanguage } from '../context/LanguageContext';
import { Skeleton } from '../components/common/Skeleton';

const AudioPlayer = lazy(() => import('../components/audio/AudioPlayer').then(module => ({ default: module.AudioPlayer })));

const TafsirAudioCardSkeleton = () => (
    <div className="bg-white/30 dark:bg-space-200/20 border border-gray-200 dark:border-space-100/50 rounded-xl p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <Skeleton className="h-5 w-48 rounded" />
      </div>
    </div>
  );

export function TafsirSeriesPage() {
  const { seriesName } = useParams<{ seriesName: string }>();
  const decodedSeriesName = seriesName ? decodeURIComponent(seriesName) : '';
  const { t } = useLanguage();
  
  const [audios, setAudios] = useState<TafsirAudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<TafsirAudio | null>(null);

  useEffect(() => {
    if (!decodedSeriesName) return;

    const fetchAudios = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://mp3quran.net/api/v3/tafasir');
        const allAudios: TafsirAudio[] = response.data.tafasir;
        const seriesAudios = allAudios.filter(audio => audio.tafsir_name === decodedSeriesName);
        setAudios(seriesAudios);
      } catch (err) {
        setError('Failed to load Tafsir audios.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAudios();
  }, [decodedSeriesName]);

  const handleAudioSelect = (audio: TafsirAudio) => {
    if (currentAudio?.id === audio.id) {
      setCurrentAudio(null);
    } else {
      setCurrentAudio(audio);
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
          <BookOpenText className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('tafsir_series_page_title', { seriesName: decodedSeriesName })}
          </h1>
          <Link to="/tafsir" className="inline-flex items-center gap-2 text-primary dark:text-primary-light hover:text-accent-light transition-colors">
            <ArrowLeft size={16} />
            {t('back_to_tafsir_series')}
          </Link>
        </motion.div>

        {loading ? (
          <div className="space-y-4 max-w-3xl mx-auto">
            {Array.from({ length: 10 }).map((_, i) => <TafsirAudioCardSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {audios.map((audio, index) => (
              <TafsirAudioCard
                key={audio.id}
                audio={audio}
                isPlaying={currentAudio?.id === audio.id}
                onClick={() => handleAudioSelect(audio)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
      
      <Suspense>
        {currentAudio && (
          <AudioPlayer
            src={currentAudio.url}
            title={currentAudio.name}
            autoPlay
          />
        )}
      </Suspense>
    </div>
  );
}
