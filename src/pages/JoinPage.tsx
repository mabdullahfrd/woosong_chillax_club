import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sticker, TapeStrip } from '../components/BrutalGraphics';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

interface JoinPageProps {
  navigate: (path: string) => void;
}

export const JoinPage: React.FC<JoinPageProps> = ({ navigate }) => {
  const { submitJoinApplication } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentStatus, setStudentStatus] = useState('Undergraduate');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const interestOptions = [
    "Games and social activities",
    "Food and cultural exchange",
    "Art and creativity",
    "City exploration",
    "Language exchange",
    "AI and technology"
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Please enter your full name";
    if (!email.trim()) {
      newErrors.email = "Please enter your university or student email";
    } else if (!email.includes('@')) {
      newErrors.email = "Please enter a valid email address (e.g. name@wsu.ac.kr)";
    }
    if (selectedInterests.length === 0) {
      newErrors.interests = "Please select at least one interest";
    }
    if (!consent) {
      newErrors.consent = "Please agree to the privacy consent to submit your application";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const res = submitJoinApplication({
      fullName: fullName.trim(),
      email: email.trim(),
      studentStatus,
      interests: selectedInterests,
      preferredLanguage,
      message: message.trim()
    });

    setSubmittedInquiryId(res.id);
  };

  const handleCopyCode = () => {
    if (submittedInquiryId) {
      navigator.clipboard.writeText(submittedInquiryId);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase">
              // MEMBERSHIP APPLICATION
            </span>
            <Sticker text="FREE MEMBERSHIP" color="lime" rotate="-rotate-1" size="sm" />
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            READY TO CHILL WITH US?
          </h1>

          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            You don't need previous experience, a particular skill, or an existing friend group. Tell us a little about yourself and what you'd like to explore.
          </p>
        </div>

        {/* Success Confirmation Card */}
        {submittedInquiryId ? (
          <div className="bg-[#22232B] border-2 border-black p-8 sm:p-12 brutal-shadow space-y-6 text-center">
            <div className="w-16 h-16 bg-[#C6FF00] border-2 border-black rounded-full flex items-center justify-center mx-auto text-black">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-black text-3xl uppercase text-white">
                WELCOME TO CHILLAX, {fullName.toUpperCase()}!
              </h2>
              <p className="text-zinc-300 text-sm max-w-lg mx-auto leading-relaxed">
                Your membership application has been received. Our team will send a welcome note to <strong className="text-white">{email}</strong> within 24 hours with instructions to join the private student KakaoTalk and Discord channels.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 bg-[#0B0B0F] border-2 border-black flex items-center justify-between font-mono text-xs">
              <div className="text-left">
                <span className="text-zinc-500 block">APPLICATION REFERENCE:</span>
                <span className="text-[#C6FF00] font-bold text-sm">{submittedInquiryId}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="p-2 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-400"
                title="Copy reference code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-[#C6FF00]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/events')}
                className="w-full sm:w-auto brutal-btn bg-[#C6FF00] text-black font-display font-bold text-xs sm:text-sm px-6 py-3 uppercase"
              >
                Browse Upcoming Meetups
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full sm:w-auto brutal-btn bg-[#0B0B0F] text-white font-display font-bold text-xs sm:text-sm px-6 py-3 uppercase"
              >
                Back to Homepage
              </button>
            </div>
          </div>
        ) : (
          /* Application Form Card */
          <div className="bg-[#22232B] border-2 border-black p-6 sm:p-10 brutal-shadow relative">
            <TapeStrip className="absolute -top-1 right-8" />

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1.5">
                    Full Name <span className="text-[#C6FF00]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Min-ho Park or Emily Zhang"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full bg-[#0B0B0F] border p-3 text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:border-[#C6FF00] outline-hidden ${
                      errors.fullName ? 'border-red-500' : 'border-black'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-400 font-mono text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1.5">
                    University / Student Email <span className="text-[#C6FF00]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your.name@wsu.ac.kr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-[#0B0B0F] border p-3 text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:border-[#C6FF00] outline-hidden ${
                      errors.email ? 'border-red-500' : 'border-black'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 font-mono text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Student Status & Preferred Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1.5">
                    Student Status
                  </label>
                  <select
                    value={studentStatus}
                    onChange={(e) => setStudentStatus(e.target.value)}
                    className="w-full bg-[#0B0B0F] border border-black p-3 text-xs sm:text-sm font-mono text-white outline-hidden focus:border-[#C6FF00]"
                  >
                    <option value="Undergraduate">Undergraduate Student</option>
                    <option value="Exchange Student">Exchange / Study Abroad Student</option>
                    <option value="International Student">International Degree Student (Woosong)</option>
                    <option value="Graduate Student">Graduate / Masters Student</option>
                    <option value="Korean Language Institute">Korean Language Institute (KLI)</option>
                    <option value="Other">Other Woosong Department</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1.5">
                    Preferred Language for Communication
                  </label>
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full bg-[#0B0B0F] border border-black p-3 text-xs sm:text-sm font-mono text-white outline-hidden focus:border-[#C6FF00]"
                  >
                    <option value="English">English</option>
                    <option value="Korean">Korean (한국어)</option>
                    <option value="Both English & Korean">Both English & Korean</option>
                    <option value="Other">Other (with translation assistance)</option>
                  </select>
                </div>
              </div>

              {/* Interests Multi-Select Checkboxes */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                  What would you like to explore? (Select all that apply) <span className="text-[#C6FF00]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {interestOptions.map((opt) => {
                    const isChecked = selectedInterests.includes(opt);
                    return (
                      <div
                        key={opt}
                        onClick={() => toggleInterest(opt)}
                        className={`p-3 border-2 border-black flex items-center gap-3 cursor-pointer transition-colors ${
                          isChecked ? 'bg-[#0B0B0F] border-[#C6FF00] text-[#C6FF00]' : 'bg-[#181920] text-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 accent-[#C6FF00] cursor-pointer"
                        />
                        <span className="text-xs font-mono font-medium leading-tight">
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {errors.interests && (
                  <p className="text-red-400 font-mono text-xs mt-1.5">{errors.interests}</p>
                )}
              </div>

              {/* Optional Message */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1.5">
                  Optional Message / Anything you'd like us to know?
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you love doing, dietary preferences, or questions you have..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#0B0B0F] border border-black p-3 text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:border-[#C6FF00] outline-hidden"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-mono text-zinc-300">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#C6FF00] cursor-pointer shrink-0"
                  />
                  <span>
                    I consent to Woosong Chillax Club using this information to contact me regarding club activities and events. Private information will never be shared publicly or with third parties.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-red-400 font-mono text-xs mt-1">{errors.consent}</p>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full brutal-btn-lime py-4 text-base tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Membership Application</span>
                <ArrowRight className="w-5 h-5" />
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
