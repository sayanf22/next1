import Image from "next/image";
import Link from "next/link";
import AnimatedMetric from "@/components/AnimatedMetric";

const guidanceSteps = [
  {
    title: "Explore careers",
    description: "Find paths that fit your strengths.",
    color: "bg-emerald-100 text-emerald-800",
    icon: <><path d="M12 3a7 7 0 0 0-7 7v2a3 3 0 0 0 3 3h1v-5H8a4 4 0 0 1 8 0h-1v5h1a3 3 0 0 0 3-3v-2a7 7 0 0 0-7-7Z" /><path d="M9 19h6" /></>,
  },
  {
    title: "Make a plan",
    description: "Choose subjects, courses, and goals.",
    color: "bg-amber-100 text-amber-800",
    icon: <><path d="M6 3h9l3 3v15H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  },
  {
    title: "Talk to a mentor",
    description: "Get help with important decisions.",
    color: "bg-rose-100 text-rose-800",
    icon: <><path d="M16 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" /><circle cx="10" cy="7" r="4" /><path d="M20 20v-1a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  },
  {
    title: "Move forward",
    description: "Prepare for college, skills, and work.",
    color: "bg-indigo-100 text-indigo-800",
    icon: <><path d="M4 19V5M4 19h16" /><path d="m7 15 4-4 3 2 5-6" /><path d="M15 7h4v4" /></>,
  },
];

const impactStats = [
  { value: 1000, suffix: "+", label: "Students guided" },
  { value: 20, label: "School partners" },
  { value: 8, label: "College partners" },
  { value: 6, label: "Career mentors" },
];

export default function Home() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-5 pt-12 text-center sm:px-8 sm:pt-16 lg:pt-20">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
          Find the path that fits you.
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
          Personal guidance for school, college, and career decisions.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/lets-talk"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#0056d2] px-5 text-sm font-semibold text-white transition-colors duration-300 ease-out hover:bg-black focus-visible:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2]/40 focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            Talk to an advisor
            <svg aria-hidden="true" className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </Link>
          <a
            href="tel:+919876543210"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2]/40 focus-visible:ring-offset-2"
          >
            <svg aria-hidden="true" className="h-4 w-4 text-[#0056d2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call now
          </a>
        </div>

        <div className="mx-auto mt-8 max-w-6xl sm:mt-10 lg:mt-12">
          <Image
            src="/images/next1-student-guidance-hero.webp"
            alt="Students and a career advisor preparing for their next academic and professional steps"
            width={2171}
            height={724}
            priority
            sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1279px) calc(100vw - 4rem), 1152px"
            className="h-auto w-full object-contain"
          />
        </div>
      </section>

      <section
        aria-labelledby="guidance-steps-title"
        className="mx-0 mt-0 mb-8 w-full overflow-hidden rounded-[28px] bg-[#c9f0ff] px-5 py-8 sm:mb-10 sm:px-8 sm:py-10 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="guidance-steps-title" className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            A clearer path, step by step
          </h2>

          <div className="relative mt-7 grid grid-cols-1 gap-y-6 sm:mt-9 lg:grid-cols-4 lg:gap-5">
            <svg aria-hidden="true" className="pointer-events-none absolute left-[12.5%] top-0 hidden h-20 w-[75%] lg:block" viewBox="0 0 900 80" preserveAspectRatio="none">
              <path d="M0 28 C100 28 200 52 300 52 S500 28 600 28 S800 52 900 52" fill="none" stroke="#6f91a5" strokeWidth="1.5" strokeDasharray="5 7" strokeLinecap="round" />
            </svg>

            {guidanceSteps.map((step, index) => (
              <article key={step.title} className="relative flex items-start gap-4 text-left lg:flex-col lg:items-center lg:text-center">
                {index < guidanceSteps.length - 1 && (
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-6 bottom-[-3rem] z-0 w-12 lg:hidden"
                    viewBox="0 0 48 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M24 0 C24 25 36 25 24 50 S12 75 24 100"
                      fill="none"
                      stroke="#6f91a5"
                      strokeWidth="1.5"
                      strokeDasharray="4 5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                <span className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full lg:h-14 lg:w-14 ${index % 2 === 1 ? "lg:mt-6" : ""} ${step.color}`}>
                  <svg aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {step.icon}
                  </svg>
                </span>
                <div className="min-w-0 lg:flex lg:flex-col lg:items-center">
                  <h3 className="text-sm font-bold leading-snug text-slate-900 lg:mt-3 sm:text-base">{step.title}</h3>
                  <p className="mt-1 max-w-none text-xs leading-relaxed text-slate-600 sm:text-sm lg:max-w-[15rem]">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="impact-stats-title" className="mx-auto w-full max-w-md px-5 pb-10 sm:px-8 sm:pb-12">
        <h2 id="impact-stats-title" className="sr-only">Our impact</h2>
        <ul className="divide-y divide-slate-200/80">
          {impactStats.map((stat, index) => (
            <AnimatedMetric
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 140}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
