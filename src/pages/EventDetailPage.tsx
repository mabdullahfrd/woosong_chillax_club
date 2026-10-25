import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sticker, TapeStrip } from '../components/BrutalGraphics';
import { IMAGES } from '../data/mockData';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Share2, 
  Check, 
  Info,
  CalendarPlus
} from 'lucide-react';

interface EventDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({ slug, navigate }) => {
  const { events, myRsvps, rsvpEvent, cancelRsvp } = useApp();

  const event = events.find(e => e.slug === slug);

  // RSVP Modal & Form states
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpStatusMessage, setRsvpStatusMessage] = useState<{ text: string; isError?: boolean; isSuccess?: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] text-white py-20 px-4">
        <div className="max-w-xl mx-auto text-center bg-[#22232B] border-2 border-black p-10 brutal-shadow space-y-4">
          <AlertCircle className="w-12 h-12 text-[#C6FF00] mx-auto" />
          <h2 className="font-display font-black text-2xl uppercase">Event Not Found</h2>
          <p className="text-zinc-400 text-sm">The event you are looking for does not exist or has been moved.</p>
          <button
            onClick={() => navigate('/events')}
            className="brutal-btn bg-[#C6FF00] text-black font-display font-bold text-xs px-6 py-2.5 uppercase"
          >
            Back to Events Directory
          </button>
        </div>
      </div>
    );
  }

  const isUserRegistered = myRsvps.includes(event.slug);
  const isFull = event.registeredCount >= event.capacity;
  const spotsLeft = Math.max(0, event.capacity - event.registeredCount);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpEmail.trim()) {
      setRsvpStatusMessage({ text: 'Please fill in both your name and email.', isError: true });
      return;
    }
    if (!rsvpEmail.includes('@')) {
      setRsvpStatusMessage({ text: 'Please provide a valid student or university email.', isError: true });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = rsvpEvent(event.slug, { name: rsvpName.trim(), email: rsvpEmail.trim() });
      setIsSubmitting(false);
      if (res.success) {
        setRsvpStatusMessage({ text: res.message, isSuccess: true });
        setRsvpName('');
        setRsvpEmail('');
      } else {
        setRsvpStatusMessage({ text: res.message, isError: true });
      }
    }, 400);
  };

  const handleCancelMyRsvp = () => {
    if (window.confirm("Are you sure you want to cancel your registration? This opens a spot for others.")) {
      cancelRsvp(event.slug, rsvpEmail || 'self');
      setRsvpStatusMessage({ text: "Your registration has been cancelled.", isSuccess: true });
    }
  };

  // Add to Calendar Generator (.ics)
  const downloadICS = () => {
    const formatICSDate = (isoStr: string) => {
      const d = new Date(isoStr);
      return d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const startICS = formatICSDate(event.startTime);
    const endICS = formatICSDate(event.endTime);

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Woosong Chillax Club//Events//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:Woosong Chillax: ${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, " ")}`,
      `LOCATION:${event.venue}`,
      `DTSTART:${startICS}`,
      `DTEND:${endICS}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `chillax-${event.slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/events')}
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-[#C6FF00] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO ALL EVENTS</span>
        </button>

        {/* Hero Card */}
        <div className="bg-[#22232B] border-2 border-black brutal-shadow overflow-hidden mb-10">
          
          <div className="relative h-64 sm:h-80 md:h-96 bg-zinc-900 border-b-2 border-black">
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = IMAGES.campusHangout;
              }}
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="font-mono text-xs font-bold bg-[#C6FF00] text-black px-3 py-1 border border-black uppercase">
                {event.category}
              </span>
              {isFull && (
                <span className="font-mono text-xs font-bold bg-black text-[#C6FF00] border border-[#C6FF00] px-3 py-1">
                  FULL · WAITLIST OPEN
                </span>
              )}
            </div>
            <TapeStrip className="absolute -top-1 right-8" />
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-[#C6FF00]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {event.displayDate}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {event.displayTime}
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-tight">
              {event.title}
            </h1>

            <p className="text-zinc-200 text-base sm:text-lg leading-relaxed">
              {event.description}
            </p>

            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800 text-xs font-mono">
              <div className="p-3 bg-[#0B0B0F] border border-black">
                <span className="text-zinc-500 block mb-0.5">LOCATION</span>
                <span className="text-white font-bold">{event.venue}</span>
              </div>
              <div className="p-3 bg-[#0B0B0F] border border-black">
                <span className="text-zinc-500 block mb-0.5">ADMISSION / COST</span>
                <span className="text-[#C6FF00] font-bold">{event.cost}</span>
              </div>
              <div className="p-3 bg-[#0B0B0F] border border-black">
                <span className="text-zinc-500 block mb-0.5">CAPACITY</span>
                <span className="text-white font-bold">{event.registeredCount} / {event.capacity} Filled ({spotsLeft} Left)</span>
              </div>
            </div>

          </div>
        </div>

        {/* Content Split: Full Details & RSVP Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Full Details, What to bring, Notes (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Full Details */}
            <div className="bg-[#22232B] border-2 border-black p-6 sm:p-8 brutal-shadow space-y-4">
              <h2 className="font-display font-black text-xl uppercase text-white">
                About this Experience
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                {event.fullDetails}
              </p>
              {event.venueNotes && (
                <div className="p-3 bg-[#0B0B0F] border-l-2 border-[#C6FF00] text-xs font-mono text-zinc-300">
                  <span className="text-[#C6FF00] font-bold">Directions / Room note: </span>
                  {event.venueNotes}
                </div>
              )}
            </div>

            {/* What to Bring */}
            {event.whatToBring && event.whatToBring.length > 0 && (
              <div className="bg-[#22232B] border-2 border-black p-6 sm:p-8 brutal-shadow space-y-4">
                <h2 className="font-display font-black text-xl uppercase text-white flex items-center gap-2">
                  <span>What to Bring</span>
                </h2>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {event.whatToBring.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Participation Notes */}
            <div className="bg-[#22232B] border-2 border-black p-6 sm:p-8 brutal-shadow space-y-3">
              <h2 className="font-display font-black text-lg uppercase text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-[#4388FF]" />
                <span>Participation & Accessibility Notes</span>
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {event.participationNotes}
              </p>
            </div>

          </div>

          {/* Right Column: RSVP Registration Card & Calendar Export (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Registration Form Card */}
            <div className="bg-[#0B0B0F] border-2 border-black p-6 sm:p-8 brutal-shadow relative">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-6">
                <span className="font-mono text-xs font-bold text-[#C6FF00] uppercase">
                  RSVP REGISTRATION
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {isFull ? 'Waitlist' : `${spotsLeft} Spots Available`}
                </span>
              </div>

              {isUserRegistered ? (
                <div className="space-y-4 text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-[#C6FF00] mx-auto" />
                  <h3 className="font-display font-black text-xl text-white uppercase">
                    You're Registered!
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm">
                    We have saved a spot for you at this event. Check your email or drop by the lounge on the scheduled day.
                  </p>
                  <button
                    onClick={handleCancelMyRsvp}
                    className="text-xs font-mono text-red-400 hover:text-red-300 underline pt-2"
                  >
                    Need to cancel your spot?
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Park"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full bg-[#22232B] border border-black p-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:border-[#C6FF00] outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                      Student Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="student@wsu.ac.kr"
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      className="w-full bg-[#22232B] border border-black p-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:border-[#C6FF00] outline-hidden"
                      required
                    />
                    <p className="text-[11px] font-mono text-zinc-500 mt-1">
                      Woosong or personal email to send updates
                    </p>
                  </div>

                  {rsvpStatusMessage && (
                    <div className={`p-3 border text-xs font-mono ${
                      rsvpStatusMessage.isError 
                        ? 'bg-red-950/40 border-red-500 text-red-300' 
                        : 'bg-emerald-950/40 border-[#C6FF00] text-[#C6FF00]'
                    }`}>
                      {rsvpStatusMessage.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full brutal-btn text-black font-display font-black text-xs py-3 uppercase tracking-wider transition-colors ${
                      isFull ? 'bg-[#4388FF] text-white hover:bg-[#3277ee]' : 'bg-[#C6FF00] hover:bg-[#b8f000]'
                    }`}
                  >
                    {isSubmitting ? 'Confirming...' : isFull ? 'Join Event Waitlist' : 'Confirm Free RSVP'}
                  </button>

                  <p className="text-[10px] font-mono text-zinc-500 text-center">
                    By registering you agree to attend on time and follow our respectful community code of conduct.
                  </p>
                </form>
              )}
            </div>

            {/* Calendar Export & Share */}
            <div className="bg-[#22232B] border-2 border-black p-5 brutal-shadow space-y-3">
              <span className="font-mono text-xs font-bold text-zinc-400 uppercase block">
                CALENDAR & REMINDERS
              </span>
              <button
                onClick={downloadICS}
                className="w-full brutal-btn bg-[#0B0B0F] hover:bg-zinc-800 text-white font-mono font-bold text-xs py-2.5 flex items-center justify-center gap-2 border border-black"
              >
                <CalendarPlus className="w-4 h-4 text-[#C6FF00]" />
                <span>Add to Calendar (.ics download)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
