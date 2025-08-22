import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { duaCategories, allDuas } from '../data/duaLibrary';
import { DuaCard } from '../components/dua/DuaCard';

export function DuaCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t } = useLanguage();

  const category = duaCategories.find(c => c.id.toString() === categoryId);
  const duaList = allDuas.filter(d => d.category_id.toString() === categoryId);

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
            {t(category.title_key)}
          </h1>
          <Link to="/dua-library" className="inline-flex items-center gap-2 text-primary dark:text-primary-light hover:text-accent-light transition-colors">
            <ArrowLeft size={16} />
            {t('back_to_dua_library')}
          </Link>
        </motion.div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {duaList.map((dua, index) => (
            <DuaCard key={dua.id} dua={dua} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
