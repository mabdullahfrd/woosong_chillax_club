import React, { useState } from 'react';
import { ChillaxLogo } from '../components/ChillaxLogo';
import { 
  Sticker, 
  StarburstBadge, 
  BarcodeStrip, 
  StreetwearCross, 
  MarqueeTicker, 
  StarSparkle, 
  TapeStrip, 
  BackgroundGraffitiDoodle 
} from '../components/BrutalGraphics';
import { useApp } from '../context/AppContext';
import { FUN_ACTIVITIES, FunActivity } from '../data/mockData';
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Users, 
  Sparkles, 
  Dice5, 
  UtensilsCrossed, 
  Palette, 
  Compass, 
  Volume2, 
  CheckCircle2, 
  Flame,
  ArrowUpRight,
  Zap,
  Globe2
} from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { events, cultureStories, galleryItems } = useApp();

  // Filter published upcoming events
  const [selectedEventCat, setSelectedEventCat] = useState<string>('All');
  const publishedEvents = events.filter(e => e.isPublished && !e.isCancelled);
  const filteredEvents = selectedEventCat === 'All' 
    ? publishedEvents 
    : publishedEvents.filter(e => e.category === selectedEventCat);

  // Mini Fun Generator State for Section 7.E
  const [genMood, setGenMood] = useState<FunActivity['mood']>('Social');
  const [genBudget, setGenBudget] = useState<FunActivity['budget']>('Free');
  const [genTime, setGenTime] = useState<FunActivity['time']>('1 hour');
  const [genGroup, setGenGroup] = useState<FunActivity['groupSize']>('Group');
  const [generatedActivity, setGeneratedActivity] = useState<FunActivity | null>(() => {
    return FUN_ACTIVITIES.find(a => a.mood === 'Social') || FUN_ACTIVITIES[0];
  });

  const handleMiniGenerate = () => {
    const match = FUN_ACTIVITIES.find(
      a => a.mood === genMood && (a.budget === genBudget || a.time === genTime || a.groupSize === genGroup)
    );
    if (match) {
      setGeneratedActivity(match);
    } else {
      const fallback = FUN_ACTIVITIES[Math.floor(Math.random() * FUN_ACTIVITIES.length)];
      setGeneratedActivity(fallback);
    }
  };

  // Text-to-speech for Korean phrase preview
  const [playingAudio, setPlayingAudio] = useState(false);
  const handlePlayKorean = (text: string) => {
    if ('speechSynthesis' in window) {
      setPlayingAudio(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      utterance.onend = () => setPlayingAudio(false);
      utterance.onerror = () => setPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white overflow-hidden">

      {/* ========================================================
          7.A HERO SECTION (HIGH-IMPACT NEO-BRUTALISM)
         ======================================================== */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b-4 border-black bg-[#0B0B0F]">
        
        {/* Background Looping Graffiti Spray Doodle (Reference 1 & 2) */}
        <BackgroundGraffitiDoodle className="top-10 -left-20 w-[800px] h-[600px]" />
        
        {/* Graph paper grid */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#FFFFFF 1.5px, transparent 1.5px), linear-gradient(90deg, #FFFFFF 1.5px, transparent 1.5px)',
            backgroundSize: '48px 48px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Bold Typography & CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow & Stickers */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs sm:text-sm font-black text-black bg-[#C6FF00] border-2 border-black px-3.5 py-1 tracking-wider uppercase brutal-shadow-sm">
                  WOOSONG UNIVERSITY · EST. DAEJEON
                </span>
                <Sticker text="NO AWKWARD VIBES" color="purple" rotate="rotate-2" size="sm" />
                <Sticker text="100% STUDENT RUN" color="white" rotate="-rotate-3" size="sm" />
              </div>

              {/* Official Approved CHILLAX Logo Asset */}
              <div className="pt-2">
                <ChillaxLogo size="lg" />
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter uppercase leading-[0.92] text-white">
                Less awkward. <br />
                <span className="text-black bg-[#C6FF00] px-3.5 py-1 inline-block border-3 border-black brutal-shadow-lime mt-1 transform -rotate-1">
                  More connected.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-zinc-200 text-base sm:text-xl font-normal max-w-xl leading-relaxed border-l-4 border-[#C6FF00] pl-4">
                A creative, social, student community where Korean and international students meet, relax, share cultures, explore ideas, play games, and turn ordinary university days into memorable experiences.
              </p>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/join')}
                  className="brutal-btn-lime text-black px-7 sm:px-9 py-4 text-sm sm:text-base cursor-pointer flex items-center gap-2.5"
                >
                  <span>JOIN THE CLUB</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate('/events')}
                  className="brutal-btn bg-[#22232B] hover:bg-[#2e303b] text-white font-display font-bold text-sm sm:text-base px-6 sm:px-8 py-4 uppercase tracking-wide cursor-pointer flex items-center gap-2 border-3 border-black"
                >
                  <Calendar className="w-4 h-4 text-[#C6FF00]" />
                  <span>EXPLORE EVENTS</span>
                </button>
              </div>

              {/* Streetwear Technical Manifest Strip (Reference 3) */}
              <div className="pt-4 flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-400 border-t-2 border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#C6FF00] border border-black inline-block" />
                  <span className="text-zinc-300 font-bold">DAEJEON [36.3504° N, 127.3845° E]</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#9B5CFF] border border-black inline-block" />
                  <span>KOREAN & INTL STUDENTS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#4388FF] border border-black inline-block" />
                  <span>FREE MEMBERSHIP</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual with Streetwear Cross & Starburst (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative Solid Block Behind */}
                <div className="absolute inset-0 bg-[#C6FF00] border-4 border-black translate-x-3.5 translate-y-3.5 brutal-shadow-lg" />
                
                {/* Main Photo Frame */}
                <div className="relative bg-[#22232B] border-4 border-black overflow-hidden z-10">
                  <img
                    src="/src/assets/images/chillax_campus_hangout_1792761422085.jpg"
                    alt="Woosong Chillax Club students hanging out"
                    className="w-full h-84 sm:h-96 object-cover"
                    loading="eager"
                  />
                  
                  {/* Streetwear Cross Motif (Reference 3) */}
                  <div className="absolute top-2 right-2 z-20 pointer-events-none opacity-90">
                    <StreetwearCross size={72} />
                  </div>

                  {/* Tape strip graphics */}
                  <TapeStrip className="absolute -top-1 left-6 z-20" />
                  <TapeStrip className="absolute -bottom-1 right-8 z-20" />

                  {/* Bottom Ticket Bar */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between">
                    <Sticker text="FRIDAY CLUB SESSIONS" color="white" rotate="-rotate-2" size="sm" />
                    <BarcodeStrip serial="WSU-D-TOWN" className="scale-90 origin-right" />
                  </div>
                </div>

                {/* Starburst Squiggle Sticker Overlapping (Reference 1) */}
                <div className="absolute -bottom-7 -left-6 z-30">
                  <StarburstBadge size={88} color="lime" squiggleColor="#9B5CFF" label="2026 CHILL" rotate="-rotate-12" />
                </div>

                {/* Top Corner Floating Tag */}
                <div className="absolute -top-4 -right-3 z-30">
                  <div className="bg-[#4388FF] text-white border-3 border-black px-3.5 py-1 text-xs font-mono font-black brutal-shadow-sm transform rotate-6 uppercase">
                    ★ CHILL · CONNECT · CREATE
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Marquee Ticker 1 */}
      <MarqueeTicker 
        bgColor="bg-[#C6FF00]" 
        textColor="text-black" 
        text="WOOSONG CHILLAX CLUB · CHILL TOGETHER · CONNECT ACROSS CULTURES · DAEJEON KOREA · NO AWKWARD VIBES · PLAY & CREATE ·" 
      />

      {/* ========================================================
          7.B WELCOME SECTION (DIRECTLY MATCHING REFERENCE 1 CARDS)
         ======================================================== */}
      <section className="py-20 bg-[#22232B] border-b-4 border-black relative overflow-hidden">
        
        {/* Background spray loops */}
        <BackgroundGraffitiDoodle className="-bottom-20 -right-20 w-[600px] h-[500px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl space-y-3 mb-14">
            <span className="font-mono text-xs font-black text-[#C6FF00] tracking-widest uppercase bg-black px-2.5 py-1 border border-black inline-block">
              // WELCOME TO THE COMMUNITY
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              YOUR PEOPLE ARE OUT THERE.
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              Starting somewhere new can feel overwhelming. Chillax is a space to meet people naturally, share experiences, and feel more at home at Woosong. Come alone, bring a friend, or show up just to see what happens.
            </p>
          </div>

          {/* Three Heavy Neo-Brutalist Cards (Reference 1 Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Card 1: Solid Electric Lime with Stacked Underlined Headline Block (5 cols) */}
            <div className="lg:col-span-5 bg-[#C6FF00] text-black border-4 border-black p-7 sm:p-8 brutal-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b-3 border-black mb-6">
                  <span className="font-mono text-xs font-black tracking-widest uppercase">
                    CHILLAX MANIFESTO
                  </span>
                  <span className="font-mono text-xs font-black bg-black text-[#C6FF00] px-2 py-0.5">
                    01 // CHILL
                  </span>
                </div>

                {/* Reference 1: Stacked bold lines with thick individual underlines */}
                <div className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight space-y-2 mb-6">
                  <p className="border-b-3 border-black pb-1 leading-snug">STARTING SOMEWHERE NEW</p>
                  <p className="border-b-3 border-black pb-1 leading-snug">CAN FEEL OVERWHELMING.</p>
                  <p className="border-b-3 border-black pb-1 leading-snug">CHILLAX IS A SPACE TO MEET</p>
                  <p className="border-b-3 border-black pb-1 leading-snug">PEOPLE NATURALLY IN DAEJEON.</p>
                  <p className="border-b-3 border-black pb-1 leading-snug">COME ALONE OR WITH SQUAD.</p>
                </div>

                <p className="text-xs font-mono font-bold leading-relaxed mb-6 text-black/90">
                  Relax and enjoy university life. A zero-pressure space to hang out, share coffee, play games, and recharge after lectures.
                </p>
              </div>

              {/* Barcode & Footer Strip (Reference 1 style) */}
              <div className="pt-4 border-t-3 border-black space-y-3">
                <BarcodeStrip serial="WSU-CHILLAX-COMMUNITY" className="w-full bg-black" />
                <button
                  onClick={() => navigate('/join')}
                  className="w-full bg-black text-[#C6FF00] hover:bg-zinc-900 font-display font-black text-xs py-2.5 uppercase tracking-wider text-center border-2 border-black"
                >
                  JOIN OUR CHILLAX GROUP →
                </button>
              </div>
            </div>

            {/* Card 2: Solid Creative Purple with Starburst Squiggle Sticker (4 cols) */}
            <div className="lg:col-span-4 bg-[#9B5CFF] text-white border-4 border-black p-7 sm:p-8 brutal-shadow flex flex-col justify-between relative">
              
              {/* Starburst Badge with Squiggle (Reference 1) */}
              <div className="absolute -top-6 -right-6 z-20">
                <StarburstBadge size={90} color="lime" squiggleColor="#9B5CFF" rotate="rotate-12" label="CONNECT" />
              </div>

              <div>
                <div className="flex items-center justify-between pb-4 border-b-3 border-black mb-6">
                  <span className="font-mono text-xs font-black tracking-widest uppercase text-black bg-white px-2 py-0.5 border-2 border-black">
                    CROSS CULTURES
                  </span>
                  <span className="font-mono text-xs font-black text-[#C6FF00]">
                    02 // CONNECT
                  </span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tighter text-[#C6FF00] leading-none mb-4">
                  CONNECT IS HERE. <br />
                  <span className="text-white">FRIENDSHIP IS NOW REAL.</span>
                </h3>

                <p className="text-xs sm:text-sm font-sans text-white/90 leading-relaxed mb-6">
                  Meet people and discover different perspectives. Korean and international students sharing foods, languages, and stories side-by-side.
                </p>
              </div>

              <div className="p-4 bg-black/40 border-2 border-black text-xs font-mono text-[#C6FF00] space-y-1">
                <p className="font-bold uppercase">Weekly Activities:</p>
                <p className="text-white">· Language Exchange Coffee</p>
                <p className="text-white">· Global Street Food Night</p>
              </div>
            </div>

            {/* Card 3: Deep Midnight Black with Electric Lime Highlights (3 cols) */}
            <div className="lg:col-span-3 bg-[#0B0B0F] text-white border-4 border-black p-7 brutal-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b-3 border-black mb-6">
                  <span className="font-mono text-xs font-black text-[#4388FF] uppercase">
                    03 // CREATE
                  </span>
                  <Zap className="w-5 h-5 text-[#C6FF00]" />
                </div>

                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-3">
                  HERE IS <br />
                  <span className="text-[#C6FF00] text-3xl">CREATIVE PLAY</span>
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                  Try something new and make memories. From custom sticker workshops to city scavenger hunts and AI prompt jams.
                </p>

                <div className="space-y-2 font-mono text-xs text-zinc-400">
                  <div className="p-2.5 bg-[#22232B] border border-black flex items-center justify-between">
                    <span>Art & Zines</span>
                    <span className="text-[#C6FF00] font-bold">W7 Lab</span>
                  </div>
                  <div className="p-2.5 bg-[#22232B] border border-black flex items-center justify-between">
                    <span>Board Games</span>
                    <span className="text-[#4388FF] font-bold">W1 Lounge</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/about')}
                className="w-full mt-6 brutal-btn bg-[#22232B] hover:bg-[#C6FF00] hover:text-black text-white font-display font-bold text-xs py-3 uppercase transition-colors"
              >
                Read Club Values →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          7.C ACTIVITY CATEGORIES (4 DISTINCTIVE NEO-BRUTALIST CARDS)
         ======================================================== */}
      <section className="py-20 bg-[#0B0B0F] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase bg-black px-2 py-0.5 border border-[#C6FF00]">
                // WHAT WE DO
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
                DIFFERENT INTERESTS. ONE COMMUNITY.
              </h2>
            </div>
            <div className="font-mono text-xs text-zinc-400 flex items-center gap-2">
              <span className="w-3 h-3 bg-[#C6FF00] border border-black inline-block" />
              <span>4 Signature Club Pillars</span>
            </div>
          </div>

          {/* 4 Distinctive Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 01 — GAME & PLAY (Electric Blue Accent) */}
            <div className="bg-[#22232B] border-4 border-black p-6 brutal-shadow flex flex-col justify-between group hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-black text-white bg-[#4388FF] px-2.5 py-0.5 border-2 border-black tracking-wider">
                    01 — GAME & PLAY
                  </span>
                  <Dice5 className="w-6 h-6 text-[#4388FF]" />
                </div>
                <h3 className="font-display font-black text-2xl text-white uppercase mb-3">
                  Play & Games
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Icebreakers, board games, party games, Mario Kart brawls, and friendly challenges.
                </p>
              </div>
              <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Featured Accent:</span>
                <span className="text-[#4388FF] font-black uppercase">Electric Blue</span>
              </div>
            </div>

            {/* 02 — FOOD & CULTURE (Electric Lime Accent) */}
            <div className="bg-[#22232B] border-4 border-black p-6 brutal-shadow flex flex-col justify-between group hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-black text-black bg-[#C6FF00] px-2.5 py-0.5 border-2 border-black tracking-wider">
                    02 — FOOD & CULTURE
                  </span>
                  <UtensilsCrossed className="w-6 h-6 text-[#C6FF00]" />
                </div>
                <h3 className="font-display font-black text-2xl text-white uppercase mb-3">
                  Food & Culture
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Cultural food sharing, spicy tteokbokki cookoffs, traditions, and international cooking experiences.
                </p>
              </div>
              <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Signature Accent:</span>
                <span className="text-[#C6FF00] font-black uppercase">Electric Lime</span>
              </div>
            </div>

            {/* 03 — CREATE & EXPRESS (Creative Purple Accent) */}
            <div className="bg-[#22232B] border-4 border-black p-6 brutal-shadow flex flex-col justify-between group hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-black text-white bg-[#9B5CFF] px-2.5 py-0.5 border-2 border-black tracking-wider">
                    03 — CREATE & EXPRESS
                  </span>
                  <Palette className="w-6 h-6 text-[#9B5CFF]" />
                </div>
                <h3 className="font-display font-black text-2xl text-white uppercase mb-3">
                  Create & Express
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Art, photography, mini zines, custom stickers, music jams, and creative idea-sharing.
                </p>
              </div>
              <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Creative Accent:</span>
                <span className="text-[#9B5CFF] font-black uppercase">Creative Purple</span>
              </div>
            </div>

            {/* 04 — EXPLORE & CHILL (White & Black High Contrast) */}
            <div className="bg-[#22232B] border-4 border-black p-6 brutal-shadow flex flex-col justify-between group hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-black text-black bg-white px-2.5 py-0.5 border-2 border-black tracking-wider">
                    04 — EXPLORE & CHILL
                  </span>
                  <Compass className="w-6 h-6 text-[#C6FF00]" />
                </div>
                <h3 className="font-display font-black text-2xl text-white uppercase mb-3">
                  Explore & Chill
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Café visits, sunset city walks, Hanbat Arboretum picnics, and relaxed Daejeon hangouts.
                </p>
              </div>
              <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Community Accent:</span>
                <span className="text-[#C6FF00] font-black uppercase">Electric Lime</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          7.D UPCOMING EVENTS (NEO-BRUTALIST EVENT CARDS)
         ======================================================== */}
      <section className="py-20 bg-[#22232B] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Category Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase bg-black px-2 py-0.5 border border-black inline-block">
                // UPCOMING GATHERINGS
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
                WHAT'S HAPPENING?
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0B0B0F] border-3 border-black">
              {['All', 'Food', 'Games', 'Creativity', 'Exploration'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedEventCat(cat)}
                  className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-colors whitespace-nowrap ${
                    selectedEventCat === cat
                      ? 'bg-[#C6FF00] text-black font-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((evt) => {
                const isFull = evt.registeredCount >= evt.capacity;
                return (
                  <div
                    key={evt.id}
                    className="bg-[#0B0B0F] border-4 border-black flex flex-col justify-between brutal-shadow hover:border-[#C6FF00] transition-colors group"
                  >
                    <div>
                      {/* Image Poster */}
                      <div className="relative h-52 bg-zinc-900 border-b-4 border-black overflow-hidden">
                        <img
                          src={evt.coverImage}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`text-xs font-mono font-black px-3 py-1 border-2 border-black uppercase ${
                            evt.accentColor === 'purple' 
                              ? 'bg-[#9B5CFF] text-white' 
                              : evt.accentColor === 'blue' 
                                ? 'bg-[#4388FF] text-white' 
                                : 'bg-[#C6FF00] text-black'
                          }`}>
                            {evt.category}
                          </span>
                        </div>
                        {isFull && (
                          <div className="absolute top-3 right-3 bg-black text-[#C6FF00] border-2 border-[#C6FF00] text-xs font-mono px-2.5 py-1 font-black">
                            WAITLIST ONLY
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#C6FF00] font-bold">
                          <Calendar className="w-4 h-4" />
                          <span>{evt.displayDate} · {evt.displayTime}</span>
                        </div>

                        <h3 className="font-display font-black text-xl text-white group-hover:text-[#C6FF00] transition-colors leading-snug">
                          {evt.title}
                        </h3>

                        <p className="text-zinc-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                          {evt.description}
                        </p>

                        <div className="pt-3 text-xs font-mono text-zinc-400 space-y-1.5 border-t-2 border-zinc-800">
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-4 h-4 text-[#C6FF00] shrink-0" />
                            <span className="truncate">{evt.venue}</span>
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <span>Cost: {evt.cost}</span>
                            <span className="font-bold text-white bg-[#22232B] px-2 py-0.5 border border-black">
                              {evt.registeredCount}/{evt.capacity} spots
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="p-6 pt-0">
                      <button
                        onClick={() => navigate(`/events/${evt.slug}`)}
                        className="w-full brutal-btn bg-[#22232B] hover:bg-[#C6FF00] hover:text-black text-white font-display font-black text-xs py-3 uppercase transition-all flex items-center justify-center gap-2"
                      >
                        <span>View Details & RSVP</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 border-4 border-black bg-[#0B0B0F] text-center max-w-xl mx-auto brutal-shadow">
              <Sparkles className="w-8 h-8 text-[#C6FF00] mx-auto mb-3" />
              <h3 className="font-display font-black text-xl text-white uppercase mb-2">
                NEW EXPERIENCES ARE IN THE WORKS.
              </h3>
              <p className="text-zinc-400 text-sm mb-6">
                Good things start with an idea. Check back soon or join the community to hear about upcoming activities.
              </p>
              <button
                onClick={() => navigate('/join')}
                className="brutal-btn-lime px-6 py-2.5 text-xs"
              >
                Join the Community
              </button>
            </div>
          )}

          {/* Full Events Link */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/events')}
              className="brutal-btn-dark font-display font-black text-sm px-8 py-3.5 uppercase tracking-wider inline-flex items-center gap-2.5"
            >
              <span>View Full Events Calendar & Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          7.E FUN ZONE PREVIEW (Interactive Random Fun Generator)
         ======================================================== */}
      <section className="py-20 bg-[#0B0B0F] border-b-4 border-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Header Copy (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase bg-black px-2 py-0.5 border border-[#C6FF00]">
                // INTERACTIVE ARCADE
              </span>
              <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
                BORED? <br />
                <span className="text-black bg-[#C6FF00] px-3 py-1 inline-block border-3 border-black brutal-shadow-lime mt-1">
                  LET'S FIX THAT.
                </span>
              </h2>
              <p className="text-zinc-200 text-base sm:text-lg">
                Pick a mood. Find an activity. Make a memory.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Tired of scrolling on your phone between classes? Test our interactive activity generator to discover solo missions, two-person coffee challenges, or group game sessions right here in Daejeon.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/fun-zone')}
                  className="brutal-btn bg-[#4388FF] hover:bg-[#3478ef] text-white font-display font-black text-sm px-7 py-3.5 uppercase flex items-center gap-2"
                >
                  <span>Open Full Fun Zone & Games</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Interactive Generator Machine (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-[#22232B] border-4 border-black p-6 sm:p-8 brutal-shadow relative">
                
                <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-6">
                  <div className="flex items-center gap-2 font-mono text-xs font-black text-white">
                    <Dice5 className="w-5 h-5 text-[#C6FF00]" />
                    <span>RANDOM FUN GENERATOR (V1.0)</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#C6FF00] bg-black px-2.5 py-0.5 border border-black font-bold">
                    Local Activity Engine
                  </span>
                </div>

                {/* Filter Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-xs font-mono">
                  <div>
                    <label className="text-zinc-400 block mb-1.5 uppercase font-bold">Mood</label>
                    <select
                      value={genMood}
                      onChange={(e) => setGenMood(e.target.value as any)}
                      className="w-full bg-[#0B0B0F] border-2 border-black text-white p-2.5 text-xs font-mono font-bold focus:border-[#C6FF00] outline-hidden"
                    >
                      <option value="Chill">Chill</option>
                      <option value="Energetic">Energetic</option>
                      <option value="Creative">Creative</option>
                      <option value="Social">Social</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1.5 uppercase font-bold">Budget</label>
                    <select
                      value={genBudget}
                      onChange={(e) => setGenBudget(e.target.value as any)}
                      className="w-full bg-[#0B0B0F] border-2 border-black text-white p-2.5 text-xs font-mono font-bold focus:border-[#C6FF00] outline-hidden"
                    >
                      <option value="Free">Free</option>
                      <option value="Low-cost">Low-cost</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1.5 uppercase font-bold">Time</label>
                    <select
                      value={genTime}
                      onChange={(e) => setGenTime(e.target.value as any)}
                      className="w-full bg-[#0B0B0F] border-2 border-black text-white p-2.5 text-xs font-mono font-bold focus:border-[#C6FF00] outline-hidden"
                    >
                      <option value="15 minutes">15 mins</option>
                      <option value="1 hour">1 hour</option>
                      <option value="Half a day">Half day</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1.5 uppercase font-bold">Group</label>
                    <select
                      value={genGroup}
                      onChange={(e) => setGenGroup(e.target.value as any)}
                      className="w-full bg-[#0B0B0F] border-2 border-black text-white p-2.5 text-xs font-mono font-bold focus:border-[#C6FF00] outline-hidden"
                    >
                      <option value="Solo-friendly">Solo</option>
                      <option value="Two people">2 People</option>
                      <option value="Group">Group</option>
                    </select>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleMiniGenerate}
                  className="w-full brutal-btn-lime py-3.5 text-sm uppercase tracking-wider mb-6 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Recommended Activity</span>
                </button>

                {/* Generated Result Card */}
                {generatedActivity && (
                  <div className="bg-[#0B0B0F] border-3 border-black p-5 relative brutal-shadow">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-black text-black bg-[#C6FF00] px-2.5 py-0.5 border border-black uppercase">
                        {generatedActivity.mood} · {generatedActivity.estimatedDuration}
                      </span>
                      <span className="font-mono text-xs text-zinc-300 font-bold">
                        {generatedActivity.budgetCategory}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-xl text-white mb-2">
                      {generatedActivity.title}
                    </h4>

                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {generatedActivity.description}
                    </p>

                    <div className="space-y-1.5 border-t-2 border-zinc-800 pt-3">
                      <p className="font-mono text-[11px] text-zinc-400 uppercase font-bold">
                        Quick Instructions:
                      </p>
                      {generatedActivity.instructions.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200 font-sans">
                          <span className="font-mono text-[#C6FF00] font-black">0{idx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          7.F CULTURE HUB PREVIEW
         ======================================================== */}
      <section className="py-20 bg-[#22232B] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase bg-black px-2 py-0.5 border border-black inline-block">
                // CULTURE HUB PREVIEW
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
                A LITTLE PIECE OF EVERYWHERE.
              </h2>
            </div>
            <p className="text-zinc-300 text-sm max-w-sm">
              Every person has a story, a tradition, or a perspective worth sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Phrase Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#0B0B0F] border-4 border-black p-6 sm:p-8 brutal-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-black text-black bg-[#C6FF00] px-2.5 py-0.5 border border-black uppercase">
                    PHRASE OF THE WEEK
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    Campus Korean
                  </span>
                </div>

                <div className="my-6 p-5 bg-[#22232B] border-3 border-black">
                  <p className="font-display font-black text-2xl sm:text-3xl text-white mb-1">
                    언제 밥 한번 같이 먹어요!
                  </p>
                  <p className="font-mono text-xs text-[#C6FF00] mb-2 font-bold">
                    Eon-je bap han-beon gat-i meog-eo-yo!
                  </p>
                  <p className="text-sm font-bold text-zinc-200">
                    "Let's eat together sometime!"
                  </p>
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6">
                  In Korea, this is the quintessential gesture to show warm feelings and friendship. While often used as casual polite talk, at Chillax Club we turn it into real dinners and snack parties!
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t-2 border-zinc-800">
                <button
                  onClick={() => handlePlayKorean("언제 밥 한번 같이 먹어요!")}
                  className="brutal-btn bg-[#22232B] text-white hover:bg-zinc-800 px-4 py-2.5 text-xs font-mono font-black flex items-center gap-2"
                >
                  <Volume2 className={`w-4 h-4 text-[#C6FF00] ${playingAudio ? 'animate-bounce' : ''}`} />
                  <span>{playingAudio ? 'Playing...' : 'Hear Pronunciation'}</span>
                </button>

                <button
                  onClick={() => navigate('/culture')}
                  className="text-xs font-mono text-[#C6FF00] hover:underline font-black"
                >
                  More Phrases →
                </button>
              </div>
            </div>

            {/* Student Story Spotlight (7 cols) */}
            <div className="lg:col-span-7 bg-[#0B0B0F] border-4 border-black p-6 sm:p-8 brutal-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-black text-white bg-[#9B5CFF] px-2.5 py-0.5 border border-black uppercase">
                    STUDENT STORY SPOTLIGHT
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    Woosong Memories
                  </span>
                </div>

                <h3 className="font-display font-black text-xl sm:text-2xl text-white mb-3">
                  "How a lost subway ride in Daejeon turned into my closest friendship"
                </h3>

                <blockquote className="text-zinc-200 text-sm leading-relaxed italic border-l-4 border-[#C6FF00] pl-4 my-4 bg-[#181920] p-4">
                  "When I arrived at Woosong as an exchange student from Tashkent, I took the wrong bus towards Sintanjin on my second day. A Korean senior noticed my confusion, helped me translate, and we ended up eating hot sundubu-jjigae together. Two semesters later, we co-founded the language exchange nights at Chillax."
                </blockquote>

                <div className="font-mono text-xs text-zinc-400">
                  Written by <span className="text-white font-bold">Azizbek R.</span> (Uzbekistan / Woosong University) & <span className="text-white font-bold">Min-jun K.</span> (Korea)
                </div>
              </div>

              <div className="pt-6 mt-6 border-t-2 border-zinc-800 flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-500">
                  Approved & contributor verified
                </span>
                <button
                  onClick={() => navigate('/culture')}
                  className="brutal-btn bg-[#9B5CFF] text-white font-display font-black text-xs px-5 py-2.5 uppercase hover:bg-[#8b4bee]"
                >
                  Visit Culture Hub
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          7.G GALLERY PREVIEW
         ======================================================== */}
      <section className="py-20 bg-[#0B0B0F] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase bg-black px-2 py-0.5 border border-[#C6FF00]">
                // GALLERY
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
                LITTLE MOMENTS. REAL CONNECTIONS.
              </h2>
            </div>
            <button
              onClick={() => navigate('/gallery')}
              className="text-xs font-mono text-[#C6FF00] hover:underline font-black"
            >
              Browse Complete Gallery ({galleryItems.length} photos) →
            </button>
          </div>

          {/* Photo Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.slice(0, 4).map((item) => (
              <div 
                key={item.id}
                className="bg-[#22232B] border-4 border-black brutal-shadow group overflow-hidden cursor-pointer"
                onClick={() => navigate('/gallery')}
              >
                <div className="relative h-56 bg-zinc-900 overflow-hidden border-b-3 border-black">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-mono font-black bg-black text-[#C6FF00] px-2 py-0.5 border border-black uppercase">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-display font-black text-sm text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-mono text-zinc-400">
                    {item.photographer} · {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Marquee Ticker 2 Before Final CTA */}
      <MarqueeTicker 
        bgColor="bg-[#9B5CFF]" 
        textColor="text-white" 
        text="MEET YOUR PEOPLE · TRY SOMETHING DIFFERENT · FIND YOUR TRIBE · WOOSONG CHILLAX CLUB ·" 
      />

      {/* ========================================================
          7.H FINAL CTA
         ======================================================== */}
      <section className="py-24 bg-[#0B0B0F] relative overflow-hidden text-center border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="inline-block">
            <Sticker text="FALL 2026 RECRUITMENT OPEN" color="lime" rotate="-rotate-2" size="md" />
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter text-white leading-none">
            YOUR NEXT FAVORITE MEMORY <br />
            <span className="text-black bg-[#C6FF00] px-4 py-1 inline-block border-3 border-black brutal-shadow-lime mt-2">
              STARTS HERE.
            </span>
          </h2>

          <p className="text-zinc-200 text-base sm:text-xl max-w-xl mx-auto leading-relaxed">
            Meet someone new. Try something different. Find your people.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/join')}
              className="w-full sm:w-auto brutal-btn-lime px-10 py-4 text-base cursor-pointer flex items-center justify-center gap-2"
            >
              <span>JOIN CHILLAX</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto brutal-btn bg-[#22232B] hover:bg-zinc-800 text-white font-display font-bold text-base px-8 py-4 uppercase tracking-wider cursor-pointer border-3 border-black"
            >
              Questions & FAQ
            </button>
          </div>

          <p className="font-mono text-xs text-zinc-500 pt-3">
            Open to all Woosong University students · No auditions or experience needed
          </p>
        </div>
      </section>

    </div>
  );
};
