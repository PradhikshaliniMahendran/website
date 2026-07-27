export const MOCK_USERS = [
  {
    id: "usr_001",
    name: "Dr. Robert Vance",
    email: "robert.vance@university.edu",
    role: "ADMIN",
    profile: {
      studentId: "FAC-9912",
      department: "Administration & Student Affairs",
      year: 0,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      phone: "+1 (555) 019-2834",
      bio: "Director of Student Activities and Campus Events Coordination.",
      interests: ["Leadership", "Campus Life", "Policy", "Governance"]
    }
  },
  {
    id: "usr_002",
    name: "Pradhikshalini Mahendran",
    email: "shalini@student.university.edu",
    role: "STUDENT",
    profile: {
      studentId: "STU-2024-8841",
      department: "Computer Science & Engineering",
      year: 3,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
      phone: "+1 (555) 234-5678",
      bio: "Tech enthusiast, AI learner & IEEE Student Branch Lead.",
      interests: ["Artificial Intelligence", "Web Development", "Hackathons", "Design"]
    }
  },
  {
    id: "usr_003",
    name: "Midhurshan Selvam",
    email: "midhurshan@student.university.edu",
    role: "CLUB_HEAD",
    profile: {
      studentId: "STU-2024-5120",
      department: "Software Engineering",
      year: 4,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      phone: "+1 (555) 345-6789",
      bio: "President of the Innovation & Robotics Club.",
      interests: ["Robotics", "IoT", "Event Planning", "Competitive Coding"]
    }
  },
  {
    id: "usr_004",
    name: "Prof. Sarah Jenkins",
    email: "sarah.jenkins@faculty.university.edu",
    role: "FACULTY",
    profile: {
      studentId: "FAC-4410",
      department: "School of Engineering & Applied Sciences",
      year: 0,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
      phone: "+1 (555) 456-7890",
      bio: "Faculty Advisor for Cultural & Tech Societies.",
      interests: ["Research", "Innovation", "Student Mentorship"]
    }
  }
];

export const MOCK_VENUES = [
  {
    id: "vnu_1",
    name: "Grand Academic Auditorium",
    location: "Building A - Floor 1",
    capacity: 500,
    resources: [
      { name: "Projector 4K", quantity: 2, available: true },
      { name: "Surround Sound System", quantity: 1, available: true },
      { name: "Wireless Mics", quantity: 6, available: true }
    ],
    status: "ACTIVE"
  },
  {
    id: "vnu_2",
    name: "Innovation Tech Hub Lab",
    location: "Engineering Complex - Block C",
    capacity: 120,
    resources: [
      { name: "High-Spec Workstations", quantity: 60, available: true },
      { name: "Smart Interactive Displays", quantity: 2, available: true }
    ],
    status: "ACTIVE"
  },
  {
    id: "vnu_3",
    name: "Open-Air Campus Amphitheater",
    location: "Central Quad Lawn",
    capacity: 800,
    resources: [
      { name: "Outdoor Concert Stage", quantity: 1, available: true },
      { name: "Floodlights System", quantity: 4, available: true }
    ],
    status: "ACTIVE"
  },
  {
    id: "vnu_4",
    name: "University Sports Arena",
    location: "Athletics Complex",
    capacity: 1200,
    resources: [
      { name: "Digital Scoreboard", quantity: 2, available: true },
      { name: "Public Address System", quantity: 1, available: true }
    ],
    status: "ACTIVE"
  }
];

export const MOCK_CLUBS = [
  {
    id: "clb_1",
    name: "Cyber & AI Tech Club",
    category: "TECHNICAL",
    description: "Empowering future developers, cybersecurity researchers, and machine learning enthusiasts through hands-on hackathons and workshops.",
    headId: "usr_003",
    headName: "Midhurshan Selvam",
    facultyAdvisor: "Prof. Sarah Jenkins",
    logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=300",
    banner: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    membersCount: 248,
    eventsCount: 12,
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://techclub.university.edu"
    }
  },
  {
    id: "clb_2",
    name: "Campus Rhythm Cultural Society",
    category: "CULTURAL",
    description: "The heart of music, dance, theater, and creative performances on campus. Organizers of the Annual University Spring Fest.",
    headId: "usr_002",
    headName: "Pradhikshalini Mahendran",
    facultyAdvisor: "Prof. Sarah Jenkins",
    logo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=300",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    membersCount: 310,
    eventsCount: 18,
    socialLinks: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com"
    }
  },
  {
    id: "clb_3",
    name: "Titan Sports & Fitness League",
    category: "SPORTS",
    description: "Promoting athletic excellence, team sports, marathons, and inter-university championship tournaments.",
    headId: "usr_003",
    headName: "Midhurshan Selvam",
    facultyAdvisor: "Dr. Robert Vance",
    logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=300",
    banner: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&q=80&w=800",
    membersCount: 420,
    eventsCount: 15,
    socialLinks: {
      facebook: "https://facebook.com"
    }
  }
];

export const MOCK_EVENTS = [
  {
    id: "evt_101",
    title: "Global AI & Cloud Hackathon 2026",
    description: "A 24-hour intensive coding competition featuring guest mentors from leading tech companies, cloud credits, and $5,000 in prizes.",
    category: "WORKSHOP",
    organizerId: "usr_003",
    organizerName: "Cyber & AI Tech Club",
    clubId: "clb_1",
    venueId: "vnu_2",
    venueName: "Innovation Tech Hub Lab",
    venueLocation: "Engineering Complex - Block C",
    startDate: "2026-08-15T09:00",
    endDate: "2026-08-16T09:00",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    capacity: 100,
    registeredCount: 84,
    status: "APPROVED",
    tags: ["AI", "Cloud", "Hackathon", "Coding"],
    isFeatured: true,
    waitlistEnabled: true,
    registrationDeadline: "2026-08-12T23:59"
  },
  {
    id: "evt_102",
    title: "Annual University Cultural Night 2026",
    description: "An extraordinary evening celebrating music, dance, drama, and international student cultures with live performances.",
    category: "CULTURAL",
    organizerId: "usr_002",
    organizerName: "Campus Rhythm Cultural Society",
    clubId: "clb_2",
    venueId: "vnu_3",
    venueName: "Open-Air Campus Amphitheater",
    venueLocation: "Central Quad Lawn",
    startDate: "2026-08-20T18:00",
    endDate: "2026-08-20T22:30",
    banner: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    capacity: 750,
    registeredCount: 620,
    status: "APPROVED",
    tags: ["Music", "Dance", "Culture", "Stage"],
    isFeatured: true,
    waitlistEnabled: true,
    registrationDeadline: "2026-08-19T17:00"
  },
  {
    id: "evt_103",
    title: "Quantum Computing & Security Seminar",
    description: "Keynote presentation by guest research scientists on quantum cryptography and future cybersecurity resilience.",
    category: "SEMINAR",
    organizerId: "usr_004",
    organizerName: "School of Engineering",
    clubId: "clb_1",
    venueId: "vnu_1",
    venueName: "Grand Academic Auditorium",
    venueLocation: "Building A - Floor 1",
    startDate: "2026-08-25T14:00",
    endDate: "2026-08-25T17:00",
    banner: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
    capacity: 350,
    registeredCount: 290,
    status: "APPROVED",
    tags: ["Quantum", "Security", "Keynote", "Research"],
    isFeatured: false,
    waitlistEnabled: true,
    registrationDeadline: "2026-08-24T23:59"
  },
  {
    id: "evt_104",
    title: "Inter-Department Athletics Tournament",
    description: "Track & field, basketball, and football tournament pitting university departments against each other for the University Shield.",
    category: "SPORTS",
    organizerId: "usr_003",
    organizerName: "Titan Sports League",
    clubId: "clb_3",
    venueId: "vnu_4",
    venueName: "University Sports Arena",
    venueLocation: "Athletics Complex",
    startDate: "2026-09-01T08:00",
    endDate: "2026-09-02T18:00",
    banner: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&q=80&w=800",
    capacity: 1000,
    registeredCount: 450,
    status: "PENDING",
    tags: ["Sports", "Tournament", "Athletics"],
    isFeatured: false,
    waitlistEnabled: false,
    registrationDeadline: "2026-08-30T18:00"
  }
];

export const MOCK_ANNOUNCEMENTS = [
  {
    id: "anc_1",
    clubId: "clb_1",
    clubName: "Cyber & AI Tech Club",
    title: "🚨 Hackathon Mentor Applications Open!",
    content: "We are seeking senior students and alumni to serve as technical mentors for the upcoming Global AI Hackathon.",
    type: "IMPORTANT",
    priority: "HIGH",
    targetAudience: "ALL",
    date: "2026-07-26T10:00"
  },
  {
    id: "anc_2",
    clubId: "clb_2",
    clubName: "Campus Rhythm Cultural Society",
    title: "🎭 Auditions for Cultural Night Main Stage",
    content: "Dance teams and solo acoustic vocalists can sign up for main stage audition slots this Friday in Room 204.",
    type: "UPDATE",
    priority: "MEDIUM",
    targetAudience: "MEMBERS_ONLY",
    date: "2026-07-25T14:30"
  }
];

export const MOCK_REGISTRATIONS = [
  {
    id: "reg_901",
    eventId: "evt_101",
    eventTitle: "Global AI & Cloud Hackathon 2026",
    userId: "usr_002",
    userName: "Pradhikshalini Mahendran",
    registrationDate: "2026-07-20T11:20",
    status: "CONFIRMED",
    qrCode: "CAMPUS-REG-EVT101-USR002-8841",
    checkInStatus: "NOT_CHECKED_IN",
    certificateEligible: true
  },
  {
    id: "reg_902",
    eventId: "evt_102",
    eventTitle: "Annual University Cultural Night 2026",
    userId: "usr_002",
    userName: "Pradhikshalini Mahendran",
    registrationDate: "2026-07-22T09:15",
    status: "CONFIRMED",
    qrCode: "CAMPUS-REG-EVT102-USR002-8841",
    checkInStatus: "ATTENDED",
    certificateEligible: true
  }
];

export const MOCK_CERTIFICATES = [
  {
    id: "crt_501",
    certificateNumber: "CERT-2026-CAMPUS-0912",
    eventId: "evt_102",
    eventTitle: "Annual University Cultural Night 2026",
    userId: "usr_002",
    recipientName: "Pradhikshalini Mahendran",
    type: "PARTICIPATION",
    issuedDate: "2026-07-23",
    verificationCode: "VERIFY-9981-CAMPUS",
    downloadUrl: "#"
  }
];

export const MOCK_ANALYTICS = {
  totalEvents: 42,
  activeClubs: 18,
  registeredStudents: 2847,
  overallEngagementRate: "84.5%",
  monthlyAttendance: [
    { month: "Jan", attendance: 420 },
    { month: "Feb", attendance: 680 },
    { month: "Mar", attendance: 950 },
    { month: "Apr", attendance: 1100 },
    { month: "May", attendance: 890 },
    { month: "Jun", attendance: 1400 },
    { month: "Jul", attendance: 1650 }
  ],
  categoryBreakdown: [
    { category: "Technical", count: 14, color: "#1A237E" },
    { category: "Cultural", count: 12, color: "#00BFA5" },
    { category: "Sports", count: 8, color: "#FF6F00" },
    { category: "Workshops", count: 5, color: "#FF5722" },
    { category: "Seminars", count: 3, color: "#0D47A1" }
  ]
};
