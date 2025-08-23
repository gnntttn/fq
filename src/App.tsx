import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/common/Header';
import { SearchModal } from './components/common/SearchModal';
import { BottomNav } from './components/common/BottomNav';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Onboarding } from './components/onboarding/Onboarding';
import { Loader } from 'lucide-react';

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const SurahsPage = lazy(() => import('./pages/SurahsPage').then(module => ({ default: module.SurahsPage })));
const SurahPage = lazy(() => import('./pages/SurahPage').then(module => ({ default: module.SurahPage })));
const JuzsPage = lazy(() => import('./pages/JuzsPage').then(module => ({ default: module.JuzsPage })));
const JuzPage = lazy(() => import('./pages/JuzPage').then(module => ({ default: module.JuzPage })));
const RecitersPage = lazy(() => import('./pages/RecitersPage').then(module => ({ default: module.RecitersPage })));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage').then(module => ({ default: module.BookmarksPage })));
const TopicsPage = lazy(() => import('./pages/TopicsPage').then(module => ({ default: module.TopicsPage })));
const ThemedAyatPage = lazy(() => import('./pages/ThemedAyatPage').then(module => ({ default: module.ThemedAyatPage })));
const RabbanaDuasPage = lazy(() => import('./pages/RabbanaDuasPage').then(module => ({ default: module.RabbanaDuasPage })));
const AsmaulHusnaPage = lazy(() => import('./pages/AsmaulHusnaPage').then(module => ({ default: module.AsmaulHusnaPage })));
const MorePage = lazy(() => import('./pages/MorePage').then(module => ({ default: module.MorePage })));
const KhatmahTrackerPage = lazy(() => import('./pages/KhatmahTrackerPage').then(module => ({ default: module.KhatmahTrackerPage })));
const QuizPage = lazy(() => import('./pages/QuizPage').then(module => ({ default: module.QuizPage })));
const SajdaVersesPage = lazy(() => import('./pages/SajdaVersesPage').then(module => ({ default: module.SajdaVersesPage })));
const ReadingPlansPage = lazy(() => import('./pages/ReadingPlansPage').then(module => ({ default: module.ReadingPlansPage })));
const ProphetStoriesPage = lazy(() => import('./pages/ProphetStoriesPage').then(module => ({ default: module.ProphetStoriesPage })));
const ProphetStoryPage = lazy(() => import('./pages/ProphetStoryPage').then(module => ({ default: module.ProphetStoryPage })));
const NawawiHadithPage = lazy(() => import('./pages/NawawiHadithPage').then(module => ({ default: module.NawawiHadithPage })));
const AdhkarPage = lazy(() => import('./pages/AdhkarPage').then(module => ({ default: module.AdhkarPage })));
const RuqyahPage = lazy(() => import('./pages/RuqyahPage').then(module => ({ default: module.RuqyahPage })));
const HisnulMuslimPage = lazy(() => import('./pages/HisnulMuslimPage').then(module => ({ default: module.HisnulMuslimPage })));
const HisnulMuslimCategoryPage = lazy(() => import('./pages/HisnulMuslimCategoryPage').then(module => ({ default: module.HisnulMuslimCategoryPage })));
const TajweedGuidePage = lazy(() => import('./pages/TajweedGuidePage').then(module => ({ default: module.TajweedGuidePage })));
const MiraclesPage = lazy(() => import('./pages/MiraclesPage').then(module => ({ default: module.MiraclesPage })));
const MiracleTopicPage = lazy(() => import('./pages/MiracleTopicPage').then(module => ({ default: module.MiracleTopicPage })));
const SeerahPage = lazy(() => import('./pages/SeerahPage').then(module => ({ default: module.SeerahPage })));
const SeerahChapterPage = lazy(() => import('./pages/SeerahChapterPage').then(module => ({ default: module.SeerahChapterPage })));
const DuaLibraryPage = lazy(() => import('./pages/DuaLibraryPage').then(module => ({ default: module.DuaLibraryPage })));
const DuaCategoryPage = lazy(() => import('./pages/DuaCategoryPage').then(module => ({ default: module.DuaCategoryPage })));
const WorshipGuidePage = lazy(() => import('./pages/WorshipGuidePage').then(module => ({ default: module.WorshipGuidePage })));
const WorshipTopicPage = lazy(() => import('./pages/WorshipTopicPage').then(module => ({ default: module.WorshipTopicPage })));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage').then(module => ({ default: module.GlossaryPage })));
const CompanionStoriesPage = lazy(() => import('./pages/CompanionStoriesPage').then(module => ({ default: module.CompanionStoriesPage })));
const CompanionStoryPage = lazy(() => import('./pages/CompanionStoryPage').then(module => ({ default: module.CompanionStoryPage })));
const RadiosPage = lazy(() => import('./pages/RadiosPage').then(module => ({ default: module.RadiosPage })));
const TvPage = lazy(() => import('./pages/TvPage').then(module => ({ default: module.TvPage })));
const TafsirListPage = lazy(() => import('./pages/TafsirListPage').then(module => ({ default: module.TafsirListPage })));
const TafsirSeriesPage = lazy(() => import('./pages/TafsirSeriesPage').then(module => ({ default: module.TafsirSeriesPage })));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/surahs" element={<SurahsPage />} />
        <Route path="/surah/:id" element={<SurahPage />} />
        <Route path="/juzs" element={<JuzsPage />} />
        <Route path="/juz/:id" element={<JuzPage />} />
        <Route path="/reciters" element={<RecitersPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topics/:themeId" element={<ThemedAyatPage />} />
        <Route path="/rabbana-duas" element={<RabbanaDuasPage />} />
        <Route path="/asma-ul-husna" element={<AsmaulHusnaPage />} />
        <Route path="/more" element={<MorePage />} />
        <Route path="/khatmah-tracker" element={<KhatmahTrackerPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/sajda-verses" element={<SajdaVersesPage />} />
        <Route path="/reading-plans" element={<ReadingPlansPage />} />
        <Route path="/prophet-stories" element={<ProphetStoriesPage />} />
        <Route path="/prophet-stories/:storyId" element={<ProphetStoryPage />} />
        <Route path="/nawawi-hadith" element={<NawawiHadithPage />} />
        <Route path="/adhkar" element={<AdhkarPage />} />
        <Route path="/ruqyah" element={<RuqyahPage />} />
        <Route path="/hisnul-muslim" element={<HisnulMuslimPage />} />
        <Route path="/hisnul-muslim/:categoryId" element={<HisnulMuslimCategoryPage />} />
        <Route path="/tajweed-guide" element={<TajweedGuidePage />} />
        <Route path="/miracles" element={<MiraclesPage />} />
        <Route path="/miracles/:topicId" element={<MiracleTopicPage />} />
        <Route path="/seerah" element={<SeerahPage />} />
        <Route path="/seerah/:chapterId" element={<SeerahChapterPage />} />
        <Route path="/dua-library" element={<DuaLibraryPage />} />
        <Route path="/dua-library/:categoryId" element={<DuaCategoryPage />} />
        <Route path="/worship-guide" element={<WorshipGuidePage />} />
        <Route path="/worship-guide/:topicId" element={<WorshipTopicPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/companion-stories" element={<CompanionStoriesPage />} />
        <Route path="/companion-stories/:storyId" element={<CompanionStoryPage />} />
        <Route path="/radios" element={<RadiosPage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/tafsir" element={<TafsirListPage />} />
        <Route path="/tafsir/:seriesName" element={<TafsirSeriesPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-space-300">
      <Loader className="animate-spin text-accent-light" size={48} />
    </div>
  );
}

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useLocalStorage('onboarding-completed', false);

  const handleOnboardingComplete = () => {
    setOnboardingCompleted(true);
  };

  if (!onboardingCompleted) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Router>
      <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-space-300">
        <Header onSearchToggle={() => setIsSearchOpen(true)} />
        
        <main className="pb-24 pt-4">
          <Suspense fallback={<FullPageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </main>

        <BottomNav />

        <SearchModal 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
        />
      </div>
    </Router>
  );
}

export default App;
