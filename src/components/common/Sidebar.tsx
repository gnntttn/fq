import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, BookCopy, Radio, Tv, AppWindow, Bookmark, Search, LucideIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { featureLinks } from '../../data/features';

export function Sidebar() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const mainNavLinks = [
    { to: '/', text: t('home'), icon: Home },
    { to: '/surahs', text: t('surahs'), icon: BookCopy },
    { to: '/radios', text: t('radios_page_title'), icon: Radio },
    { to: '/tv', text: t('tv_page_title'), icon: Tv },
    { to: '/bookmarks', text: t('bookmarks'), icon: Bookmark },
    { to: '/more', text: t('more'), icon: AppWindow },
  ];

  const mainNavPaths = new Set(mainNavLinks.map(l => l.to));
  const uniqueFeatureLinks = featureLinks.filter(l => !mainNavPaths.has(l.to));

  const allLinks: { to: string, title: string, icon: LucideIcon }[] = [
    ...mainNavLinks.map(l => ({...l, title: l.text})),
    ...uniqueFeatureLinks.map(l => ({ to: l.to, title: t(l.titleKey), icon: l.icon }))
  ];
  
  const filteredLinks = allLinks.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-primary/20 dark:bg-primary/30 text-accent-light font-bold'
        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-space-200/50 hover:text-gray-900 dark:hover:text-gray-200'
    }`;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-100 dark:bg-space-200 border-l border-gray-200 dark:border-space-100/50">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-space-100/50 flex-shrink-0">
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

      <div className="px-4 py-2 border-b border-gray-200 dark:border-space-100/50">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={t('search_feature_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-3 py-2 border border-gray-300/50 dark:border-space-100 bg-white/50 dark:bg-space-300/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm text-gray-800 dark:text-gray-200"
          />
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="space-y-2">
          {filteredLinks.map(link => {
            const Icon = link.icon;
            return (
              <NavLink key={link.to} to={link.to} className={navLinkClass} end={link.to === '/'}>
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
