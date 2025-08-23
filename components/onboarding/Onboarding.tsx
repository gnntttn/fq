import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookHeart, MicVocal, UserCheck, Languages } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../lib/i18n';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: BookHeart,
    titleKey: 'onboarding_welcome_title',
    descriptionKey: 'onboarding_welcome_desc',
  },
  {
    icon: MicVocal,
    titleKey: 'onboarding_read_title',
    descriptionKey: 'onboarding_read_desc',
  },
  {
    icon: UserCheck,
    titleKey: 'onboarding_personalize_title',
    descriptionKey: 'onboarding_personalize_desc',
  },
] as const;


export function Onboarding({ onComplete }: OnboardingProps) {
  const { t, setLanguage } = useLanguage();
  const [step, setStep] = useState(0);
  const [languageSelected, setLanguageSelected] = useState(false);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setLanguageSelected(true);
  };

  const nextStep = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  if (!languageSelected) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-50 dark:bg-space-300 z-[100] flex flex-col items-center justify-center p-8 text-center"
      >
        <div className="max-w-xs w-full">
          <div className="mb-10 flex justify-center">
            <div className="w-28 h-28 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center shadow-inner dark:shadow-glow-sm">
              <Languages className="text-primary dark:text-primary-light" size={56} />
            </div>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Choose Language</h2>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-300 font-arabic mb-6">اختر لغتك</p>
          
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLanguageSelect('ar')}
              className="w-full py-3.5 px-6 bg-white dark:bg-space-200 text-gray-800 dark:text-gray-200 font-bold rounded-xl border border-gray-200 dark:border-space-100 hover:border-primary dark:hover:border-accent-light transition-all duration-300 shadow-md"
            >
              العربية
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLanguageSelect('en')}
              className="w-full py-3.5 px-6 bg-white dark:bg-space-200 text-gray-800 dark:text-gray-200 font-bold rounded-xl border border-gray-200 dark:border-space-100 hover:border-primary dark:hover:border-accent-light transition-all duration-300 shadow-md"
            >
              English
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLanguageSelect('fr')}
              className="w-full py-3.5 px-6 bg-white dark:bg-space-200 text-gray-800 dark:text-gray-200 font-bold rounded-xl border border-gray-200 dark:border-space-100 hover:border-primary dark:hover:border-accent-light transition-all duration-300 shadow-md"
            >
              Français
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  const currentSlide = slides[step];
  const Icon = currentSlide.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-50 dark:bg-space-300 z-[100] flex flex-col items-center justify-between p-8 text-center"
    >
      <div className="w-full flex justify-end">
        <button onClick={onComplete} className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent-light transition-colors">
          {t('skip')}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-xs"
          >
            <div className="mb-10 flex justify-center">
              <div className="w-28 h-28 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center shadow-inner dark:shadow-glow-sm">
                <Icon className="text-primary dark:text-primary-light" size={56} />
              </div>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t(currentSlide.titleKey)}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t(currentSlide.descriptionKey)}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${step === i ? 'bg-primary w-6' : 'bg-gray-300 dark:bg-space-100'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={nextStep}
          className="w-full max-w-sm py-3.5 px-6 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-space-300 transition-all duration-300 shadow-lg dark:shadow-glow-md"
        >
          {step === slides.length - 1 ? t('onboarding_start') : t('onboarding_next')}
        </button>
      </div>
    </motion.div>
  );
}
