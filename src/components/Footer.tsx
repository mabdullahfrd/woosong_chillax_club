import React from 'react';
import { ChillaxLogo } from './ChillaxLogo';
import { BarcodeStrip, StarburstBadge } from './BrutalGraphics';
import { MapPin, Mail, Sparkles, MessageCircle, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate, onReplayIntro }) => {
  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0B0F] border-t-4 border-black text-white pt-14 pb-12 relative overflow-hidden">
      {/* Decorative Neo-Brutalist accent strip */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C6FF00] via-[#9B5CFF] to-[#4388FF]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b-2 border-zinc-800">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <ChillaxLogo size="md" />
            
            <p className="font-mono text-[#C6FF00] text-sm font-bold tracking-wide">
              "Chill Together. Connect Across Cultures."
            </p>
            
            <p className="text-zinc-300 text-sm max-w-md leading-relaxed">
              Woosong University's creative, social, and student-first community. Where Korean and international students connect naturally through food, tabletop games, creative workshops, and city walks.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-[#22232B] text-zinc-300 px-3 py-1 border-2 border-black">
                <MapPin className="w-3.5 h-3.5 text-[#C6FF00]" />
                <span>Woosong Univ · Daejeon, Korea</span>
              </span>
              <BarcodeStrip serial="CHILLAX-FOOTER-2026" className="scale-90 origin-left" />
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#C6FF00]">
              EXPLORE
            </h4>
            <ul className="space-y-2 text-sm font-display">
              <li>
                <button onClick={() => handleNav('/calendar')} className="text-[#C6FF00] hover:underline flex items-center gap-1 font-bold">
                  Activity Calendar & Planner
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/signup')} className="text-white hover:underline flex items-center gap-1 font-bold">
                  Sign Up & Member Pass
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/events')} className="text-zinc-300 hover:text-white hover:underline flex items-center gap-1">
                  Upcoming Meetups
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/about')} className="text-zinc-300 hover:text-white hover:underline flex items-center gap-1">
                  About the Club
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/fun-zone')} className="text-zinc-300 hover:text-white hover:underline flex items-center gap-1">
                  Fun Zone & Generator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/culture')} className="text-zinc-300 hover:text-white hover:underline flex items-center gap-1">
                  Culture Hub & Phrases
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/gallery')} className="text-zinc-300 hover:text-white hover:underline flex items-center gap-1">
                  Photo & Project Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#C6FF00]">
              COMMUNITY & GET IN TOUCH
            </h4>
            <div className="space-y-2 text-xs font-mono text-zinc-300">
              <div className="p-3 bg-[#22232B] border border-black">
                <p className="text-white font-bold mb-1">Meetup Locations:</p>
                <p className="text-zinc-400">· Woosong West Campus Student Union (W1/W3)</p>
                <p className="text-zinc-400">· Woosong Creative Media Studio (W7 Bldg)</p>
              </div>

              <div className="flex items-center gap-2 p-2 bg-[#22232B] border border-black">
                <Mail className="w-3.5 h-3.5 text-[#C6FF00] shrink-0" />
                <span className="text-zinc-300 truncate">chillax.woosong@gmail.com</span>
                <span className="text-[10px] text-zinc-500 font-mono">(Inquiries)</span>
              </div>

              <div className="flex items-center gap-2 p-2 bg-[#22232B] border border-black">
                <MessageCircle className="w-3.5 h-3.5 text-[#4388FF] shrink-0" />
                <span className="text-zinc-300">KakaoTalk OpenChat / Discord</span>
                <span className="text-[10px] text-zinc-500 font-mono">(Shared on joining)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNav('/join')}
                className="w-full brutal-btn-lime py-3 px-4 text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply to Join Chillax Club</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} Woosong Chillax Club. Daejeon, Republic of Korea.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('/contact')} className="hover:text-zinc-300 hover:underline">
              FAQ & Guidelines
            </button>
            <span aria-hidden="true">·</span>
            {onReplayIntro && (
              <>
                <button
                  onClick={onReplayIntro}
                  className="hover:text-[#C6FF00] flex items-center gap-1.5 text-zinc-400 transition-colors cursor-pointer group"
                  title="Replay Site Entrance Animation"
                >
                  <Zap className="w-3 h-3 text-[#C6FF00] group-hover:scale-110 transition-transform" />
                  <span>Replay Intro</span>
                </button>
                <span aria-hidden="true">·</span>
              </>
            )}
            <button onClick={() => handleNav('/admin')} className="hover:text-[#C6FF00] flex items-center gap-1 text-zinc-400">
              <ShieldCheck className="w-3 h-3" />
              <span>Organizer Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
