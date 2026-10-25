import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CultureItem } from '../data/mockData';
import { Sticker, TapeStrip } from '../components/BrutalGraphics';
import { 
  Search, 
  Volume2, 
  Globe2, 
  BookOpen, 
  UtensilsCrossed, 
  Sparkles, 
  MessageCircle, 
  Plus, 
  X,
  Share2
} from 'lucide-react';

export const CultureHubPage: React.FC = () => {
  const { cultureStories, submitStory } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'phrases' | 'food' | 'tradition' | 'story' | 'exchange'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Submit Story Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyContext, setStoryContext] = useState('');
  const [storyContributor, setStoryContributor] = useState('');
  const [storyCountry, setStoryCountry] = useState('');
  const [storySuccess, setStorySuccess] = useState(false);

  const handleAudioSpeak = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      setPlayingId(id);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredItems = cultureStories.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.koreanText && item.koreanText.includes(searchQuery)) ||
      (item.translation && item.translation.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle.trim() || !storyContext.trim()) return;

    submitStory({
      category: 'story',
      title: storyTitle.trim(),
      context: storyContext.trim(),
      contributor: storyContributor.trim() || 'Anonymous Student',
      contributorCountry: storyCountry.trim() || 'International',
      tags: ['Student Story', 'Woosong Life']
    });

    setStorySuccess(true);
    setTimeout(() => {
      setStorySuccess(false);
      setIsModalOpen(false);
      setStoryTitle('');
      setStoryContext('');
      setStoryContributor('');
      setStoryCountry('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase">
                // CULTURE & STORIES HUB
              </span>
              <Sticker text="PEOPLE & CULTURES" color="purple" rotate="-rotate-1" size="sm" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
              A LITTLE PIECE OF EVERYWHERE.
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Every student who arrives at Woosong brings recipes, sayings, and unique viewpoints. Explore useful Korean campus phrases, local Daejeon traditions, and personal student stories.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="brutal-btn bg-[#C6FF00] text-black font-display font-bold text-xs sm:text-sm px-5 py-3 uppercase flex items-center gap-2 shrink-0 hover:bg-[#b8f000]"
          >
            <Plus className="w-4 h-4" />
            <span>Share Your Culture Story</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#22232B] border-2 border-black p-4 brutal-shadow mb-10 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search phrases, traditions, or stories by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0B0F] border border-black pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:border-[#C6FF00] outline-hidden"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-zinc-800 pt-3">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'phrases', label: 'Survival Phrases' },
              { id: 'food', label: 'Food & Cooking' },
              { id: 'tradition', label: 'Traditions' },
              { id: 'story', label: 'Student Stories' },
              { id: 'exchange', label: 'Exchange Topics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#C6FF00] text-black border-black'
                    : 'bg-[#0B0B0F] text-zinc-400 border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isPhrase = item.category === 'phrases';
            return (
              <div
                key={item.id}
                className="bg-[#22232B] border-2 border-black p-6 brutal-shadow flex flex-col justify-between group hover:border-[#C6FF00] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] font-bold bg-[#0B0B0F] text-[#C6FF00] px-2 py-0.5 border border-black uppercase">
                      {item.category}
                    </span>
                    {item.contributor && (
                      <span className="font-mono text-[11px] text-zinc-400">
                        By {item.contributor} {item.contributorCountry ? `(${item.contributorCountry})` : ''}
                      </span>
                    )}
                  </div>

                  {/* Phrase Block if applicable */}
                  {isPhrase && item.koreanText && (
                    <div className="my-3 p-4 bg-[#0B0B0F] border border-black space-y-1">
                      <p className="font-display font-black text-2xl text-white">
                        {item.koreanText}
                      </p>
                      <p className="font-mono text-xs text-[#C6FF00]">
                        {item.pronunciation}
                      </p>
                      <p className="text-xs text-zinc-300 font-semibold italic">
                        "{item.translation}"
                      </p>
                    </div>
                  )}

                  <h3 className="font-display font-black text-lg text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.context}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
                  {isPhrase && item.koreanText ? (
                    <button
                      onClick={() => handleAudioSpeak(item.koreanText!, item.id)}
                      className="brutal-btn bg-[#0B0B0F] hover:bg-zinc-800 text-white px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold"
                    >
                      <Volume2 className={`w-3.5 h-3.5 text-[#C6FF00] ${playingId === item.id ? 'animate-bounce' : ''}`} />
                      <span>{playingId === item.id ? 'Speaking...' : 'Pronounce'}</span>
                    </button>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map(t => (
                        <span key={t} className="text-[10px] text-zinc-500">#{t}</span>
                      ))}
                    </div>
                  )}
                  <span className="text-[10px] text-zinc-500">Woosong Chillax</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal: Submit a Student Story */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-[#22232B] border-2 border-black max-w-lg w-full p-6 sm:p-8 brutal-shadow relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 border-b-2 border-black pb-3">
                <span className="font-mono text-xs text-[#C6FF00] uppercase font-bold">
                  // COMMUNITY CONTRIBUTIONS
                </span>
                <h3 className="font-display font-black text-xl text-white uppercase mt-1">
                  Share Your Story or Cultural Tradition
                </h3>
              </div>

              {storySuccess ? (
                <div className="p-4 bg-emerald-950/70 border border-[#C6FF00] text-[#C6FF00] text-xs font-mono text-center">
                  Thank you! Your story has been submitted and shared with the Chillax community.
                </div>
              ) : (
                <form onSubmit={handleStorySubmit} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-zinc-300 font-bold uppercase mb-1">
                      Story Title / Tradition Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. My first night eating hot pot with my dorm roommate"
                      value={storyTitle}
                      onChange={(e) => setStoryTitle(e.target.value)}
                      className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-300 font-bold uppercase mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Leila or Min-ho"
                        value={storyContributor}
                        onChange={(e) => setStoryContributor(e.target.value)}
                        className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-bold uppercase mb-1">
                        Country / Hometown
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kazakhstan, Japan, etc."
                        value={storyCountry}
                        onChange={(e) => setStoryCountry(e.target.value)}
                        className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-bold uppercase mb-1">
                      Your Story or Cultural Insight
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us what happened, what was surprising, or why this custom means a lot to you..."
                      value={storyContext}
                      onChange={(e) => setStoryContext(e.target.value)}
                      className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                      required
                    />
                  </div>

                  <p className="text-[10px] text-zinc-500">
                    All submissions are reviewed by student moderators to prevent stereotypes and ensure respect.
                  </p>

                  <button
                    type="submit"
                    className="w-full brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs py-3 uppercase tracking-wider hover:bg-[#b8f000]"
                  >
                    Submit Story for Community
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
