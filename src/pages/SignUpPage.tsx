import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sticker, BarcodeStrip, TapeStrip, StarburstBadge } from '../components/BrutalGraphics';
import { ChillaxLogo } from '../components/ChillaxLogo';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  Check, 
  Calendar, 
  User, 
  Mail, 
  BookOpen, 
  HeartHandshake, 
  Download,
  QrCode,
  Tag
} from 'lucide-react';

interface SignUpPageProps {
  navigate: (path: string) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ navigate }) => {
  const { registerMember, events, rsvpEvent } = useApp();

  // Tab mode: 'member' (join club) vs 'activity' (sign up for specific activity)
  const [signUpMode, setSignUpMode] = useState<'member' | 'activity'>('member');

  // Member Sign-Up Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentStatus, setStudentStatus] = useState('Undergraduate');
  const [major, setMajor] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Games and social activities',
    'Food and cultural exchange'
  ]);
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  // Activity RSVP Tab Fields
  const [selectedEventSlug, setSelectedEventSlug] = useState<string>(events[0]?.slug || '');
  const [activityRsvpName, setActivityRsvpName] = useState('');
  const [activityRsvpEmail, setActivityRsvpEmail] = useState('');
  const [activityRsvpNotes, setActivityRsvpNotes] = useState('');

  // Results & Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completedPass, setCompletedPass] = useState<{
    id: string;
    memberPassId: string;
    fullName: string;
    email: string;
    studentStatus: string;
    interests: string[];
    date: string;
  } | null>(null);

  const [activityRsvpSuccess, setActivityRsvpSuccess] = useState<string | null>(null);
  const [copiedPassId, setCopiedPassId] = useState(false);

  const interestOptions = [
    'Games and social activities',
    'Food and cultural exchange',
    'Art and creativity',
    'City exploration',
    'Language exchange',
    'AI and technology'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const validateMemberForm = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!email.trim()) {
      errs.email = 'Please enter your student email.';
    } else if (!email.includes('@')) {
      errs.email = 'Please provide a valid email (e.g. name@wsu.ac.kr).';
    }
    if (selectedInterests.length === 0) {
      errs.interests = 'Please pick at least one activity interest.';
    }
    if (!consent) {
      errs.consent = 'Please agree to the member community consent.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateMemberForm()) return;

    const res = registerMember({
      fullName: fullName.trim(),
      email: email.trim(),
      studentStatus,
      interests: selectedInterests,
      preferredLanguage,
      studentId: studentId.trim(),
      dietaryNotes: dietaryNotes.trim(),
      message: message.trim()
    });

    setCompletedPass({
      id: res.id,
      memberPassId: res.memberPassId,
      fullName: fullName.trim(),
      email: email.trim(),
      studentStatus,
      interests: selectedInterests,
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleActivityRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityRsvpName.trim() || !activityRsvpEmail.trim()) {
      setErrors({ activity: 'Please enter your name and student email.' });
      return;
    }

    const res = rsvpEvent(selectedEventSlug, {
      name: activityRsvpName.trim(),
      email: activityRsvpEmail.trim(),
      notes: activityRsvpNotes.trim()
    });

    if (res.success) {
      const targetEvt = events.find(e => e.slug === selectedEventSlug);
      setActivityRsvpSuccess(`You are confirmed for "${targetEvt?.title || 'Activity'}"! Check your inbox at ${activityRsvpEmail}.`);
      setActivityRsvpName('');
      setActivityRsvpEmail('');
      setActivityRsvpNotes('');
      setErrors({});
    } else {
      setErrors({ activity: res.message });
    }
  };

  const handleCopyPassId = () => {
    if (completedPass?.memberPassId) {
      navigator.clipboard.writeText(completedPass.memberPassId);
      setCopiedPassId(true);
      setTimeout(() => setCopiedPassId(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <span className="font-mono text-xs font-black text-black bg-[#C6FF00] px-3.5 py-1 border-2 border-black tracking-wider uppercase">
              // WOOSONG UNIVERSITY · OFFICIAL SIGN-UP PORTAL
            </span>
            <Sticker text="FREE MEMBERSHIP" color="purple" rotate="-rotate-2" size="sm" />
            <Sticker text="NO AUDITIONS" color="white" rotate="rotate-1" size="sm" />
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            SIGN UP FOR CHILLAX
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Join Woosong University's most welcoming cross-cultural student community. Receive your digital member card, unlock private event invites, or register directly for upcoming Friday activities.
          </p>
        </div>

        {/* Tab Toggle: General Club Member vs Activity RSVP */}
        <div className="flex border-4 border-black bg-[#22232B] p-1.5 brutal-shadow max-w-md">
          <button
            onClick={() => {
              setSignUpMode('member');
              setErrors({});
            }}
            className={`flex-1 py-2.5 font-display font-black text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer ${
              signUpMode === 'member'
                ? 'bg-[#C6FF00] text-black border-2 border-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Club Member Sign-Up
          </button>
          <button
            onClick={() => {
              setSignUpMode('activity');
              setErrors({});
            }}
            className={`flex-1 py-2.5 font-display font-black text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer ${
              signUpMode === 'activity'
                ? 'bg-[#C6FF00] text-black border-2 border-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Activity Sign-Up
          </button>
        </div>

        {/* ========================================================
            TAB 1: CLUB MEMBER SIGN-UP WITH LIVE PASS PREVIEW
           ======================================================== */}
        {signUpMode === 'member' && (
          <div>
            {completedPass ? (
              /* Success: Generated Digital Membership Pass */
              <div className="bg-[#22232B] border-4 border-black p-6 sm:p-10 brutal-shadow space-y-8 text-center">
                
                <div className="w-16 h-16 bg-[#C6FF00] border-3 border-black flex items-center justify-center mx-auto text-black">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div className="space-y-2">
                  <h2 className="font-display font-black text-3xl uppercase text-white">
                    WELCOME TO CHILLAX, {completedPass.fullName.toUpperCase()}!
                  </h2>
                  <p className="text-zinc-300 text-sm max-w-lg mx-auto">
                    Your official club membership pass has been generated. A confirmation note has been recorded for <strong className="text-white">{completedPass.email}</strong>.
                  </p>
                </div>

                {/* Neo-Brutalist Digital Membership Pass Card */}
                <div className="max-w-md mx-auto bg-[#0B0B0F] border-4 border-black p-6 brutal-shadow-lg text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#C6FF00] text-black font-mono text-[10px] font-black px-3 py-1 border-b-2 border-l-2 border-black">
                    OFFICIAL MEMBER
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <ChillaxLogo size="sm" />
                    <div>
                      <p className="font-mono text-xs text-[#C6FF00] font-bold">WOOSONG UNIVERSITY</p>
                      <p className="text-[11px] text-zinc-400 font-mono">Daejeon, South Korea</p>
                    </div>
                  </div>

                  <div className="border-t-2 border-b-2 border-zinc-800 py-3 my-3 space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">MEMBER NAME:</span>
                      <span className="text-white font-bold">{completedPass.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">STATUS:</span>
                      <span className="text-zinc-200">{completedPass.studentStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">PASS ID:</span>
                      <span className="text-[#C6FF00] font-bold tracking-widest">{completedPass.memberPassId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">ISSUED:</span>
                      <span className="text-zinc-400">{completedPass.date}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <BarcodeStrip serial={completedPass.memberPassId} />
                    <button
                      onClick={handleCopyPassId}
                      className="px-2.5 py-1 bg-[#22232B] hover:bg-zinc-800 text-xs font-mono text-zinc-300 border border-zinc-700 flex items-center gap-1.5"
                    >
                      {copiedPassId ? <Check className="w-3.5 h-3.5 text-[#C6FF00]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPassId ? 'Copied' : 'Copy ID'}</span>
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => navigate('/calendar')}
                    className="w-full sm:w-auto brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs sm:text-sm px-6 py-3 uppercase flex items-center justify-center gap-2"
                  >
                    <span>View Activity Calendar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate('/events')}
                    className="w-full sm:w-auto brutal-btn bg-[#0B0B0F] text-white font-display font-black text-xs sm:text-sm px-6 py-3 uppercase"
                  >
                    Browse Meetup Events
                  </button>
                </div>

              </div>
            ) : (
              /* Two Column Layout: Form + Live Pass Preview */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Sign-Up Form (7 cols) */}
                <div className="lg:col-span-7 bg-[#22232B] border-4 border-black p-6 sm:p-8 brutal-shadow relative">
                  <TapeStrip className="absolute -top-1 right-8" />

                  <form onSubmit={handleMemberSubmit} className="space-y-6">
                    
                    <div className="border-b-2 border-black pb-3">
                      <h2 className="font-display font-black text-2xl uppercase text-white">
                        Membership Application Form
                      </h2>
                      <p className="text-zinc-400 text-xs font-mono">
                        Fill in your details below to activate your student membership.
                      </p>
                    </div>

                    {/* Name & Email */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                          Full Name: <span className="text-[#C6FF00]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Min-jun Kim or Sarah Smith"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-[#0B0B0F] border-2 border-black p-3 text-xs sm:text-sm font-mono text-white outline-hidden focus:border-[#C6FF00]"
                        />
                        {errors.fullName && (
                          <p className="text-red-400 font-mono text-xs mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                            Student Email: <span className="text-[#C6FF00]">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="e.g. yourname@wsu.ac.kr"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#0B0B0F] border-2 border-black p-3 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                          />
                          {errors.email && (
                            <p className="text-red-400 font-mono text-xs mt-1">{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                            Student ID (Optional):
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 20261234"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="w-full bg-[#0B0B0F] border-2 border-black p-3 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Student Status & Major */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                          Student Status:
                        </label>
                        <select
                          value={studentStatus}
                          onChange={(e) => setStudentStatus(e.target.value)}
                          className="w-full bg-[#0B0B0F] border-2 border-black p-3 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                        >
                          <option value="Undergraduate">Undergraduate Student</option>
                          <option value="Exchange Student">Exchange / Study Abroad Student</option>
                          <option value="International Student">International Degree Student (Woosong)</option>
                          <option value="Graduate Student">Graduate / Masters Student</option>
                          <option value="Korean Language Institute">Korean Language Institute (KLI)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                          Preferred Language:
                        </label>
                        <select
                          value={preferredLanguage}
                          onChange={(e) => setPreferredLanguage(e.target.value)}
                          className="w-full bg-[#0B0B0F] border-2 border-black p-3 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                        >
                          <option value="English">English</option>
                          <option value="Korean">Korean (한국어)</option>
                          <option value="Both">Both / Bilingual</option>
                          <option value="Other">Other / Learning</option>
                        </select>
                      </div>
                    </div>

                    {/* Interests Selection */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                        What activities do you want to join? <span className="text-[#C6FF00]">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {interestOptions.map((opt) => {
                          const isChecked = selectedInterests.includes(opt);
                          return (
                            <div
                              key={opt}
                              onClick={() => toggleInterest(opt)}
                              className={`p-2.5 border-2 border-black flex items-center gap-2.5 cursor-pointer text-xs font-mono transition-colors ${
                                isChecked 
                                  ? 'bg-[#0B0B0F] border-[#C6FF00] text-[#C6FF00]' 
                                  : 'bg-[#181920] text-zinc-300 hover:border-zinc-500'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}}
                                className="w-3.5 h-3.5 accent-[#C6FF00] cursor-pointer"
                              />
                              <span className="truncate">{opt}</span>
                            </div>
                          );
                        })}
                      </div>
                      {errors.interests && (
                        <p className="text-red-400 font-mono text-xs mt-1">{errors.interests}</p>
                      )}
                    </div>

                    {/* Dietary Preferences */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Dietary Preferences / Allergies (For food events):
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Halal, vegetarian, nut allergy, none..."
                        value={dietaryNotes}
                        onChange={(e) => setDietaryNotes(e.target.value)}
                        className="w-full bg-[#0B0B0F] border-2 border-black p-3 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                      />
                    </div>

                    {/* Consent */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer text-xs font-mono text-zinc-300">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="w-4 h-4 mt-0.5 accent-[#C6FF00] cursor-pointer shrink-0"
                        />
                        <span>
                          I agree to respect fellow club members, embrace cultural diversity, and abide by Woosong University club guidelines.
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-red-400 font-mono text-xs mt-1">{errors.consent}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full brutal-btn-lime py-4 text-sm sm:text-base tracking-wider flex items-center justify-center gap-2 cursor-pointer font-black"
                    >
                      <span>Complete Membership Sign-Up</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                  </form>
                </div>

                {/* Right: Live Digital Member Pass Preview (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-3 bg-[#181920] border-2 border-black font-mono text-xs text-zinc-400 flex items-center justify-between">
                    <span>LIVE DIGITAL PASS PREVIEW</span>
                    <span className="text-[#C6FF00] font-bold">WOOSONG UNIV</span>
                  </div>

                  <div className="bg-[#0B0B0F] border-4 border-black p-6 brutal-shadow-lg space-y-4 relative">
                    <div className="flex items-center justify-between">
                      <ChillaxLogo size="sm" />
                      <span className="font-mono text-[10px] bg-[#C6FF00] text-black px-2 py-0.5 font-bold uppercase border border-black">
                        MEMBER PASS
                      </span>
                    </div>

                    <div className="space-y-1 pt-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">Student Name:</span>
                      <p className="font-display font-black text-xl text-white truncate">
                        {fullName.trim() || 'YOUR NAME HERE'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 font-mono text-xs border-t border-zinc-800 pt-3">
                      <div>
                        <span className="text-zinc-500 text-[10px] block">STATUS:</span>
                        <span className="text-zinc-200">{studentStatus}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] block">CAMPUS:</span>
                        <span className="text-zinc-200">Woosong West</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] block">LANGUAGE:</span>
                        <span className="text-[#C6FF00]">{preferredLanguage}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] block">SEMESTER:</span>
                        <span className="text-zinc-200">Fall 2026</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                      <BarcodeStrip serial="CHILLAX-PASS-PREVIEW" />
                      <div className="w-7 h-7 bg-white text-black flex items-center justify-center border border-black">
                        <QrCode className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#22232B] border-2 border-black space-y-2 font-mono text-xs">
                    <p className="text-white font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#C6FF00]" />
                      <span>Membership Benefits:</span>
                    </p>
                    <ul className="text-zinc-400 space-y-1 list-disc list-inside text-[11px]">
                      <li>Free access to all Friday campus game & food meetups</li>
                      <li>Access to private KakaoTalk and Discord community channels</li>
                      <li>Ability to propose and vote on club activities on the calendar</li>
                      <li>Priority RSVP for limited-capacity cafe walks & workshops</li>
                    </ul>
                  </div>

                </div>

              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 2: UPCOMING ACTIVITY SIGN-UP
           ======================================================== */}
        {signUpMode === 'activity' && (
          <div className="bg-[#22232B] border-4 border-black p-6 sm:p-10 brutal-shadow max-w-2xl mx-auto space-y-6">
            
            <div className="border-b-2 border-black pb-3">
              <h2 className="font-display font-black text-2xl uppercase text-white">
                Register for a Scheduled Activity
              </h2>
              <p className="text-zinc-400 text-xs font-mono">
                Select an upcoming meetup from our campus calendar and reserve your spot instantly.
              </p>
            </div>

            {activityRsvpSuccess ? (
              <div className="p-6 bg-[#0B0B0F] border-2 border-[#C6FF00] space-y-4 text-center font-mono">
                <div className="w-12 h-12 bg-[#C6FF00] border-2 border-black rounded-full flex items-center justify-center mx-auto text-black">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <p className="text-[#C6FF00] font-bold text-sm">
                  {activityRsvpSuccess}
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setActivityRsvpSuccess(null)}
                    className="brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs px-5 py-2.5 uppercase"
                  >
                    Sign Up for Another Activity
                  </button>
                  <button
                    onClick={() => navigate('/calendar')}
                    className="brutal-btn bg-[#181920] text-white font-display font-black text-xs px-5 py-2.5 uppercase border border-black"
                  >
                    Go to Calendar
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleActivityRsvpSubmit} className="space-y-4 font-mono text-xs">
                
                {/* Event Selector Dropdown */}
                <div>
                  <label className="block text-zinc-300 font-bold uppercase mb-1">
                    Select Activity to Join: <span className="text-[#C6FF00]">*</span>
                  </label>
                  <select
                    value={selectedEventSlug}
                    onChange={(e) => setSelectedEventSlug(e.target.value)}
                    className="w-full bg-[#0B0B0F] border-2 border-black p-3 text-white outline-hidden focus:border-[#C6FF00]"
                  >
                    {events.filter(e => !e.isCancelled).map(evt => (
                      <option key={evt.slug} value={evt.slug}>
                        {evt.displayDate} · {evt.title} ({evt.registeredCount}/{evt.capacity} filled)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-bold uppercase mb-1">
                      Full Name: <span className="text-[#C6FF00]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name..."
                      value={activityRsvpName}
                      onChange={(e) => setActivityRsvpName(e.target.value)}
                      className="w-full bg-[#0B0B0F] border-2 border-black p-3 text-white outline-hidden focus:border-[#C6FF00]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-bold uppercase mb-1">
                      Student Email: <span className="text-[#C6FF00]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@wsu.ac.kr"
                      value={activityRsvpEmail}
                      onChange={(e) => setActivityRsvpEmail(e.target.value)}
                      className="w-full bg-[#0B0B0F] border-2 border-black p-3 text-white outline-hidden focus:border-[#C6FF00]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold uppercase mb-1">
                    Dietary or Seating Notes (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian, Halal, attending with a friend..."
                    value={activityRsvpNotes}
                    onChange={(e) => setActivityRsvpNotes(e.target.value)}
                    className="w-full bg-[#0B0B0F] border-2 border-black p-3 text-white outline-hidden focus:border-[#C6FF00]"
                  />
                </div>

                {errors.activity && (
                  <p className="text-red-400 font-bold">{errors.activity}</p>
                )}

                <button
                  type="submit"
                  className="w-full brutal-btn bg-[#C6FF00] text-black font-display font-black text-sm py-3.5 uppercase tracking-wider hover:bg-[#b8f000] cursor-pointer"
                >
                  Confirm Activity Sign-Up
                </button>

              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
