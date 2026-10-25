import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  EventItem, 
  INITIAL_EVENTS, 
  ActivityIdea, 
  INITIAL_IDEAS, 
  CultureItem, 
  CULTURE_ITEMS, 
  GalleryItem, 
  INITIAL_GALLERY,
  UserInquiry
} from '../data/mockData';

interface AppContextType {
  events: EventItem[];
  myRsvps: string[]; // event slugs
  ideas: ActivityIdea[];
  cultureStories: CultureItem[];
  galleryItems: GalleryItem[];
  inquiries: UserInquiry[];
  isAdmin: boolean;
  announcement: string;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  rsvpEvent: (slug: string, attendee: { name: string; email: string; notes?: string }) => { success: boolean; message: string; waitlisted?: boolean };
  cancelRsvp: (slug: string, email: string) => void;
  submitJoinApplication: (data: Omit<UserInquiry, 'id' | 'submittedAt' | 'status'>) => { id: string };
  registerMember: (data: Omit<UserInquiry, 'id' | 'submittedAt' | 'status'> & { studentId?: string; dietaryNotes?: string }) => { id: string; memberPassId: string };
  submitIdea: (idea: Omit<ActivityIdea, 'id' | 'votes' | 'status' | 'submittedAt'>) => void;
  voteIdea: (id: string) => void;
  submitStory: (story: Omit<CultureItem, 'id'>) => void;
  submitPhoto: (photo: Omit<GalleryItem, 'id' | 'likes' | 'permissionGranted'>) => void;
  likePhoto: (id: string) => void;
  // Activity / Event planning actions ("Workable Calendar")
  createEvent: (event: Omit<EventItem, 'id' | 'registeredCount'>) => void;
  updateEvent: (id: string, updated: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  togglePrepChecklistItem: (eventId: string, taskId: string) => void;
  addPrepChecklistItem: (eventId: string, task: string) => void;
  updateEventStatus: (id: string, isPublished: boolean) => void;
  cancelEventAction: (id: string) => void;
  updateInquiryStatus: (id: string, status: UserInquiry['status']) => void;
  updateIdeaStatus: (id: string, status: ActivityIdea['status']) => void;
  setAnnouncement: (text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('chillax_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [myRsvps, setMyRsvps] = useState<string[]>(() => {
    const saved = localStorage.getItem('chillax_my_rsvps');
    return saved ? JSON.parse(saved) : [];
  });

  const [ideas, setIdeas] = useState<ActivityIdea[]>(() => {
    const saved = localStorage.getItem('chillax_ideas');
    return saved ? JSON.parse(saved) : INITIAL_IDEAS;
  });

  const [cultureStories, setCultureStories] = useState<CultureItem[]>(() => {
    const saved = localStorage.getItem('chillax_stories');
    return saved ? JSON.parse(saved) : CULTURE_ITEMS;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('chillax_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [inquiries, setInquiries] = useState<UserInquiry[]>(() => {
    const saved = localStorage.getItem('chillax_inquiries');
    return saved ? JSON.parse(saved) : [
      {
        id: "inq-101",
        fullName: "Kim Min-ji",
        email: "minji.k@wsu.ac.kr",
        studentStatus: "Undergraduate (Sophomore)",
        interests: ["Food and cultural exchange", "Games and social activities"],
        preferredLanguage: "Korean & English",
        message: "Excited to meet international students and practice casual English!",
        submittedAt: "2026-10-22",
        status: "Welcomed"
      },
      {
        id: "inq-102",
        fullName: "Lucas Hernandez",
        email: "lucas.h@wsu.ac.kr",
        studentStatus: "Exchange Student",
        interests: ["City exploration", "Language exchange", "Art and creativity"],
        preferredLanguage: "Spanish & English",
        message: "Just arrived in Daejeon last week from Spain. Want to explore the cafes and culture.",
        submittedAt: "2026-10-23",
        status: "Pending"
      }
    ];
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('chillax_admin_auth') === 'true';
  });

  const [announcement, setAnnouncement] = useState<string>(() => {
    return localStorage.getItem('chillax_announcement') || "🔥 FALL SEMESTER SESSIONS EVERY FRIDAY · WOOSONG WEST CAMPUS LOUNGE · ALL WOOSONG STUDENTS WELCOME!";
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('chillax_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('chillax_my_rsvps', JSON.stringify(myRsvps));
  }, [myRsvps]);

  useEffect(() => {
    localStorage.setItem('chillax_ideas', JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem('chillax_stories', JSON.stringify(cultureStories));
  }, [cultureStories]);

  useEffect(() => {
    localStorage.setItem('chillax_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('chillax_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('chillax_announcement', announcement);
  }, [announcement]);

  const loginAdmin = (passcode: string) => {
    if (passcode.toLowerCase().trim() === 'chillax2026' || passcode.toLowerCase().trim() === 'admin') {
      setIsAdmin(true);
      sessionStorage.setItem('chillax_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('chillax_admin_auth');
  };

  const rsvpEvent = (slug: string, attendee: { name: string; email: string; notes?: string }) => {
    const targetEvent = events.find(e => e.slug === slug);
    if (!targetEvent) return { success: false, message: "Event not found" };

    const isAlreadyRegistered = targetEvent.attendees?.some(a => a.email.toLowerCase() === attendee.email.toLowerCase());
    if (isAlreadyRegistered) {
      return { success: false, message: "You are already registered with this email address!" };
    }

    const isFull = targetEvent.registeredCount >= targetEvent.capacity;

    const newAttendee = {
      name: attendee.name,
      email: attendee.email,
      notes: attendee.notes,
      registeredAt: new Date().toISOString()
    };

    setEvents(prev => prev.map(evt => {
      if (evt.slug === slug) {
        return {
          ...evt,
          registeredCount: isFull ? evt.registeredCount : evt.registeredCount + 1,
          attendees: [...(evt.attendees || []), newAttendee]
        };
      }
      return evt;
    }));

    if (!myRsvps.includes(slug)) {
      setMyRsvps(prev => [...prev, slug]);
    }

    if (isFull) {
      return { 
        success: true, 
        message: "This event is currently at full capacity, but you have been added to the priority waitlist! If a spot opens up, we will email you directly.",
        waitlisted: true 
      };
    }

    return { 
      success: true, 
      message: `You're confirmed for ${targetEvent.title}! See you there!` 
    };
  };

  const cancelRsvp = (slug: string, email: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.slug === slug) {
        const updatedAttendees = (evt.attendees || []).filter(a => a.email.toLowerCase() !== email.toLowerCase());
        const countDiff = (evt.attendees?.length || 0) - updatedAttendees.length;
        return {
          ...evt,
          registeredCount: Math.max(0, evt.registeredCount - countDiff),
          attendees: updatedAttendees
        };
      }
      return evt;
    }));
    setMyRsvps(prev => prev.filter(s => s !== slug));
  };

  const submitJoinApplication = (data: Omit<UserInquiry, 'id' | 'submittedAt' | 'status'>) => {
    const newId = `inq-${Date.now().toString().slice(-4)}`;
    const newInquiry: UserInquiry = {
      ...data,
      id: newId,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    return { id: newId };
  };

  const submitIdea = (idea: Omit<ActivityIdea, 'id' | 'votes' | 'status' | 'submittedAt'>) => {
    const newIdea: ActivityIdea = {
      ...idea,
      id: `idea-${Date.now()}`,
      votes: 1,
      status: 'Pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setIdeas(prev => [newIdea, ...prev]);
  };

  const voteIdea = (id: string) => {
    setIdeas(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, votes: item.votes + 1 };
      }
      return item;
    }));
  };

  const submitStory = (story: Omit<CultureItem, 'id'>) => {
    const newStory: CultureItem = {
      ...story,
      id: `c-${Date.now()}`
    };
    setCultureStories(prev => [newStory, ...prev]);
  };

  const submitPhoto = (photo: Omit<GalleryItem, 'id' | 'likes' | 'permissionGranted'>) => {
    const newPhoto: GalleryItem = {
      ...photo,
      id: `gal-${Date.now()}`,
      likes: 0,
      permissionGranted: true
    };
    setGalleryItems(prev => [newPhoto, ...prev]);
  };

  const likePhoto = (id: string) => {
    setGalleryItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    }));
  };

  const createEvent = (eventData: Omit<EventItem, 'id' | 'registeredCount'>) => {
    const newEvent: EventItem = {
      ...eventData,
      id: `evt-${Date.now()}`,
      registeredCount: 0,
      attendees: []
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const updateEventStatus = (id: string, isPublished: boolean) => {
    setEvents(prev => prev.map(evt => evt.id === id ? { ...evt, isPublished } : evt));
  };

  const cancelEventAction = (id: string) => {
    setEvents(prev => prev.map(evt => evt.id === id ? { ...evt, isCancelled: true } : evt));
  };

  const updateInquiryStatus = (id: string, status: UserInquiry['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  const updateIdeaStatus = (id: string, status: ActivityIdea['status']) => {
    setIdeas(prev => prev.map(idea => idea.id === id ? { ...idea, status } : idea));
  };

  const registerMember = (data: Omit<UserInquiry, 'id' | 'submittedAt' | 'status'> & { studentId?: string; dietaryNotes?: string }) => {
    const newId = `inq-${Date.now().toString().slice(-4)}`;
    const passNum = Math.floor(1000 + Math.random() * 9000);
    const memberPassId = `WX-2026-${passNum}`;
    const newInquiry: UserInquiry = {
      ...data,
      id: newId,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Pending',
      message: data.message ? `${data.message} [Pass: ${memberPassId}]` : `[Pass: ${memberPassId}]`
    };
    setInquiries(prev => [newInquiry, ...prev]);
    return { id: newId, memberPassId };
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setEvents(prev => prev.map(evt => evt.id === id ? { ...evt, ...updated } : evt));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(evt => evt.id !== id));
  };

  const togglePrepChecklistItem = (eventId: string, taskId: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId && evt.prepChecklist) {
        return {
          ...evt,
          prepChecklist: evt.prepChecklist.map(item => 
            item.id === taskId ? { ...item, done: !item.done } : item
          )
        };
      }
      return evt;
    }));
  };

  const addPrepChecklistItem = (eventId: string, task: string) => {
    if (!task.trim()) return;
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        const newTask = {
          id: `task-${Date.now()}`,
          task: task.trim(),
          done: false
        };
        return {
          ...evt,
          prepChecklist: [...(evt.prepChecklist || []), newTask]
        };
      }
      return evt;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        events,
        myRsvps,
        ideas,
        cultureStories,
        galleryItems,
        inquiries,
        isAdmin,
        announcement,
        loginAdmin,
        logoutAdmin,
        rsvpEvent,
        cancelRsvp,
        submitJoinApplication,
        registerMember,
        submitIdea,
        voteIdea,
        submitStory,
        submitPhoto,
        likePhoto,
        createEvent,
        updateEvent,
        deleteEvent,
        togglePrepChecklistItem,
        addPrepChecklistItem,
        updateEventStatus,
        cancelEventAction,
        updateInquiryStatus,
        updateIdeaStatus,
        setAnnouncement
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
