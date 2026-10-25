import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GalleryItem, IMAGES } from '../data/mockData';
import { Sticker, TapeStrip } from '../components/BrutalGraphics';
import { 
  Heart, 
  Image as ImageIcon, 
  Camera, 
  X, 
  Check, 
  Filter, 
  ShieldCheck, 
  Upload,
  Sparkles
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { galleryItems, likePhoto, submitPhoto } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // Submit Photo Modal State
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPhotographer, setNewPhotographer] = useState('');
  const [newCategory, setNewCategory] = useState<GalleryItem['category']>('Campus Life');
  const [newCaption, setNewCaption] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = ['All', 'Events', 'Food Nights', 'Creative Arts', 'Campus Life'];

  const filteredPhotos = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const handlePhotoUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCaption.trim()) return;

    // Use one of our authentic local club imagery assets for the submission simulation
    const randomAsset = [
      IMAGES.campusHangout,
      IMAGES.culturalFood,
      IMAGES.creativeJam,
      IMAGES.daejeonExplore
    ][Math.floor(Math.random() * 4)];

    submitPhoto({
      title: newTitle.trim(),
      category: newCategory,
      imageUrl: randomAsset,
      date: "October 2026",
      photographer: newPhotographer.trim() || 'Student Contributor',
      caption: newCaption.trim()
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitOpen(false);
      setNewTitle('');
      setNewPhotographer('');
      setNewCaption('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase">
                // MEMORY REPOSITORY
              </span>
              <Sticker text="REAL MOMENTS" color="lime" rotate="rotate-2" size="sm" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
              LITTLE MOMENTS. REAL CONNECTIONS.
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Snapshots from our weekly game nights, food exchanges, cafe crawls, and creative zine jams across Daejeon. Every photo displayed has photo permission confirmed.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitOpen(true)}
            className="brutal-btn bg-[#C6FF00] text-black font-display font-bold text-xs sm:text-sm px-5 py-3 uppercase flex items-center gap-2 shrink-0 hover:bg-[#b8f000]"
          >
            <Camera className="w-4 h-4" />
            <span>Submit Club Photo</span>
          </button>
        </div>

        {/* Filter Category Bar */}
        <div className="bg-[#22232B] border-2 border-black p-4 brutal-shadow mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-zinc-400 mr-2">FILTER:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#C6FF00] text-black border-black'
                    : 'bg-[#0B0B0F] text-zinc-400 border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6FF00]" />
            <span>Permission verified on file</span>
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              className="bg-[#22232B] border-2 border-black brutal-shadow flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Photo container */}
                <div 
                  className="relative h-64 bg-zinc-900 border-b-2 border-black overflow-hidden cursor-pointer"
                  onClick={() => setSelectedPhoto(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-mono font-bold bg-[#0B0B0F] text-[#C6FF00] px-2.5 py-0.5 border border-black uppercase">
                      {item.category}
                    </span>
                  </div>
                  <TapeStrip className="absolute -top-1 right-4" />
                </div>

                {/* Info */}
                <div className="p-5 space-y-2">
                  <h3 className="font-display font-black text-lg text-white group-hover:text-[#C6FF00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Bottom Meta Bar */}
              <div className="p-5 pt-0 flex items-center justify-between text-xs font-mono text-zinc-400 border-t border-zinc-800/60 mt-3 pt-3">
                <div>
                  <span className="text-white font-medium">{item.photographer}</span> · {item.date}
                </div>
                <button
                  onClick={() => likePhoto(item.id)}
                  className="flex items-center gap-1.5 hover:text-red-400 transition-colors p-1"
                  title="Appreciate this moment"
                >
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                  <span>{item.likes}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-[#22232B] border-2 border-black max-w-3xl w-full brutal-shadow-lg relative overflow-hidden">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 bg-black text-white p-2 border border-black hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[60vh] bg-black flex items-center justify-center border-b-2 border-black">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#C6FF00] bg-black px-2 py-0.5 border border-black uppercase">
                    {selectedPhoto.category}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    Photographed by {selectedPhoto.photographer} · {selectedPhoto.date}
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl text-white">
                  {selectedPhoto.title}
                </h3>

                <p className="text-zinc-200 text-sm leading-relaxed">
                  {selectedPhoto.caption}
                </p>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1 text-[#C6FF00]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Student Photo Consent Approved
                  </span>
                  <button
                    onClick={() => likePhoto(selectedPhoto.id)}
                    className="brutal-btn bg-[#0B0B0F] text-white px-3 py-1 flex items-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                    <span>Appreciate ({selectedPhoto.likes})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Submit a Photo */}
        {isSubmitOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-[#22232B] border-2 border-black max-w-lg w-full p-6 sm:p-8 brutal-shadow relative">
              <button
                onClick={() => setIsSubmitOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 border-b-2 border-black pb-3">
                <span className="font-mono text-xs text-[#C6FF00] uppercase font-bold">
                  // COMMUNITY ARCHIVE
                </span>
                <h3 className="font-display font-black text-xl text-white uppercase mt-1">
                  Submit a Chillax Club Photo
                </h3>
              </div>

              {submitSuccess ? (
                <div className="p-4 bg-emerald-950/70 border border-[#C6FF00] text-[#C6FF00] text-xs font-mono text-center">
                  Photo submitted! Added to the gallery.
                </div>
              ) : (
                <form onSubmit={handlePhotoUploadSubmit} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-zinc-300 font-bold uppercase mb-1">
                      Photo Title / Moment Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Friday UNO Championship table"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-300 font-bold uppercase mb-1">
                        Photographer Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. David M."
                        value={newPhotographer}
                        onChange={(e) => setNewPhotographer(e.target.value)}
                        className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-bold uppercase mb-1">
                        Category
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden"
                      >
                        <option value="Events">Events</option>
                        <option value="Food Nights">Food Nights</option>
                        <option value="Creative Arts">Creative Arts</option>
                        <option value="Campus Life">Campus Life</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-bold uppercase mb-1">
                      Caption / Context
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Where was this taken? Who was there?"
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                      required
                    />
                  </div>

                  <div className="p-3 bg-[#0B0B0F] border border-black text-[11px] text-zinc-400">
                    <p className="font-bold text-white mb-0.5">Photo Permission Policy:</p>
                    <p>By submitting, you confirm you have permission from the people photographed to display this image in the Woosong Chillax Club gallery.</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs py-3 uppercase tracking-wider hover:bg-[#b8f000]"
                  >
                    Submit Photo to Archive
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
