import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { hisnulMuslimCategories, hisnulMuslimDhikr } from '../data/hisnulMuslim';
import { HisnulMuslimDhikrCard } from '../components/hisnulmuslim/HisnulMuslimDhikrCard';

export function HisnulMuslimCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { language } = useLanguage();

  const category = hisnulMuslimCategories.find(c => c.id.toString() === categoryId);
  const dhikrList = hisnulMuslimDhikr.filter(d => d.category_id.toString() === categoryId);

  const getTitle = () => {
    if (!category) return '';
    switch (language) {
      case 'en': return category.title_en;
      case 'fr': return category.title_fr;
      case 'ar': return category.title_ar;
      default: return category.title_en;
    }
  };

  if (!category) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {getTitle()}
          </h1>
          <Link to="/hisnul-muslim" className="inline-flex items-center gap-2 text-primary dark:text-primary-light hover:text-accent-light transition-colors">
            <ArrowLeft size={16} />
            Back to Categories
          </Link>
        </motion.div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {dhikrList.map((dhikr, index) => (
            <HisnulMuslimDhikrCard key={dhikr.id} dhikr={dhikr} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
