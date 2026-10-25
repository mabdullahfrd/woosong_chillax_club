import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventItem, IMAGES } from '../data/mockData';
import { Sticker, BarcodeStrip } from './BrutalGraphics';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Users, 
  CheckSquare, 
  Square, 
  Sparkles, 
  Download, 
  Share2, 
  Edit3, 
  X, 
  Search, 
  CalendarDays, 
  ListFilter, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';

interface WorkableActivityCalendarProps {
  navigate?: (path: string) => void;
  initialViewMode?: 'month' | 'agenda' | 'week';
}

export const WorkableActivityCalendar: React.FC<WorkableActivityCalendarProps> = ({ 
  navigate,
  initialViewMode = 'month'
}) => {
  const { 
    events, 
    rsvpEvent, 
    createEvent, 
    updateEvent, 
    deleteEvent, 
    togglePrepChecklistItem, 
    addPrepChecklistItem,
    myRsvps 
  } = useApp();

  // Calendar Navigation State
  // Default to November 2026 where primary mock events are scheduled, but fully navigable!
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 10, 1)); // Nov 2026
  const [viewMode, setViewMode] = useState<'month' | 'agenda' | 'week'>(initialViewMode);
  
  // Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals
  const [selectedActivity, setSelectedActivity] = useState<EventItem | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Form State for Planning / Adding Activity
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<EventItem['category']>('Games');
  const [formDate, setFormDate] = useState('2026-11-06');
  const [formStartTime, setFormStartTime] = useState('18:30');
  const [formEndTime, setFormEndTime] = useState('21:00');
  const [formVenue, setFormVenue] = useState('Woosong West Campus Student Center (W1-104)');
  const [formHost, setFormHost] = useState('');
  const [formCapacity, setFormCapacity] = useState('30');
  const [formDesc, setFormDesc] = useState('');
  const [formStatus, setFormStatus] = useState<EventItem['status']>('Confirmed');
  const [formTasks, setFormTasks] = useState<{ id: string; task: string; done: boolean }[]>([
    { id: 't1', task: 'Book campus activity room', done: true },
    { id: 't2', task: 'Prepare bilingual event materials', done: false },
    { id: 't3', task: 'Arrange beverages & snacks', done: false }
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');

  // Sign-Up Form State (for modal sign up)
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpNotes, setRsvpNotes] = useState('');
  const [rsvpStatusMsg, setRsvpStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Categories list
  const categories: string[] = ['All', 'Games', 'Culture', 'Food', 'Creativity', 'Exploration', 'Social'];
  const campusVenues = [
    'Woosong West Campus Student Center (W1-104)',
    'Woosong International Student Lounge (W3 Bldg, 1st Fl)',
    'Woosong Creative Media Studio (W7 Bldg, Room 210)',
    'Woosong West Campus Main Lawn (In front of W1)',
    'Woosong Clocktower Main Gate (Meeting Point)',
    'Woosong Student Activity Hall (W1 Building, 4th Floor)'
  ];

  // Helper date methods
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleJumpToToday = () => {
    setCurrentDate(new Date(2026, 10, 1)); // Jump to current active semester Nov 2026
  };

  // Filtered Events
  const filteredEvents = events.filter(e => {
    if (e.isCancelled) return false;
    const matchesSearch = 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.hostName && e.hostName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;

    return matchesSearch && matchesCat && matchesStatus;
  });

  // Calendar Day Generation
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Open planning modal for a specific day
  const handleOpenPlanForDate = (dayNumber: number) => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
    setFormDate(formattedDate);
    setFormTitle('');
    setFormCategory('Games');
    setFormStartTime('18:30');
    setFormEndTime('21:00');
    setFormVenue('Woosong West Campus Student Center (W1-104)');
    setFormHost('');
    setFormCapacity('30');
    setFormDesc('');
    setFormStatus('Planning');
    setFormTasks([
      { id: 't1', task: 'Confirm room availability with facilities', done: false },
      { id: 't2', task: 'Prepare game sets / discussion prompt sheets', done: false },
      { id: 't3', task: 'Buy tea and snacks from mart', done: false }
    ]);
    setIsEditing(false);
    setEditingEventId(null);
    setIsPlanModalOpen(true);
  };

  // Open edit modal for existing event
  const handleOpenEditEvent = (evt: EventItem) => {
    setEditingEventId(evt.id);
    setIsEditing(true);
    setFormTitle(evt.title);
    setFormCategory(evt.category);
    setFormDate(evt.startTime.split('T')[0]);
    setFormStartTime(evt.displayTime.split('–')[0].trim().replace(' KST', ''));
    setFormEndTime(evt.displayTime.split('–')[1]?.trim().replace(' KST', '') || '21:00');
    setFormVenue(evt.venue);
    setFormHost(evt.hostName || '');
    setFormCapacity(String(evt.capacity));
    setFormDesc(evt.fullDetails || evt.description);
    setFormStatus(evt.status || 'Confirmed');
    setFormTasks(evt.prepChecklist || [
      { id: 't1', task: 'Confirm venue booking', done: true },
      { id: 't2', task: 'Prepare activity supplies', done: false }
    ]);
    setIsPlanModalOpen(true);
  };

  // Save new or edited activity
  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDate) return;

    const startISO = `${formDate}T${formStartTime}:00+09:00`;
    const endISO = `${formDate}T${formEndTime}:00+09:00`;
    const dateObj = new Date(formDate);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const displayDateStr = `${dayNames[dateObj.getDay()]}, ${monthNames[dateObj.getMonth()].slice(0, 3)} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    const displayTimeStr = `${formStartTime} – ${formEndTime} KST`;
    const slug = formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (isEditing && editingEventId) {
      updateEvent(editingEventId, {
        title: formTitle.trim(),
        category: formCategory,
        startTime: startISO,
        endTime: endISO,
        displayDate: displayDateStr,
        displayTime: displayTimeStr,
        venue: formVenue,
        hostName: formHost.trim() || 'Woosong Chillax Leads',
        capacity: Number(formCapacity) || 30,
        description: formDesc.trim() || 'Woosong Chillax Club activity meetup.',
        fullDetails: formDesc.trim() || 'Woosong Chillax Club activity meetup.',
        status: formStatus,
        prepChecklist: formTasks
      });
      // Update selected activity if currently viewed
      if (selectedActivity && selectedActivity.id === editingEventId) {
        setSelectedActivity(prev => prev ? {
          ...prev,
          title: formTitle.trim(),
          category: formCategory,
          startTime: startISO,
          endTime: endISO,
          displayDate: displayDateStr,
          displayTime: displayTimeStr,
          venue: formVenue,
          hostName: formHost.trim() || 'Woosong Chillax Leads',
          capacity: Number(formCapacity) || 30,
          description: formDesc.trim() || 'Woosong Chillax Club activity meetup.',
          fullDetails: formDesc.trim() || 'Woosong Chillax Club activity meetup.',
          status: formStatus,
          prepChecklist: formTasks
        } : null);
      }
    } else {
      createEvent({
        slug: `${slug}-${Date.now().toString().slice(-3)}`,
        title: formTitle.trim(),
        category: formCategory,
        coverImage: formCategory === 'Food' ? IMAGES.culturalFood : 
                    formCategory === 'Creativity' ? IMAGES.creativeJam : 
                    formCategory === 'Exploration' ? IMAGES.daejeonExplore : IMAGES.campusHangout,
        description: formDesc.trim() || 'New Woosong Chillax planned meetup.',
        fullDetails: formDesc.trim() || 'Join us for this exciting Woosong Chillax Club activity.',
        startTime: startISO,
        endTime: endISO,
        displayDate: displayDateStr,
        displayTime: displayTimeStr,
        venue: formVenue,
        cost: 'Free',
        capacity: Number(formCapacity) || 30,
        registrationDeadline: startISO,
        isPublished: true,
        accentColor: formCategory === 'Food' ? 'lime' : formCategory === 'Creativity' ? 'purple' : 'blue',
        whatToBring: ['Woosong Student ID', 'Good vibes and energy'],
        participationNotes: 'Bilingual student hosts present. All Woosong students welcome.',
        hostName: formHost.trim() || 'Woosong Chillax Leads',
        status: formStatus,
        prepChecklist: formTasks,
        tags: [formCategory, 'Woosong West']
      });
    }

    setIsPlanModalOpen(false);
  };

  // Add a task in planning modal
  const handleAddPrepTask = () => {
    if (!newTaskInput.trim()) return;
    setFormTasks(prev => [...prev, { id: `task-${Date.now()}`, task: newTaskInput.trim(), done: false }]);
    setNewTaskInput('');
  };

  const handleToggleFormTask = (id: string) => {
    setFormTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleRemoveFormTask = (id: string) => {
    setFormTasks(prev => prev.filter(t => t.id !== id));
  };

  // Handle Quick Sign-Up from activity modal
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivity) return;
    if (!rsvpName.trim() || !rsvpEmail.trim()) {
      setRsvpStatusMsg({ type: 'error', text: 'Please enter your name and student email.' });
      return;
    }

    const res = rsvpEvent(selectedActivity.slug, {
      name: rsvpName.trim(),
      email: rsvpEmail.trim(),
      notes: rsvpNotes.trim()
    });

    if (res.success) {
      setRsvpStatusMsg({ 
        type: 'success', 
        text: res.waitlisted 
          ? 'Added to waitlist! We will notify you if a slot opens.' 
          : '✓ Sign-up confirmed! Your spot is reserved.' 
      });
      // Refresh current activity view attendee count
      setSelectedActivity(prev => prev ? {
        ...prev,
        registeredCount: prev.registeredCount + 1,
        attendees: [...(prev.attendees || []), { name: rsvpName.trim(), email: rsvpEmail.trim(), registeredAt: new Date().toISOString() }]
      } : null);
      setRsvpName('');
      setRsvpEmail('');
      setRsvpNotes('');
    } else {
      setRsvpStatusMsg({ type: 'error', text: res.message });
    }
  };

  // Calendar Export generator (.ics)
  const downloadIcs = (evt: EventItem) => {
    const formatDate = (isoStr: string) => {
      const d = new Date(isoStr);
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Woosong Chillax Club//Activities Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${evt.id}@chillax.woosong`,
      `DTSTAMP:${formatDate(new Date().toISOString())}`,
      `DTSTART:${formatDate(evt.startTime)}`,
      `DTEND:${formatDate(evt.endTime)}`,
      `SUMMARY:Woosong Chillax: ${evt.title}`,
      `DESCRIPTION:${evt.description}\\nHost: ${evt.hostName || 'Chillax Leads'}\\nVenue: ${evt.venue}`,
      `LOCATION:${evt.venue}, Daejeon, South Korea`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${evt.slug}-chillax.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGoogleCalendarUrl = (evt: EventItem) => {
    const formatGDate = (isoStr: string) => new Date(isoStr).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const title = encodeURIComponent(`[Chillax] ${evt.title}`);
    const details = encodeURIComponent(`${evt.description}\n\nHost: ${evt.hostName || 'Chillax Leads'}\nVenue: ${evt.venue}\nWoosong University, Daejeon`);
    const location = encodeURIComponent(`${evt.venue}, Woosong University, Daejeon, Korea`);
    const dates = `${formatGDate(evt.startTime)}/${formatGDate(evt.endTime)}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const copyShareLink = (evt: EventItem) => {
    const url = `${window.location.origin}/events/${evt.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================
          1. CALENDAR CONTROLS & WORKBAR
         ======================================================== */}
      <div className="bg-[#22232B] border-4 border-black p-5 brutal-shadow space-y-4">
        
        {/* Row 1: Month Nav, Today Jump & View Toggles */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Month & Year Title with Nav Arrows */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#0B0B0F] border-2 border-black p-1">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 hover:bg-[#C6FF00] hover:text-black transition-colors"
                title="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 hover:bg-[#C6FF00] hover:text-black transition-colors"
                title="Next month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <span className="font-mono text-xs text-[#C6FF00] font-bold">
                KST (Daejeon)
              </span>
            </div>

            <button
              onClick={handleJumpToToday}
              className="hidden sm:inline-flex px-3 py-1 bg-[#181920] hover:bg-black border border-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
            >
              Semester View
            </button>
          </div>

          {/* Action Tools: + Plan Activity & View Switchers */}
          <div className="flex flex-wrap items-center gap-3">
            
            <button
              onClick={() => handleOpenPlanForDate(6)}
              className="brutal-btn-lime text-black font-display font-black text-xs sm:text-sm px-4 py-2.5 uppercase tracking-wide flex items-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Plan / Add Activity</span>
            </button>

            {/* View Mode Buttons */}
            <div className="flex items-center bg-[#0B0B0F] border-2 border-black p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-colors ${
                  viewMode === 'month' ? 'bg-[#C6FF00] text-black font-black' : 'text-zinc-400 hover:text-white'
                }`}
                title="Month grid"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Month</span>
              </button>
              <button
                onClick={() => setViewMode('agenda')}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-colors ${
                  viewMode === 'agenda' ? 'bg-[#C6FF00] text-black font-black' : 'text-zinc-400 hover:text-white'
                }`}
                title="Agenda schedule"
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Agenda</span>
              </button>
            </div>

          </div>
        </div>

        {/* Row 2: Search, Category & Status Filters */}
        <div className="pt-3 border-t-2 border-zinc-800 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search activity, game, room, host..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0B0F] border-2 border-black pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-zinc-500 outline-hidden focus:border-[#C6FF00]"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase border transition-colors shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#C6FF00] text-black border-black font-black'
                      : 'bg-[#0B0B0F] text-zinc-400 border-zinc-700 hover:text-white hover:border-[#C6FF00]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Status Select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0B0B0F] border-2 border-black px-2.5 py-1 text-[11px] font-mono text-zinc-300 outline-hidden focus:border-[#C6FF00]"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Planning">In Planning</option>
              <option value="Volunteers Needed">Volunteers Needed</option>
            </select>
          </div>

        </div>

      </div>

      {/* ========================================================
          2. VIEW MODE: MONTH MATRIX (WORKABLE CALENDAR)
         ======================================================== */}
      {viewMode === 'month' && (
        <div className="bg-[#22232B] border-4 border-black p-4 sm:p-6 brutal-shadow space-y-3">
          
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5 text-center font-mono text-xs font-black uppercase">
            <div className="py-1 text-zinc-500">SUN</div>
            <div className="py-1 text-zinc-400">MON</div>
            <div className="py-1 text-zinc-400">TUE</div>
            <div className="py-1 text-zinc-400">WED</div>
            <div className="py-1 text-zinc-400">THU</div>
            <div className="py-1 bg-[#C6FF00] text-black border border-black font-black tracking-tight">
              FRI (CHILLAX)
            </div>
            <div className="py-1 text-zinc-500">SAT</div>
          </div>

          {/* Month Cells Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
            
            {/* Leading empty cells before 1st of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <div 
                key={`empty-${idx}`} 
                className="min-h-24 sm:min-h-32 bg-[#14151b]/40 border border-zinc-900/60 p-2 opacity-30 select-none"
              />
            ))}

            {/* Month Days */}
            {Array.from({ length: totalDaysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              
              // Find events on this day
              const dayEvents = filteredEvents.filter(e => {
                const eDate = e.startTime.split('T')[0];
                return eDate === dateString;
              });

              const isFriday = new Date(currentYear, currentMonth, dayNum).getDay() === 5;
              const hasEvents = dayEvents.length > 0;

              return (
                <div
                  key={`day-${dayNum}`}
                  className={`group relative min-h-24 sm:min-h-32 p-1.5 sm:p-2 border-2 transition-all flex flex-col justify-between ${
                    hasEvents 
                      ? 'bg-[#0B0B0F] border-black hover:border-[#C6FF00] hover:shadow-[4px_4px_0px_#C6FF00]' 
                      : isFriday
                        ? 'bg-[#181920] border-zinc-800 hover:border-zinc-600'
                        : 'bg-[#14151b] border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  {/* Top Bar: Date number + Quick Add button */}
                  <div className="flex items-center justify-between">
                    <span 
                      className={`font-mono text-xs sm:text-sm font-black px-1.5 py-0.5 ${
                        hasEvents 
                          ? 'bg-[#C6FF00] text-black border border-black' 
                          : isFriday
                            ? 'text-[#C6FF00] font-bold'
                            : 'text-zinc-400'
                      }`}
                    >
                      {dayNum}
                    </span>

                    {/* Quick + Plan button on hover */}
                    <button
                      onClick={() => handleOpenPlanForDate(dayNum)}
                      className="opacity-0 group-hover:opacity-100 p-1 bg-black text-[#C6FF00] hover:bg-[#C6FF00] hover:text-black border border-zinc-700 transition-opacity text-[10px] font-mono font-bold"
                      title={`Plan activity on ${monthNames[currentMonth]} ${dayNum}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Day Activities List */}
                  <div className="space-y-1.5 my-1.5 flex-1">
                    {dayEvents.map(evt => {
                      const isFull = evt.registeredCount >= evt.capacity;
                      const statusColor = 
                        evt.status === 'Planning' ? 'bg-[#9B5CFF] text-white' :
                        evt.status === 'Volunteers Needed' ? 'bg-[#4388FF] text-white' :
                        'bg-[#C6FF00] text-black';

                      return (
                        <div
                          key={evt.id}
                          onClick={() => setSelectedActivity(evt)}
                          className="p-1.5 bg-[#1f2029] border border-black hover:border-[#C6FF00] cursor-pointer text-left transition-transform hover:-translate-y-0.5"
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className={`text-[9px] font-mono px-1 py-0.2 font-black uppercase ${statusColor}`}>
                              {evt.status || 'Confirmed'}
                            </span>
                            <span className="text-[9px] font-mono text-zinc-400">
                              {evt.displayTime.split('–')[0].trim()}
                            </span>
                          </div>

                          <p className="font-display font-black text-[11px] sm:text-xs text-white leading-tight line-clamp-2">
                            {evt.title}
                          </p>

                          <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                            <span className="truncate max-w-[80px]">
                              {evt.venue.includes('W1') ? 'W1 Union' : evt.venue.includes('W3') ? 'W3 Lounge' : evt.venue.includes('W7') ? 'W7 Media' : 'Campus'}
                            </span>
                            <span className={isFull ? 'text-red-400 font-bold' : 'text-[#C6FF00]'}>
                              {evt.registeredCount}/{evt.capacity}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Empty state hint on Friday */}
                  {!hasEvents && isFriday && (
                    <div className="text-[10px] font-mono text-zinc-600 italic">
                      Open slot · Click + to plan
                    </div>
                  )}

                </div>
              );
            })}

          </div>

          <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#C6FF00] border border-black inline-block" />
                <span>Confirmed Meetup</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#9B5CFF] border border-black inline-block" />
                <span>In Planning / Drafting</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#4388FF] border border-black inline-block" />
                <span>Volunteers Needed</span>
              </span>
            </div>
            <span>💡 Tip: Click any day cell's "+" to schedule a new campus activity</span>
          </div>

        </div>
      )}

      {/* ========================================================
          3. VIEW MODE: AGENDA / WORKSTATION LIST
         ======================================================== */}
      {viewMode === 'agenda' && (
        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((evt) => {
              const isFull = evt.registeredCount >= evt.capacity;
              const hasRsvped = myRsvps.includes(evt.slug);
              const prepTasks = evt.prepChecklist || [];
              const doneTasks = prepTasks.filter(t => t.done).length;
              const totalTasks = prepTasks.length;
              const prepPercentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 100;

              return (
                <div
                  key={evt.id}
                  className="bg-[#22232B] border-4 border-black p-5 sm:p-6 brutal-shadow flex flex-col lg:flex-row gap-6 justify-between items-start group hover:border-[#C6FF00] transition-colors"
                >
                  {/* Left: Date Badge & Event Details */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs font-black bg-[#C6FF00] text-black px-3 py-1 border border-black uppercase tracking-wider">
                        {evt.displayDate}
                      </span>
                      <span className="font-mono text-xs font-bold text-zinc-300 bg-[#0B0B0F] px-2.5 py-1 border border-black flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C6FF00]" />
                        <span>{evt.displayTime}</span>
                      </span>
                      <span className={`font-mono text-xs px-2.5 py-1 border border-black font-black uppercase ${
                        evt.status === 'Planning' ? 'bg-[#9B5CFF] text-white' :
                        evt.status === 'Volunteers Needed' ? 'bg-[#4388FF] text-white' :
                        'bg-[#0B0B0F] text-[#C6FF00]'
                      }`}>
                        {evt.status || 'Confirmed'}
                      </span>
                      <span className="font-mono text-xs text-zinc-400 bg-[#181920] px-2 py-0.5 border border-zinc-800">
                        {evt.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-[#C6FF00] transition-colors cursor-pointer"
                        onClick={() => setSelectedActivity(evt)}
                      >
                        {evt.title}
                      </h3>
                      <p className="text-zinc-300 text-sm mt-1 leading-relaxed max-w-3xl">
                        {evt.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300 pt-1">
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <MapPin className="w-4 h-4 text-[#C6FF00]" />
                        <span>{evt.venue}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <Users className="w-4 h-4 text-[#4388FF]" />
                        <span>Lead: <strong className="text-white">{evt.hostName || 'Chillax Team'}</strong></span>
                      </div>
                    </div>

                    {/* Preparation Checklist Bar */}
                    {totalTasks > 0 && (
                      <div className="pt-2 max-w-md">
                        <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
                          <span>Prep Readiness: {doneTasks}/{totalTasks} tasks ready</span>
                          <span className="text-[#C6FF00] font-bold">{prepPercentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#0B0B0F] border border-black overflow-hidden">
                          <div 
                            className="h-full bg-[#C6FF00] transition-all"
                            style={{ width: `${prepPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Right: Registration status & Action Buttons */}
                  <div className="w-full lg:w-72 bg-[#0B0B0F] border-2 border-black p-4 space-y-3 shrink-0">
                    
                    {/* Capacity Indicator */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-zinc-400">Activity Slots:</span>
                        <span className={isFull ? 'text-red-400 font-bold' : 'text-[#C6FF00] font-bold'}>
                          {evt.registeredCount} / {evt.capacity} Filled
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-[#22232B] border border-black overflow-hidden">
                        <div 
                          className={`h-full ${isFull ? 'bg-red-500' : 'bg-[#C6FF00]'}`}
                          style={{ width: `${Math.min(100, Math.round((evt.registeredCount / evt.capacity) * 100))}%` }}
                        />
                      </div>
                    </div>

                    {/* Primary Button */}
                    {hasRsvped ? (
                      <div className="p-2.5 bg-[#181920] border border-[#C6FF00] text-center font-mono text-xs text-[#C6FF00] font-bold flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>You are registered!</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedActivity(evt)}
                        className={`w-full py-2.5 font-display font-black text-xs uppercase tracking-wider brutal-btn cursor-pointer ${
                          isFull 
                            ? 'bg-zinc-800 text-white hover:bg-zinc-700' 
                            : 'bg-[#C6FF00] text-black hover:bg-[#b8f000]'
                        }`}
                      >
                        {isFull ? 'Join Waitlist' : 'Sign Up for Activity'}
                      </button>
                    )}

                    {/* Secondary Working Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                      <button
                        onClick={() => handleOpenEditEvent(evt)}
                        className="p-2 bg-[#22232B] hover:bg-zinc-800 text-zinc-300 border border-black flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Edit activity and preparation checklist"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#9B5CFF]" />
                        <span>Work on it</span>
                      </button>
                      <button
                        onClick={() => downloadIcs(evt)}
                        className="p-2 bg-[#22232B] hover:bg-zinc-800 text-zinc-300 border border-black flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Download .ICS calendar file"
                      >
                        <Download className="w-3.5 h-3.5 text-[#4388FF]" />
                        <span>Add .ICS</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })
          ) : (
            <div className="bg-[#22232B] border-4 border-black p-12 text-center brutal-shadow space-y-4">
              <p className="font-display font-black text-2xl uppercase text-white">
                No matching activities found
              </p>
              <p className="text-zinc-400 text-xs font-mono">
                Try resetting your filters or plan a new activity on the calendar.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setStatusFilter('All');
                  setSearchQuery('');
                }}
                className="brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs px-5 py-2.5 uppercase"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          4. MODAL: ACTIVITY DETAILS & INSTANT SIGN-UP FORM
         ======================================================== */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#22232B] border-4 border-black max-w-2xl w-full p-6 sm:p-8 brutal-shadow relative my-8 text-left">
            
            <button
              onClick={() => {
                setSelectedActivity(null);
                setRsvpStatusMsg(null);
              }}
              className="absolute top-4 right-4 p-2 bg-[#0B0B0F] border-2 border-black hover:bg-red-500 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-black bg-[#C6FF00] text-black px-3 py-1 border border-black uppercase">
                  {selectedActivity.displayDate}
                </span>
                <span className="font-mono text-xs text-zinc-300 bg-[#0B0B0F] px-2.5 py-1 border border-black flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>{selectedActivity.displayTime}</span>
                </span>
                <span className={`font-mono text-xs px-2.5 py-1 border border-black font-black uppercase ${
                  selectedActivity.status === 'Planning' ? 'bg-[#9B5CFF] text-white' :
                  selectedActivity.status === 'Volunteers Needed' ? 'bg-[#4388FF] text-white' :
                  'bg-[#0B0B0F] text-[#C6FF00]'
                }`}>
                  {selectedActivity.status || 'Confirmed'}
                </span>
              </div>

              <div>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-white leading-tight">
                  {selectedActivity.title}
                </h2>
                <p className="text-zinc-300 text-sm mt-2 leading-relaxed">
                  {selectedActivity.fullDetails || selectedActivity.description}
                </p>
              </div>

              {/* Location & Host Metadata */}
              <div className="p-4 bg-[#0B0B0F] border-2 border-black space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <MapPin className="w-4 h-4 text-[#C6FF00] shrink-0" />
                  <span><strong className="text-white">Venue:</strong> {selectedActivity.venue}</span>
                </div>
                {selectedActivity.venueNotes && (
                  <p className="text-[11px] text-zinc-400 pl-6">
                    {selectedActivity.venueNotes}
                  </p>
                )}
                <div className="flex items-center gap-2 text-zinc-300 pt-1">
                  <Users className="w-4 h-4 text-[#4388FF] shrink-0" />
                  <span><strong className="text-white">Activity Lead:</strong> {selectedActivity.hostName || 'Woosong Chillax Leads'}</span>
                </div>
              </div>

              {/* Workstation Preparation Checklist */}
              {selectedActivity.prepChecklist && selectedActivity.prepChecklist.length > 0 && (
                <div className="bg-[#181920] border-2 border-black p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black uppercase text-zinc-300 flex items-center gap-1.5">
                      <CheckSquare className="w-4 h-4 text-[#C6FF00]" />
                      <span>Activity Preparation Checklist (Interactive)</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#C6FF00]">
                      {selectedActivity.prepChecklist.filter(t => t.done).length} / {selectedActivity.prepChecklist.length} Ready
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {selectedActivity.prepChecklist.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => togglePrepChecklistItem(selectedActivity.id, task.id)}
                        className="flex items-center gap-2.5 p-2 bg-[#0B0B0F] border border-black cursor-pointer hover:border-[#C6FF00] transition-colors"
                      >
                        {task.done ? (
                          <CheckSquare className="w-4 h-4 text-[#C6FF00] shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-zinc-500 shrink-0" />
                        )}
                        <span className={`text-xs font-mono ${task.done ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                          {task.task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================
                  SIGN-UP SECTION FOR THIS ACTIVITY
                 ======================================================== */}
              <div className="bg-[#0B0B0F] border-2 border-black p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="font-mono text-xs font-black text-[#C6FF00] uppercase tracking-wider">
                    // ACTIVITY SIGN-UP & RSVP
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    {selectedActivity.registeredCount} / {selectedActivity.capacity} Spots Claimed
                  </span>
                </div>

                {rsvpStatusMsg ? (
                  <div className={`p-4 border-2 font-mono text-xs space-y-2 ${
                    rsvpStatusMsg.type === 'success' 
                      ? 'bg-[#181920] border-[#C6FF00] text-[#C6FF00]' 
                      : 'bg-[#181920] border-red-500 text-red-400'
                  }`}>
                    <p className="font-bold text-sm">{rsvpStatusMsg.text}</p>
                    {rsvpStatusMsg.type === 'success' && (
                      <div className="pt-2 flex flex-wrap gap-2">
                        <button
                          onClick={() => downloadIcs(selectedActivity)}
                          className="px-3 py-1.5 bg-[#22232B] hover:bg-black text-white border border-black text-xs font-mono flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5 text-[#C6FF00]" />
                          <span>Add to Calendar (.ICS)</span>
                        </button>
                        <a
                          href={getGoogleCalendarUrl(selectedActivity)}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-[#22232B] hover:bg-black text-white border border-black text-xs font-mono flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#4388FF]" />
                          <span>Google Calendar</span>
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-3 font-mono text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-300 font-bold uppercase mb-1">
                          Full Name: <span className="text-[#C6FF00]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Your Name..."
                          value={rsvpName}
                          onChange={(e) => setRsvpName(e.target.value)}
                          className="w-full bg-[#181920] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-300 font-bold uppercase mb-1">
                          Student Email: <span className="text-[#C6FF00]">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. name@wsu.ac.kr"
                          value={rsvpEmail}
                          onChange={(e) => setRsvpEmail(e.target.value)}
                          className="w-full bg-[#181920] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-bold uppercase mb-1">
                        Dietary / Accommodation Notes (Optional):
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Halal, vegetarian, coming with a friend..."
                        value={rsvpNotes}
                        onChange={(e) => setRsvpNotes(e.target.value)}
                        className="w-full bg-[#181920] border border-black p-2.5 text-white outline-hidden focus:border-[#C6FF00]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs sm:text-sm py-3 uppercase tracking-wider hover:bg-[#b8f000] cursor-pointer"
                    >
                      Confirm My Activity Sign-Up
                    </button>
                  </form>
                )}

              </div>

              {/* Footer Actions: Edit activity, Export ICS, Share */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedActivity(null);
                      handleOpenEditEvent(selectedActivity);
                    }}
                    className="p-2 bg-[#181920] hover:bg-black border border-black text-xs font-mono text-zinc-300 flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#9B5CFF]" />
                    <span>Edit Activity / Tasks</span>
                  </button>
                  <button
                    onClick={() => downloadIcs(selectedActivity)}
                    className="p-2 bg-[#181920] hover:bg-black border border-black text-xs font-mono text-zinc-300 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#4388FF]" />
                    <span>Download .ICS</span>
                  </button>
                </div>

                <button
                  onClick={() => copyShareLink(selectedActivity)}
                  className="p-2 bg-[#181920] hover:bg-black border border-black text-xs font-mono text-zinc-300 flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>{copiedLink ? 'Copied URL!' : 'Share Activity'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          5. MODAL: PLAN / EDIT ACTIVITY WORKSTATION
         ======================================================== */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#22232B] border-4 border-black max-w-2xl w-full p-6 sm:p-8 brutal-shadow relative my-8 text-left">
            
            <button
              onClick={() => setIsPlanModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-[#0B0B0F] border-2 border-black hover:bg-red-500 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSaveActivity} className="space-y-6">
              
              <div className="space-y-1">
                <span className="font-mono text-xs font-black text-[#C6FF00] tracking-widest uppercase">
                  // ACTIVITY WORKSTATION
                </span>
                <h2 className="font-display font-black text-2xl uppercase text-white">
                  {isEditing ? 'Edit Planned Activity' : 'Plan & Schedule New Activity'}
                </h2>
                <p className="text-zinc-400 text-xs font-mono">
                  Coordinate, add preparation tasks, and set meeting spots across Woosong West Campus.
                </p>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                    Activity Title: <span className="text-[#C6FF00]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Codenames & Pizza Night, Han River Walk..."
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-[#0B0B0F] border-2 border-black p-3 text-xs sm:text-sm font-mono text-white outline-hidden focus:border-[#C6FF00]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                    Category:
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as EventItem['category'])}
                    className="w-full bg-[#0B0B0F] border-2 border-black p-3 text-xs sm:text-sm font-mono text-white outline-hidden focus:border-[#C6FF00]"
                  >
                    <option value="Games">Games</option>
                    <option value="Culture">Culture</option>
                    <option value="Food">Food</option>
                    <option value="Creativity">Creativity</option>
                    <option value="Exploration">Exploration</option>
                    <option value="Social">Social</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                    Date: <span className="text-[#C6FF00]">*</span>
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-[#0B0B0F] border-2 border-black p-2.5 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                    Start Time (KST):
                  </label>
                  <input
                    type="time"
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                    className="w-full bg-[#0B0B0F] border-2 border-black p-2.5 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                    End Time (KST):
                  </label>
                  <input
                    type="time"
                    value={formEndTime}
                    onChange={(e) => setFormEndTime(e.target.value)}
                    className="w-full bg-[#0B0B0F] border-2 border-black p-2.5 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                  />
                </div>
              </div>

              {/* Campus Venue with Presets */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                  Campus Venue (Woosong West Campus Only):
                </label>
                <input
                  type="text"
                  value={formVenue}
                  onChange={(e) => setFormVenue(e.target.value)}
                  className="w-full bg-[#0B0B0F] border-2 border-black p-2.5 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00] mb-2"
                  required
                />
                <div className="flex flex-wrap gap-1.5">
                  {campusVenues.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setFormVenue(v)}
                      className="text-[10px] font-mono px-2 py-1 bg-[#181920] hover:bg-black text-zinc-300 border border-zinc-700"
                    >
                      {v.split('(')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Host, Capacity & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                    Activity Lead / Host:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Min-jun & Sarah"
                    value={formHost}
                    onChange={(e) => setFormHost(e.target.value)}
                    className="w-full bg-[#0B0B0F] border-2 border-black p-2.5 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                    Max Capacity:
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={formCapacity}
                    onChange={(e) => setFormCapacity(e.target.value)}
                    className="w-full bg-[#0B0B0F] border-2 border-black p-2.5 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                    Planning Status:
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as EventItem['status'])}
                    className="w-full bg-[#0B0B0F] border-2 border-black p-2.5 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                  >
                    <option value="Confirmed">Confirmed Meetup</option>
                    <option value="Planning">In Planning</option>
                    <option value="Volunteers Needed">Volunteers Needed</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                  Activity Overview:
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the vibe, what games we'll play, or what food we'll cook..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-[#0B0B0F] border-2 border-black p-2.5 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                />
              </div>

              {/* Interactive Preparation Checklist Manager */}
              <div className="bg-[#181920] border-2 border-black p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black uppercase text-zinc-300">
                    Activity Preparation Tasks ({formTasks.length}):
                  </span>
                  <span className="font-mono text-[11px] text-[#C6FF00]">
                    {formTasks.filter(t => t.done).length} ready
                  </span>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {formTasks.map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-2 bg-[#0B0B0F] border border-black gap-2">
                      <div 
                        onClick={() => handleToggleFormTask(t.id)}
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        {t.done ? <CheckSquare className="w-3.5 h-3.5 text-[#C6FF00]" /> : <Square className="w-3.5 h-3.5 text-zinc-500" />}
                        <span className={`text-xs font-mono ${t.done ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                          {t.task}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFormTask(t.id)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add prep task (e.g. print rule sheets, order drinks)..."
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPrepTask())}
                    className="flex-1 bg-[#0B0B0F] border border-black p-2 text-xs font-mono text-white outline-hidden focus:border-[#C6FF00]"
                  />
                  <button
                    type="button"
                    onClick={handleAddPrepTask}
                    className="px-3 py-2 bg-[#22232B] hover:bg-black text-white border border-black font-mono text-xs uppercase"
                  >
                    Add Task
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsPlanModalOpen(false)}
                  className="px-4 py-2.5 bg-[#0B0B0F] hover:bg-zinc-800 border-2 border-black text-xs font-mono text-zinc-300 uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="brutal-btn bg-[#C6FF00] text-black font-display font-black text-xs sm:text-sm px-6 py-2.5 uppercase tracking-wide cursor-pointer"
                >
                  {isEditing ? 'Save Changes' : 'Schedule on Calendar'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
