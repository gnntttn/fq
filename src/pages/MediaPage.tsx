import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Radio, Tv, Loader } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const RadiosTab = lazy(() => import('../components/media/RadiosTab').then(module => ({ default: module.RadiosTab })));
const TvTab = lazy(() => import('../components/media/TvTab').then(module => ({ default: module.TvTab })));

type MediaTab = 'radio' | 'tv';

export function MediaPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<MediaTab>('radio');

  const tabButtonClass = (tabName: MediaTab) => 
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('media_page_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('media_page_subtitle')}
          </p>
        </motion.div>

        <div className="sticky top-4 z-30 bg-gray-50/80 dark:bg-space-300/80 backdrop-blur-lg p-2 rounded-xl mb-8 max-w-md mx-auto">
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('radio')} className={tabButtonClass('radio')}>
              <Radio size={20} /> {t('radio_tab')}
            </button>
            <button onClick={() => setActiveTab('tv')} className={tabButtonClass('tv')}>
              <Tv size={20} /> {t('tv_tab')}
            </button>
          </div>
        </div>

        <Suspense fallback={<div className="flex justify-center items-center py-16"><Loader className="animate-spin text-accent-light" size={48} /></div>}>
          {activeTab === 'radio' && <RadiosTab />}
          {activeTab === 'tv' && <TvTab />}
        </Suspense>
      </div>
    </div>
  );
}
