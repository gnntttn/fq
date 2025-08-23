import React from 'react';
import { motion } from 'framer-motion';
import { AppWindow, Bookmark, BookCheck, BrainCircuit, BookMarked, Users, Sparkles, Target, BookUser, ScrollText, Shield, SunMoon, BookLock, AudioLines, Telescope, Library, BookOpen as SeerahIcon, PersonStanding, BookText as GlossaryIcon, Users2, LayoutGrid, BookOpenText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MoreLinkCard } from '../components/more/MoreLinkCard';

export function MorePage() {
  const { t } = useLanguage();

  const moreLinks = [
    { to: '/tafsir', title: t('tafsir_nav_title'), subtitle: t('tafsir_page_subtitle'), icon: BookOpenText, color: 'bg-teal-500' },
    { to: '/seerah', title: t('seerah_title'), subtitle: t('seerah_subtitle'), icon: SeerahIcon, color: 'bg-stone-500' },
    { to: '/companion-stories', title: t('companion_stories_title'), subtitle: t('companion_stories_subtitle'), icon: Users2, color: 'bg-orange-500' },
    { to: '/prophet-stories', title: t('prophet_stories_title'), subtitle: t('prophet_stories_subtitle'), icon: BookUser, color: 'bg-cyan-500' },
    { to: '/topics', title: t('topics_page_title'), subtitle: t('topics_page_subtitle'), icon: LayoutGrid, color: 'bg-orange-400' },
    { to: '/dua-library', title: t('dua_library_title'), subtitle: t('dua_library_subtitle'), icon: Library, color: 'bg-pink-500' },
    { to: '/adhkar', title: t('adhkar_title'), subtitle: t('adhkar_subtitle'), icon: SunMoon, color: 'bg-amber-500' },
    { to: '/hisnul-muslim', title: t('hisnul_muslim_title'), subtitle: t('hisnul_muslim_subtitle'), icon: BookLock, color: 'bg-lime-500' },
    { to: '/worship-guide', title: t('worship_guide_title'), subtitle: t('worship_guide_subtitle'), icon: PersonStanding, color: 'bg-blue-500' },
    { to: '/reading-plans', title: t('reading_plans_title'), subtitle: t('reading_plans_subtitle'), icon: Target, color: 'bg-teal-500' },
    { to: '/khatmah-tracker', title: t('khatmah_tracker_title'), subtitle: t('khatmah_tracker_subtitle'), icon: BookCheck, color: 'bg-green-500' },
    { to: '/nawawi-hadith', title: t('nawawi_hadith_title'), subtitle: t('nawawi_hadith_subtitle'), icon: ScrollText, color: 'bg-yellow-500' },
    { to: '/ruqyah', title: t('ruqyah_title'), subtitle: t('ruqyah_subtitle'), icon: Shield, color: 'bg-sky-500' },
    { to: '/tajweed-guide', title: t('tajweed_guide_title'), subtitle: t('tajweed_guide_subtitle'), icon: AudioLines, color: 'bg-rose-500' },
    { to: '/glossary', title: t('glossary_title'), subtitle: t('glossary_subtitle'), icon: GlossaryIcon, color: 'bg-gray-500' },
    { to: '/miracles', title: t('miracles_title'), subtitle: t('miracles_subtitle'), icon: Telescope, color: 'bg-violet-500' },
    { to: '/quiz', title: t('quiz_title'), subtitle: t('quiz_subtitle'), icon: BrainCircuit, color: 'bg-purple-500' },
    { to: '/sajda-verses', title: t('sajda_verses_title'), subtitle: t('sajda_verses_subtitle'), icon: BookMarked, color: 'bg-indigo-500' },
    { to: '/asma-ul-husna', title: t('asma_ul_husna'), subtitle: t('asma_ul_husna_page_subtitle'), icon: Sparkles, color: 'bg-yellow-400' },
    { to: '/bookmarks', title: t('bookmarks'), subtitle: t('bookmarks_page_subtitle'), icon: Bookmark, color: 'bg-red-500' },
    { to: '/reciters', title: t('reciters'), subtitle: t('reciters_page_subtitle'), icon: Users, color: 'bg-fuchsia-500' },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <AppWindow className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('more_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('more_subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {moreLinks.map((link, index) => (
            <MoreLinkCard
              key={link.to}
              to={link.to}
              title={link.title}
              subtitle={link.subtitle}
              icon={link.icon}
              colorClass={link.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
