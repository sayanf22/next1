/**
 * Extra page content: images, "why it matters" copy, highlights, process and FAQs.
 * Images are photographs from Unsplash (Unsplash License); see public/images/content/CREDITS.json.
 */

export interface ImageRef {
  src: string;
  alt: string;
}

export interface ProgrammeExtra {
  image: ImageRef;
  why: string;
}

export interface SectionExtra {
  image: ImageRef;
  highlights: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
}

const img = (name: string, alt: string): ImageRef => ({ src: `/images/content/${name}.webp`, alt });

export const sectionExtras: Record<string, SectionExtra> = {
  students: {
    image: img("students", "College students in a classroom, one holding her textbooks"),
    highlights: [
      {
        title: "School students",
        text: "Stream and subject selection in Class 8–10, and career, entrance exam and college planning in Class 11–12.",
      },
      {
        title: "College students",
        text: "Resumes, career coaching, soft skills, government exam planning and postgraduate admissions.",
      },
      {
        title: "Personal guidance",
        text: "Every programme starts with understanding the student's interests, strengths and goals.",
      },
    ],
    steps: [
      { title: "Get in touch", text: "Tell us the student's class or year and the decision you are facing." },
      { title: "Understand the student", text: "We learn about their interests, strengths and goals." },
      { title: "Guidance sessions", text: "One-on-one guidance through the programme you choose." },
      { title: "A clear plan", text: "Leave with a decision and the next steps to act on it." },
    ],
    faqs: [
      {
        q: "Which programme should I choose?",
        a: "School students usually start with the programme for their class. College students can choose based on their immediate need, such as a resume, campus placements or postgraduate admissions. If you are unsure, speak to an advisor and we will suggest where to begin.",
      },
      {
        q: "When is the right time to plan a stream?",
        a: "The stream is chosen after the Class 10 board exams, so Class 8 to 10 is a good time to start thinking about it. Planning early gives the student time to explore Science, Commerce and Humanities before the decision is due.",
      },
      {
        q: "Does the board (CBSE, ICSE or State board) make a difference?",
        a: "The broad stream choices are similar across boards, but subject options can differ between schools and boards. We take the student's board and school into account when discussing subject combinations.",
      },
      {
        q: "How do I get started?",
        a: "Call us or send a message on WhatsApp from the Let's Talk page, and an advisor will take it from there.",
      },
    ],
  },
  "working-professionals": {
    image: img("professionals", "A professional seated in a modern office"),
    highlights: [
      { title: "Resumes that show impact", text: "Achievement-led resumes for mid-level and senior roles." },
      { title: "Growth strategy", text: "Planning for appraisals, promotions, career pivots and CTC discussions." },
      { title: "Senior interviews", text: "Preparation for technical, managerial and cultural-fit rounds." },
    ],
    steps: [
      { title: "Get in touch", text: "Tell us your current role and the move you are planning." },
      { title: "Review your experience", text: "We look at your career history, achievements and goals." },
      { title: "Focused sessions", text: "One-on-one work on your resume, strategy or interviews." },
      { title: "Your next move", text: "Leave ready to apply, negotiate or interview." },
    ],
    faqs: [
      {
        q: "Is this only for senior professionals?",
        a: "No. The programmes are designed for mid-level and senior professionals, and the approach is shaped around your experience and the role you are aiming for.",
      },
      {
        q: "Can I combine a resume with interview preparation?",
        a: "Yes. Many professionals work on their resume first and then prepare for the interviews it leads to. An advisor can help you plan the order.",
      },
      {
        q: "How do I get started?",
        a: "Call us or send a message on WhatsApp from the Let's Talk page. You can also ask for a confidential conversation.",
      },
    ],
  },
  institutions: {
    image: img("institutions", "The entrance gate of a university campus"),
    highlights: [
      { title: "Career and T&P cell", text: "End-to-end management of your career and placement function." },
      { title: "Cohort mentoring", text: "Mentorship for whole batches, led by industry mentors." },
      { title: "Campus seminars", text: "Sessions on higher education, the job market and government careers." },
    ],
    steps: [
      { title: "Tell us about your institution", text: "Your students, their stage and what you want to achieve." },
      { title: "Shape the programme", text: "We customise the format and topics to your students." },
      { title: "Deliver with your students", text: "Our mentors and advisors run the programme with your batches." },
    ],
    faqs: [
      {
        q: "Do you work with both schools and colleges?",
        a: "Yes. Career cells and placement support are most relevant to colleges, while seminars and cohort mentoring can be shaped for school or college students.",
      },
      {
        q: "Can seminar topics be customised?",
        a: "Yes. The three seminar topics are a starting point, and we can shape the content around your students and what they need to know.",
      },
      {
        q: "How do we start a partnership?",
        a: "Contact us from the Let's Talk page with a short note about your institution, and we will arrange a conversation.",
      },
    ],
  },
  services: {
    image: img("services", "An advisor in a one-on-one conversation with a client"),
    highlights: [
      { title: "Book what you need", text: "Each service can be booked on its own, for a specific need." },
      { title: "For students and professionals", text: "The same services are shaped to your stage and experience." },
      { title: "One-on-one", text: "Every service is delivered personally, not as a group course." },
    ],
    steps: [
      { title: "Choose a service", text: "Pick the service that matches what you need right now." },
      { title: "Share your background", text: "Tell us about your experience, goals and timeline." },
      { title: "Work one-on-one", text: "Sessions or deliverables focused on your goal." },
      { title: "Put it to use", text: "Use it in your applications, interviews or next role." },
    ],
    faqs: [
      {
        q: "How are services different from the student and professional programmes?",
        a: "Services are focused, standalone offerings you can book for a specific need. The programmes on the Students and Working Professionals pages are shaped around a particular stage.",
      },
      {
        q: "Can I book more than one service?",
        a: "Yes. For example, you can pair Resume Writing with a Behavioural Session before your placement or job interviews.",
      },
      {
        q: "How do I get started?",
        a: "Call us or send a message on WhatsApp from the Let's Talk page, mentioning the service you are interested in.",
      },
    ],
  },
};

/** Keyed as `${sectionId}:${programmeId}`. */
export const programmeExtras: Record<string, ProgrammeExtra> = {
  "students:class-8-10": {
    image: img("class-8-10", "Two school students in uniform working at a classroom desk"),
    why: "Science, Commerce and Humanities each lead to different courses, entrance exams and careers. Choosing based on interests and aptitude, rather than peer pressure or guesswork, helps students pick subjects they can do well in and enjoy.",
  },
  "students:class-11-12": {
    image: img("class-11-12", "Students seated at desks in a classroom"),
    why: "Board exams, entrance exams and admission timelines all arrive in the final two years of school. A clear career direction makes it easier to decide which exams to prepare for and which colleges to apply to.",
  },
  "students:resume-writing": {
    image: img("student-resume", "A student working on a laptop at a desk"),
    why: "Recruiters at campus and off-campus drives often screen many resumes for each role, and many companies use applicant tracking systems. A clear, well-structured resume makes it easier for your education, projects and skills to be noticed.",
  },
  "students:career-coaching": {
    image: img("student-coaching", "Two students looking through a book together"),
    why: "College offers many possible directions, and it is easy to follow the crowd. Understanding your strengths early helps you choose electives, internships and projects that build towards a career you want.",
  },
  "students:behaviour-session": {
    image: img("student-behaviour", "A group of students in discussion around a table"),
    why: "Group discussions and interviews in placement rounds assess communication, teamwork and conduct as well as knowledge. These skills can be learnt and practised, and they continue to matter once you start work.",
  },
  "students:government-jobs": {
    image: img("government-jobs", "A student writing notes while studying"),
    why: "Each government exam, from UPSC and SSC to banking and State PSC exams, has its own eligibility, pattern and syllabus. Choosing the right exam and preparing with a structured plan helps you use your preparation time well.",
  },
  "students:college-consultation": {
    image: img("college-consultation", "Students gathered outside a university building"),
    why: "Postgraduate programmes differ widely in focus, eligibility, entrance exams and application process, especially abroad. A considered shortlist and a strong profile improve the quality of your applications.",
  },
  "working-professionals:resume-writing": {
    image: img("pro-resume", "A professional working on a laptop at a table"),
    why: "Hiring managers for senior roles look for evidence of results. Presenting your experience as achievements, with measurable outcomes, shows the value you would bring to the next role.",
  },
  "working-professionals:career-growth-guidance": {
    image: img("career-growth", "A professional reviewing work on a laptop"),
    why: "Promotions and career changes rarely happen by chance. A clear strategy helps you prepare for appraisals, evaluate a pivot and approach CTC conversations with confidence.",
  },
  "working-professionals:technical-behavioural": {
    image: img("technical-behavioural", "Colleagues in a meeting in a modern office"),
    why: "Senior interviews usually combine technical depth with questions on leadership, decision-making and fit. Preparing for both helps you present a complete picture of your experience.",
  },
  "institutions:hire-us": {
    image: img("hire-us", "A group of students and staff in a conference room"),
    why: "A well-run career or T&P cell gives students consistent guidance and a clear route to placements. Partnering with us lets your institution offer this without building the function from scratch.",
  },
  "institutions:mentor-students": {
    image: img("mentor-students", "A mentor speaking to a group of students"),
    why: "Individual counselling for every student is difficult to arrange at scale. Cohort mentoring brings industry guidance to a whole batch in a structured way.",
  },
  "institutions:seminars-workshops": {
    image: img("seminars", "Students attending a session in front of a projector screen"),
    why: "Many students make decisions about further study and careers with limited information. A focused seminar gives a whole group an accurate picture of their options in a single session.",
  },
  "services:career-coaching": {
    image: img("svc-coaching", "A career coach in conversation with a client across a desk"),
    why: "Career decisions are easier with someone who can offer an outside view. Regular one-on-one coaching keeps your goals clear and your next steps practical.",
  },
  "services:resume-writing": {
    image: img("svc-resume", "A desk with a laptop, notepad and phone"),
    why: "Your resume, cover letter and LinkedIn profile are often read together. When they tell the same clear story, recruiters get a consistent picture of who you are and what you offer.",
  },
  "services:behaviour-session": {
    image: img("svc-behaviour", "Two people in a one-on-one interview conversation"),
    why: "Behavioural questions ask for real examples, and unprepared answers can lose their point. A simple structure like STAR helps you give answers that are clear and complete.",
  },
  "services:technical-guidance-mentoring": {
    image: img("svc-technical", "Students working at computers in a lab"),
    why: "Technical interviews test problem solving and design thinking as well as knowledge. Guided practice with a mentor helps you find gaps and build confidence.",
  },
};

export const getSectionExtra = (sectionId: string) => sectionExtras[sectionId];
export const getProgrammeExtra = (sectionId: string, programmeId: string) =>
  programmeExtras[`${sectionId}:${programmeId}`];
