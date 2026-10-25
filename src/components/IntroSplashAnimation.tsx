import React, { useState, useEffect, useRef } from 'react';
import { ChillaxLogo } from './ChillaxLogo';
import { BarcodeStrip, StarburstBadge, StreetwearCross } from './BrutalGraphics';
import { FastForward, Zap, MapPin } from 'lucide-react';

interface IntroSplashAnimationProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const IntroSplashAnimation: React.FC<IntroSplashAnimationProps> = ({
  onComplete,
  forceShow = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('BOOTING WOOSONG NODE...');
  const [isExiting, setIsExiting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Status ticker log stages
  const statusLogs = [
    { threshold: 10, text: 'SYS.INIT // WOOSONG WEST CAMPUS (W1 · W3 · W7)' },
    { threshold: 35, text: 'LOC.SYNC // DAEJEON METROPOLITAN CITY · KST' },
    { threshold: 65, text: 'VIBE.ENGAGE // ZERO-AWKWARDNESS SOCIAL NETWORK' },
    { threshold: 88, text: 'LOAD.COMPLETE // STREETWEAR & CREATIVE HUB' },
    { threshold: 100, text: 'SYS.READY // CHILL TOGETHER. CONNECT ACROSS CULTURES.' },
  ];

  const handleFinish = () => {
    if (isExiting || isDismissed) return;
    setIsExiting(true);
    setTimeout(() => {
      setIsDismissed(true);
      if (onComplete) onComplete();
    }, 450); // Duration of the split curtain slide
  };

  useEffect(() => {
    // Reset state if forced to replay
    setIsDismissed(false);
    setIsExiting(false);
    setProgress(0);

    const startTime = performance.now();
    const duration = 1200; // Snappy 1.2s total boot counter

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      // Update log text based on thresholds
      const currentLog = [...statusLogs].reverse().find((log) => pct >= log.threshold);
      if (currentLog) {
        setStatusText(currentLog.text);
      }

      if (pct < 100) {
        animationFrameRef.current = requestAnimationFrame(updateCounter);
      } else {
        // Hold at 100% briefly (180ms), then trigger the shutter reveal
        setTimeout(() => {
          handleFinish();
        }, 180);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateCounter);

    // Keyboard listener for instant skip via ESC or Space
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forceShow]);

  if (isDismissed) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Welcome to Woosong Chillax Club"
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden"
    >
      {/* Top Shutter Half */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#0B0B0F] border-b-4 border-[#C6FF00] transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isExiting ? '-translate-y-full' : 'translate-y-0'
        } flex flex-col justify-end items-center pb-6 sm:pb-8 relative overflow-hidden`}
      >
        {/* Subtle background tech grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #C6FF00 1px, transparent 1px), linear-gradient(to bottom, #C6FF00 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Top Header Bar with HUD details */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#C6FF00] border border-black animate-ping" />
            <span className="text-[#C6FF00] font-bold tracking-widest uppercase">
              WOOSONG CHILLAX // SYS.LOADER
            </span>
          </div>

          {/* Quick Skip Button */}
          <button
            onClick={handleFinish}
            className="brutal-btn-lime px-3 py-1 text-[11px] flex items-center gap-1.5 cursor-pointer hover:bg-white text-black font-mono font-bold"
            title="Skip Intro (or press ESC)"
          >
            <span>SKIP [ESC]</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Decorative corner cross */}
        <div className="absolute top-12 left-6 opacity-40 hidden sm:block pointer-events-none">
          <StreetwearCross size={60} />
        </div>

        {/* Starburst badge in corner */}
        <div className="absolute top-12 right-6 hidden sm:block pointer-events-none">
          <StarburstBadge size={64} color="lime" label="2026" />
        </div>

        {/* Upper Portion of Center Logo */}
        <div
          className={`transform transition-all duration-300 ${
            isExiting ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <div className="relative">
            <ChillaxLogo size="xl" />
          </div>
        </div>
      </div>

      {/* Bottom Shutter Half */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#0B0B0F] border-t-4 border-[#C6FF00] transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isExiting ? 'translate-y-full' : 'translate-y-0'
        } flex flex-col justify-start items-center pt-4 sm:pt-6 px-4 relative overflow-hidden`}
      >
        {/* Subtle background tech grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #C6FF00 1px, transparent 1px), linear-gradient(to bottom, #C6FF00 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Subtitle Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 bg-[#22232B] text-[#C6FF00] text-[11px] font-mono px-2.5 py-0.5 border border-black">
            <MapPin className="w-3 h-3 text-[#C6FF00]" />
            WOOSONG UNIVERSITY · WEST CAMPUS ONLY
          </span>
          <span className="bg-[#9B5CFF] text-white text-[10px] font-mono font-bold px-2 py-0.5 border border-black uppercase">
            STREETWEAR & CREATIVE
          </span>
        </div>

        {/* Big Industrial Percentage Counter */}
        <div className="flex items-baseline justify-center gap-2 mb-3">
          <span className="font-display font-black text-4xl sm:text-6xl text-white tracking-tighter">
            {progress < 10 ? `0${progress}` : progress}
          </span>
          <span className="font-mono text-xl sm:text-2xl font-bold text-[#C6FF00]">
            %
          </span>
        </div>

        {/* Chunky Neo-Brutalist Progress Bar */}
        <div className="w-full max-w-md bg-black border-2 border-[#C6FF00] p-1 brutal-shadow-lime mb-3">
          <div
            className="h-3 sm:h-4 bg-[#C6FF00] transition-all duration-75 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Striped hazard pattern inside bar */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, #000, #000 6px, transparent 6px, transparent 12px)',
              }}
            />
          </div>
        </div>

        {/* Dynamic Monospace Telemetry Status Line */}
        <div className="font-mono text-[11px] sm:text-xs text-[#C6FF00] text-center uppercase tracking-wider flex items-center gap-2 max-w-md px-2 truncate">
          <Zap className="w-3.5 h-3.5 text-[#C6FF00] shrink-0 animate-pulse" />
          <span className="truncate">{statusText}</span>
        </div>

        {/* Bottom Metadata & Barcode */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span className="hidden sm:inline">WSU-CHILLAX-SYS // DAEJEON</span>
          <BarcodeStrip serial="CHILLAX-BOOT-2026" className="scale-75 origin-center sm:origin-right" />
        </div>
      </div>
    </div>
  );
};
