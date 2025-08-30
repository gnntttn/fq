import { TranslationKey } from '../lib/i18n';
import { 
  BookCopy, BookMarked, Users, Bookmark, BrainCircuit, Bot, BookOpen, Users2, BookUser, 
  LayoutGrid, Library, SunMoon, BookLock, Target, BookCheck, ScrollText, Shield, 
  AudioLines, BookText, Telescope, LucideIcon, Sparkles
} from 'lucide-react';

export interface FeatureLink {
  to: string;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  icon: LucideIcon;
  color: string;
}

export const featureLinks: FeatureLink[] = [
  { to: '/surahs', titleKey: 'surahs', subtitleKey: 'surahs_page_subtitle', icon: BookCopy, color: 'bg-emerald-500' },
  { to: '/juzs', titleKey: 'juzs', subtitleKey: 'juzs_page_subtitle', icon: BookMarked, color: 'bg-sky-500' },
  { to: '/reciters', titleKey: 'reciters', subtitleKey: 'reciters_page_subtitle', icon: Users, color: 'bg-fuchsia-500' },
  { to: '/bookmarks', titleKey: 'bookmarks', subtitleKey: 'bookmarks_page_subtitle', icon: Bookmark, color: 'bg-amber-600' },
  { to: '/quiz', titleKey: 'quiz_title', subtitleKey: 'quiz_subtitle', icon: BrainCircuit, color: 'bg-purple-500' },
  { to: '/assistant', titleKey: 'assistant_page_title', subtitleKey: 'assistant_page_subtitle', icon: Bot, color: 'bg-blue-500' },
  { to: '/seerah', titleKey: 'seerah_title', subtitleKey: 'seerah_subtitle', icon: BookOpen, color: 'bg-stone-500' },
  { to: '/companion-stories', titleKey: 'companion_stories_title', subtitleKey: 'companion_stories_subtitle', icon: Users2, color: 'bg-orange-500' },
  { to: '/prophet-stories', titleKey: 'prophet_stories_title', subtitleKey: 'prophet_stories_subtitle', icon: BookUser, color: 'bg-cyan-500' },
  { to: '/topics', titleKey: 'topics_page_title', subtitleKey: 'topics_page_subtitle', icon: LayoutGrid, color: 'bg-orange-400' },
  { to: '/dua-library', titleKey: 'dua_library_title', subtitleKey: 'dua_library_subtitle', icon: Library, color: 'bg-pink-500' },
  { to: '/adhkar', titleKey: 'adhkar_title', subtitleKey: 'adhkar_subtitle', icon: SunMoon, color: 'bg-amber-500' },
  { to: '/hisnul-muslim', titleKey: 'hisnul_muslim_title', subtitleKey: 'hisnul_muslim_subtitle', icon: BookLock, color: 'bg-lime-500' },
  { to: '/reading-plans', titleKey: 'reading_plans_title', subtitleKey: 'reading_plans_subtitle', icon: Target, color: 'bg-teal-500' },
  { to: '/khatmah-tracker', titleKey: 'khatmah_tracker_title', subtitleKey: 'khatmah_tracker_subtitle', icon: BookCheck, color: 'bg-green-500' },
  { to: '/nawawi-hadith', titleKey: 'nawawi_hadith_title', subtitleKey: 'nawawi_hadith_subtitle', icon: ScrollText, color: 'bg-yellow-500' },
  { to: '/ruqyah', titleKey: 'ruqyah_title', subtitleKey: 'ruqyah_subtitle', icon: Shield, color: 'bg-sky-500' },
  { to: '/tajweed-guide', titleKey: 'tajweed_guide_title', subtitleKey: 'tajweed_guide_subtitle', icon: AudioLines, color: 'bg-rose-500' },
  { to: '/glossary', titleKey: 'glossary_title', subtitleKey: 'glossary_subtitle', icon: BookText, color: 'bg-gray-500' },
  { to: '/miracles', titleKey: 'miracles_title', subtitleKey: 'miracles_subtitle', icon: Telescope, color: 'bg-violet-500' },
  { to: '/sajda-verses', titleKey: 'sajda_verses_title', subtitleKey: 'sajda_verses_subtitle', icon: BookMarked, color: 'bg-indigo-500' },
  { to: '/asma-ul-husna', titleKey: 'asma_ul_husna', subtitleKey: 'asma_ul_husna_page_subtitle', icon: Sparkles, color: 'bg-yellow-400' },
];
