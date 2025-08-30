import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader, Search } from 'lucide-react';
import axios from 'axios';
import { Radio } from '../../types/radio';
import { RadioCard } from './RadioCard';
import { AudioPlayer } from '../audio/AudioPlayer';
import { useLanguage } from '../../context/LanguageContext';
import { Skeleton } from '../common/Skeleton';

const RADIOS_API_URL = 'https://mp3quran.net/api/v3/radios';

const RadioCardSkeleton = () => (
    <div className="block p-4 rounded-xl bg-white dark:bg-space-200/30 border border-gray-200 dark:border-space-100/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <Skeleton className="w-40 h-5 rounded-md" />
        </div>
        <Skeleton className="w-7 h-7 rounded-full" />
      </div>
    </div>
  );

export function RadiosTab() {
  const { t } = useLanguage();
  const [radios, setRadios] = useState<Radio[]>([]);
  const [filteredRadios, setFilteredRadios] = useState<Radio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentRadio, setCurrentRadio] = useState<Radio | null>(null);

  useEffect(() => {
    const fetchRadios = async () => {
      try {
        const response = await axios.get(RADIOS_API_URL);
        if (response.data && Array.isArray(response.data.radios)) {
          setRadios(response.data.radios);
          setFilteredRadios(response.data.radios);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        setError(t('error_fetching_data'));
        console.error('Error fetching radios:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRadios();
  }, [t]);

  useEffect(() => {
    const filtered = radios.filter(radio =>
      radio.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRadios(filtered);
  }, [searchQuery, radios]);
  
  const handlePlay = useCallback((radio: Radio) => {
    if (currentRadio?.id === radio.id) {
      setCurrentRadio(null);
    } else {
      setCurrentRadio(radio);
    }
  }, [currentRadio]);

  return (
    <div>
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
            placeholder={t('search_radio_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3 border border-gray-300 dark:border-space-100 bg-white dark:bg-space-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 dark:text-gray-200"
          />
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <RadioCardSkeleton key={i} />)}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRadios.map((radio, index) => (
            <RadioCard 
              key={radio.id} 
              radio={radio} 
              onPlay={() => handlePlay(radio)}
              isPlaying={currentRadio?.id === radio.id}
              index={index}
            />
          ))}
        </div>
      )}
      
      {currentRadio && (
        <AudioPlayer
          src={currentRadio.url}
          title={currentRadio.name}
          isLiveStream={true}
        />
      )}
    </div>
  );
}
