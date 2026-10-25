import React, { useState } from 'react';
import { Sticker, TapeStrip } from '../components/BrutalGraphics';
import { 
  Mail, 
  MapPin, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  // Contact inquiry form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ state (open item index)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who can join Woosong Chillax Club?",
      a: "Any enrolled student at Woosong University, Woosong Culinary Academy, or the Korean Language Institute. Both Korean and international undergraduate, graduate, and exchange students are welcome!"
    },
    {
      q: "Do I need to speak Korean or English fluently?",
      a: "Not at all! Our community is built precisely to be 'less awkward' for people with different language levels. Our activities use visual rules, bilingual volunteers, and practical translation. You will always find someone happy to speak at your pace."
    },
    {
      q: "Do I need experience with games, art, or public speaking?",
      a: "Zero experience needed. If it's a board game night, our friendly game masters explain the rules in 2 minutes before playing. If it's a creative workshop, we provide step-by-step guidance. You can also simply come to observe and enjoy a cup of tea."
    },
    {
      q: "Are Chillax events free?",
      a: "Yes! The majority of our regular on-campus sessions (board games, cultural exchanges, language roulettes, creative sticker jams) are 100% free with snacks provided. For occasional off-campus cafe crawls or food dinners, you only cover your personal coffee or subway fare."
    },
    {
      q: "Can I suggest an activity or workshop idea?",
      a: "Absolutely! Check out the 'Fun Zone' page to submit an activity idea directly to our board. Club members upvote ideas, and our organizer committee reviews them weekly to turn the top-voted ideas into real Friday meetups."
    },
    {
      q: "Can I help organize activities or become a student lead?",
      a: "Yes! We recruit student leads each semester for event facilitation, photography, graphic design, and multilingual welcoming. Mention your interest when filling out the 'Join Us' form or email us."
    },
    {
      q: "How can I request language or accessibility accommodations?",
      a: "All of our primary meetup rooms (W1 Student Center, W3 Lounge, W7 Creative Lab) are elevator-accessible. If you have specific dietary requirements (e.g., halal, vegan, nut allergies) or need accessibility assistance, simply leave a note in your event RSVP form or contact us directly."
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !inquiryMsg.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setInquiryMsg('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase">
              // CONTACT & QUESTIONS
            </span>
            <Sticker text="WE ANSWER IN 24H" color="lime" rotate="rotate-1" size="sm" />
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            GET IN TOUCH & FAQ
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Have questions about an upcoming meetup, room locations, or how to get involved? Drop us a note or check our frequently asked questions below.
          </p>
        </div>

        {/* Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Left Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#22232B] border-2 border-black p-6 sm:p-8 brutal-shadow relative">
            <TapeStrip className="absolute -top-1 left-6" />

            <div className="border-b-2 border-black pb-4 mb-6">
              <h3 className="font-display font-black text-xl uppercase text-white">
                Send an Inquiry to Club Leads
              </h3>
              <p className="text-zinc-400 text-xs font-mono">
                For general questions, collaborations, or campus guidance
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#0B0B0F] border-2 border-black text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#C6FF00] mx-auto" />
                <h4 className="font-display font-black text-xl text-white uppercase">
                  Message Sent!
                </h4>
                <p className="text-zinc-300 text-xs font-mono">
                  Thank you for reaching out. One of our student facilitators will reply to your email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="brutal-btn bg-[#C6FF00] text-black font-mono font-bold text-xs px-4 py-2 uppercase mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-bold uppercase mb-1">
                      Your Name <span className="text-[#C6FF00]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Liam or Ji-eun"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-bold uppercase mb-1">
                      Email Address <span className="text-[#C6FF00]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@wsu.ac.kr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold uppercase mb-1">
                    Topic / Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Question about Friday board game night"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold uppercase mb-1">
                    Your Message <span className="text-[#C6FF00]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can we help? Let us know what you need..."
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs py-3 uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#b8f000]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Chillax</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Physical & Online Hubs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#22232B] border-2 border-black p-6 brutal-shadow space-y-4">
              <h3 className="font-display font-black text-lg uppercase text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C6FF00]" />
                <span>Physical Meeting Hubs</span>
              </h3>
              
              <div className="space-y-3 text-xs font-mono text-zinc-300">
                <div className="p-3 bg-[#0B0B0F] border border-black space-y-1">
                  <p className="text-white font-bold">Woosong West Campus</p>
                  <p className="text-zinc-400">Student Center Building W1, Room 104 & W3 Lounge</p>
                  <p className="text-[#C6FF00]">Every Friday 18:30 KST</p>
                </div>
                <div className="p-3 bg-[#0B0B0F] border border-black space-y-1">
                  <p className="text-white font-bold">Woosong Creative Media Lab W7</p>
                  <p className="text-zinc-400">Media Hall, 2nd Floor (West Campus)</p>
                  <p className="text-[#4388FF]">Selected Creative Jams & Movie Screenings</p>
                </div>
              </div>
            </div>

            <div className="bg-[#22232B] border-2 border-black p-6 brutal-shadow space-y-4">
              <h3 className="font-display font-black text-lg uppercase text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#9B5CFF]" />
                <span>Official Channels</span>
              </h3>
              
              <div className="space-y-2 text-xs font-mono text-zinc-300">
                <div className="p-3 bg-[#0B0B0F] border border-black flex items-center justify-between">
                  <span>General Email</span>
                  <span className="text-[#C6FF00] font-bold">chillax.woosong@gmail.com</span>
                </div>
                <div className="p-3 bg-[#0B0B0F] border border-black flex items-center justify-between">
                  <span>Student Group Chat</span>
                  <span className="text-zinc-400">KakaoTalk Open Chat</span>
                </div>
                <div className="p-3 bg-[#0B0B0F] border border-black flex items-center justify-between">
                  <span>Discord Community</span>
                  <span className="text-zinc-400">Woosong Chillax Server</span>
                </div>
              </div>
              <p className="text-[10px] font-mono text-zinc-500">
                Links to private KakaoTalk and Discord channels are distributed upon application confirmation.
              </p>
            </div>

          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-[#22232B] border-2 border-black p-6 sm:p-10 brutal-shadow">
          <div className="border-b-2 border-black pb-4 mb-8 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-[#C6FF00]" />
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-zinc-400 text-xs font-mono">
                Everything you wanted to know about participating in Woosong Chillax Club
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0B0B0F] border-2 border-black transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-white hover:text-[#C6FF00] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 shrink-0 text-[#C6FF00]" /> : <ChevronDown className="w-5 h-5 shrink-0 text-zinc-500" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed border-t border-zinc-800 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Join Call to Action */}
          <div className="mt-10 pt-8 border-t-2 border-black text-center space-y-3">
            <h3 className="font-display font-black text-xl text-white uppercase">
              Still have a question? Ready to dive in?
            </h3>
            <p className="text-zinc-400 text-xs font-mono">
              Apply online in 2 minutes. No auditions, no fees.
            </p>
            <button
              onClick={() => navigate('/join')}
              className="brutal-btn bg-[#C6FF00] text-black font-display font-bold text-xs px-6 py-2.5 uppercase tracking-wider inline-flex items-center gap-2 hover:bg-[#b8f000]"
            >
              <span>Join Woosong Chillax Club</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
