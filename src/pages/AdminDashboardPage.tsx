import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventItem, IMAGES } from '../data/mockData';
import { ChillaxLogo } from '../components/ChillaxLogo';
import { Sticker } from '../components/BrutalGraphics';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Calendar, 
  Users, 
  Lightbulb, 
  Image as ImageIcon, 
  BookOpen, 
  Plus, 
  Check, 
  X, 
  AlertTriangle,
  Bell,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { 
    events, 
    inquiries, 
    ideas, 
    cultureStories, 
    galleryItems,
    announcement,
    isAdmin, 
    loginAdmin, 
    logoutAdmin,
    createEvent,
    updateEventStatus,
    cancelEventAction,
    updateInquiryStatus,
    updateIdeaStatus,
    setAnnouncement
  } = useApp();

  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'rsvps' | 'inquiries' | 'ideas' | 'stories' | 'settings'>('overview');

  // New Event Form State
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<EventItem['category']>('Games');
  const [newDesc, setNewDesc] = useState('');
  const [newVenue, setNewVenue] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newCapacity, setNewCapacity] = useState(30);
  const [newCost, setNewCost] = useState('Free');
  const [newAccent, setNewAccent] = useState('lime');

  // Announcement edit state
  const [editAnnouncement, setEditAnnouncement] = useState(announcement);
  const [savedAnnouncement, setSavedAnnouncement] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passcode);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setPasscode('');
    }
  };

  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newVenue.trim()) return;

    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const startTime = newDate ? `${newDate}T18:00:00+09:00` : new Date().toISOString();
    const endTime = newDate ? `${newDate}T21:00:00+09:00` : new Date().toISOString();

    createEvent({
      slug: `${slug}-${Date.now().toString().slice(-3)}`,
      title: newTitle.trim(),
      category: newCategory,
      coverImage: IMAGES.campusHangout,
      description: newDesc.trim() || 'New Woosong Chillax meetup.',
      fullDetails: newDesc.trim(),
      startTime,
      endTime,
      displayDate: newDate || 'Upcoming Friday',
      displayTime: newTime || '18:30 – 21:00 KST',
      venue: newVenue.trim(),
      cost: newCost,
      capacity: Number(newCapacity),
      registrationDeadline: startTime,
      isPublished: true,
      accentColor: newAccent,
      whatToBring: ["Student ID", "Good vibes"],
      participationNotes: "Open to all students. Bilingual hosts available."
    });

    setIsAddEventOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewVenue('');
  };

  const handleSaveAnnouncement = () => {
    setAnnouncement(editAnnouncement);
    setSavedAnnouncement(true);
    setTimeout(() => setSavedAnnouncement(false), 2000);
  };

  // If not authenticated, show secure passkey screen
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center p-4">
        <div className="bg-[#22232B] border-2 border-black max-w-md w-full p-8 brutal-shadow relative">
          <div className="flex flex-col items-center justify-center mb-6">
            <ChillaxLogo size="sm" className="mb-3" />
            <div className="w-10 h-10 bg-[#C6FF00] border-2 border-black flex items-center justify-center text-black">
              <Lock className="w-5 h-5" />
            </div>
          </div>

          <div className="text-center space-y-2 mb-8">
            <span className="font-mono text-xs font-bold text-[#C6FF00] tracking-widest uppercase">
              // ORGANIZER PORTAL ACCESS
            </span>
            <h1 className="font-display font-black text-2xl uppercase text-white">
              Woosong Chillax Club
            </h1>
            <p className="text-zinc-400 text-xs font-mono">
              Protected administrative tools for club executive committee
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-zinc-300 font-bold uppercase mb-1">
                Enter Organizer Passcode:
              </label>
              <input
                type="password"
                placeholder="Passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-[#0B0B0F] border border-black p-3 text-white focus:border-[#C6FF00] outline-hidden text-center text-sm tracking-widest"
                required
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-center font-mono text-xs">
                Invalid passcode. Try <code className="bg-black px-1 text-white">chillax2026</code>
              </p>
            )}

            <button
              type="submit"
              className="w-full brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs py-3 uppercase tracking-wider hover:bg-[#b8f000]"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
            <p className="text-[11px] font-mono text-zinc-400">
              Demo Access Passcode: <span className="text-[#C6FF00] font-bold">chillax2026</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Organizer Portal
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C6FF00] border-2 border-black flex items-center justify-center text-black font-black font-display">
              CC
            </div>
            <div>
              <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white flex items-center gap-2">
                <span>Organizer Dashboard</span>
                <span className="text-[10px] font-mono bg-[#C6FF00] text-black px-2 py-0.5 border border-black">
                  ACTIVE
                </span>
              </h1>
              <p className="text-zinc-400 text-xs font-mono">
                Woosong Chillax Club Executive Committee · Daejeon
              </p>
            </div>
          </div>

          <button
            onClick={logoutAdmin}
            className="brutal-btn bg-[#22232B] hover:bg-zinc-800 text-zinc-300 hover:text-white px-4 py-2 text-xs font-mono flex items-center gap-2 border border-black self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-800 pb-3">
          {[
            { id: 'overview', label: 'KPI Overview', icon: ShieldCheck },
            { id: 'events', label: `Events (${events.length})`, icon: Calendar },
            { id: 'rsvps', label: 'RSVP Lists', icon: Users },
            { id: 'inquiries', label: `Applications (${inquiries.length})`, icon: BookOpen },
            { id: 'ideas', label: `Idea Pitches (${ideas.length})`, icon: Lightbulb },
            { id: 'settings', label: 'Club Settings', icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 font-display font-bold text-xs uppercase flex items-center gap-2 border transition-colors ${
                  isActive
                    ? 'bg-[#C6FF00] text-black border-black brutal-shadow-sm'
                    : 'bg-[#22232B] text-zinc-300 border-black hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            TAB 1: OVERVIEW METRICS
           ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-[#22232B] border-2 border-black p-6 brutal-shadow space-y-2">
                <span className="font-mono text-xs text-zinc-400 uppercase">Total Active Events</span>
                <p className="font-display font-black text-4xl text-white">
                  {events.filter(e => e.isPublished && !e.isCancelled).length}
                </p>
                <p className="text-[11px] font-mono text-[#C6FF00]">Across Woosong University Campus</p>
              </div>

              <div className="bg-[#22232B] border-2 border-black p-6 brutal-shadow space-y-2">
                <span className="font-mono text-xs text-zinc-400 uppercase">Confirmed RSVPs</span>
                <p className="font-display font-black text-4xl text-[#4388FF]">
                  {events.reduce((acc, curr) => acc + curr.registeredCount, 0)}
                </p>
                <p className="text-[11px] font-mono text-zinc-400">Student reservations</p>
              </div>

              <div className="bg-[#22232B] border-2 border-black p-6 brutal-shadow space-y-2">
                <span className="font-mono text-xs text-zinc-400 uppercase">Pending Applications</span>
                <p className="font-display font-black text-4xl text-[#9B5CFF]">
                  {inquiries.filter(i => i.status === 'Pending').length}
                </p>
                <p className="text-[11px] font-mono text-zinc-400">Awaiting welcome email</p>
              </div>

              <div className="bg-[#22232B] border-2 border-black p-6 brutal-shadow space-y-2">
                <span className="font-mono text-xs text-zinc-400 uppercase">Student Idea Pitches</span>
                <p className="font-display font-black text-4xl text-[#C6FF00]">
                  {ideas.length}
                </p>
                <p className="text-[11px] font-mono text-zinc-400">Community submissions</p>
              </div>

            </div>

            {/* Recent Pending Membership Requests Quick List */}
            <div className="bg-[#22232B] border-2 border-black p-6 brutal-shadow">
              <div className="flex items-center justify-between pb-4 border-b border-black mb-4">
                <h3 className="font-display font-black text-lg text-white uppercase">
                  Recent Membership Inquiries
                </h3>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="font-mono text-xs text-[#C6FF00] hover:underline"
                >
                  View All ({inquiries.length}) →
                </button>
              </div>

              <div className="space-y-3">
                {inquiries.slice(0, 3).map((inq) => (
                  <div key={inq.id} className="p-3 bg-[#0B0B0F] border border-black flex items-center justify-between text-xs font-mono">
                    <div>
                      <p className="text-white font-bold">{inq.fullName} ({inq.email})</p>
                      <p className="text-zinc-400">{inq.studentStatus} · Interests: {inq.interests.slice(0, 2).join(', ')}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                      inq.status === 'Welcomed' ? 'bg-[#C6FF00] text-black' : 'bg-amber-400 text-black'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: EVENT MANAGEMENT
           ======================================================== */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-black text-xl uppercase text-white">
                Club Event Management
              </h2>
              <button
                onClick={() => setIsAddEventOpen(!isAddEventOpen)}
                className="brutal-btn bg-[#C6FF00] text-black font-display font-bold text-xs px-4 py-2 uppercase flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddEventOpen ? 'Cancel' : 'Create New Event'}</span>
              </button>
            </div>

            {/* Create Event Modal Form */}
            {isAddEventOpen && (
              <form onSubmit={handleCreateEventSubmit} className="bg-[#22232B] border-2 border-black p-6 brutal-shadow space-y-4 text-xs font-mono">
                <h3 className="font-display font-black text-lg text-[#C6FF00] uppercase">
                  Add New Club Event Listing
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-bold mb-1">Event Title</label>
                    <input
                      type="text"
                      placeholder="e.g. K-Snack & International Board Games"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-bold mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden"
                    >
                      <option value="Games">Games</option>
                      <option value="Food">Food</option>
                      <option value="Creativity">Creativity</option>
                      <option value="Exploration">Exploration</option>
                      <option value="Social">Social</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-bold mb-1">Date</label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-bold mb-1">Time (KST)</label>
                    <input
                      type="text"
                      placeholder="18:30 – 21:00 KST"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-bold mb-1">Capacity</label>
                    <input
                      type="number"
                      value={newCapacity}
                      onChange={(e) => setNewCapacity(Number(e.target.value))}
                      className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Venue / Room</label>
                  <input
                    type="text"
                    placeholder="e.g. Woosong West Campus Student Lounge W3"
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    placeholder="Short description of the activity..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full bg-[#0B0B0F] border border-black p-2.5 text-white outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs px-6 py-2.5 uppercase"
                >
                  Publish Event Now
                </button>
              </form>
            )}

            {/* Events Table */}
            <div className="bg-[#22232B] border-2 border-black brutal-shadow overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#0B0B0F] border-b-2 border-black text-zinc-400">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Venue</th>
                    <th className="p-4">Enrolled</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {events.map((evt) => (
                    <tr key={evt.id} className="hover:bg-zinc-800/40">
                      <td className="p-4 font-bold text-white max-w-xs truncate">{evt.title}</td>
                      <td className="p-4">{evt.category}</td>
                      <td className="p-4 text-zinc-300">{evt.displayDate}</td>
                      <td className="p-4 text-zinc-400 truncate max-w-xs">{evt.venue}</td>
                      <td className="p-4 font-bold text-[#C6FF00]">{evt.registeredCount}/{evt.capacity}</td>
                      <td className="p-4">
                        {evt.isCancelled ? (
                          <span className="text-red-400 font-bold">CANCELLED</span>
                        ) : evt.isPublished ? (
                          <span className="text-[#C6FF00] font-bold">PUBLISHED</span>
                        ) : (
                          <span className="text-zinc-500 font-bold">DRAFT</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => updateEventStatus(evt.id, !evt.isPublished)}
                          className="p-1 hover:text-[#C6FF00]"
                          title={evt.isPublished ? 'Unpublish' : 'Publish'}
                        >
                          {evt.isPublished ? <EyeOff className="w-4 h-4 inline" /> : <Eye className="w-4 h-4 inline" />}
                        </button>
                        {!evt.isCancelled && (
                          <button
                            onClick={() => cancelEventAction(evt.id)}
                            className="p-1 hover:text-red-400"
                            title="Cancel Event"
                          >
                            <X className="w-4 h-4 inline" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 3: RSVPS MANAGEMENT
           ======================================================== */}
        {activeTab === 'rsvps' && (
          <div className="bg-[#22232B] border-2 border-black p-6 brutal-shadow space-y-6">
            <h2 className="font-display font-black text-xl uppercase text-white">
              Student Event RSVPs
            </h2>

            <div className="space-y-6">
              {events.map((evt) => (
                <div key={evt.id} className="p-4 bg-[#0B0B0F] border border-black space-y-3 font-mono text-xs">
                  <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 pb-2">
                    <span className="text-white font-bold text-sm">{evt.title}</span>
                    <span className="text-[#C6FF00]">
                      {evt.registeredCount} / {evt.capacity} Spots Filled
                    </span>
                  </div>

                  {evt.attendees && evt.attendees.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {evt.attendees.map((att, idx) => (
                        <div key={idx} className="p-2 bg-[#22232B] border border-black text-zinc-300">
                          <p className="text-white font-bold">{att.name}</p>
                          <p className="text-zinc-400 text-[11px] truncate">{att.email}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-500 italic">No individual registrations recorded yet.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: MEMBERSHIP INQUIRIES
           ======================================================== */}
        {activeTab === 'inquiries' && (
          <div className="bg-[#22232B] border-2 border-black p-6 brutal-shadow space-y-6">
            <div className="flex items-center justify-between border-b border-black pb-3">
              <h2 className="font-display font-black text-xl uppercase text-white">
                Membership Inquiries ({inquiries.length})
              </h2>
              <span className="font-mono text-xs text-zinc-400">Review student applications</span>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-5 bg-[#0B0B0F] border border-black space-y-3 font-mono text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-white font-bold text-sm mr-2">{inq.fullName}</span>
                      <span className="text-[#C6FF00]">{inq.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">Status:</span>
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                        className="bg-[#22232B] text-white p-1 border border-black"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Welcomed">Welcomed</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-zinc-300">
                    <strong className="text-zinc-400">Status:</strong> {inq.studentStatus} · <strong className="text-zinc-400">Language:</strong> {inq.preferredLanguage}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {inq.interests.map(i => (
                      <span key={i} className="bg-[#22232B] text-zinc-300 px-2 py-0.5 border border-black text-[10px]">
                        {i}
                      </span>
                    ))}
                  </div>

                  {inq.message && (
                    <p className="text-zinc-400 italic bg-[#15161c] p-2 border-l-2 border-[#C6FF00]">
                      "{inq.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: ACTIVITY IDEAS MODERATION
           ======================================================== */}
        {activeTab === 'ideas' && (
          <div className="bg-[#22232B] border-2 border-black p-6 brutal-shadow space-y-6">
            <h2 className="font-display font-black text-xl uppercase text-white">
              Student Activity Idea Moderation
            </h2>

            <div className="space-y-4">
              {ideas.map((idea) => (
                <div key={idea.id} className="p-5 bg-[#0B0B0F] border border-black space-y-3 font-mono text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-white font-bold text-sm">{idea.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400 font-bold">{idea.votes} Votes</span>
                      <select
                        value={idea.status}
                        onChange={(e) => updateIdeaStatus(idea.id, e.target.value as any)}
                        className="bg-[#22232B] text-white p-1 border border-black"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Planned">Planned</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-zinc-300">{idea.description}</p>
                  <p className="text-zinc-500">
                    Submitted by {idea.submitterName} · Category: {idea.category} · Budget: {idea.budget}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: CLUB SETTINGS & ANNOUNCEMENT
           ======================================================== */}
        {activeTab === 'settings' && (
          <div className="bg-[#22232B] border-2 border-black p-6 brutal-shadow space-y-6 max-w-2xl font-mono text-xs">
            <h2 className="font-display font-black text-xl uppercase text-white">
              Site & Announcement Settings
            </h2>

            <div className="space-y-2">
              <label className="block text-zinc-300 font-bold uppercase">
                Top Bar Ticker Announcement
              </label>
              <textarea
                rows={3}
                value={editAnnouncement}
                onChange={(e) => setEditAnnouncement(e.target.value)}
                className="w-full bg-[#0B0B0F] border border-black p-3 text-white outline-hidden focus:border-[#C6FF00]"
              />
              <p className="text-[11px] text-zinc-400">
                This banner is displayed at the top of every page for club announcements.
              </p>
            </div>

            {savedAnnouncement && (
              <p className="text-[#C6FF00] font-bold">✓ Announcement updated across the website!</p>
            )}

            <button
              onClick={handleSaveAnnouncement}
              className="brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs px-6 py-2.5 uppercase"
            >
              Save Announcement
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
