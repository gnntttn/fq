import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookCopy, Tv, Bot, BrainCircuit, MoreHorizontal } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function BottomNav() {
  const { t } = useLanguage();

  const navLinks = [
    { to: '/', text: t('home'), icon: Home },
    { to: '/surahs', text: t('surahs'), icon: BookCopy },
    { to: '/media', text: t('media'), icon: Tv },
    { to: '/assistant', text: t('assistant'), icon: Bot },
    { to: '/quiz', text: t('quiz'), icon: BrainCircuit },
    { to: '/more', text: t('more'), icon: MoreHorizontal },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-1 p-1 rounded-lg transition-all duration-300 min-w-0 flex-1 text-center ${
      isActive ? 'text-accent-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-100/80 dark:bg-space-300/80 backdrop-blur-lg border-t border-gray-200 dark:border-space-100/50 z-40 md:hidden">
      <div className="container mx-auto px-1 h-16 flex items-stretch justify-around">
        {navLinks.map(link => {
          const Icon = link.icon;
          return (
            <NavLink key={link.to} to={link.to} className={navLinkClass} end={link.to === '/'}>
              <Icon size={22} />
              <span className="text-[10px] font-medium leading-tight whitespace-nowrap">{link.text}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
