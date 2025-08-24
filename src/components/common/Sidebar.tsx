import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, BookCopy, Radio, Tv, AppWindow, Bookmark, Users, LayoutGrid, Heart, Sparkles, BookCheck, BrainCircuit, BookMarked, Target, BookUser, ScrollText, Shield, SunMoon, BookLock, Telescope, Library, BookOpen, PersonStanding, BookText as GlossaryIcon, Users2, AudioLines } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function Sidebar() {
  const { t, language } = useLanguage();

  const mainNavLinks = [
    { to: '/', text: t('home'), icon: Home },
    { to: '/surahs', text: t('surahs'), icon: BookCopy },
    { to: '/radios', text: t('radios_page_title'), icon: Radio },
    { to: '/tv', text: t('tv_page_title'), icon: Tv },
    { to: '/bookmarks', text: t('bookmarks'), icon: Bookmark },
    { to: '/more', text: t('more'), icon: AppWindow },
  ];

  const moreLinks = [
    { to: '/seerah', title: t('seerah_title'), icon: BookOpen },
    { to: '/companion-stories', title: t('companion_stories_title'), icon: Users2 },
    { to: '/prophet-stories', title: t('prophet_stories_title'), icon: BookUser },
    { to: '/topics', title: t('topics_page_title'), icon: LayoutGrid },
    { to: '/dua-library', title: t('dua_library_title'), icon: Library },
    { to: '/adhkar', title: t('adhkar_title'), icon: SunMoon },
    { to: '/hisnul-muslim', title: t('hisnul_muslim_title'), icon: BookLock },
    { to: '/worship-guide', title: t('worship_guide_title'), icon: PersonStanding },
    { to: '/reading-plans', title: t('reading_plans_title'), icon: Target },
    { to: '/khatmah-tracker', title: t('khatmah_tracker_title'), icon: BookCheck },
    { to: '/nawawi-hadith', title: t('nawawi_hadith_title'), icon: ScrollText },
    { to: '/ruqyah', title: t('ruqyah_title'), icon: Shield },
    { to: '/tajweed-guide', title: t('tajweed_guide_title'), icon: AudioLines },
    { to: '/glossary', title: t('glossary_title'), icon: GlossaryIcon },
    { to: '/miracles', title: t('miracles_title'), icon: Telescope },
    { to: '/quiz', title: t('quiz_title'), icon: BrainCircuit },
    { to: '/sajda-verses', title: t('sajda_verses_title'), icon: BookMarked },
    { to: '/asma-ul-husna', title: t('asma_ul_husna'), subtitle: t('asma_ul_husna_page_subtitle'), icon: Sparkles },
    { to: '/reciters', title: t('reciters'), icon: Users },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-primary/20 dark:bg-primary/30 text-accent-light font-bold'
        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-space-200/50 hover:text-gray-900 dark:hover:text-gray-200'
    }`;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-100 dark:bg-space-200 border-l border-gray-200 dark:border-space-100/50">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-space-100/50">
        <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md dark:shadow-glow-sm">
              <span className="text-white font-bold text-lg font-arabic">
                {language === 'ar' ? 'آ' : 'A'}
              </span>
            </div>
            <h1 className={`text-xl font-bold text-gray-900 dark:text-gray-100 ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
              {t('main_title')}
            </h1>
          </Link>
      </div>
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="space-y-2">
          {mainNavLinks.map(link => {
            const Icon = link.icon;
            return (
              <NavLink key={link.to} to={link.to} className={navLinkClass} end={link.to === '/'}>
                <Icon size={20} />
                <span className="text-sm font-medium">{link.text}</span>
              </NavLink>
            );
          })}
        </div>
        <hr className="my-4 border-gray-200 dark:border-space-100/50" />
        <div className="space-y-2">
          {moreLinks.map(link => {
            const Icon = link.icon;
            return (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                <Icon size={20} />
                <span className="text-sm font-medium">{link.title}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
