import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { FunZonePage } from './pages/FunZonePage';
import { CultureHubPage } from './pages/CultureHubPage';
import { GalleryPage } from './pages/GalleryPage';
import { JoinPage } from './pages/JoinPage';
import { SignUpPage } from './pages/SignUpPage';
import { ActivityCalendarPage } from './pages/ActivityCalendarPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { IntroSplashAnimation } from './components/IntroSplashAnimation';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [introKey, setIntroKey] = useState<number>(1);

  const handleReplayIntro = () => {
    setIntroKey((prev) => prev + 1);
    setShowIntro(true);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route matching logic
  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage navigate={navigate} />;
    }
    if (currentPath === '/about') {
      return <AboutPage navigate={navigate} />;
    }
    if (currentPath === '/events') {
      return <EventsPage navigate={navigate} />;
    }
    if (currentPath.startsWith('/events/')) {
      const slug = currentPath.replace('/events/', '');
      return <EventDetailPage slug={slug} navigate={navigate} />;
    }
    if (currentPath === '/fun-zone') {
      return <FunZonePage />;
    }
    if (currentPath === '/culture') {
      return <CultureHubPage />;
    }
    if (currentPath === '/gallery') {
      return <GalleryPage />;
    }
    if (currentPath === '/calendar') {
      return <ActivityCalendarPage navigate={navigate} />;
    }
    if (currentPath === '/signup' || currentPath === '/join') {
      return <SignUpPage navigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage navigate={navigate} />;
    }
    if (currentPath === '/admin') {
      return <AdminDashboardPage />;
    }

    // Default fallback to HomePage
    return <HomePage navigate={navigate} />;
  };

  return (
    <AppProvider>
      {showIntro && (
        <IntroSplashAnimation
          key={introKey}
          onComplete={() => setShowIntro(false)}
        />
      )}
      <div className="min-h-screen flex flex-col bg-[#0B0B0F] text-white selection:bg-[#C6FF00] selection:text-black">
        <Navbar currentPath={currentPath} navigate={navigate} onReplayIntro={handleReplayIntro} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer navigate={navigate} onReplayIntro={handleReplayIntro} />
      </div>
    </AppProvider>
  );
}
