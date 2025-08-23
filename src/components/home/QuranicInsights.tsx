import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, BarChart, Info, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { insights, Insight } from '../../data/quranicInsightsData';
import { TranslationKey } from '../../lib/i18n';

const PieChartViz = ({ data }: { data: { [key: string]: { labelKey: TranslationKey; value: number; color: string } } }) => {
  const { t } = useLanguage();
  const dataEntries = Object.values(data);
  const total = dataEntries.reduce((sum, entry) => sum + entry.value, 0);

  if (total === 0) return null;

  let accumulatedAngle = 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          {dataEntries.map((entry, index) => {
            const angle = (entry.value / total) * 360;
            const slice = (
              <circle
                key={index}
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke={entry.color}
                strokeWidth="3.8"
                strokeDasharray={`${angle} ${360 - angle}`}
                strokeDashoffset={-accumulatedAngle}
              />
            );
            accumulatedAngle += angle;
            return slice;
          })}
        </svg>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        {dataEntries.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span>{t(entry.labelKey)}: {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BarChartViz = ({ data }: { data: any[] }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <div className="p-4 space-y-2 h-48 flex flex-col justify-end">
      <div className="flex items-end justify-around h-full gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / maxValue) * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full bg-gradient-to-t from-primary to-accent-light rounded-t-md"
              style={{ minWidth: '2rem' }}
            />
            <span className="text-xs mt-1 font-arabic font-bold">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FactViz = ({ data }: { data: any }) => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-center p-4 h-48">
      <p className="text-center text-lg font-semibold text-gray-800 dark:text-gray-200">
        {t(data.factKey)}
      </p>
    </div>
  );
};

const insightComponents = {
  pie: PieChartViz,
  bar: BarChartViz,
  fact: FactViz,
};

const insightIcons = {
  pie: PieChart,
  bar: BarChart,
  fact: Info,
};

export function QuranicInsights() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % insights.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentInsight = insights[currentIndex];
  const VizComponent = insightComponents[currentInsight.type];
  const Icon = insightIcons[currentInsight.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-2xl p-6 transition-all duration-300 hover:border-primary-light dark:hover:border-accent-dark hover:shadow-lg dark:hover:shadow-glow-sm"
    >
      <div className="flex items-center gap-3 mb-2">
        <Zap className="text-primary-dark dark:text-primary-light" size={24} />
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t('quranic_insights_title')}</h2>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
             <Icon size={16} className="mr-2" /> {t(currentInsight.titleKey)}
          </div>
          <VizComponent data={currentInsight.data} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
