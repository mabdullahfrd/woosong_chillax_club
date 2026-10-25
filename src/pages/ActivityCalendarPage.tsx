import React from 'react';
import { WorkableActivityCalendar } from '../components/WorkableActivityCalendar';
import { Sticker, BarcodeStrip } from '../components/BrutalGraphics';
import { useApp } from '../context/AppContext';
import { Calendar, Users, Sparkles, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

interface ActivityCalendarPageProps {
  navigate: (path: string) => void;
}

export const ActivityCalendarPage: React.FC<ActivityCalendarPageProps> = ({ navigate }) => {
  const { events } = useApp();

  const totalEvents = events.filter(e => !e.isCancelled).length;
  const totalSpots = events.reduce((acc, curr) => acc + curr.capacity, 0);
  const totalFilled = events.reduce((acc, curr) => acc + curr.registeredCount, 0);
  const openSpots = Math.max(0, totalSpots - totalFilled);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Hero & Header */}
        <div className="bg-[#22232B] border-4 border-black p-6 sm:p-10 brutal-shadow relative overflow-hidden">
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="font-mono text-xs font-black text-black bg-[#C6FF00] px-3.5 py-1 border-2 border-black tracking-wider uppercase">
              // WOOSONG CHILLAX CLUB · LIVE ACTIVITY WORKSTATION
            </span>
            <Sticker text="FRIDAY MEETUPS" color="purple" rotate="rotate-2" size="sm" />
            <Sticker text="WOOSONG WEST CAMPUS" color="white" rotate="-rotate-1" size="sm" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
                ACTIVITY CALENDAR & PLANNER
              </h1>
              <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                This is our shared activity workbench. Explore upcoming Friday sessions, check preparation readiness, and schedule new games or workshops directly on the calendar.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-1.5 bg-[#0B0B0F] px-3 py-1.5 border border-black">
                  <MapPin className="w-4 h-4 text-[#C6FF00]" />
                  <span>Woosong West Campus (W1, W3, W7)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0B0B0F] px-3 py-1.5 border border-black">
                  <Calendar className="w-4 h-4 text-[#9B5CFF]" />
                  <span>Every Friday 18:30 KST</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics & Member Action */}
            <div className="lg:col-span-4 bg-[#0B0B0F] border-3 border-black p-5 brutal-shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-3 text-center font-mono">
                <div className="p-2.5 bg-[#181920] border border-black">
                  <span className="text-[10px] text-zinc-400 block uppercase">Planned Activities</span>
                  <span className="font-display font-black text-2xl text-white">{totalEvents}</span>
                </div>
                <div className="p-2.5 bg-[#181920] border border-black">
                  <span className="text-[10px] text-zinc-400 block uppercase">Open Spots</span>
                  <span className="font-display font-black text-2xl text-[#C6FF00]">{openSpots}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/signup')}
                className="w-full brutal-btn-lime py-3 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign Up as Member</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* The Workable Interactive Activity Calendar */}
        <WorkableActivityCalendar navigate={navigate} initialViewMode="month" />

        {/* Bottom Explainer: How We Coordinate Activities */}
        <div className="bg-[#22232B] border-4 border-black p-6 sm:p-8 brutal-shadow space-y-6">
          <div className="flex items-center justify-between border-b border-black pb-3">
            <h2 className="font-display font-black text-xl uppercase text-white">
              HOW ACTIVITY COORDINATION WORKS AT CHILLAX
            </h2>
            <BarcodeStrip serial="CHILLAX-CAL-PROC-2026" className="hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-4 bg-[#0B0B0F] border-2 border-black space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#C6FF00]">01 // PROPOSE ON CALENDAR</span>
                <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
              </div>
              <p className="text-zinc-300 leading-relaxed">
                Click any day's "+" on the calendar to propose a board game, cooking swap, or night walk. Set the tentative venue and description.
              </p>
            </div>

            <div className="p-4 bg-[#0B0B0F] border-2 border-black space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#9B5CFF]">02 // WORK ON CHECKLIST</span>
                <span className="w-2 h-2 rounded-full bg-[#9B5CFF]" />
              </div>
              <p className="text-zinc-300 leading-relaxed">
                Organizers and active members collaboratively check off items: room reservation, snack preparation, language cards, and equipment setup.
              </p>
            </div>

            <div className="p-4 bg-[#0B0B0F] border-2 border-black space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#4388FF]">03 // FRIDAY CHILL SESSION</span>
                <span className="w-2 h-2 rounded-full bg-[#4388FF]" />
              </div>
              <p className="text-zinc-300 leading-relaxed">
                Turn up at the designated room on Woosong West Campus. Registered members are greeted by table hosts with no awkward small talk.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
