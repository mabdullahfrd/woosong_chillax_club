import React, { useState } from 'react';
import { ChillaxLogo } from './ChillaxLogo';
import { Menu, X, ShieldAlert, Sparkles, Calendar, HeartHandshake, Compass, Image as GalleryIcon, CalendarDays, Zap } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate, onReplayIntro }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Calendar', path: '/calendar', icon: CalendarDays },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'About', path: '/about', icon: Sparkles },
    { label: 'Fun Zone', path: '/fun-zone', icon: Compass },
    { label: 'Culture Hub', path: '/culture', icon: HeartHandshake },
    { label: 'Gallery', path: '/gallery', icon: GalleryIcon },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0F]/95 backdrop-blur-md border-b-[3.5px] border-black">
      {/* Top Banner Alert Bar */}
      <div className="bg-[#C6FF00] text-black text-xs font-mono font-black py-1.5 px-4 border-b-2 border-black overflow-hidden whitespace-nowrap flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-black text-[#C6FF00] px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest font-black border border-black">
            WOOSONG UNIVERSITY
          </span>
          <span className="truncate tracking-tight">
            Chill Together. Connect Across Cultures. · Every Friday in Daejeon, Korea
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] hover:underline font-mono ml-4 text-black font-black shrink-0 cursor-pointer"
              title="Replay Site Entrance Animation"
            >
              <Zap className="w-3 h-3 text-black fill-black" />
              <span>FX INTRO</span>
            </button>
          )}
          <button
            onClick={() => handleNavClick('/admin')}
            className="hidden md:inline-flex items-center gap-1.5 text-xs hover:underline font-mono ml-2 text-black font-black shrink-0"
            title="Organizer Dashboard"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Organizer Portal</span>
          </button>
        </div>
      </div>

      {/* Main 3-Zone Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-19 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div
          onClick={() => handleNavClick('/')}
          className="cursor-pointer flex items-center gap-3 group whitespace-nowrap shrink-0"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('/')}
          aria-label="Go to Chillax Homepage"
        >
          <ChillaxLogo size="sm" />
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-[#C6FF00] uppercase font-black leading-tight">
              WOOSONG
            </span>
            <span className="text-xs font-mono text-zinc-400 font-bold leading-tight">
              CHILLAX CLUB
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`relative py-1 font-display tracking-tight text-sm font-bold transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#C6FF00]'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#C6FF00]" />
                )}
              </button>
            );
          })}
          <button
            onClick={() => handleNavClick('/contact')}
            className={`font-display text-sm font-bold transition-colors whitespace-nowrap shrink-0 ${
              currentPath === '/contact' ? 'text-[#C6FF00]' : 'text-zinc-300 hover:text-white'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('/signup')}
            className="brutal-btn-lime text-black text-xs sm:text-sm px-5 py-2.5 uppercase tracking-wide cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 font-black"
          >
            <span>SIGN UP</span>
            <span className="font-mono text-xs">→</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#C6FF00] border-2 border-zinc-700 rounded-none bg-zinc-900 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0B0F] border-b-2 border-black px-4 pt-3 pb-6 space-y-2 brutal-shadow">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest px-2 py-1">
            Menu Navigation
          </div>
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`w-full flex items-center justify-between p-3 text-left font-display font-bold border ${
                  isActive
                    ? 'border-[#C6FF00] bg-[#C6FF00]/10 text-[#C6FF00]'
                    : 'border-zinc-800 bg-[#22232B] text-white hover:border-zinc-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="w-4 h-4 text-[#C6FF00]" />
                  <span>{link.label}</span>
                </div>
                <span className="font-mono text-xs text-zinc-400">→</span>
              </button>
            );
          })}
          <button
            onClick={() => handleNavClick('/contact')}
            className="w-full flex items-center justify-between p-3 text-left font-display font-bold border border-zinc-800 bg-[#22232B] text-white hover:border-zinc-600"
          >
            <span>Contact & FAQ</span>
            <span className="font-mono text-xs text-zinc-400">→</span>
          </button>
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('/admin')}
                className="text-xs font-mono text-zinc-400 hover:text-[#C6FF00] flex items-center gap-1.5 p-1"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Organizer</span>
              </button>
              {onReplayIntro && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="text-xs font-mono text-[#C6FF00] flex items-center gap-1 p-1 hover:underline"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Replay Intro</span>
                </button>
              )}
            </div>
            <span className="text-[11px] font-mono text-zinc-500">
              Daejeon, Korea
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
