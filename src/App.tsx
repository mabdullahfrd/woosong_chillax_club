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
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

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
    if (currentPath === '/join') {
      return <JoinPage navigate={navigate} />;
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
      <div className="min-h-screen flex flex-col bg-[#0B0B0F] text-white selection:bg-[#C6FF00] selection:text-black">
        <Navbar currentPath={currentPath} navigate={navigate} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer navigate={navigate} />
      </div>
    </AppProvider>
  );
}
