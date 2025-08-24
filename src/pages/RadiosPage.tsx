import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio as RadioIcon, Loader } from 'lucide-react';
import axios from 'axios';
import { Radio } from '../types/radio';
import { RadioCard } from '../components/radios/RadioCard';
import { AudioPlayer } from '../components/audio/AudioPlayer';
import { useLanguage } from '../context/LanguageContext';

const RADIOS_API_URL = 'https://mp3quran.net/api/v3/radios';

export function RadiosPage() {
  const { t } = useLanguage();
  const [radios, setRadios] = useState<Radio[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentRadio, setCurrentRadio] = useState<Radio | null>(null);

  useEffect(() => {
    const fetchRadios = async () => {
      try {
        const response = await axios.get(RADIOS_API_URL);
        setRadios(response.data.radios);
      } catch (error) {
        console.error('Error fetching radios:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRadios();
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin text-accent-light" size={48} />
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {radios.map((radio, index) => (
              <RadioCard
                key={radio.id}
                radio={radio}
                isPlaying={currentRadio?.id === radio.id}
                onPlay={() => handlePlay(radio)}
                index={index}
              />
            ))}
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
