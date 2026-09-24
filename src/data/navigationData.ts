export interface SubItem {
  title: string;
  categoryTag?: string;
  href: string;
  description: string;
  badge?: string;
  linkText?: string;
  children?: SubItem[];
}

export interface NavCategory {
  categoryTitle: string;
  badge?: string;
  items: SubItem[];
}

export interface NavItemData {
  id: string;
  label: string;
  href?: string;
  isCta?: boolean;
  accentColor: string; // Distinct theme color for each nav item
  accentLightBg: string;
  categories?: NavCategory[];
  items?: SubItem[];
  sideContact?: {
    phone: string;
    phoneLabel: string;
    actionLabel: string;
    actionHref: string;
    quickLinks: { label: string; href: string }[];
  };
}

export const navigationData: NavItemData[] = [
  {
    id: "students",
    label: "Students",
    accentColor: "#e85870", // Next 1 coral rose
    accentLightBg: "#fff1f4",
    categories: [
      {
        categoryTitle: "School Students",
        badge: "Classes 8–12",
        items: [
          {
            title: "Class 8–10",
            categoryTag: "Stream & Subject Selection",
            href: "/students/school/class-8-10-stream-selection",
            description:
              "Advanced psychometric assessment & personalised guidance to help you select the perfect stream and subjects that align you to the right careers.",
            linkText: "View Program Details",
          },
          {
            title: "Class 11–12",
            categoryTag: "Stream Selection + College Consultation",
            href: "/students/school/class-11-12-stream-college-consultation",
            description:
              "Comprehensive career selection, entrance exam strategy & university admission planning for competitive undergraduate admissions.",
            linkText: "View Program Details",
          },
        ],
      },
      {
        categoryTitle: "College Students",
        badge: "Undergrad & Postgrad",
        items: [
          {
            title: "Resume Writing",
            categoryTag: "Placement & Internship Ready",
            href: "/students/college/resume-writing",
            description:
              "ATS-optimised student resumes engineered to pass recruiter screening and land top campus drives.",
            linkText: "View Program Details",
          },
          {
            title: "Career Coaching",
            categoryTag: "1-on-1 Mentorship",
            href: "/students/college/career-coaching",
            description:
              "1-on-1 industry roadmap, identifying individual strengths & niche high-growth career specialisations.",
            linkText: "View Program Details",
          },
          {
            title: "Behaviour Session",
            categoryTag: "Corporate Etiquette",
            href: "/students/college/behaviour-session",
            description:
              "Master soft skills, interpersonal communication, corporate EQ, and group discussion simulations.",
            linkText: "View Program Details",
          },
          {
            title: "Government Jobs",
            categoryTag: "Competitive Exams",
            href: "/students/college/government-jobs",
            description:
              "Structured blueprints and syllabus roadmaps for UPSC, SSC, Banking, Defense & State PSC exams.",
            linkText: "View Program Details",
          },
          {
            title: "College Consultation",
            categoryTag: "Master's & PG Admissions",
            href: "/students/college/consultation",
            description:
              "Expert guidance on target postgraduate colleges, international applications, and profile building.",
            linkText: "View Program Details",
          },
        ],
      },
    ],
    sideContact: {
      phone: "+91 98765 43210",
      phoneLabel: "Talk to Student Counselor",
      actionLabel: "Send a Message",
      actionHref: "/lets-talk?ref=students",
      quickLinks: [
        { label: "Success Stories", href: "/success-stories" },
        { label: "Free Stream Assessment", href: "/assessment" },
        { label: "About Next 1 Education", href: "/about-us" },
      ],
    },
  },
  {
    id: "services",
    label: "Services",
    accentColor: "#1769aa",
    accentLightBg: "#eff6ff",
    items: [
      {
        title: "Career Coaching",
        categoryTag: "1-on-1 Industry Mentorship",
        href: "/services/career-coaching",
        description:
          "Personalised 1-on-1 coaching sessions tailored to your aspirations, strengths, and long-term milestones.",
        linkText: "View Service Details",
      },
      {
        title: "Resume Writing",
        categoryTag: "ATS & Executive Resumes",
        href: "/services/resume-writing",
        description:
          "ATS-compliant resumes, high-impact cover letters, and complete LinkedIn profile optimization.",
        linkText: "View Service Details",
      },
      {
        title: "Behaviour Session",
        categoryTag: "Interview Mastery",
        href: "/services/behaviour-session",
        description:
          "Behavioural interview preparation, STAR framework coaching, and executive presence development.",
        linkText: "View Service Details",
      },
      {
        title: "Technical Guidance & Mentoring",
        categoryTag: "Tech & Architecture",
        href: "/services/technical-guidance-mentoring",
        description:
          "Hands-on technology stack mentoring, system design guidance, and coding interview preparation.",
        linkText: "View Service Details",
      },
    ],
    sideContact: {
      phone: "+91 98765 43210",
      phoneLabel: "Speak with an Advisor",
      actionLabel: "Send a Message",
      actionHref: "/lets-talk?ref=services",
      quickLinks: [
        { label: "Our Methodology", href: "/methodology" },
        { label: "Pricing & Packages", href: "/pricing" },
        { label: "Client Testimonials", href: "/testimonials" },
      ],
    },
  },
  {
    id: "working-professionals",
    label: "Working Professionals",
    accentColor: "#0f766e",
    accentLightBg: "#f0fdfa",
    items: [
      {
        title: "Resume Writing",
        categoryTag: "Executive & Mid-Level",
        href: "/professionals/resume-writing",
        description:
          "Executive resumes emphasizing quantified achievements, leadership impact, and business value.",
        linkText: "View Details",
      },
      {
        title: "Career Growth Guidance",
        categoryTag: "Promotions & Appraisals",
        href: "/professionals/career-growth-guidance",
        description:
          "Strategic roadmaps for internal promotions, career pivots, executive compensation & negotiations.",
        linkText: "View Details",
      },
      {
        title: "Technical + Behavioural",
        categoryTag: "Leadership Interviews",
        href: "/professionals/technical-behavioural",
        description:
          "Holistic preparation combining deep architectural/technical rounds with managerial and cultural evaluations.",
        linkText: "View Details",
      },
    ],
    sideContact: {
      phone: "+91 98765 43210",
      phoneLabel: "Executive Desk",
      actionLabel: "Send a Message",
      actionHref: "/lets-talk?ref=professionals",
      quickLinks: [
        { label: "Executive Mentors", href: "/mentors" },
        { label: "Leadership Case Studies", href: "/case-studies" },
        { label: "Book Confidential Call", href: "/lets-talk?type=confidential" },
      ],
    },
  },
  {
    id: "institutions",
    label: "Institutions",
    accentColor: "#7356bf",
    accentLightBg: "#f5f3ff",
    items: [
      {
        title: "Hire Us",
        categoryTag: "Turnkey Career Cell",
        href: "/institutions/hire-us",
        description:
          "End-to-end career cell management, corporate campus hiring drives, and placement training partnerships.",
        linkText: "Explore Partnership",
      },
      {
        title: "Mentor Students",
        categoryTag: "Cohort Programs",
        href: "/institutions/mentor-students",
        description:
          "Empower whole student batches with customized cohort mentorship programs led by certified industry veterans.",
        linkText: "Explore Mentorship",
      },
      {
        title: "Seminars / Workshops",
        categoryTag: "Campus Interactive",
        href: "/institutions/seminars",
        description:
          "Interactive campus seminars on higher education, the job market, and government career paths.",
        children: [
          {
            title: "Higher Education / Graduation",
            categoryTag: "Global Opportunities",
            href: "/institutions/seminars/higher-education",
            description:
              "Campus workshops demystifying global study destinations, scholarship avenues, and international admissions.",
            linkText: "View Seminar Details",
          },
          {
            title: "Job Market",
            categoryTag: "Industry Trends",
            href: "/institutions/seminars/job-market",
            description:
              "Real-time orientation on modern hiring trends, AI disruptions, and employer readiness benchmarks.",
            linkText: "View Seminar Details",
          },
          {
            title: "Government Jobs",
            categoryTag: "Public Sector Careers",
            href: "/institutions/seminars/government-jobs",
            description:
              "Comprehensive campus orientation workshops on Civil Services, Banking, Defense, and PSU opportunities.",
            linkText: "View Seminar Details",
          },
        ],
      },
    ],
    sideContact: {
      phone: "+91 98765 43210",
      phoneLabel: "Campus Partnerships Desk",
      actionLabel: "Request Campus Proposal",
      actionHref: "/institutions/proposal",
      quickLinks: [
        { label: "Partner Institutions", href: "/institutions/partners" },
        { label: "Workshop Catalog", href: "/institutions/catalog" },
        { label: "Schedule Institutional Call", href: "/lets-talk?ref=institutions" },
      ],
    },
  },
  {
    id: "lets-talk",
    label: "Let's Talk",
    href: "/lets-talk",
    isCta: true,
    accentColor: "#059669", // Animates into Emerald dialer
    accentLightBg: "#ecfdf5",
  },
];
