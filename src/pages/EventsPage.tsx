import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventItem } from '../data/mockData';
import { MarqueeTicker, BarcodeStrip } from '../components/BrutalGraphics';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowUpRight, 
  Sparkles, 
  LayoutGrid, 
  CalendarDays,
  Clock
} from 'lucide-react';

interface EventsPageProps {
  navigate: (path: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ navigate }) => {
  const { events } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [timeFilter, setTimeFilter] = useState<'upcoming' | 'past'>('upcoming');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');

  const categories = ['All', 'Games', 'Food', 'Creativity', 'Exploration', 'Social'];

  // Current simulated date is October/November 2026 as per local metadata
  const now = new Date('2026-10-23T06:14:00+09:00').getTime();

  const filteredEvents = events.filter((evt) => {
    // Only published and non-cancelled in public listing
    if (!evt.isPublished || evt.isCancelled) return false;

    // Search query
    const matchesSearch = 
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;

    // Time filter
    const eventTime = new Date(evt.startTime).getTime();
    const isUpcoming = eventTime >= now;
    const matchesTime = timeFilter === 'upcoming' ? isUpcoming : !isUpcoming;

    return matchesSearch && matchesCategory && matchesTime;
  });

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Intro */}
        <div className="mb-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black text-black bg-[#C6FF00] px-3 py-1 border-2 border-black tracking-widest uppercase">
              // EVENTS DIRECTORY · ASIA/SEOUL (KST)
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            WHAT'S HAPPENING?
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Real meetups, games, and cultural dinners happening across Woosong University West Campus in Daejeon. Free to join, low-pressure, and always welcoming.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#22232B] border-4 border-black p-5 brutal-shadow mb-10 space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search events by title, keyword, or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0B0B0F] border-2 border-black pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:border-[#C6FF00] outline-hidden font-bold"
              />
            </div>

            {/* Upcoming vs Past Toggle & View Mode */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Upcoming / Past */}
              <div className="flex bg-[#0B0B0F] border-2 border-black p-1">
                <button
                  onClick={() => setTimeFilter('upcoming')}
                  className={`px-3.5 py-1.5 text-xs font-mono font-black uppercase transition-colors ${
                    timeFilter === 'upcoming'
                      ? 'bg-[#C6FF00] text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setTimeFilter('past')}
                  className={`px-3.5 py-1.5 text-xs font-mono font-black uppercase transition-colors ${
                    timeFilter === 'past'
                      ? 'bg-[#C6FF00] text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Past
                </button>
              </div>

              {/* Grid / Calendar view toggle */}
              <div className="flex bg-[#0B0B0F] border-2 border-black p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 text-xs transition-colors ${
                    viewMode === 'grid' ? 'bg-[#C6FF00] text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`p-2 text-xs transition-colors ${
                    viewMode === 'calendar' ? 'bg-[#C6FF00] text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Calendar view"
                >
                  <CalendarDays className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t-2 border-zinc-800">
            <span className="font-mono text-xs font-bold text-zinc-400 mr-2">CATEGORY:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono font-black uppercase border-2 transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#C6FF00] text-black border-black'
                    : 'bg-[#0B0B0F] text-zinc-300 border-black hover:border-[#C6FF00]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* View Mode: Grid */}
        {viewMode === 'grid' && (
          <div>
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((evt) => {
                  const isFull = evt.registeredCount >= evt.capacity;
                  return (
                    <div
                      key={evt.id}
                      className="bg-[#22232B] border-4 border-black flex flex-col justify-between brutal-shadow group hover:border-[#C6FF00] transition-colors"
                    >
                      <div>
                        {/* Event Cover Image */}
                        <div className="relative h-52 bg-zinc-900 border-b-2 border-black overflow-hidden">
                          <img
                            src={evt.coverImage}
                            alt={evt.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="text-[11px] font-mono font-bold bg-[#C6FF00] text-black px-2.5 py-0.5 border border-black uppercase">
                              {evt.category}
                            </span>
                          </div>
                          {isFull && (
                            <div className="absolute top-2 right-2 bg-black text-[#C6FF00] border border-[#C6FF00] text-[10px] font-mono px-2 py-0.5 font-bold">
                              WAITLIST OPEN
                            </div>
                          )}
                        </div>

                        {/* Event Details */}
                        <div className="p-6 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-mono text-[#C6FF00]">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{evt.displayDate}</span>
                            <span aria-hidden="true">·</span>
                            <Clock className="w-3.5 h-3.5" />
                            <span>{evt.displayTime}</span>
                          </div>

                          <h3 className="font-display font-black text-xl text-white group-hover:text-[#C6FF00] transition-colors leading-snug">
                            {evt.title}
                          </h3>

                          <p className="text-zinc-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                            {evt.description}
                          </p>

                          <div className="pt-2 text-xs font-mono text-zinc-400 space-y-1.5 border-t border-zinc-800">
                            <div className="flex items-center gap-1.5 truncate">
                              <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                              <span className="truncate">{evt.venue}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Fee: {evt.cost}</span>
                              <span className="font-bold text-white">
                                {evt.registeredCount}/{evt.capacity} registered
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Action */}
                      <div className="p-6 pt-0">
                        <button
                          onClick={() => navigate(`/events/${evt.slug}`)}
                          className="w-full brutal-btn bg-[#0B0B0F] hover:bg-[#C6FF00] hover:text-black text-white font-display font-bold text-xs py-3 uppercase transition-all flex items-center justify-center gap-2"
                        >
                          <span>{isFull ? 'Join Waitlist / Details' : 'View Details & RSVP'}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty state */
              <div className="p-16 border-2 border-black bg-[#22232B] text-center max-w-xl mx-auto brutal-shadow space-y-4">
                <Sparkles className="w-10 h-10 text-[#C6FF00] mx-auto" />
                <h3 className="font-display font-black text-2xl text-white uppercase">
                  NEW EXPERIENCES ARE IN THE WORKS.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Good things start with an idea. Check back soon or join the community to hear about upcoming activities.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="brutal-btn bg-[#C6FF00] text-black font-display font-bold text-xs px-5 py-2 uppercase"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* View Mode: Calendar Matrix */}
        {viewMode === 'calendar' && (
          <div className="bg-[#22232B] border-2 border-black p-6 brutal-shadow">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-black">
              <h3 className="font-display font-black text-xl text-white uppercase">
                November 2026 · Daejeon Campus Calendar
              </h3>
              <span className="font-mono text-xs text-[#C6FF00]">
                Asia/Seoul (KST)
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono font-bold text-zinc-400 mb-2">
              <div>SUN</div>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div className="text-[#C6FF00]">FRI (CHILLAX DAY)</div>
              <div>SAT</div>
            </div>

            {/* Simulated November 2026 Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day 1 starts on Sunday in Nov 2026 */}
              {Array.from({ length: 30 }).map((_, i) => {
                const dayNum = i + 1;
                // Fridays in Nov 2026: 6, 13, 20, 27
                const eventOnDay = events.find(e => {
                  const day = new Date(e.startTime).getDate();
                  return day === dayNum;
                });

                return (
                  <div
                    key={dayNum}
                    className={`min-h-24 p-2 border border-black flex flex-col justify-between text-left transition-colors ${
                      eventOnDay
                        ? 'bg-[#0B0B0F] border-[#C6FF00] hover:bg-black cursor-pointer'
                        : 'bg-[#181920]'
                    }`}
                    onClick={() => eventOnDay && navigate(`/events/${eventOnDay.slug}`)}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`font-mono text-xs font-bold ${eventOnDay ? 'text-[#C6FF00]' : 'text-zinc-500'}`}>
                        {dayNum}
                      </span>
                      {eventOnDay && (
                        <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
                      )}
                    </div>

                    {eventOnDay && (
                      <div className="mt-2">
                        <p className="text-[11px] font-display font-bold text-white line-clamp-2 leading-tight">
                          {eventOnDay.title}
                        </p>
                        <p className="text-[9px] font-mono text-[#C6FF00] mt-1">
                          {eventOnDay.displayTime.split('–')[0]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
