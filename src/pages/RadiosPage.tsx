import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio as RadioIcon, Loader, Search } from 'lucide-react';
import axios from 'axios';
import { Radio } from '../types/radio';
import { RadioCard } from '../components/radios/RadioCard';
import { AudioPlayer } from '../components/audio/AudioPlayer';
import { useLanguage } from '../context/LanguageContext';

const RADIOS_API_URL = 'https://mp3quran.net/api/v3/radios';

export function RadiosPage() {
  const { t } = useLanguage();
  const [radios, setRadios] = useState<Radio[]>([]);
  const [filteredRadios, setFilteredRadios] = useState<Radio[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentRadio, setCurrentRadio] = useState<Radio | null>(null);

  useEffect(() => {
    const fetchRadios = async () => {
      try {
        const response = await axios.get(RADIOS_API_URL);
        if (response.data && Array.isArray(response.data.radios)) {
            setRadios(response.data.radios);
            setFilteredRadios(response.data.radios);
        }
      } catch (error) {
        console.error('Error fetching radios:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRadios();
  }, []);

  useEffect(() => {
    const filtered = radios.filter(radio =>
      radio.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRadios(filtered);
  }, [searchQuery, radios]);

  const handlePlay = (radio: Radio) => {
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
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin text-accent-light" size={48} />
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {filteredRadios.map((radio, index) => (
              <RadioCard
                key={radio.id}
                radio={radio}
                isPlaying={currentRadio?.id === radio.id}
                onPlay={() => handlePlay(radio)}
                index={index}
              />
            ))}
             {filteredRadios.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-10">{t('no_results_found')}</p>
            )}
          </div>
        )}
      </div>
      {currentRadio && (
        <AudioPlayer
          src={currentRadio.url}
          title={currentRadio.name}
          autoPlay
        />
      )}
    </div>
  );
}
