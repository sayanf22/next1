import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Compass, ListChecks, MessagesSquare, TrendingUp } from "lucide-react";
import AnimatedMetric from "@/components/AnimatedMetric";
import Words from "@/components/Words";
import { ButtonArrow, CenteredHeading, CtaBand, Kicker, LeftHeading, btnOutline, btnPrimary } from "@/components/ui";
import { getSectionExtra } from "@/data/details";
import { programmeHref, sections, sectionProgrammes } from "@/data/programmes";

const guidanceSteps = [
  { title: "Explore careers", description: "Find paths that fit your strengths.", icon: Compass },
  { title: "Make a plan", description: "Choose subjects, courses, and goals.", icon: ListChecks },
  { title: "Talk to a mentor", description: "Get help with important decisions.", icon: MessagesSquare },
  { title: "Move forward", description: "Prepare for college, skills, and work.", icon: TrendingUp },
];

const impactStats = [
  { value: 1000, suffix: "+", label: "Students guided" },
  { value: 20, label: "School partners" },
  { value: 8, label: "College partners" },
  { value: 6, label: "Career mentors" },
];

const jumpLinks = [
  { label: "Our Programmes", href: "#programmes" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Impact", href: "#impact" },
  { label: "Let's Talk", href: "/lets-talk" },
];

const whyPoints = [
  "Guidance for school students, college students, working professionals and institutions",
  "Education, career counselling and skill development in one place",
  "Every programme starts with understanding where you are and what you want",
  "Support shaped around Indian boards, entrance exams and campus placements",
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 pt-14 text-center sm:px-8 sm:pt-20 lg:pt-24">
          <div className="rise">
            <Kicker center>Career guidance for every stage</Kicker>
          </div>
          <h1
            id="hero-title"
            className="mx-auto mt-5 max-w-4xl text-balance text-[2.5rem] font-bold leading-[1.08] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl"
          >
            <Words text="Find the path that fits you." delay={150} />
          </h1>
          <p
            className="rise mx-auto mt-6 max-w-xl text-[17px] leading-8 text-slate-700 sm:text-xl"
            style={delay(160)}
          >
            Personal guidance for school, college, and career decisions.
          </p>
          <div
            className="rise mx-auto mt-9 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
            style={delay(240)}
          >
            <Link href="/lets-talk" className={btnPrimary}>
              Schedule a consultation
              <ButtonArrow />
            </Link>
            <Link href="#programmes" className={btnOutline}>
              Explore programmes
            </Link>
          </div>

          <div className="rise mx-auto mt-12 max-w-6xl sm:mt-14" style={delay(360)}>
            <Image
              src="/images/next1-student-guidance-hero.webp"
              alt="Students and a career advisor preparing for their next academic and professional steps"
              width={2171}
              height={724}
              priority
              sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1279px) calc(100vw - 4rem), 1152px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* Jump to */}
      <nav aria-label="Jump to" className="bg-ink-900">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {jumpLinks.map((link, index) => (
            <li
              key={link.href}
              className={`border-white/10 ${index % 2 === 1 ? "border-l" : ""} ${index >= 2 ? "border-t lg:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}
            >
              <Link
                href={link.href}
                className="group flex h-full items-center justify-between gap-3 px-5 py-6 transition-colors duration-300 hover:bg-ink-800 sm:px-8 sm:py-8"
              >
                <span>
                  <span className="block text-[13px] font-medium text-slate-400">Jump to</span>
                  <span className="mt-1 block font-display text-[16px] font-semibold text-white sm:text-xl">
                    {link.label}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="hidden h-5 w-5 shrink-0 text-white transition-transform duration-300 ease-out-soft group-hover:translate-x-1 sm:block"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Why Next 1 */}
      <section aria-labelledby="why-title" className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first">
            <div
              aria-hidden="true"
              data-delay="4"
              className="reveal absolute -bottom-3 -left-3 hidden h-full w-full rounded-lg border-2 border-ink-900/15 sm:block"
            />
            <div className="reveal-img relative rounded-lg">
              <Image
                src="/images/content/why-home.webp"
                alt="Students attending a session in a classroom"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 600px, calc(100vw - 2.5rem)"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
          </div>
          <div>
            <LeftHeading id="why-title" kicker="Why come to us" title="Why Next 1 Education">
              <p>
                We bring education guidance, career counselling and skill development together. Whether you are a
                student choosing a stream after Class 10, a graduate preparing for campus placements, a professional
                planning your next move, or a school or college supporting its students, we start by understanding where
                you are and what you want to achieve, and then help you plan the steps to get there.
              </p>
            </LeftHeading>
            <ul className="mt-8 space-y-3.5">
              {whyPoints.map((point, index) => (
                <li
                  key={point}
                  data-delay={index + 2}
                  className="reveal flex gap-3 text-[16px] font-medium leading-7 text-ink-900"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div data-delay="5" className="reveal mt-9">
              <Link href="/lets-talk" className={`${btnPrimary} w-full sm:w-auto`}>
                Schedule a consultation
                <ButtonArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" aria-labelledby="programmes-title" className="scroll-mt-20 bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <CenteredHeading id="programmes-title" kicker="Who we guide" title="Our Programmes">
            <p>Choose where you are today to see the programmes designed for you.</p>
          </CenteredHeading>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const extra = getSectionExtra(section.id);
              const programmes = sectionProgrammes(section).slice(0, 4);

              return (
                <article
                  key={section.id}
                  data-delay={index}
                  className="reveal card-rule group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white"
                >
                  {extra && (
                    <div className="relative">
                      <div className="overflow-hidden">
                        <Image
                          src={extra.image.src}
                          alt=""
                          width={1200}
                          height={800}
                          sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                          className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                        />
                      </div>
                      <span className="absolute bottom-0 left-5 flex h-11 w-11 translate-y-1/2 items-center justify-center rounded-lg bg-ink-900 text-white ring-4 ring-white">
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6 pt-9">
                    <h3 className="text-xl font-semibold text-ink-900">{section.label}</h3>
                    <p className="mt-2 text-[15px] leading-6 text-slate-700">{section.menuIntro}</p>
                    <ul className="mt-5 flex-1 space-y-1 border-t border-slate-100 pt-4">
                      {programmes.map((programme) => (
                        <li key={programme.id}>
                          <Link
                            href={programmeHref(section, programme.id)}
                            className="flex items-center justify-between gap-2 py-1 text-[14.5px] font-medium text-slate-700 transition-colors duration-200 hover:text-brand-700"
                          >
                            {programme.title}
                            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={section.href}
                      className="group/link mt-5 inline-flex items-center gap-2 font-display text-[14.5px] font-semibold text-ink-900 transition-colors duration-200 hover:text-brand-700"
                    >
                      View all programmes
                      <span className="sr-only"> for {section.label}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" aria-labelledby="steps-title" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
        <CenteredHeading id="steps-title" kicker="How it works" title="A clearer path, step by step" />

        <ol className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guidanceSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <li
                key={step.title}
                data-delay={index}
                className="reveal card-rule rounded-lg border border-slate-200 bg-white p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                  <span className="font-display text-[15px] font-bold text-slate-400">Step {index + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-[15.5px] leading-7 text-slate-700">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Impact */}
      <section id="impact" aria-labelledby="impact-title" className="scroll-mt-20 bg-paper px-5 py-20 sm:px-8 lg:py-24">
        <CenteredHeading id="impact-title" kicker="Our impact" title="Guidance that adds up" />
        <ul className="mx-auto mt-12 grid max-w-xs grid-cols-1 divide-y divide-slate-300 sm:max-w-5xl sm:grid-cols-2 sm:gap-y-12 sm:divide-y-0 lg:grid-cols-4">
          {impactStats.map((stat, index) => (
            <AnimatedMetric
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 120}
            />
          ))}
        </ul>
      </section>

      <CtaBand />
    </main>
  );
}
