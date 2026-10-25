import campusHangoutImg from '../assets/images/chillax_campus_hangout_1792761422085.jpg';
import culturalFoodImg from '../assets/images/chillax_cultural_food_1792761421731.jpg';
import creativeJamImg from '../assets/images/chillax_creative_jam_1792761423100.jpg';
import daejeonExploreImg from '../assets/images/chillax_daejeon_explore_1792761423098.jpg';

// Image assets generated for Woosong Chillax Club
export const IMAGES = {
  campusHangout: campusHangoutImg || '/images/chillax_campus_hangout_1792761422085.jpg',
  culturalFood: culturalFoodImg || '/images/chillax_cultural_food_1792761421731.jpg',
  creativeJam: creativeJamImg || '/images/chillax_creative_jam_1792761423100.jpg',
  daejeonExplore: daejeonExploreImg || '/images/chillax_daejeon_explore_1792761423098.jpg',
};

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: 'Games' | 'Culture' | 'Food' | 'Creativity' | 'Exploration' | 'Social';
  coverImage: string;
  description: string;
  fullDetails: string;
  startTime: string; // ISO string
  endTime: string;
  displayDate: string;
  displayTime: string;
  venue: string;
  venueNotes?: string;
  cost: string;
  capacity: number;
  registeredCount: number;
  registrationDeadline: string;
  isPublished: boolean;
  isCancelled?: boolean;
  accentColor: string; // 'lime' | 'purple' | 'blue'
  whatToBring: string[];
  participationNotes: string;
  attendees?: { name: string; email: string; registeredAt: string; notes?: string; status?: string }[];
  status?: 'Confirmed' | 'Planning' | 'Volunteers Needed';
  hostName?: string;
  prepChecklist?: { id: string; task: string; done: boolean }[];
  tags?: string[];
}

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "evt-0",
    slug: "autumn-lawn-acoustic-picnic",
    title: "Autumn Campus Lawn Acoustic Picnic & Games",
    category: "Social",
    coverImage: IMAGES.campusHangout,
    description: "Bring a blanket, sip hot citron tea (yuja-cha), and unwind on Woosong West lawn with easy acoustic tunes and lawn games.",
    fullDetails: "Before the November chill settles in, we take over the Woosong West grassy quad for an open afternoon picnic. Acoustic guitars, casual Spikeball and Uno rounds, and hot Korean roasted sweet potatoes (gun-goguma).",
    startTime: "2026-10-30T17:00:00+09:00",
    endTime: "2026-10-30T19:30:00+09:00",
    displayDate: "Fri, Oct 30, 2026",
    displayTime: "17:00 – 19:30 KST",
    venue: "Woosong West Campus Main Lawn (In front of W1)",
    venueNotes: "In case of rain, moved inside to W1 Student Center 1st Floor.",
    cost: "Free (Hot tea & sweet potatoes provided)",
    capacity: 40,
    registeredCount: 34,
    registrationDeadline: "2026-10-29T23:59:00+09:00",
    isPublished: true,
    accentColor: "lime",
    hostName: "Min-jun Kim & Sarah Lee",
    status: "Confirmed",
    tags: ["Outdoor", "Acoustic", "Autumn Vibe"],
    whatToBring: [
      "Woosong student ID",
      "Warm hoodie or scarf",
      "Optional: acoustic instrument or picnic blanket"
    ],
    participationNotes: "Open seating and easy drop-in format.",
    prepChecklist: [
      { id: "p0-1", task: "Reserve picnic blankets & electric hot water dispenser", done: true },
      { id: "p0-2", task: "Purchase sweet potatoes and yuja-cha jars from mart", done: true },
      { id: "p0-3", task: "Set up acoustic guitar microphones and speakers", done: true },
      { id: "p0-4", task: "Confirm rain contingency room with facilities", done: true }
    ],
    attendees: [
      { name: "Min-jun Kim", email: "minjun.k@wsu.ac.kr", registeredAt: "2026-10-20" },
      { name: "Elena Rostova", email: "elena.r@wsu.ac.kr", registeredAt: "2026-10-21" },
      { name: "Kwon Ji-hoon", email: "jihoon.k@wsu.ac.kr", registeredAt: "2026-10-22" }
    ]
  },
  {
    id: "evt-1",
    slug: "global-tteokbokki-dumpling-swap",
    title: "Global Tteokbokki & Dumpling Swap Night",
    category: "Food",
    coverImage: IMAGES.culturalFood,
    description: "Cook, taste, and compare dumplings and street snacks from 7 different countries right here in Daejeon.",
    fullDetails: "Food brings everyone together faster than anything else! At this student cook & share gathering, Korean students will share authentic secret-recipe spicy and rose tteokbokki, while international students bring dumplings, samosas, and gyoza traditions. Vegetarian and halal friendly options provided.",
    startTime: "2026-11-06T18:30:00+09:00",
    endTime: "2026-11-06T21:00:00+09:00",
    displayDate: "Fri, Nov 6, 2026",
    displayTime: "18:30 – 21:00 KST",
    venue: "Woosong International Student Lounge (W3 Bldg, 1st Fl)",
    venueNotes: "Kitchen area near Student Center. Look for the Chillax yellow banner.",
    cost: "Free (Snacks sponsored by Chillax)",
    capacity: 35,
    registeredCount: 28,
    registrationDeadline: "2026-11-05T23:59:00+09:00",
    isPublished: true,
    accentColor: "lime",
    hostName: "Azizbek R. & Min-jun K.",
    status: "Confirmed",
    tags: ["Cooking", "Halal Friendly", "Street Food"],
    whatToBring: [
      "Your student ID card",
      "An empty stomach and an open mind",
      "Optional: 1 small snack or tea from your home country to share"
    ],
    participationNotes: "All ingredients are clearly labeled for allergens (nuts, gluten, dairy) and dietary preferences (halal, vegetarian).",
    prepChecklist: [
      { id: "p1-1", task: "Book W3 kitchen counter & portable induction burners", done: true },
      { id: "p1-2", task: "Buy rice cakes, gochujang, cream sauce, and halal chicken", done: true },
      { id: "p1-3", task: "Print ingredient allergen flags & bilingual recipe cards", done: false },
      { id: "p1-4", task: "Assign 4 student kitchen assistants", done: true }
    ],
    attendees: [
      { name: "Lucas Hernandez", email: "lucas.h@wsu.ac.kr", registeredAt: "2026-10-23" },
      { name: "Kim Min-ji", email: "minji.k@wsu.ac.kr", registeredAt: "2026-10-23" }
    ]
  },
  {
    id: "evt-2",
    slug: "neo-arcade-board-games-brawl",
    title: "Neo-Arcade & Board Games Party",
    category: "Games",
    coverImage: IMAGES.campusHangout,
    description: "Low-stress party games, Catan, Mario Kart tournament, and international card games. Come solo or with your squad.",
    fullDetails: "University weeks can get heavy; Friday game night is made to decompress! We have 20+ multiplayer board games (Codenames, Exploding Kittens, Avalon, Korean Yutnori, Rummikub) plus a big-screen Switch station. Zero game experience needed — game masters explain the rules in English and Korean.",
    startTime: "2026-11-13T19:00:00+09:00",
    endTime: "2026-11-13T22:00:00+09:00",
    displayDate: "Fri, Nov 13, 2026",
    displayTime: "19:00 – 22:00 KST",
    venue: "Woosong University Student Activity Hall (W1 Building, 4th Floor)",
    venueNotes: "Directly opposite Woosong Campus Library entrance.",
    cost: "Free (Includes chilled drinks and chips)",
    capacity: 40,
    registeredCount: 36,
    registrationDeadline: "2026-11-12T23:59:00+09:00",
    isPublished: true,
    accentColor: "blue",
    hostName: "Da-eun Park & Kenji Sato",
    status: "Confirmed",
    tags: ["Board Games", "Nintendo Switch", "Casual Tournament"],
    whatToBring: [
      "Woosong University student ID",
      "Comfortable shoes"
    ],
    participationNotes: "Solo attendees will be automatically grouped into friendly welcome tables so you never sit alone.",
    prepChecklist: [
      { id: "p2-1", task: "Inspect 22 board games for missing cards and dice", done: true },
      { id: "p2-2", task: "Borrow HDMI projector and extension cords for Nintendo Switch", done: true },
      { id: "p2-3", task: "Purchase snacks, sparkling water, and iced green tea", done: false },
      { id: "p2-4", task: "Print rule summary sheets in Korean & English", done: false }
    ]
  },
  {
    id: "evt-3",
    slug: "zine-sticker-art-jam",
    title: "Zine & Sticker Creative Art Jam",
    category: "Creativity",
    coverImage: IMAGES.creativeJam,
    description: "Cut, paste, draw, and print your own custom stickers and miniature zines with fellow student designers and doodles lovers.",
    fullDetails: "Express what university life feels like in Daejeon. We supply high-grade sticker paper, paint markers, vintage magazine cutouts, mini thermal label printers, and Polaroid cameras. Everyone leaves with custom stickers and a collaborative community art zine.",
    startTime: "2026-11-20T17:00:00+09:00",
    endTime: "2026-11-20T20:00:00+09:00",
    displayDate: "Fri, Nov 20, 2026",
    displayTime: "17:00 – 20:00 KST",
    venue: "Creative Media Studio (W7 Building, Room 210)",
    venueNotes: "Take elevator B to the 2nd floor.",
    cost: "Free (Materials provided)",
    capacity: 25,
    registeredCount: 19,
    registrationDeadline: "2026-11-19T23:59:00+09:00",
    isPublished: true,
    accentColor: "purple",
    hostName: "Chloe Dupont & Ji-won Han",
    status: "Planning",
    tags: ["Sticker Printing", "Zines", "Neo-Brutalism Art"],
    whatToBring: [
      "Any doodles, sketches or digital illustrations you want to print (optional)",
      "Creativity and good vibes"
    ],
    participationNotes: "No art background required. Our creative leads teach easy stencil and collage techniques.",
    prepChecklist: [
      { id: "p3-1", task: "Order holographic vinyl sticker sheets & thermal rolls", done: true },
      { id: "p3-2", task: "Set up 3 photo printer workstations in W7 Room 210", done: false },
      { id: "p3-3", task: "Collect old Korean street and pop culture magazines for collaging", done: true },
      { id: "p3-4", task: "Prepare Neo-Brutalist typography stamps and inks", done: false }
    ]
  },
  {
    id: "evt-4",
    slug: "daejeon-twilight-skyroad-walk",
    title: "Daejeon Twilight Cafe Crawl & Skyroad Walk",
    category: "Exploration",
    coverImage: IMAGES.daejeonExplore,
    description: "Discover hidden rooftop cafes, vintage bakeries in Eunhaeng-dong, and watch the LED Skyroad show together.",
    fullDetails: "Explore Daejeon beyond campus borders! We will take the subway from Daedong station into Old Downtown Eunhaeng-dong, hit iconic bakeries (Sung Sim Dang), explore atmospheric record stores, and grab coffee at a chill Korean aesthetic cafe.",
    startTime: "2026-11-27T16:30:00+09:00",
    endTime: "2026-11-27T20:30:00+09:00",
    displayDate: "Fri, Nov 27, 2026",
    displayTime: "16:30 – 20:30 KST",
    venue: "Meeting Point: Woosong West Campus Main Gate Clocktower",
    venueNotes: "We travel together by Daejeon Metro Line 1 (10 min ride).",
    cost: "Pay for your own coffee/bread (approx. ₩7,000–₩12,000)",
    capacity: 20,
    registeredCount: 20,
    registrationDeadline: "2026-11-26T18:00:00+09:00",
    isPublished: true,
    accentColor: "lime",
    hostName: "Hyun-woo Bae & Mateo Silva",
    status: "Confirmed",
    tags: ["City Walk", "Bakery Run", "Daejeon Vibes"],
    whatToBring: [
      "T-Money or subway transit card",
      "Warm evening jacket",
      "Phone / camera for city snaps"
    ],
    participationNotes: "Event currently at capacity! Sign up to join the waiting list — cancellations usually open 2-3 spots.",
    prepChecklist: [
      { id: "p4-1", task: "Scout route from Daedong station to Eunhaeng-dong rooftop cafe", done: true },
      { id: "p4-2", task: "Pre-book seating for 20 at Cafe Myeong", done: true },
      { id: "p4-3", task: "Prepare Subway group transit instructions for exchange students", done: true },
      { id: "p4-4", task: "Create KakaoTalk location share group for easy rendezvous", done: false }
    ]
  },
  {
    id: "evt-5",
    slug: "speed-friendship-language-roulette",
    title: "Speed Friendship & Language Roulette",
    category: "Social",
    coverImage: IMAGES.campusHangout,
    description: "5-minute rotating conversation rounds with funny prompts. Practice Korean, English, or any shared language without feeling awkward.",
    fullDetails: "Skip small talk about your major and dive into questions that actually make you laugh. Every 5 minutes a chime rings, you rotate to a new buddy, pick a card from the Chillax prompt deck, and converse. Supported by AI-generated conversational icebreakers on the screen.",
    startTime: "2026-12-04T18:00:00+09:00",
    endTime: "2026-12-04T20:30:00+09:00",
    displayDate: "Fri, Dec 4, 2026",
    displayTime: "18:00 – 20:30 KST",
    venue: "Woosong West Campus Student Union Hall (W1-104)",
    cost: "Free",
    capacity: 50,
    registeredCount: 31,
    registrationDeadline: "2026-12-03T23:59:00+09:00",
    isPublished: true,
    accentColor: "blue",
    hostName: "Yujin Song & Alex Vance",
    status: "Volunteers Needed",
    tags: ["Language Exchange", "Icebreakers", "Friendship Match"],
    whatToBring: ["Good humor and enthusiasm"],
    participationNotes: "Bilingual facilitators available at every table to bridge any language gap seamlessly.",
    prepChecklist: [
      { id: "p5-1", task: "Generate 50 bilingual conversation prompt flashcards", done: true },
      { id: "p5-2", task: "Recruit 6 bilingual table cheerleaders / facilitators", done: false },
      { id: "p5-3", task: "Prepare interval chime sound on Spotify / sound system", done: false },
      { id: "p5-4", task: "Set up 10 circular speed tables with nametags", done: false }
    ]
  },
  {
    id: "evt-6",
    slug: "korean-calligraphy-tote-bag-customizing",
    title: "Hangul Calligraphy & Custom Tote Bag Workshop",
    category: "Culture",
    coverImage: IMAGES.creativeJam,
    description: "Learn beautiful Hangul stroke calligraphy from design seniors and silkscreen your favorite phrase onto heavy canvas tote bags.",
    fullDetails: "Hands-on Korean calligraphy with modern street aesthetic. Choose a word (like CHILLAX, 인연 (destiny), or your Korean name) and print it on black or natural canvas totes using textile fabric inks.",
    startTime: "2026-12-11T17:30:00+09:00",
    endTime: "2026-12-11T20:00:00+09:00",
    displayDate: "Fri, Dec 11, 2026",
    displayTime: "17:30 – 20:00 KST",
    venue: "Woosong Creative Media Studio (W7 Building, Room 204)",
    cost: "Free (Tote bag + inks provided)",
    capacity: 30,
    registeredCount: 18,
    registrationDeadline: "2026-12-10T23:59:00+09:00",
    isPublished: true,
    accentColor: "purple",
    hostName: "Seo-yeon Jung & Club Leads",
    status: "Planning",
    tags: ["Hangul", "Tote Bags", "Craft Workshop"],
    whatToBring: ["Clothes you don't mind getting a tiny paint speck on"],
    participationNotes: "Each participant takes home 1 customized tote bag.",
    prepChecklist: [
      { id: "p6-1", task: "Order 40 heavy canvas blank tote bags", done: true },
      { id: "p6-2", task: "Mix black, white, and electric lime textile screen inks", done: false },
      { id: "p6-3", task: "Prepare heat press irons for fixing paint onto fabric", done: false },
      { id: "p6-4", task: "Print guide sheets for basic Hangul brush strokes", done: true }
    ]
  }
];

export interface FunActivity {
  id: string;
  title: string;
  mood: 'Chill' | 'Energetic' | 'Creative' | 'Social';
  budget: 'Free' | 'Low-cost' | 'Flexible';
  time: '15 minutes' | '1 hour' | 'Half a day';
  groupSize: 'Solo-friendly' | 'Two people' | 'Group';
  description: string;
  instructions: string[];
  estimatedDuration: string;
  budgetCategory: string;
  tags: string[];
}

export const FUN_ACTIVITIES: FunActivity[] = [
  {
    id: "act-1",
    title: "Hanbat Arboretum Sunset Stroll",
    mood: "Chill",
    budget: "Free",
    time: "1 hour",
    groupSize: "Two people",
    description: "Take a tranquil walk through Daejeon's sprawling botanical park while talking about favorite childhood songs.",
    instructions: [
      "Grab a warm canned coffee from a convenience store",
      "Enter Hanbat Arboretum (West Garden is quieter around 5 PM)",
      "Trade music playlists: each person plays 2 tracks that remind them of home"
    ],
    estimatedDuration: "45–60 mins",
    budgetCategory: "Free (₩0)",
    tags: ["Nature", "Music", "Conversation"]
  },
  {
    id: "act-2",
    title: "Convenience Store Gourmet Fusion Challenge",
    mood: "Creative",
    budget: "Low-cost",
    time: "1 hour",
    groupSize: "Group",
    description: "Head to GS25 or CU with ₩5,000 each and invent a brand-new hybrid noodle or snack recipe together.",
    instructions: [
      "Each person has a strict ₩5,000 budget cap",
      "Pick 1 instant noodle, 1 cheese/sausage topping, and 1 wildcard snack",
      "Use the hot water and microwave to assemble your culinary invention",
      "Rate each other's creations on Taste, Presentation, and Chaos"
    ],
    estimatedDuration: "50 mins",
    budgetCategory: "Low-cost (~₩5,000/person)",
    tags: ["Food", "Challenge", "Campus Life"]
  },
  {
    id: "act-3",
    title: "15-Minute Polaroid Micro-Photo Hunt",
    mood: "Energetic",
    budget: "Free",
    time: "15 minutes",
    groupSize: "Solo-friendly",
    description: "A quick creative reset between lectures: photograph 3 everyday objects on campus that match the color lime.",
    instructions: [
      "Set a phone timer for exactly 15 minutes",
      "Find 1 object that looks like a smiling face",
      "Find 1 object that is Electric Lime or neon yellow",
      "Find 1 bilingual sign with an interesting font",
      "Upload your best shot to the Chillax community board"
    ],
    estimatedDuration: "15 mins",
    budgetCategory: "Free",
    tags: ["Photography", "Speed", "Daejeon"]
  },
  {
    id: "act-4",
    title: "Board Game Speed Marathon at West Campus",
    mood: "Social",
    budget: "Free",
    time: "1 hour",
    groupSize: "Group",
    description: "Quick-fire rounds of Taco Cat Goat Cheese Pizza and Dobble to get the whole table laughing.",
    instructions: [
      "Pick up the Chillax board game kit from the student club locker",
      "Set up at the West Campus study atrium tables",
      "Play 3 fast rounds where losers have to do a funny celebration dance"
    ],
    estimatedDuration: "60 mins",
    budgetCategory: "Free",
    tags: ["Games", "High Energy", "Laughs"]
  },
  {
    id: "act-5",
    title: "Yuseong Hot Springs Foot Spa Hangout",
    mood: "Chill",
    budget: "Free",
    time: "Half a day",
    groupSize: "Group",
    description: "Ride the Daejeon metro to Yuseong Spa station and soak your feet in the outdoor natural thermal footbaths.",
    instructions: [
      "Bring a small personal hand towel",
      "Take Metro Line 1 to Yuseong Spa Station (Exit 7)",
      "Dip into the 40°C mineral footbaths under the maple trees",
      "Follow up with traditional hot kalguksu (knife-cut noodles) nearby"
    ],
    estimatedDuration: "2.5–3 hours",
    budgetCategory: "Free (Subway fare only)",
    tags: ["Relax", "Daejeon Gem", "Wellness"]
  },
  {
    id: "act-6",
    title: "Language Switch Coffee Date",
    mood: "Social",
    budget: "Low-cost",
    time: "1 hour",
    groupSize: "Two people",
    description: "Grab a milk tea or latte near Woosong and spend 20 minutes speaking only Korean, then 20 minutes in your partner's language.",
    instructions: [
      "Order drinks at a nearby campus cafe (e.g., Namu Cafe or Mega Coffee)",
      "Round 1 (20 mins): Korean only, using body language & doodles if stuck",
      "Round 2 (20 mins): Partner's native language or English",
      "No judging, no grading — only friendly encouragement"
    ],
    estimatedDuration: "45 mins",
    budgetCategory: "Low-cost (~₩3,500/coffee)",
    tags: ["Language", "Culture", "Friendship"]
  },
  {
    id: "act-7",
    title: "Campus D-Town Graffiti Lettering Jam",
    mood: "Creative",
    budget: "Free",
    time: "15 minutes",
    groupSize: "Solo-friendly",
    description: "Grab a sheet of paper and doodle your name or nickname in Chillax bubble graffiti lettering.",
    instructions: [
      "Draw chunky rounded letter outlines like cloud bubbles",
      "Add a thick black stroke around every contour",
      "Add small star sparkles on the top corners of letters",
      "Color the highlights with electric lime highlighter"
    ],
    estimatedDuration: "15 mins",
    budgetCategory: "Free",
    tags: ["Art", "Bubble Style", "Relax"]
  },
  {
    id: "act-8",
    title: "Daejeon Skyroad Street Food Expedition",
    mood: "Energetic",
    budget: "Flexible",
    time: "Half a day",
    groupSize: "Group",
    description: "Head to Jung-gu downtown, taste hotteok, skewers, and explore underground shopping arcades with 3–5 friends.",
    instructions: [
      "Meet at Jungangno station around 5:30 PM",
      "Check out the giant suspended LED arcade screen canopy at 7 PM",
      "Sample sweet brown-sugar ssiat hotteok and spicy odeng skewers",
      "Browse Korean photo sticker booths (Life Four Cuts) to document the trip"
    ],
    estimatedDuration: "3.5 hours",
    budgetCategory: "Flexible (₩10,000–₩15,000)",
    tags: ["Exploration", "Street Food", "Night Life"]
  }
];

export interface Icebreaker {
  id: string;
  category: 'Funny' | 'Culture' | 'Getting to Know You' | 'Deep Conversations' | 'University Life';
  question: string;
  followUp: string;
}

export const ICEBREAKERS: Icebreaker[] = [
  {
    id: "ib-1",
    category: "Culture",
    question: "What is one street food from your hometown that everyone in the world should try at least once?",
    followUp: "How is it made, and what is the best drink to pair with it?"
  },
  {
    id: "ib-2",
    category: "Getting to Know You",
    question: "What was your very first impression when you walked onto the Woosong campus?",
    followUp: "Has that impression changed since you started classes?"
  },
  {
    id: "ib-3",
    category: "Funny",
    question: "If you had to survive a week on campus eating only items from the convenience store, which 3 items do you pick?",
    followUp: "Would you trade any of them for a hot bowl of homemade soup?"
  },
  {
    id: "ib-4",
    category: "Culture",
    question: "What is a common gesture, custom, or superstition in your home country that foreign students might find surprising?",
    followUp: "Have you ever accidentally misunderstood a Korean gesture?"
  },
  {
    id: "ib-5",
    category: "University Life",
    question: "What is your secret spot on campus to study, nap, or clear your head between lectures?",
    followUp: "What kind of background noise or music do you listen to there?"
  },
  {
    id: "ib-6",
    category: "Deep Conversations",
    question: "If you could step into a time machine and give advice to yourself on your first day of university, what would you say?",
    followUp: "What is one fear you had then that turned out to be completely fine?"
  },
  {
    id: "ib-7",
    category: "Funny",
    question: "What is the most bizarre or hilarious translation fail you have ever experienced when ordering food or texting?",
    followUp: "Did you end up getting what you thought you ordered?"
  },
  {
    id: "ib-8",
    category: "Getting to Know You",
    question: "What's a game, cartoon, or hobby you loved fiercely growing up that still makes you nostalgic today?",
    followUp: "Do you still revisit it when you want comfort?"
  },
  {
    id: "ib-9",
    category: "Culture",
    question: "What is one holiday or festival celebrated in your culture that you wish Woosong students could experience together?",
    followUp: "What music, clothing, or rituals make it so special?"
  },
  {
    id: "ib-10",
    category: "University Life",
    question: "What has been the most pleasantly surprising thing about making friends from different countries?",
    followUp: "What common ground did you discover that you didn't expect?"
  }
];

export interface CultureItem {
  id: string;
  category: 'phrases' | 'food' | 'tradition' | 'story' | 'exchange';
  title: string;
  koreanText?: string;
  pronunciation?: string;
  translation?: string;
  context: string;
  contributor?: string;
  contributorCountry?: string;
  tags: string[];
}

export const CULTURE_ITEMS: CultureItem[] = [
  {
    id: "c-1",
    category: "phrases",
    title: "Let's grab a coffee / meal together!",
    koreanText: "언제 밥 한번 같이 먹어요!",
    pronunciation: "Eon-je bap han-beon gat-i meog-eo-yo!",
    translation: "Let's eat together sometime!",
    context: "In Korea, this is the ultimate friendly gesture to show you enjoy someone's company. While sometimes used as a casual goodbye, at Chillax Club we actually make it happen!",
    tags: ["Campus Korean", "Friendship", "Essential"]
  },
  {
    id: "c-2",
    category: "phrases",
    title: "Hard work today / Good job!",
    koreanText: "오늘도 수고 많으셨어요!",
    pronunciation: "O-neul-do su-go man-eu-syeoss-eo-yo!",
    translation: "You worked hard today / Thank you for your effort!",
    context: "Say this at the end of a group project, a Chillax event, or after a long study session. It shows genuine empathy and respect.",
    tags: ["Polite", "Community", "Daily"]
  },
  {
    id: "c-3",
    category: "phrases",
    title: "Please give me less spicy, please!",
    koreanText: "덜 맵게 해주실 수 있나요?",
    pronunciation: "Deol maep-ge hae-ju-sil su iss-na-yo?",
    translation: "Could you please make it less spicy?",
    context: "A lifesaver for international students trying tteokbokki, dakgalbi, or jjamppong for the first time in Daejeon restaurants.",
    tags: ["Food Ordering", "Survival Korean"]
  },
  {
    id: "c-4",
    category: "food",
    title: "Daejeon Bread Pilgrimage: The Legend of Sung Sim Dang",
    context: "Daejeon is famously nicknamed 'City of Science and Bread' in Korea! Sung Sim Dang bakery, founded in 1956 near Daejeon Station, donates all unsold bread daily to local charities and invented the legendary Twigim Soboro (fried streusel red-bean pastry).",
    contributor: "Min-jun & Sarah",
    contributorCountry: "Korea / USA",
    tags: ["Daejeon Heritage", "Bakery Culture", "Local Pride"]
  },
  {
    id: "c-5",
    category: "tradition",
    title: "Chimaek & Han River Style Picnics at Expo Park",
    context: "Chimaek (Chicken + Maekju/Beer or cider) isn't just about food — it's about sitting on a picnic mat with friends until the stars come out, chatting without checking the clock. We host monthly non-alcoholic Chimaek nights at Hanbat Expo Bridge.",
    contributor: "Chillax Social Team",
    tags: ["Social Ritual", "Outdoor Hangout"]
  },
  {
    id: "c-6",
    category: "story",
    title: "How a lost subway ride in Daejeon turned into my closest friendship",
    context: "When I arrived at Woosong as an exchange student from Tashkent, I took the wrong bus towards Sintanjin on my second day. A Korean senior from the Health Science department noticed my confusion, helped me translate, and we ended up eating sundubu-jjigae together. Two semesters later, we co-founded the language exchange nights at Chillax.",
    contributor: "Azizbek R.",
    contributorCountry: "Uzbekistan",
    tags: ["Student Story", "True Friendship", "Woosong Life"]
  },
  {
    id: "c-7",
    category: "exchange",
    title: "Topic of the Week: Campus Myths & Examination Snacks",
    context: "Did you know Korean students eat yeot (sticky taffy) before college exams so knowledge 'sticks' to their brains, and strictly avoid slippery seaweed soup (miyeok-guk) so they don't 'slip up'? What lucky or unlucky exam foods exist in your country?",
    tags: ["Conversation Starter", "Exams", "Superstitions"]
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Events' | 'Food Nights' | 'Creative Arts' | 'Campus Life';
  imageUrl: string;
  date: string;
  photographer: string;
  caption: string;
  permissionGranted: boolean;
  likes: number;
}

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Midterm Decompression Board Game Circle",
    category: "Events",
    imageUrl: IMAGES.campusHangout,
    date: "October 2026",
    photographer: "Chillax Media Crew",
    caption: "Full house at Woosong Student Center 4th floor lounge! 30 students competing in Avalon and Codenames.",
    permissionGranted: true,
    likes: 42
  },
  {
    id: "gal-2",
    title: "First Annual International Street Snack Feast",
    category: "Food Nights",
    imageUrl: IMAGES.culturalFood,
    date: "October 2026",
    photographer: "Hannah L. & Jun-seo K.",
    caption: "Authentic spicy rose tteokbokki side by side with steamed mandu and international treats.",
    permissionGranted: true,
    likes: 67
  },
  {
    id: "gal-3",
    title: "Bubble Graffiti & Custom Sticker Lab",
    category: "Creative Arts",
    imageUrl: IMAGES.creativeJam,
    date: "September 2026",
    photographer: "Woosong Creative Arts Team",
    caption: "Handmade sticker sheets and Polaroid mementos created during our first zine jam.",
    permissionGranted: true,
    likes: 38
  },
  {
    id: "gal-4",
    title: "Autumn Evening Walk past Woosong Cafes",
    category: "Campus Life",
    imageUrl: IMAGES.daejeonExplore,
    date: "September 2026",
    photographer: "David M.",
    caption: "Winding down after classes near Dong-gu cafes with golden hour light.",
    permissionGranted: true,
    likes: 54
  }
];

export interface UserInquiry {
  id: string;
  fullName: string;
  email: string;
  studentStatus: string;
  interests: string[];
  preferredLanguage: string;
  message: string;
  submittedAt: string;
  status: 'Pending' | 'Contacted' | 'Welcomed';
}

export interface ActivityIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: string;
  duration: string;
  submitterName: string;
  votes: number;
  status: 'Pending' | 'Approved' | 'Planned';
  submittedAt: string;
}

export const INITIAL_IDEAS: ActivityIdea[] = [
  {
    id: "idea-1",
    title: "Daejeon K-League Soccer Match Group Trip",
    description: "Go together to Daejeon World Cup Stadium to support Daejeon Hana Citizen on a Saturday afternoon with fried chicken.",
    category: "Exploration",
    budget: "₩15,000",
    duration: "3 hours",
    submitterName: "Liam K.",
    votes: 19,
    status: "Planned",
    submittedAt: "2026-10-18"
  },
  {
    id: "idea-2",
    title: "Retro Film & Disposable Camera Photo Walk",
    description: "Hand out disposable film cameras to pairs of students, walk through Daedong Mural Village, and develop the photos together.",
    category: "Creativity",
    budget: "₩12,000",
    duration: "2 hours",
    submitterName: "Su-jin P.",
    votes: 24,
    status: "Approved",
    submittedAt: "2026-10-20"
  },
  {
    id: "idea-3",
    title: "Multilingual Karaoke (Noraebang) Battle",
    description: "Rent a party room in Eunhaeng-dong where every participant sings 1 song in a language that is not their mother tongue!",
    category: "Games",
    budget: "₩8,000",
    duration: "2 hours",
    submitterName: "Maria G.",
    votes: 31,
    status: "Approved",
    submittedAt: "2026-10-21"
  }
];
