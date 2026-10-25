import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FUN_ACTIVITIES, ICEBREAKERS, FunActivity, Icebreaker } from '../data/mockData';
import { Sticker, TapeStrip } from '../components/BrutalGraphics';
import { 
  Sparkles, 
  Dice5, 
  MessageSquare, 
  Gamepad2, 
  Lightbulb, 
  Copy, 
  Check, 
  RotateCw, 
  ArrowRight,
  Send,
  ThumbsUp,
  Eraser,
  Trophy,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const FunZonePage: React.FC = () => {
  const { ideas, submitIdea, voteIdea } = useApp();

  const [activeTab, setActiveTab] = useState<'generator' | 'icebreakers' | 'challenges' | 'board'>('generator');

  // ==========================================
  // 1. RANDOM FUN GENERATOR STATE
  // ==========================================
  const [mood, setMood] = useState<FunActivity['mood']>('Chill');
  const [budget, setBudget] = useState<FunActivity['budget']>('Free');
  const [time, setTime] = useState<FunActivity['time']>('1 hour');
  const [groupSize, setGroupSize] = useState<FunActivity['groupSize']>('Group');
  const [currentActivity, setCurrentActivity] = useState<FunActivity>(FUN_ACTIVITIES[0]);

  const handleGenerateActivity = () => {
    // Try exact or partial match
    const candidates = FUN_ACTIVITIES.filter(
      a => a.mood === mood || a.budget === budget || a.time === time || a.groupSize === groupSize
    );
    if (candidates.length > 0) {
      const randomPick = candidates[Math.floor(Math.random() * candidates.length)];
      setCurrentActivity(randomPick);
    } else {
      setCurrentActivity(FUN_ACTIVITIES[Math.floor(Math.random() * FUN_ACTIVITIES.length)]);
    }
  };

  // ==========================================
  // 2. ICEBREAKER GENERATOR STATE
  // ==========================================
  const [iceCategory, setIceCategory] = useState<Icebreaker['category']>('Getting to Know You');
  const filteredIcebreakers = ICEBREAKERS.filter(i => i.category === iceCategory);
  const [iceIndex, setIceIndex] = useState(0);
  const [copiedIce, setCopiedIce] = useState(false);

  const currentIcebreaker = filteredIcebreakers[iceIndex % (filteredIcebreakers.length || 1)] || ICEBREAKERS[0];

  const handleNextIcebreaker = () => {
    setIceIndex(prev => prev + 1);
    setCopiedIce(false);
  };

  const handleCopyIcebreaker = () => {
    navigator.clipboard.writeText(`Chillax Prompt: ${currentIcebreaker.question}`);
    setCopiedIce(true);
    setTimeout(() => setCopiedIce(false), 2000);
  };

  // ==========================================
  // 3. TEAM CHALLENGES: 5 GAMES STATE
  // ==========================================
  const [selectedGame, setSelectedGame] = useState<'language' | 'trivia' | 'story' | 'drawing' | 'scavenger'>('language');

  // Game A: Guess the Language
  const languageQuestions = [
    { phrase: "안녕, 오늘 날씨 정말 좋다!", options: ["Korean", "Japanese", "Mongolian", "Thai"], correct: "Korean", translation: "Hello, the weather is so nice today!" },
    { phrase: "Bugun universitetda darslar juda qiziq bo'ldi.", options: ["Uzbek", "Turkish", "Kazakh", "Azerbaijani"], correct: "Uzbek", translation: "Classes at university were very interesting today." },
    { phrase: "¿Vamos a tomar un café cerca del campus de Woosong?", options: ["Spanish", "Portuguese", "Italian", "French"], correct: "Spanish", translation: "Shall we grab a coffee near the Woosong campus?" },
    { phrase: "Hôm nay chúng mình đi ăn món gì ngon ở Daejeon nhé!", options: ["Vietnamese", "Cambodian", "Indonesian", "Filipino"], correct: "Vietnamese", translation: "Let's go eat something delicious in Daejeon today!" },
    { phrase: "Konnichiwa, konshu no kinyobi ni asobimasho!", options: ["Japanese", "Korean", "Mandarin", "Cantonese"], correct: "Japanese", translation: "Hello, let's hang out this Friday!" }
  ];
  const [langRound, setLangRound] = useState(0);
  const [langScore, setLangScore] = useState(0);
  const [langFeedback, setLangFeedback] = useState<string | null>(null);

  const handleGuessLanguage = (selected: string) => {
    const currentQ = languageQuestions[langRound % languageQuestions.length];
    if (selected === currentQ.correct) {
      setLangScore(prev => prev + 1);
      setLangFeedback(`Correct! That was ${currentQ.correct} ("${currentQ.translation}")`);
    } else {
      setLangFeedback(`Close! That was ${currentQ.correct} ("${currentQ.translation}")`);
    }
  };

  const handleNextLangRound = () => {
    setLangRound(prev => prev + 1);
    setLangFeedback(null);
  };

  // Game B: Cultural Trivia
  const triviaQuestions = [
    {
      q: "Daejeon is famously celebrated in Korea as the city of two things: Science, and which bakery delicacy?",
      options: ["Bread & Pastries (Sung Sim Dang)", "Spicy Ramyeon", "Fried Chicken", "Rice Wine"],
      answer: "Bread & Pastries (Sung Sim Dang)",
      fact: "Sung Sim Dang's Twigim Soboro is so famous that visitors travel across Korea just to buy boxes at Daejeon station!"
    },
    {
      q: "In Korean university dining culture, what does 'Bap Meogeosseoyo?' literally mean?",
      options: ["Have you eaten rice?", "Where are you going?", "Are you ready to study?", "How was your exam?"],
      answer: "Have you eaten rice?",
      fact: "Asking if someone has eaten is the traditional way to ask 'How are you?' and shows caring intention."
    },
    {
      q: "Why do Korean students strictly avoid eating seaweed soup (Miyeok-guk) on exam day?",
      options: ["Because its slippery texture means you will 'slip up'", "It causes sleepiness", "It makes hands cold", "It tastes too salty"],
      answer: "Because its slippery texture means you will 'slip up'",
      fact: "Conversely, they eat sticky rice cakes (Chapssaltteok) or Yeot so the knowledge sticks to their head!"
    }
  ];
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [triviaSelected, setTriviaSelected] = useState<string | null>(null);
  const [triviaScore, setTriviaScore] = useState(0);

  const handleSelectTrivia = (opt: string) => {
    if (triviaSelected) return;
    setTriviaSelected(opt);
    if (opt === triviaQuestions[triviaIndex].answer) {
      setTriviaScore(prev => prev + 1);
    }
  };

  const handleNextTrivia = () => {
    setTriviaIndex((prev) => (prev + 1) % triviaQuestions.length);
    setTriviaSelected(null);
  };

  // Game C: Collaborative Story Building
  const [storySentences, setStorySentences] = useState<string[]>([
    "One rainy Friday afternoon at Woosong West Campus, a mysterious yellow cat was spotted carrying a miniature skateboard...",
    "Three students from Uzbekistan, Korea, and France decided to follow the cat across the crosswalk toward the Woosong campus cafe...",
    "When they pushed open the door, the entire Chillax Club was singing a bilingual version of Bruno Mars while eating spicy dumplings."
  ]);
  const [newSentence, setNewSentence] = useState('');

  const handleAddSentence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSentence.trim()) return;
    setStorySentences(prev => [...prev, newSentence.trim()]);
    setNewSentence('');
  };

  // Game D: Quick Drawing Board Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#C6FF00');
  const [drawPrompt, setDrawPrompt] = useState('Draw your favorite Korean convenience store food in 60s');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0B0B0F';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [selectedGame]);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0B0B0F';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Game E: Campus Scavenger Hunt Checklist
  const [scavengerItems, setScavengerItems] = useState([
    { id: 1, text: "Find the Woosong West Campus Main Clocktower and take a selfie", done: false },
    { id: 2, text: "Spot a cafe cup with handwritten Korean or English on it", done: true },
    { id: 3, text: "Photograph something on campus that is colored Electric Lime (#C6FF00)", done: false },
    { id: 4, text: "Ask someone in the Woosong West Campus lounge what their home city's weather is like", done: false },
    { id: 5, text: "Eat a warm snack from the CU or GS25 on campus with a friend", done: true },
    { id: 6, text: "Find the Chillax club flyer on the student activity board", done: false }
  ]);

  const toggleScavenger = (id: number) => {
    setScavengerItems(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  // ==========================================
  // 4. ACTIVITY IDEA BOARD FORM
  // ==========================================
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDesc, setIdeaDesc] = useState('');
  const [ideaCategory, setIdeaCategory] = useState('Games');
  const [ideaBudget, setIdeaBudget] = useState('Free');
  const [ideaDuration, setIdeaDuration] = useState('1 hour');
  const [ideaSubmitter, setIdeaSubmitter] = useState('');
  const [ideaSuccess, setIdeaSuccess] = useState(false);

  const handleSubmitIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaTitle.trim() || !ideaDesc.trim()) return;

    submitIdea({
      title: ideaTitle.trim(),
      description: ideaDesc.trim(),
      category: ideaCategory,
      budget: ideaBudget,
      duration: ideaDuration,
      submitterName: ideaSubmitter.trim() || 'Anonymous Student'
    });

    setIdeaSuccess(true);
    setIdeaTitle('');
    setIdeaDesc('');
    setIdeaSubmitter('');
    setTimeout(() => setIdeaSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="mb-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase">
              // CHILLAX INTERACTIVE ARCADE
            </span>
            <Sticker text="PLAY & SOCIALIZE" color="blue" rotate="rotate-1" size="sm" />
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            THE FUN ZONE
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Need an icebreaker for a group study, an activity to kill time between lectures, or want to pitch an event idea? Choose a tool below.
          </p>
        </div>

        {/* 4 Feature Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { id: 'generator', label: 'Fun Generator', icon: Dice5, color: 'text-[#C6FF00]' },
            { id: 'icebreakers', label: 'Icebreakers', icon: MessageSquare, color: 'text-[#9B5CFF]' },
            { id: 'challenges', label: 'Team Games', icon: Gamepad2, color: 'text-[#4388FF]' },
            { id: 'board', label: 'Idea Board', icon: Lightbulb, color: 'text-[#C6FF00]' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`brutal-btn p-3.5 sm:p-4 text-left font-display font-bold text-xs sm:text-sm uppercase flex items-center justify-between border-2 border-black ${
                  isActive
                    ? 'bg-[#C6FF00] text-black border-black'
                    : 'bg-[#22232B] text-zinc-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : tab.color}`} />
                  <span className="truncate">{tab.label}</span>
                </div>
                <span className="font-mono text-xs font-bold">→</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            TAB 1: RANDOM FUN GENERATOR
           ======================================================== */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#22232B] border-2 border-black p-6 sm:p-8 brutal-shadow space-y-6">
              <div className="border-b-2 border-black pb-3">
                <h3 className="font-display font-black text-xl uppercase text-white">
                  Activity Generator
                </h3>
                <p className="text-zinc-400 text-xs font-mono">
                  Filter by your real-time situation
                </p>
              </div>

              {/* Mood */}
              <div>
                <label className="text-xs font-mono uppercase text-zinc-300 font-bold block mb-2">
                  What is your vibe?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Chill', 'Energetic', 'Creative', 'Social'] as FunActivity['mood'][]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMood(m)}
                      className={`p-2.5 text-xs font-mono font-bold uppercase border border-black ${
                        mood === m ? 'bg-[#C6FF00] text-black' : 'bg-[#0B0B0F] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="text-xs font-mono uppercase text-zinc-300 font-bold block mb-2">
                  Budget Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Free', 'Low-cost', 'Flexible'] as FunActivity['budget'][]).map((b) => (
                    <button
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`p-2 text-xs font-mono font-bold uppercase border border-black ${
                        budget === b ? 'bg-[#4388FF] text-white' : 'bg-[#0B0B0F] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="text-xs font-mono uppercase text-zinc-300 font-bold block mb-2">
                  Available Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['15 minutes', '1 hour', 'Half a day'] as FunActivity['time'][]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`p-2 text-xs font-mono font-bold uppercase border border-black ${
                        time === t ? 'bg-[#9B5CFF] text-white' : 'bg-[#0B0B0F] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Group Size */}
              <div>
                <label className="text-xs font-mono uppercase text-zinc-300 font-bold block mb-2">
                  Group Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Solo-friendly', 'Two people', 'Group'] as FunActivity['groupSize'][]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGroupSize(g)}
                      className={`p-2 text-xs font-mono font-bold uppercase border border-black ${
                        groupSize === g ? 'bg-white text-black' : 'bg-[#0B0B0F] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerateActivity}
                className="w-full brutal-btn bg-[#C6FF00] text-black font-display font-black text-sm py-3 uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#b8f000]"
              >
                <RotateCw className="w-4 h-4" />
                <span>Spin Random Generator</span>
              </button>
            </div>

            {/* Output Display Card (7 cols) */}
            <div className="lg:col-span-7 bg-[#22232B] border-2 border-black p-6 sm:p-8 brutal-shadow relative">
              <TapeStrip className="absolute -top-1 left-6" />

              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#C6FF00] bg-black px-2.5 py-0.5 border border-black uppercase">
                    {currentActivity.mood}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    {currentActivity.estimatedDuration} · {currentActivity.budgetCategory}
                  </span>
                </div>
                <button
                  onClick={handleGenerateActivity}
                  className="font-mono text-xs text-[#C6FF00] hover:underline flex items-center gap-1 font-bold"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase mb-3">
                {currentActivity.title}
              </h2>

              <p className="text-zinc-200 text-sm leading-relaxed mb-6">
                {currentActivity.description}
              </p>

              <div className="bg-[#0B0B0F] border-2 border-black p-5 space-y-3 mb-6">
                <h4 className="font-mono text-xs uppercase text-[#C6FF00] font-bold">
                  Step-by-Step Instructions:
                </h4>
                <div className="space-y-2">
                  {currentActivity.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <span className="font-mono font-bold text-[#C6FF00] shrink-0">
                        0{idx + 1}.
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {currentActivity.tags.map((t) => (
                  <span key={t} className="font-mono text-[11px] text-zinc-400 bg-[#0B0B0F] px-2 py-0.5 border border-black">
                    #{t}
                  </span>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ========================================================
            TAB 2: ICEBREAKER GENERATOR
           ======================================================== */}
        {activeTab === 'icebreakers' && (
          <div className="max-w-3xl mx-auto bg-[#22232B] border-2 border-black p-6 sm:p-10 brutal-shadow relative">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4 mb-6">
              <span className="font-mono text-xs font-bold text-[#9B5CFF] uppercase">
                // ICEBREAKER QUESTION PROMPTS
              </span>
              <span className="font-mono text-xs text-zinc-400">
                Question {iceIndex + 1}
              </span>
            </div>

            {/* Category Selector Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {(['Getting to Know You', 'Culture', 'Funny', 'Deep Conversations', 'University Life'] as Icebreaker['category'][]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setIceCategory(cat);
                    setIceIndex(0);
                    setCopiedIce(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border transition-colors ${
                    iceCategory === cat
                      ? 'bg-[#9B5CFF] text-white border-black'
                      : 'bg-[#0B0B0F] text-zinc-400 border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Question Card */}
            <div className="bg-[#0B0B0F] border-2 border-black p-8 sm:p-12 brutal-shadow relative mb-8 min-h-56 flex flex-col justify-center">
              <span className="font-mono text-xs text-[#C6FF00] uppercase font-bold mb-3 block">
                {currentIcebreaker.category} Prompt:
              </span>
              <p className="font-display font-black text-2xl sm:text-3xl text-white leading-snug">
                "{currentIcebreaker.question}"
              </p>
              {currentIcebreaker.followUp && (
                <p className="text-xs font-mono text-zinc-400 mt-4 italic border-t border-zinc-800 pt-3">
                  Follow-up: {currentIcebreaker.followUp}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleCopyIcebreaker}
                className="w-full sm:w-auto brutal-btn bg-[#0B0B0F] hover:bg-zinc-800 text-white font-mono font-bold text-xs px-5 py-3 flex items-center justify-center gap-2 border border-black"
              >
                {copiedIce ? <Check className="w-4 h-4 text-[#C6FF00]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedIce ? 'Copied Prompt!' : 'Copy Prompt'}</span>
              </button>

              <button
                onClick={handleNextIcebreaker}
                className="w-full sm:w-auto brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs sm:text-sm px-7 py-3 uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#b8f000]"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 3: TEAM CHALLENGES (5 Playable Games)
           ======================================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-8">
            
            {/* Game Selector Sub-bar */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#22232B] border-2 border-black">
              {[
                { id: 'language', label: '1. Guess the Language' },
                { id: 'trivia', label: '2. Cultural Trivia' },
                { id: 'story', label: '3. Story Building' },
                { id: 'drawing', label: '4. Quick Doodle Canvas' },
                { id: 'scavenger', label: '5. Campus Scavenger Hunt' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGame(g.id as any)}
                  className={`px-3.5 py-2 text-xs font-mono font-bold uppercase transition-colors ${
                    selectedGame === g.id
                      ? 'bg-[#4388FF] text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            {/* Game 1: Guess the Language */}
            {selectedGame === 'language' && (
              <div className="max-w-2xl mx-auto bg-[#22232B] border-2 border-black p-6 sm:p-8 brutal-shadow space-y-6">
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                  <div>
                    <h3 className="font-display font-black text-xl uppercase text-white">
                      Guess the Language
                    </h3>
                    <p className="text-zinc-400 text-xs font-mono">Listen/read the phrase and pick which language it is</p>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#C6FF00] bg-black px-3 py-1 border border-black">
                    Score: {langScore}
                  </div>
                </div>

                <div className="bg-[#0B0B0F] border-2 border-black p-6 text-center space-y-3">
                  <span className="font-mono text-xs text-zinc-500 uppercase">Phrase Round {langRound + 1}</span>
                  <p className="font-display font-bold text-xl sm:text-2xl text-white">
                    "{languageQuestions[langRound % languageQuestions.length].phrase}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {languageQuestions[langRound % languageQuestions.length].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleGuessLanguage(opt)}
                      className="brutal-btn p-3 bg-[#0B0B0F] hover:bg-[#4388FF] hover:text-white text-xs font-mono font-bold text-zinc-200 border border-black uppercase text-center"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {langFeedback && (
                  <div className="p-4 bg-black border border-[#C6FF00] text-xs font-mono text-[#C6FF00] flex items-center justify-between">
                    <span>{langFeedback}</span>
                    <button
                      onClick={handleNextLangRound}
                      className="bg-[#C6FF00] text-black px-3 py-1 font-bold text-xs uppercase hover:bg-white"
                    >
                      Next Phrase →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Game 2: Cultural Trivia */}
            {selectedGame === 'trivia' && (
              <div className="max-w-2xl mx-auto bg-[#22232B] border-2 border-black p-6 sm:p-8 brutal-shadow space-y-6">
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                  <div>
                    <h3 className="font-display font-black text-xl uppercase text-white">
                      Cultural Campus Trivia
                    </h3>
                    <p className="text-zinc-400 text-xs font-mono">Test your knowledge of Korean traditions & Daejeon culture</p>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#C6FF00] bg-black px-3 py-1 border border-black">
                    Score: {triviaScore}
                  </div>
                </div>

                <div className="bg-[#0B0B0F] border-2 border-black p-6 space-y-2">
                  <span className="font-mono text-xs text-[#C6FF00] font-bold">Question {triviaIndex + 1} of {triviaQuestions.length}</span>
                  <p className="font-display font-bold text-lg text-white">
                    {triviaQuestions[triviaIndex].q}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {triviaQuestions[triviaIndex].options.map((opt) => {
                    const isSelected = triviaSelected === opt;
                    const isCorrect = opt === triviaQuestions[triviaIndex].answer;
                    let style = 'bg-[#0B0B0F] text-zinc-200 border-black hover:border-zinc-500';
                    if (triviaSelected) {
                      if (isCorrect) style = 'bg-emerald-950/70 border-[#C6FF00] text-[#C6FF00] font-bold';
                      else if (isSelected) style = 'bg-red-950/70 border-red-500 text-red-300';
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectTrivia(opt)}
                        disabled={!!triviaSelected}
                        className={`w-full p-3 text-left text-xs font-mono border ${style} transition-colors`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {triviaSelected && (
                  <div className="p-4 bg-black border border-zinc-700 text-xs font-mono text-zinc-300 space-y-3">
                    <p className="text-[#C6FF00] font-bold">
                      💡 Cultural Insight: {triviaQuestions[triviaIndex].fact}
                    </p>
                    <button
                      onClick={handleNextTrivia}
                      className="brutal-btn bg-[#C6FF00] text-black px-4 py-2 font-bold text-xs uppercase"
                    >
                      Next Trivia Question →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Game 3: Collaborative Story Building */}
            {selectedGame === 'story' && (
              <div className="max-w-2xl mx-auto bg-[#22232B] border-2 border-black p-6 sm:p-8 brutal-shadow space-y-6">
                <div className="border-b-2 border-black pb-3">
                  <h3 className="font-display font-black text-xl uppercase text-white">
                    Collaborative Story Builder
                  </h3>
                  <p className="text-zinc-400 text-xs font-mono">
                    Each person adds one sentence to create a wild campus tale
                  </p>
                </div>

                <div className="bg-[#0B0B0F] border-2 border-black p-6 max-h-72 overflow-y-auto space-y-3 font-sans text-sm">
                  {storySentences.map((sentence, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-zinc-200 leading-relaxed">
                      <span className="font-mono text-[#C6FF00] text-xs font-bold shrink-0 mt-0.5">
                        [#{idx + 1}]
                      </span>
                      <span>{sentence}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddSentence} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add your sentence to the story..."
                    value={newSentence}
                    onChange={(e) => setNewSentence(e.target.value)}
                    className="flex-1 bg-[#0B0B0F] border border-black p-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:border-[#C6FF00] outline-hidden"
                  />
                  <button
                    type="submit"
                    className="brutal-btn bg-[#C6FF00] text-black px-4 py-2.5 text-xs font-display font-bold uppercase flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>
              </div>
            )}

            {/* Game 4: Drawing Challenges Canvas */}
            {selectedGame === 'drawing' && (
              <div className="max-w-xl mx-auto bg-[#22232B] border-2 border-black p-6 brutal-shadow space-y-4">
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                  <div>
                    <h3 className="font-display font-black text-lg uppercase text-white">
                      Quick Doodle Challenge
                    </h3>
                    <p className="text-xs font-mono text-[#C6FF00] font-bold">
                      Prompt: {drawPrompt}
                    </p>
                  </div>
                  <button
                    onClick={clearCanvas}
                    className="p-1.5 bg-[#0B0B0F] text-zinc-400 hover:text-white border border-black text-xs font-mono flex items-center gap-1"
                    title="Clear Canvas"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                </div>

                {/* Color selector palette */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400">Color:</span>
                  {[
                    { color: '#C6FF00', name: 'Lime' },
                    { color: '#9B5CFF', name: 'Purple' },
                    { color: '#4388FF', name: 'Blue' },
                    { color: '#FFFFFF', name: 'White' },
                    { color: '#FF5C5C', name: 'Red' }
                  ].map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setDrawColor(c.color)}
                      style={{ backgroundColor: c.color }}
                      className={`w-6 h-6 border-2 border-black ${drawColor === c.color ? 'ring-2 ring-white scale-110' : ''}`}
                      title={c.name}
                    />
                  ))}
                </div>

                {/* Canvas element */}
                <div className="border-2 border-black bg-[#0B0B0F] overflow-hidden flex justify-center">
                  <canvas
                    ref={canvasRef}
                    width={480}
                    height={300}
                    onMouseDown={startDraw}
                    onMouseMove={draw}
                    onMouseUp={endDraw}
                    onMouseLeave={endDraw}
                    className="cursor-crosshair w-full max-w-full"
                  />
                </div>
                <p className="text-[11px] font-mono text-zinc-500 text-center">
                  Click and drag to doodle. Great for icebreakers and quick team guessing games!
                </p>
              </div>
            )}

            {/* Game 5: Campus Scavenger Hunt */}
            {selectedGame === 'scavenger' && (
              <div className="max-w-2xl mx-auto bg-[#22232B] border-2 border-black p-6 sm:p-8 brutal-shadow space-y-6">
                <div className="border-b-2 border-black pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-black text-xl uppercase text-white">
                      Woosong Campus Scavenger Checklist
                    </h3>
                    <p className="text-zinc-400 text-xs font-mono">
                      Explore Woosong West Campus & Daejeon icons
                    </p>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#C6FF00] bg-black px-3 py-1 border border-black">
                    {scavengerItems.filter(i => i.done).length} / {scavengerItems.length} Done
                  </div>
                </div>

                <div className="space-y-2.5">
                  {scavengerItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleScavenger(item.id)}
                      className={`p-3.5 border-2 border-black flex items-center gap-3 cursor-pointer transition-colors ${
                        item.done ? 'bg-[#0B0B0F] text-zinc-400 line-through' : 'bg-[#181920] text-white hover:border-[#C6FF00]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => {}}
                        className="w-4 h-4 accent-[#C6FF00] cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm font-sans font-medium">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================
            TAB 4: ACTIVITY IDEA BOARD
           ======================================================== */}
        {activeTab === 'board' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Submit Idea Form (5 cols) */}
            <div className="lg:col-span-5 bg-[#22232B] border-2 border-black p-6 sm:p-8 brutal-shadow space-y-5">
              <div className="border-b-2 border-black pb-3">
                <h3 className="font-display font-black text-xl uppercase text-white">
                  Pitch an Activity
                </h3>
                <p className="text-zinc-400 text-xs font-mono">
                  Got an idea for a meetup or workshop? Pitch it directly to the club organizers.
                </p>
              </div>

              {ideaSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-[#C6FF00] text-xs font-mono text-[#C6FF00]">
                  ✓ Idea submitted successfully! Organizers will review it in the next meeting.
                </div>
              )}

              <form onSubmit={handleSubmitIdea} className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase text-zinc-300 font-bold block mb-1">
                    Activity Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sunset Picnic at Expo Bridge"
                    value={ideaTitle}
                    onChange={(e) => setIdeaTitle(e.target.value)}
                    className="w-full bg-[#0B0B0F] border border-black p-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:border-[#C6FF00] outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-300 font-bold block mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What would we do? What makes it fun?"
                    value={ideaDesc}
                    onChange={(e) => setIdeaDesc(e.target.value)}
                    className="w-full bg-[#0B0B0F] border border-black p-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:border-[#C6FF00] outline-hidden"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <label className="text-zinc-400 block mb-1 uppercase font-bold">Category</label>
                    <select
                      value={ideaCategory}
                      onChange={(e) => setIdeaCategory(e.target.value)}
                      className="w-full bg-[#0B0B0F] border border-black text-white p-2 text-xs font-mono outline-hidden"
                    >
                      <option value="Games">Games</option>
                      <option value="Food">Food</option>
                      <option value="Creativity">Creativity</option>
                      <option value="Exploration">Exploration</option>
                      <option value="Social">Social</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1 uppercase font-bold">Estimated Cost</label>
                    <input
                      type="text"
                      placeholder="e.g. Free or ₩5,000"
                      value={ideaBudget}
                      onChange={(e) => setIdeaBudget(e.target.value)}
                      className="w-full bg-[#0B0B0F] border border-black text-white p-2 text-xs font-mono outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-300 font-bold block mb-1">
                    Your Name or Nickname (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Min-woo or Sarah"
                    value={ideaSubmitter}
                    onChange={(e) => setIdeaSubmitter(e.target.value)}
                    className="w-full bg-[#0B0B0F] border border-black p-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:border-[#C6FF00] outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs py-3 uppercase tracking-wider hover:bg-[#b8f000]"
                >
                  Submit Activity Idea
                </button>
              </form>
            </div>

            {/* Ideas List & Upvoting (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <h3 className="font-display font-black text-xl uppercase text-white">
                  Student Submitted Ideas ({ideas.length})
                </h3>
                <span className="font-mono text-xs text-zinc-400">
                  Upvote ideas you want Chillax to host!
                </span>
              </div>

              <div className="space-y-4">
                {ideas.map((idea) => (
                  <div
                    key={idea.id}
                    className="bg-[#22232B] border-2 border-black p-5 brutal-shadow flex items-start justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold bg-[#0B0B0F] text-[#C6FF00] px-2 py-0.5 border border-black uppercase">
                          {idea.category}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          Status: {idea.status}
                        </span>
                      </div>
                      <h4 className="font-display font-black text-lg text-white">
                        {idea.title}
                      </h4>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                        {idea.description}
                      </p>
                      <p className="text-[11px] font-mono text-zinc-400">
                        Suggested by {idea.submitterName} · Budget: {idea.budget}
                      </p>
                    </div>

                    <button
                      onClick={() => voteIdea(idea.id)}
                      className="brutal-btn bg-[#0B0B0F] hover:bg-[#C6FF00] hover:text-black text-white p-3 border border-black flex flex-col items-center justify-center shrink-0 min-w-14"
                      title="Vote for this idea"
                    >
                      <ThumbsUp className="w-4 h-4 mb-1" />
                      <span className="font-mono text-xs font-bold">{idea.votes}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
