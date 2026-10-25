import React from 'react';
import { ChillaxLogo } from '../components/ChillaxLogo';
import { Sticker, StarburstBadge, BarcodeStrip, MarqueeTicker, TapeStrip, BackgroundGraffitiDoodle } from '../components/BrutalGraphics';
import { IMAGES } from '../data/mockData';
import { 
  Heart, 
  Sparkles, 
  Globe2, 
  Compass, 
  Users2, 
  Bot, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const values = [
    {
      name: "Belonging",
      desc: "Everyone has a seat at our table — whether you come alone, speak fluent Korean, or only know three words.",
      icon: Heart,
      color: "border-[#C6FF00] text-[#C6FF00]"
    },
    {
      name: "Curiosity",
      desc: "Ask the questions you were always hesitant to ask about each other's music, hometowns, and customs.",
      icon: Compass,
      color: "border-[#4388FF] text-[#4388FF]"
    },
    {
      name: "Creativity",
      desc: "Express yourself through art, game design, stickers, cooking, photography, and storytelling.",
      icon: Sparkles,
      color: "border-[#9B5CFF] text-[#9B5CFF]"
    },
    {
      name: "Respect",
      desc: "Honoring cultural nuances, personal boundaries, and different comfort levels with warmth and kindness.",
      icon: ShieldCheck,
      color: "border-[#C6FF00] text-[#C6FF00]"
    },
    {
      name: "Connection",
      desc: "Turning momentary campus encounters into long-term friendships that last far beyond graduation.",
      icon: Users2,
      color: "border-[#4388FF] text-[#4388FF]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white overflow-hidden">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-24 border-b-4 border-black bg-[#0B0B0F] relative overflow-hidden">
        <BackgroundGraffitiDoodle className="top-0 -right-20 w-[600px] h-[500px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase">
              // ABOUT WOOSONG CHILLAX CLUB
            </span>
            <Sticker text="CHILL + RELAX" color="lime" rotate="rotate-1" size="sm" />
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter text-white max-w-4xl leading-none">
            MORE THAN A CLUB. <br />
            <span className="text-[#C6FF00]">A PLACE TO BELONG.</span>
          </h1>

          <p className="mt-6 text-zinc-300 text-lg sm:text-xl max-w-2xl leading-relaxed">
            Chillax is a creative, social, and student-first community at Woosong University in Daejeon, South Korea, where Korean and international students connect through shared activities, cultures, and real experiences.
          </p>

        </div>
      </section>

      {/* Origin & Meaning of Chillax */}
      <section className="py-16 sm:py-20 bg-[#22232B] border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase">
                THE FOUNDATION
              </span>

              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
                Where "Chill" Meets "Relax"
              </h2>

              <p className="text-zinc-300 text-base leading-relaxed">
                University life in Korea is rewarding, but it can also be fast-paced and intimidating — especially when navigating language differences, unfamiliar systems, or studying far from home.
              </p>

              <p className="text-zinc-300 text-base leading-relaxed">
                The name <strong className="text-[#C6FF00] font-bold">CHILLAX</strong> was born from a simple promise: <em className="text-white">Chill + Relax</em>. We wanted to create an antidote to stiff, formal student clubs. No auditions, no hierarchical seniority barriers, and no pressure to already be an extrovert.
              </p>

              <div className="p-5 bg-[#0B0B0F] border-2 border-black brutal-shadow space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-[#C6FF00] font-bold uppercase">
                    Official Brand Wordmark:
                  </p>
                  <span className="text-[10px] font-mono bg-black text-[#C6FF00] border border-[#C6FF00] px-2 py-0.5">
                    APPROVED SIGNATURE
                  </span>
                </div>
                <div className="py-2">
                  <ChillaxLogo size="lg" />
                </div>
                <p className="font-display font-black text-2xl text-white">
                  "Chill Together. Connect Across Cultures."
                </p>
                <p className="text-zinc-400 text-xs font-mono">
                  Daejeon, South Korea · Woosong University West Campus
                </p>
              </div>
            </div>

            {/* Right Photo Frame (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                <div className="absolute inset-0 bg-[#9B5CFF] border-2 border-black translate-x-3 translate-y-3 brutal-shadow-lg" />
                <div className="relative bg-[#0B0B0F] border-2 border-black overflow-hidden z-10">
                  <img
                    src={IMAGES.campusHangout}
                    alt="Students hanging out in the club lounge"
                    className="w-full h-80 object-cover"
                  />
                  <TapeStrip className="absolute -top-1 left-4 z-20" />
                  <div className="p-4 bg-[#0B0B0F] border-t-2 border-black text-xs font-mono text-zinc-300 flex items-center justify-between">
                    <span>West Campus Lounge Meetup</span>
                    <span className="text-[#C6FF00] font-bold">Daejeon, 2026</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Mission & Vision Split */}
      <section className="py-20 bg-[#0B0B0F] border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission */}
            <div className="bg-[#22232B] border-2 border-black p-8 sm:p-10 brutal-shadow relative">
              <div className="inline-block bg-[#C6FF00] text-black font-mono font-bold text-xs px-3 py-1 mb-6 border border-black uppercase">
                OUR MISSION
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase mb-4">
                Accessible Connection & Fun
              </h3>
              <p className="text-zinc-300 text-base leading-relaxed">
                "To create an inclusive campus community where students connect across cultures through fun, creativity, and shared experiences, with AI helping make participation more accessible and activities more personalized."
              </p>
            </div>

            {/* Vision */}
            <div className="bg-[#22232B] border-2 border-black p-8 sm:p-10 brutal-shadow relative">
              <div className="inline-block bg-[#4388FF] text-white font-mono font-bold text-xs px-3 py-1 mb-6 border border-black uppercase">
                OUR VISION
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase mb-4">
                No Student Walks Alone
              </h3>
              <p className="text-zinc-300 text-base leading-relaxed">
                "A campus where no student feels they have to experience university life alone, and where cultural differences become opportunities for friendship and discovery."
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5 Core Values */}
      <section className="py-20 bg-[#22232B] border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14">
            <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase">
              // WHAT GUIDES US
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white mt-1">
              OUR FIVE CORE VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div
                  key={v.name}
                  className="bg-[#0B0B0F] border-2 border-black p-6 brutal-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-zinc-500">
                        0{i + 1}
                      </span>
                      <IconComp className={`w-5 h-5 ${v.color.split(' ')[1]}`} />
                    </div>
                    <h3 className="font-display font-black text-xl text-white uppercase mb-2">
                      {v.name}
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* The Role of AI — Human Connection First */}
      <section className="py-20 bg-[#0B0B0F] border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#22232B] border-2 border-black p-8 sm:p-12 brutal-shadow relative">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#C6FF00]" />
                <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase">
                  PRACTICAL TECHNOLOGY PHILOSOPHY
                </span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-4xl uppercase text-white">
                How AI Supports Real-World Connection
              </h2>

              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                Chillax uses AI as a practical backstage tool, not as a replacement for human warmth. Technology should lower social anxiety and break down language walls so people can talk face-to-face.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs font-mono text-zinc-300">
                <div className="p-4 bg-[#0B0B0F] border border-black">
                  <p className="text-[#C6FF00] font-bold mb-1">01. Multilingual Support</p>
                  <p className="text-zinc-400">Translating event flyers and conversation prompts so everyone can participate equally.</p>
                </div>
                <div className="p-4 bg-[#0B0B0F] border border-black">
                  <p className="text-[#4388FF] font-bold mb-1">02. Activity Recommendations</p>
                  <p className="text-zinc-400">Custom activity generators matching mood, time, and budget to cure campus boredom.</p>
                </div>
                <div className="p-4 bg-[#0B0B0F] border border-black">
                  <p className="text-[#9B5CFF] font-bold mb-1">03. Human-First Boundary</p>
                  <p className="text-zinc-400">AI never generates fake members, fake reviews, or replaces real student friendships.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Marquee Ticker */}
      <MarqueeTicker 
        bgColor="bg-[#C6FF00]" 
        textColor="text-black" 
        text="WOOSONG CHILLAX CLUB · CHILL TOGETHER · CONNECT ACROSS CULTURES · DAEJEON KOREA ·" 
      />

      {/* Ready to join CTA */}
      <section className="py-20 bg-[#0B0B0F] text-center border-b-4 border-black">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white">
            WE HAVE A SPOT WAITING FOR YOU.
          </h2>
          <p className="text-zinc-300 text-sm">
            No membership fee. No stressful requirements. Just come chill.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/join')}
              className="brutal-btn-lime px-9 py-4 text-sm inline-flex items-center gap-2"
            >
              <span>Join Chillax Community</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
