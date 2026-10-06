// TECH KRITI 2026 - Master Event Data & Configuration
// Official DSEU & Outside Student Pricing & Paytm UPI Configuration

const TECH_KRITI_DATA = {
  festivalName: "Tech Kriti 2026",
  tagline: "Igniting Innovation • Celebrating Creativity",
  dates: {
    preEvent: "22 October 2026",
    mainEvent: "23 October 2026",
    isoPreEvent: "2026-10-22",
    isoMainEvent: "2026-10-23"
  },
  venue: "Campus Auditorium, Tech Labs & Main Grounds",
  
  // Official One-Time Entry Pricing Structure
  pricing: {
    dseuFee: 50,      // DSEU Campus Students: ₹50 only
    outsideFee: 100,  // Outside / Other Colleges: ₹100 only
    eventsFee: 0,     // ALL competitions are 100% FREE once entry pass is taken!
    currency: "INR"
  },

  // Official UPI Payment Gateway Configuration
  paymentConfig: {
    payeeName: "Rishab Kumar Jha",
    upiId: "6287056243@ptsbi",
    qrImagePath: "assets/upi_qr_rishab.jpg",
    qrImagePathSub: "../assets/upi_qr_rishab.jpg",
    app: "Paytm UPI / Any UPI App"
  },

  organizer: {
    name: "Tech Kriti Organizing Committee",
    email: "techkriti2026@dseu.ac.in",
    helpdesk: "Student Activity Centre, Campus Auditorium"
  },
  
  // All 10 Activities (All Free with Entry Pass!)
  activities: [
    {
      id: "prompt-engineering",
      title: "Prompt Engineering Challenge",
      category: "Technical",
      icon: "fa-robot",
      gradient: "from-cyan-500 to-blue-600",
      accentColor: "#06b6d4",
      tag: "AI & Future Tech",
      fee: 0, // FREE with Entry Pass
      teamType: "Individual",
      maxTeamSize: 1,
      awards: "Trophy, Merit Medals & Certificate",
      description: "Harness LLMs, solve reasoning puzzles, jailbreak optimizations, and generate deterministic outputs under timed spotlight.",
      schedule: [
        { day: "Pre-Events", date: "22 October", time: "1:00 PM – 2:00 PM", stage: "Round 1: Rapid Prompting", venue: "Computer Lab 3" },
        { day: "Main Event", date: "23 October", time: "11:10 AM – 11:40 AM", stage: "Grand Finale: Jailbreak & Optimization", venue: "Main Auditorium Hall" }
      ],
      rules: [
        "Participation is FREE with the One-Time Festival Entry Pass.",
        "Round 1 consists of 5 deterministic prompt extraction challenges.",
        "Finale tests real-time prompt injection defense and token economy.",
        "Access provided to standard frontier LLM playgrounds."
      ],
      registrationUrl: "pages/prompt-engineering.html"
    },
    {
      id: "frontend",
      title: "Front End Web Sprint",
      category: "Technical",
      icon: "fa-code",
      gradient: "from-blue-600 to-indigo-600",
      accentColor: "#3b82f6",
      tag: "Web Craft & UI/UX",
      fee: 0, // FREE with Entry Pass
      teamType: "Individual / Duo",
      maxTeamSize: 2,
      awards: "Trophy, Merit Medals & Certificate",
      description: "Build responsive, visually breathtaking UI/UX web applications within 2 hours. Showcase modern layout, animations, and clean code.",
      schedule: [
        { day: "Pre-Events", date: "22 October", time: "2:00 PM – 4:00 PM", stage: "Sprint Elimination: Rapid UI Build", venue: "Turing Lab, 2nd Floor" },
        { day: "Main Event", date: "23 October", time: "10:00 AM – 11:10 AM", stage: "Sprint Finale: Live Pitch & Polish", venue: "Tech Amphitheatre" }
      ],
      rules: [
        "Participation is FREE with the One-Time Festival Entry Pass.",
        "Use HTML5/Tailwind/CSS or React/Vue. Mobile responsiveness mandatory.",
        "Prompt announced at sprint start. Live deployment URL required."
      ],
      registrationUrl: "pages/frontend.html"
    },
    {
      id: "carrom",
      title: "Carrom Championship",
      category: "Sports & Gaming",
      icon: "fa-circle-dot",
      gradient: "from-amber-500 to-orange-600",
      accentColor: "#f59e0b",
      tag: "Indoor Sports",
      fee: 0, // FREE with Entry Pass
      teamType: "Singles / Doubles",
      maxTeamSize: 2,
      awards: "Trophy, Merit Medals & Certificate",
      description: "Precision rebounds, strikes, and pocket control on professional tournament boards under certified referee oversight.",
      schedule: [
        { day: "Pre-Events", date: "22 October", time: "2:00 PM – 5:00 PM", stage: "Knockout Rounds & Quarterfinals", venue: "Indoor Sports Arena" }
      ],
      rules: [
        "Participation is FREE with the One-Time Festival Entry Pass.",
        "International Carrom Federation standard knockout rules apply.",
        "Queen cover required. Regulation strikers provided."
      ],
      registrationUrl: "pages/carrom.html"
    },
    {
      id: "memory-challenge",
      title: "Memory Challenge",
      category: "Brain & Mind",
      icon: "fa-brain",
      gradient: "from-purple-500 to-pink-600",
      accentColor: "#a855f7",
      tag: "Cognitive Hack",
      fee: 0, // FREE with Entry Pass
      teamType: "Individual",
      maxTeamSize: 1,
      awards: "Trophy, Merit Medals & Certificate",
      description: "Memorize rapid numerical sequences, randomized grids, faces, and names under high-pressure timed spotlight.",
      schedule: [
        { day: "Main Event", date: "23 October", time: "11:00 AM – 12:15 PM", stage: "Full Championship Rounds", venue: "Conference Hall B" }
      ],
      rules: [
        "Participation is FREE with the One-Time Festival Entry Pass.",
        "50-digit number recall in 90 seconds. Speed tie-breaker rounds."
      ],
      registrationUrl: "pages/memory-challenge.html"
    },
    {
      id: "singing",
      title: "Singing Showcase (Voice of Kriti)",
      category: "Cultural",
      icon: "fa-microphone",
      gradient: "from-rose-500 to-red-600",
      accentColor: "#f43f5e",
      tag: "Music & Vocals",
      fee: 0, // FREE with Entry Pass
      teamType: "Solo / Duet",
      maxTeamSize: 2,
      awards: "Trophy, Merit Medals & Certificate",
      description: "Hit high notes and mesmerize the crowd with classical melodies, western pop, acoustic covers, or rap vocals on the auditorium stage.",
      schedule: [
        { day: "Main Event", date: "23 October", time: "12:00 PM – 12:30 PM", stage: "Live Stage Performance", venue: "Main Auditorium Stage" }
      ],
      rules: [
        "Participation is FREE with the One-Time Festival Entry Pass.",
        "4 minutes stage time per performance. Acoustic guitars or backing tracks permitted."
      ],
      registrationUrl: "pages/singing.html"
    },
    {
      id: "poetry",
      title: "Poetry & Slam Verse",
      category: "Literary & Arts",
      icon: "fa-feather",
      gradient: "from-emerald-500 to-teal-600",
      accentColor: "#10b981",
      tag: "Words & Expression",
      fee: 0, // FREE with Entry Pass
      teamType: "Individual",
      maxTeamSize: 1,
      awards: "Trophy, Merit Medals & Certificate",
      description: "Express your soul through rhymes, shayari, and spoken word in Hindi, English, or Urdu before a passionate audience.",
      schedule: [
        { day: "Main Event", date: "23 October", time: "12:30 PM – 1:00 PM", stage: "Live Recitation & Slam", venue: "Main Auditorium Stage" }
      ],
      rules: [
        "Participation is FREE with the One-Time Festival Entry Pass.",
        "Original work only. 3 minutes time limit per poet."
      ],
      registrationUrl: "pages/poetry.html"
    },
    {
      id: "cosplay",
      title: "Cosplay Extravaganza",
      category: "Creative & Arts",
      icon: "fa-masks-theater",
      gradient: "from-violet-500 to-indigo-600",
      accentColor: "#8b5cf6",
      tag: "Costume & Character",
      fee: 0, // FREE with Entry Pass
      teamType: "Individual / Duo",
      maxTeamSize: 2,
      awards: "Trophy, Merit Medals & Certificate",
      description: "Bring your favorite anime, gaming, comic, or sci-fi characters to life! Walk the ramp and deliver iconic character enactments.",
      schedule: [
        { day: "Main Event", date: "23 October", time: "1:00 PM – 1:30 PM", stage: "Cosplay Rampwalk & Enactment", venue: "Main Auditorium Stage" }
      ],
      rules: [
        "Participation is FREE with the One-Time Festival Entry Pass.",
        "Ramp walk + 60s character pose/monologue. Prop weapons must be safe (foam/cardboard)."
      ],
      registrationUrl: "pages/cosplay.html"
    },
    {
      id: "standup",
      title: "Stand-up Comedy Open Mic",
      category: "Cultural & Fun",
      icon: "fa-face-laugh-beam",
      gradient: "from-yellow-400 to-amber-600",
      accentColor: "#eab308",
      tag: "Humor & Wit",
      fee: 0, // FREE with Entry Pass
      teamType: "Individual",
      maxTeamSize: 1,
      awards: "Trophy, Merit Medals & Certificate",
      description: "Punchlines, observational humor, and hilarious college stories! Own the microphone and make the auditorium roar with laughter.",
      schedule: [
        { day: "Main Event", date: "23 October", time: "1:30 PM – 2:10 PM", stage: "Auditorium Standup Sets", venue: "Main Auditorium Stage" }
      ],
      rules: [
        "Participation is FREE with the One-Time Festival Entry Pass.",
        "4 minutes mic time. Respect campus humor guidelines."
      ],
      registrationUrl: "pages/standup.html"
    },
    {
      id: "tech-debate",
      title: "Tech Debate: The Clash of Minds",
      category: "Technical & Literary",
      icon: "fa-comments",
      gradient: "from-sky-500 to-indigo-600",
      accentColor: "#0284c7",
      tag: "Debate & Oratory",
      fee: 0, // FREE with Entry Pass
      teamType: "Duo (Team of 2)",
      maxTeamSize: 2,
      awards: "Trophy, Merit Medals & Certificate",
      description: "AI Regulation, Big Tech Monopolies, Privacy vs Security: Battle with logic, empirical research, and fiery rhetoric.",
      schedule: [
        { day: "Main Event", date: "23 October", time: "2:10 PM – 2:30 PM", stage: "Grand Debate Championship", venue: "Main Auditorium Stage" }
      ],
      rules: [
        "Participation is FREE with the One-Time Festival Entry Pass.",
        "Team of 2 (For & Against). Oxford debate format."
      ],
      registrationUrl: "pages/tech-debate.html"
    },
    {
      id: "dance",
      title: "Dance Mania: Rhythm Revolution",
      category: "Cultural",
      icon: "fa-person-running",
      gradient: "from-fuchsia-500 to-pink-600",
      accentColor: "#d946ef",
      tag: "Dance & Performance",
      fee: 0, // FREE with Entry Pass
      teamType: "Solo / Duo / Crew (up to 8)",
      maxTeamSize: 8,
      awards: "Trophy, Merit Medals & Certificate",
      description: "Feel the bass, ignite the floor, and battle in Hip-Hop, Contemporary, Freestyle, or Fusion choreographies on the grand stage.",
      schedule: [
        { day: "Main Event", date: "23 October", time: "2:30 PM – 3:40 PM", stage: "Grand Dance Arena Showcase", venue: "Main Auditorium Stage" }
      ],
      rules: [
        "Participation is FREE with the One-Time Festival Entry Pass.",
        "Solo/Duo: 3–4 mins. Group Crew: 4–6 mins. High bitrate audio track required."
      ],
      registrationUrl: "pages/dance.html"
    },
    {
      id: "open-dj",
      title: "Open DJ Night for Everyone",
      category: "Celebration",
      icon: "fa-compact-disc",
      gradient: "from-purple-600 to-pink-500",
      accentColor: "#c026d3",
      tag: "Mega Afterparty",
      fee: 0,
      teamType: "Open to All Registered Students",
      maxTeamSize: 1,
      awards: "High-Octane Party Vibes",
      description: "Cap off Tech Kriti with the most electrifying campus DJ party! Subwoofer drops, concert lighting, and celebration.",
      schedule: [
        { day: "Main Event", date: "23 October", time: "After Main Events (3:40 PM Onwards)", stage: "Open DJ Arena", venue: "Main Campus Grounds" }
      ],
      rules: [
        "Free entry for all registered students holding a Tech Kriti Entry Pass."
      ],
      registrationUrl: "pages/register.html"
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      question: "How does the registration fee work?",
      answer: "Tech Kriti uses a simple one-time festival entry fee: ₹50 for DSEU students and ₹100 for outside college students. Once you have this entry pass, you can participate in all 10 competitions and the DJ night with zero additional fees!"
    },
    {
      question: "How do I pay the registration fee?",
      answer: "Scan the official Paytm UPI QR code (Payee: Rishab Kumar Jha, 6287056243@ptsbi) using Paytm, Google Pay, PhonePe, or BHIM. Enter your 12-digit UTR reference number upon payment to instantly generate your official festival pass."
    },
    {
      question: "Can outside (non-DSEU) college students participate?",
      answer: "Yes, absolutely! Students from all colleges and universities across India (DU, IPU, DTU, NSUT, Jamia, AKTU, IITs, etc.) are warmly invited with a ₹100 festival entry pass."
    },
    {
      question: "How will I receive my digital festival pass?",
      answer: "As soon as you complete your payment and submit your 12-digit UTR number, your official digital pass with a cryptographic QR code will be generated on screen. You can also view and print it anytime from the Student Portal."
    },
    {
      question: "Can I participate in multiple events?",
      answer: "Yes! Your festival entry pass covers all 10 events. Just make sure to check the event timeline so your chosen events do not have overlapping schedules."
    }
  ]
};

if (typeof window !== "undefined") {
  window.TECH_KRITI_DATA = TECH_KRITI_DATA;
}
