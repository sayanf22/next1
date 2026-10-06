import {
  BriefcaseBusiness,
  CodeXml,
  FileBadge,
  FileText,
  GraduationCap,
  Handshake,
  Landmark,
  MessagesSquare,
  Presentation,
  School,
  Signpost,
  Target,
  TrendingUp,
  University,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

/** A topic inside a programme (used for seminar subjects). */
export interface Topic {
  id: string;
  title: string;
  tag: string;
  summary: string;
}

/** One programme = one anchored subsection on its section page. */
export interface Programme {
  id: string;
  title: string;
  tag: string;
  summary: string;
  icon: LucideIcon;
  overview: string;
  audience: string;
  covers: string[];
  outcome: string;
  topics?: Topic[];
}

export interface ProgrammeGroup {
  title?: string;
  badge?: string;
  programmes: Programme[];
}

/** One section = one page (Students, Working Professionals, Institutions, Services). */
export interface Section {
  id: string;
  label: string;
  href: string;
  kicker: string;
  title: string;
  intro: string;
  menuIntro: string;
  icon: LucideIcon;
  groups: ProgrammeGroup[];
}

export const sections: Section[] = [
  {
    id: "students",
    label: "Students",
    href: "/students",
    kicker: "For students",
    title: "Guidance for school and college students",
    intro:
      "From choosing a stream after Class 10 to campus placements and postgraduate admissions, we help students across CBSE, ICSE and State boards make each decision with clarity and a plan.",
    menuIntro: "From stream selection in Class 8 to placements and postgraduate admissions.",
    icon: GraduationCap,
    groups: [
      {
        title: "School Students",
        badge: "Classes 8–12",
        programmes: [
          {
            id: "class-8-10",
            title: "Class 8–10",
            tag: "Stream & Subject Selection",
            icon: Signpost,
            summary:
              "Psychometric assessment and personalised guidance to choose the stream and subjects that lead to the right careers.",
            overview:
              "The stream chosen after the Class 10 board exams shapes the courses, entrance exams and careers open later. We use a psychometric assessment and a one-on-one discussion to understand the student's interests, aptitude and strengths, and then help choose a stream and subjects that fit them.",
            audience: "Students in Class 8, 9 and 10, and parents who want to plan the stream decision early.",
            covers: [
              "Psychometric assessment of interests, aptitude and strengths",
              "One-on-one session to discuss the results",
              "Guidance on choosing between Science (PCM or PCB), Commerce and Humanities",
              "Subject combinations and the career paths they lead to",
            ],
            outcome: "A clear stream and subject choice, and an understanding of the careers it can lead to.",
          },
          {
            id: "class-11-12",
            title: "Class 11–12",
            tag: "Stream Selection + College Consultation",
            icon: School,
            summary:
              "Career selection, entrance exam strategy and university admission planning for undergraduate admissions.",
            overview:
              "Class 11 and 12 is when career plans turn into applications. We help students confirm their career direction, understand the entrance exams it requires, such as JEE Main, NEET-UG or CUET-UG, and shortlist colleges and courses for undergraduate admission.",
            audience: "Students in Class 11 and 12 preparing for undergraduate admissions.",
            covers: [
              "Career assessment and selection",
              "Entrance exam strategy for the chosen field, such as JEE Main, NEET-UG or CUET-UG",
              "College and course shortlisting",
              "Admission planning for competitive undergraduate programmes",
            ],
            outcome: "A confirmed career direction, a list of target colleges, and a plan for exams and applications.",
          },
        ],
      },
      {
        title: "College Students",
        badge: "Undergrad & Postgrad",
        programmes: [
          {
            id: "resume-writing",
            title: "Resume Writing",
            tag: "Placement & Internship Ready",
            icon: FileText,
            summary: "ATS-optimised student resumes written to pass recruiter screening for campus drives.",
            overview:
              "A resume is often the first thing a recruiter sees. We write student resumes that present education, projects, internships and skills clearly, in a format that works with the applicant tracking systems (ATS) used in recruiter screening.",
            audience: "College students applying for internships, campus placements or their first job.",
            covers: [
              "Review of your current resume and experience",
              "ATS-friendly structure and formatting",
              "Clear presentation of projects, internships and skills",
              "Guidance on tailoring it for each application",
            ],
            outcome: "A resume ready for campus placements, off-campus drives and internship applications.",
          },
          {
            id: "career-coaching",
            title: "Career Coaching",
            tag: "1-on-1 Mentorship",
            icon: Target,
            summary: "A one-on-one industry roadmap built on your strengths and high-growth specialisations.",
            overview:
              "One-on-one sessions to understand your strengths and interests, map them to industries and roles, and identify specialisations with good growth prospects. You leave with a roadmap for the skills and experience to build next.",
            audience: "College students unsure which career path, specialisation or industry to pursue.",
            covers: [
              "Assessment of your strengths and interests",
              "Industry and role exploration",
              "Identifying niche, high-growth specialisations",
              "A personal career roadmap",
            ],
            outcome: "A clear direction and the next steps to get there.",
          },
          {
            id: "behaviour-session",
            title: "Behavioural Session",
            tag: "Corporate Etiquette",
            icon: MessagesSquare,
            summary: "Soft skills, professional communication, corporate EQ and group discussion practice.",
            overview:
              "Technical knowledge gets you shortlisted; how you communicate and conduct yourself often decides the rest. These sessions build the soft skills expected in interviews and at work.",
            audience: "College students preparing for placements, group discussions and interviews.",
            covers: [
              "Interpersonal and professional communication",
              "Corporate etiquette",
              "Emotional intelligence at work",
              "Group discussion practice through simulations",
            ],
            outcome: "Confidence in group discussions, interviews and your first workplace.",
          },
          {
            id: "government-jobs",
            title: "Government Jobs",
            tag: "Competitive Exams",
            icon: Landmark,
            summary: "Structured preparation roadmaps for UPSC, SSC, Banking, Defence and State PSC exams.",
            overview:
              "Government careers involve long, structured preparation. We help you choose the exam that suits your goals and build a study plan around its syllabus.",
            audience: "Students considering a career in the public sector.",
            covers: [
              "Overview of UPSC Civil Services, SSC, banking (IBPS and SBI), defence (NDA and CDS) and State PSC exams",
              "Choosing the exam that suits your background and goals",
              "A syllabus roadmap for the chosen exam",
              "A structured preparation plan",
            ],
            outcome: "A chosen exam and a structured plan to prepare for it.",
          },
          {
            id: "college-consultation",
            title: "College Consultation",
            tag: "Master's & PG Admissions",
            icon: University,
            summary: "Guidance on postgraduate colleges, international applications and profile building.",
            overview:
              "Choosing a postgraduate programme is a significant decision. We help you shortlist colleges in India and abroad, understand the entrance exams they use, such as CAT, GATE, CUET-PG or GRE, strengthen your profile and plan your applications.",
            audience: "Undergraduate students planning a Master's or other postgraduate programme.",
            covers: [
              "Shortlisting target postgraduate colleges and programmes",
              "Guidance on international applications",
              "Profile building",
              "Application planning",
            ],
            outcome: "A shortlist of programmes and applications that present your profile well.",
          },
        ],
      },
    ],
  },
  {
    id: "working-professionals",
    label: "Working Professionals",
    href: "/working-professionals",
    kicker: "For working professionals",
    title: "Career support for working professionals",
    intro:
      "Whether you are aiming for a promotion, changing direction or preparing for a senior interview, we help you present your experience and plan your next move.",
    menuIntro: "Promotions, career changes and senior interviews.",
    icon: BriefcaseBusiness,
    groups: [
      {
        programmes: [
          {
            id: "resume-writing",
            title: "Resume Writing",
            tag: "Executive & Mid-Level",
            icon: FileBadge,
            summary: "Resumes built around quantified achievements, leadership impact and business value.",
            overview:
              "At mid and senior levels, a resume needs to show impact, not just responsibilities. We rewrite your resume around quantified achievements, leadership and the business value you have delivered.",
            audience: "Mid-level and senior professionals applying for new roles.",
            covers: [
              "Review of your career history and achievements",
              "Achievement-led content with measurable results",
              "Emphasis on leadership and business impact",
              "ATS-friendly formatting",
            ],
            outcome: "A resume that reflects the level you are applying for.",
          },
          {
            id: "career-growth-guidance",
            title: "Career Growth Guidance",
            tag: "Promotions & Appraisals",
            icon: TrendingUp,
            summary: "Roadmaps for promotions, career pivots, compensation and negotiation.",
            overview:
              "Strategic guidance for the next stage of your career, whether that is an internal promotion, a move to a new function or industry, or negotiating your compensation.",
            audience: "Professionals planning a promotion, a change of role or industry, or a salary negotiation.",
            covers: [
              "Planning for internal promotions and appraisals",
              "Evaluating and planning a career pivot",
              "Compensation (CTC) and negotiation preparation",
              "A roadmap for your next role",
            ],
            outcome: "A clear strategy for your next career move.",
          },
          {
            id: "technical-behavioural",
            title: "Technical + Behavioural",
            tag: "Leadership Interviews",
            icon: BriefcaseBusiness,
            summary: "Preparation for technical rounds alongside managerial and cultural evaluations.",
            overview:
              "Senior interviews test both depth and leadership. We prepare you for technical and architecture rounds together with managerial and cultural-fit evaluations.",
            audience: "Experienced professionals preparing for senior and leadership interviews.",
            covers: [
              "Technical and architecture round preparation",
              "Managerial and leadership questions",
              "Cultural-fit evaluations",
              "Practice sessions with feedback",
            ],
            outcome: "Preparation for every round of a senior interview process.",
          },
        ],
      },
    ],
  },
  {
    id: "institutions",
    label: "Institutions",
    href: "/institutions",
    kicker: "For institutions",
    title: "Partnerships for schools and colleges",
    intro:
      "We work with schools and colleges to support their students, from running a career cell to mentoring whole batches and delivering campus seminars.",
    menuIntro: "Career cells, cohort mentoring and campus seminars.",
    icon: Users,
    groups: [
      {
        programmes: [
          {
            id: "hire-us",
            title: "Hire Us",
            tag: "Turnkey Career Cell",
            icon: Handshake,
            summary: "End-to-end career cell management, campus hiring drives and placement training.",
            overview:
              "We set up and manage your institution's career cell, or Training and Placement (T&P) cell, end to end, including placement training and the coordination of corporate campus hiring drives.",
            audience: "Schools and colleges that want a dedicated, professionally run career and placement function.",
            covers: [
              "End-to-end career cell management",
              "Coordination of corporate campus hiring drives",
              "Placement training partnerships",
              "Career guidance for students through the cell",
            ],
            outcome: "A functioning career cell and a clear placement process for your students.",
          },
          {
            id: "mentor-students",
            title: "Mentor Students",
            tag: "Cohort Programs",
            icon: UserRound,
            summary: "Customised mentorship programmes for whole batches, led by industry mentors.",
            overview:
              "Mentorship for entire batches of students, customised to your institution and led by experienced industry mentors.",
            audience: "Schools and colleges that want every student in a batch to receive career mentorship.",
            covers: [
              "A cohort programme customised to your students",
              "Mentorship led by industry professionals",
              "Career guidance delivered to the whole batch",
            ],
            outcome: "A structured mentorship programme for your students.",
          },
          {
            id: "seminars-workshops",
            title: "Seminars / Workshops",
            tag: "Campus Interactive",
            icon: Presentation,
            summary: "Interactive campus seminars on higher education, the job market and government careers.",
            overview:
              "Interactive seminars on campus that give students a practical view of their options in higher education, the job market and government careers.",
            audience: "Schools and colleges that want to inform students about their options after school or graduation.",
            covers: [
              "Interactive sessions held on campus",
              "Topics on higher education, the job market and government careers",
              "Time for students to ask their own questions",
            ],
            outcome: "Students who understand their options and what each one requires.",
            topics: [
              {
                id: "seminar-higher-education",
                title: "Higher Education / Graduation",
                tag: "Global Opportunities",
                summary:
                  "Higher study options in India and abroad, scholarship avenues and how the admissions process works, explained for students.",
              },
              {
                id: "seminar-job-market",
                title: "Job Market",
                tag: "Industry Trends",
                summary:
                  "Current hiring trends in India, the impact of AI on jobs, and what employers expect from freshers.",
              },
              {
                id: "seminar-government-jobs",
                title: "Government Jobs",
                tag: "Public Sector Careers",
                summary:
                  "An orientation on Civil Services, banking, defence, railways and PSU career opportunities, and the exams that lead to them.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    kicker: "Our services",
    title: "One-on-one career services",
    intro:
      "Focused services you can book individually, whether you are a student or a working professional.",
    menuIntro: "Coaching, resumes and interview preparation, one-on-one.",
    icon: Target,
    groups: [
      {
        programmes: [
          {
            id: "career-coaching",
            title: "Career Coaching",
            tag: "1-on-1 Industry Mentorship",
            icon: Target,
            summary: "Personalised coaching tailored to your aspirations, strengths and long-term milestones.",
            overview:
              "Personalised one-on-one coaching built around your aspirations, strengths and long-term milestones.",
            audience: "Anyone who wants personal guidance on their career direction, whether studying or working.",
            covers: [
              "Understanding your aspirations and strengths",
              "Setting long-term career milestones",
              "Industry insight from a mentor",
              "One-on-one guidance on the decisions along the way",
            ],
            outcome: "A clear set of goals and a plan to reach them.",
          },
          {
            id: "resume-writing",
            title: "Resume Writing",
            tag: "ATS & Executive Resumes",
            icon: FileText,
            summary: "ATS-compliant resumes, cover letters and LinkedIn profile optimisation.",
            overview:
              "A complete application profile: an ATS-compliant resume, a cover letter that supports it, and a LinkedIn profile that presents you consistently.",
            audience: "Students and professionals preparing to apply for new roles.",
            covers: [
              "ATS-compliant resume",
              "High-impact cover letter",
              "Complete LinkedIn profile optimisation",
              "Consistent positioning across all three",
            ],
            outcome: "A resume, cover letter and LinkedIn profile ready to use.",
          },
          {
            id: "behaviour-session",
            title: "Behavioural Session",
            tag: "Interview Mastery",
            icon: MessagesSquare,
            summary: "Behavioural interview preparation, STAR framework coaching and executive presence.",
            overview:
              "Behavioural questions test how you have handled real situations. We help you structure your answers with the STAR framework and build the presence interviewers look for.",
            audience: "Candidates preparing for interviews at any level.",
            covers: [
              "Behavioural interview preparation",
              "Structuring answers with the STAR (Situation, Task, Action, Result) framework",
              "Executive presence and communication",
              "Practice with feedback",
            ],
            outcome: "Clear, structured answers and confidence in the interview room.",
          },
          {
            id: "technical-guidance-mentoring",
            title: "Technical Guidance & Mentoring",
            tag: "Tech & Architecture",
            icon: CodeXml,
            summary: "Technology stack mentoring, system design guidance and coding interview preparation.",
            overview:
              "Hands-on mentoring for technical roles, covering the technology stack you work with, system design, and preparation for coding interviews.",
            audience: "Students and professionals working in, or moving into, technology roles.",
            covers: [
              "Technology stack mentoring",
              "System design guidance",
              "Coding interview preparation",
              "Hands-on problem solving",
            ],
            outcome: "Stronger technical fundamentals and readiness for technical interviews.",
          },
        ],
      },
    ],
  },
];

export const contact = {
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "info@next1education.com",
  /** Booking page for "Schedule a consultation" buttons. */
  calendly: "https://calendly.com/next1education",
  /** Enquiry form (Google Forms). */
  form: "https://forms.gle/tKzRoFbtzy8TLT9j9",
  linkedin: "https://www.linkedin.com/company/next1education/",
};

export const mailtoHref = (topic?: string | null) =>
  topic
    ? `mailto:${contact.email}?subject=${encodeURIComponent(`Enquiry: ${topic}`)}`
    : `mailto:${contact.email}`;

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const whatsappHref = (topic?: string | null) => {
  const message = topic
    ? `Hello Next 1 Education, I would like guidance on ${topic}.`
    : "Hello Next 1 Education, I would like guidance.";
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
};

export const programmeHref = (section: Section, id: string) => `${section.href}#${id}`;

export const sectionProgrammes = (section: Section) => section.groups.flatMap((group) => group.programmes);

export const getSection = (id: string) => sections.find((section) => section.id === id);
