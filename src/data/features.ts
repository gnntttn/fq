import {
  LucideIcon,
  BookCopy,
  Users,
  Bookmark,
  LayoutGrid,
  Heart,
  Sparkles,
  BookCheck,
  BrainCircuit,
  BookMarked,
  Target,
  BookUser,
  ScrollText,
  Shield,
  SunMoon,
  BookLock,
  Telescope,
  Library,
  BookOpen as SeerahIcon,
  PersonStanding,
  BookText as GlossaryIcon,
  Users2,
  AudioLines,
  Radio,
  Tv,
} from 'lucide-react';
import { TranslationKey } from '../lib/i18n';

export interface FeatureLink {
  to: string;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  icon: LucideIcon;
  color: string;
}

export const featureLinks: FeatureLink[] = [
  { to: '/seerah', titleKey: 'seerah_title', subtitleKey: 'seerah_subtitle', icon: SeerahIcon, color: 'bg-stone-500' },
  { to: '/companion-stories', titleKey: 'companion_stories_title', subtitleKey: 'companion_stories_subtitle', icon: Users2, color: 'bg-orange-500' },
  { to: '/prophet-stories', titleKey: 'prophet_stories_title', subtitleKey: 'prophet_stories_subtitle', icon: BookUser, color: 'bg-cyan-500' },
  { to: '/topics', titleKey: 'topics_page_title', subtitleKey: 'topics_page_subtitle', icon: LayoutGrid, color: 'bg-orange-400' },
  { to: '/dua-library', titleKey: 'dua_library_title', subtitleKey: 'dua_library_subtitle', icon: Library, color: 'bg-pink-500' },
  { to: '/adhkar', titleKey: 'adhkar_title', subtitleKey: 'adhkar_subtitle', icon: SunMoon, color: 'bg-amber-500' },
  { to: '/hisnul-muslim', titleKey: 'hisnul_muslim_title', subtitleKey: 'hisnul_muslim_subtitle', icon: BookLock, color: 'bg-lime-500' },
  { to: '/worship-guide', titleKey: 'worship_guide_title', subtitleKey: 'worship_guide_subtitle', icon: PersonStanding, color: 'bg-blue-500' },
  { to: '/reading-plans', titleKey: 'reading_plans_title', subtitleKey: 'reading_plans_subtitle', icon: Target, color: 'bg-teal-500' },
  { to: '/khatmah-tracker', titleKey: 'khatmah_tracker_title', subtitleKey: 'khatmah_tracker_subtitle', icon: BookCheck, color: 'bg-green-500' },
  { to: '/nawawi-hadith', titleKey: 'nawawi_hadith_title', subtitleKey: 'nawawi_hadith_subtitle', icon: ScrollText, color: 'bg-yellow-500' },
  { to: '/ruqyah', titleKey: 'ruqyah_title', subtitleKey: 'ruqyah_subtitle', icon: Shield, color: 'bg-sky-500' },
  { to: '/tajweed-guide', titleKey: 'tajweed_guide_title', subtitleKey: 'tajweed_guide_subtitle', icon: AudioLines, color: 'bg-rose-500' },
  { to: '/glossary', titleKey: 'glossary_title', subtitleKey: 'glossary_subtitle', icon: GlossaryIcon, color: 'bg-gray-500' },
  { to: '/miracles', titleKey: 'miracles_title', subtitleKey: 'miracles_subtitle', icon: Telescope, color: 'bg-violet-500' },
  { to: '/quiz', titleKey: 'quiz_title', subtitleKey: 'quiz_subtitle', icon: BrainCircuit, color: 'bg-purple-500' },
  { to: '/sajda-verses', titleKey: 'sajda_verses_title', subtitleKey: 'sajda_verses_subtitle', icon: BookMarked, color: 'bg-indigo-500' },
  { to: '/asma-ul-husna', titleKey: 'asma_ul_husna', subtitleKey: 'asma_ul_husna_page_subtitle', icon: Sparkles, color: 'bg-yellow-400' },
  { to: '/reciters', titleKey: 'reciters', subtitleKey: 'reciters_page_subtitle', icon: Users, color: 'bg-fuchsia-500' },
  { to: '/radios', titleKey: 'radios_page_title', subtitleKey: 'radios_page_subtitle', icon: Radio, color: 'bg-red-500' },
  { to: '/tv', titleKey: 'tv_page_title', subtitleKey: 'tv_page_subtitle', icon: Tv, color: 'bg-blue-500' },
  { to: '/surahs', titleKey: 'surahs', subtitleKey: 'browse_surahs_desc', icon: BookCopy, color: 'bg-emerald-500' },
  { to: '/bookmarks', titleKey: 'bookmarks', subtitleKey: 'bookmarks_page_subtitle', icon: Bookmark, color: 'bg-amber-600' },
];
