import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { adhkarData } from '../data/adhkar';
import { DhikrCard } from '../components/adhkar/DhikrCard';

type AdhkarCategory = 'morning' | 'evening';

export function AdhkarPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<AdhkarCategory>('morning');

  const filteredAdhkar = adhkarData.filter(d => d.category === activeTab);

  const tabButtonClass = (tabName: AdhkarCategory) => 
    `flex-1 py-3 px-4 rounded-lg text-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
      activeTab === tabName 
        ? 'bg-primary text-white shadow-lg dark:shadow-glow-md' 
        : 'bg-gray-200/50 dark:bg-space-200/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-space-100/50'
    }`;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Shield className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('adhkar_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('adhkar_subtitle')}
          </p>
        </motion.div>

        <div className="sticky top-20 z-30 bg-gray-50/80 dark:bg-space-300/80 backdrop-blur-lg p-2 rounded-xl mb-8 max-w-md mx-auto">
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('morning')} className={tabButtonClass('morning')}>
              <Sun size={20} /> {t('morning_adhkar')}
            </button>
            <button onClick={() => setActiveTab('evening')} className={tabButtonClass('evening')}>
              <Moon size={20} /> {t('evening_adhkar')}
            </button>
          </div>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          {filteredAdhkar.map((dhikr, index) => (
            <DhikrCard key={dhikr.id} dhikr={dhikr} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
