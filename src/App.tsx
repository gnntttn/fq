import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/common/Header';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './pages/HomePage';
import { SurahsPage } from './pages/SurahsPage';
import { SurahPage } from './pages/SurahPage';
import { JuzsPage } from './pages/JuzsPage';
import { JuzPage } from './pages/JuzPage';
import { RecitersPage } from './pages/RecitersPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { BottomNav } from './components/common/BottomNav';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Onboarding } from './components/onboarding/Onboarding';
import { TopicsPage } from './pages/TopicsPage';
import { ThemedAyatPage } from './pages/ThemedAyatPage';
import { RabbanaDuasPage } from './pages/RabbanaDuasPage';
import { AsmaulHusnaPage } from './pages/AsmaulHusnaPage';
import { MorePage } from './pages/MorePage';
import { KhatmahTrackerPage } from './pages/KhatmahTrackerPage';
import { QuizPage } from './pages/QuizPage';
import { SajdaVersesPage } from './pages/SajdaVersesPage';
import { ReadingPlansPage } from './pages/ReadingPlansPage';
import { ProphetStoriesPage } from './pages/ProphetStoriesPage';
import { ProphetStoryPage } from './pages/ProphetStoryPage';
import { NawawiHadithPage } from './pages/NawawiHadithPage';
import { AdhkarPage } from './pages/AdhkarPage';
import { RuqyahPage } from './pages/RuqyahPage';
import { HisnulMuslimPage } from './pages/HisnulMuslimPage';
import { HisnulMuslimCategoryPage } from './pages/HisnulMuslimCategoryPage';
import { TajweedGuidePage } from './pages/TajweedGuidePage';
import { MiraclesPage } from './pages/MiraclesPage';
import { MiracleTopicPage } from './pages/MiracleTopicPage';
import { SeerahPage } from './pages/SeerahPage';
import { SeerahChapterPage } from './pages/SeerahChapterPage';
import { DuaLibraryPage } from './pages/DuaLibraryPage';
import { DuaCategoryPage } from './pages/DuaCategoryPage';
import { IslamicCalendarPage } from './pages/IslamicCalendarPage';

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
        <Route path="/islamic-calendar" element={<IslamicCalendarPage />} />
      </Routes>
    </AnimatePresence>
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
          <AnimatedRoutes />
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
