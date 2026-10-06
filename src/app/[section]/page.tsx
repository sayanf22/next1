import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import SectionNav, { type SectionNavEntry } from "@/components/SectionNav";
import Words from "@/components/Words";
import { ButtonArrow, CenteredHeading, CtaBand, LeftHeading, PageHeader, btnOutline, btnPrimary } from "@/components/ui";
import { getProgrammeExtra, getSectionExtra } from "@/data/details";
import { contact, getSection, sections, type Programme, type Section } from "@/data/programmes";

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.map((section) => ({ section: section.id }));
}

type Props = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const section = getSection((await params).section);
  if (!section) return {};
  return { title: section.label, description: section.intro };
}

function Label({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-[15px] font-semibold text-ink-900">{children}</h3>;
}

function ProgrammeBlock({ section, programme }: { section: Section; programme: Programme }) {
  const Icon = programme.icon;
  const extra = getProgrammeExtra(section.id, programme.id);

  return (
    <section
      id={programme.id}
      aria-labelledby={`${programme.id}-title`}
      className="scroll-mt-40 border-t border-slate-200 py-12 first:border-t-0 first:pt-0 sm:py-16 lg:scroll-mt-28"
    >
      <div className="reveal flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-white sm:h-14 sm:w-14">
          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <p className="font-display text-[14px] font-semibold text-brand-700 sm:text-[15px]">{programme.tag}</p>
          <h2
            id={`${programme.id}-title`}
            className="mt-0.5 text-[1.6rem] font-bold leading-tight tracking-tight text-ink-900 sm:text-[2.25rem]"
          >
            <Words text={programme.title} delay={100} />
          </h2>
        </div>
      </div>

      <div className={`mt-8 grid gap-8 ${extra ? "md:grid-cols-[1.15fr_1fr] md:items-start" : ""}`}>
        <div className="reveal space-y-6">
          <p className="text-[17px] leading-8 text-slate-700">{programme.overview}</p>
          {extra && (
            <div className="rounded-lg border-l-4 border-brand-600 bg-brand-50/60 px-5 py-4">
              <p className="font-display text-[14px] font-semibold text-brand-800">Why it matters</p>
              <p className="mt-1.5 text-[15.5px] leading-7 text-slate-700">{extra.why}</p>
            </div>
          )}
        </div>
        {extra && (
          <div className="reveal-img rounded-lg">
            <Image
              src={extra.image.src}
              alt={extra.image.alt}
              width={1200}
              height={800}
              sizes="(min-width: 1280px) 400px, (min-width: 768px) 40vw, calc(100vw - 2.5rem)"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="reveal mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-6">
          <Label>What we cover</Label>
          <ul className="mt-4 space-y-3">
            {programme.covers.map((item) => (
              <li key={item} className="flex gap-3 text-[15.5px] leading-6 text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <dl className="space-y-5 rounded-lg bg-paper p-6">
          <div>
            <dt>
              <Label>Who it is for</Label>
            </dt>
            <dd className="mt-1.5 text-[15.5px] leading-7 text-slate-700">{programme.audience}</dd>
          </div>
          <div className="border-t border-slate-200 pt-5">
            <dt>
              <Label>What you take away</Label>
            </dt>
            <dd className="mt-1.5 text-[15.5px] leading-7 text-slate-700">{programme.outcome}</dd>
          </div>
        </dl>
      </div>

      {programme.topics && (
        <div className="mt-10">
          <Label>Seminar topics</Label>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {programme.topics.map((topic, index) => (
              <article
                key={topic.id}
                id={topic.id}
                data-delay={index}
                className="reveal card-rule scroll-mt-40 rounded-lg lg:scroll-mt-28 border border-slate-200 bg-white p-6"
              >
                <p className="font-display text-[13.5px] font-semibold text-brand-700">{topic.tag}</p>
                <h4 className="mt-1 text-lg font-semibold leading-snug text-ink-900">{topic.title}</h4>
                <p className="mt-3 text-[15px] leading-6 text-slate-700">{topic.summary}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      <Link href={`/lets-talk?topic=${encodeURIComponent(programme.title)}`} className={`${btnOutline} mt-9 w-full sm:w-auto`}>
        Enquire about {programme.title}
        <ButtonArrow />
      </Link>
    </section>
  );
}

export default async function SectionPage({ params }: Props) {
  const section = getSection((await params).section);
  if (!section) notFound();

  const extra = getSectionExtra(section.id);
  const entries: SectionNavEntry[] = section.groups.flatMap((group) =>
    group.programmes.flatMap((programme, index) => [
      { id: programme.id, title: programme.title, group: index === 0 ? group.title : undefined },
      ...(programme.topics ?? []).map((topic) => ({ id: topic.id, title: topic.title, nested: true })),
    ]),
  );

  return (
    <main>
      <PageHeader
        crumb={section.label}
        kicker={section.kicker}
        title={section.title}
        intro={section.intro}
        image={extra?.image}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={contact.calendly} target="_blank" rel="noopener" className={btnPrimary}>
            Schedule a consultation
            <span className="sr-only"> (opens in a new tab)</span>
            <ButtonArrow />
          </a>
          <a href={`#${entries[0].id}`} className={btnOutline}>
            Explore programmes
          </a>
        </div>
      </PageHeader>

      {extra && (
        <section aria-label="At a glance" className="border-b border-slate-200">
          <ul className="mx-auto grid max-w-7xl divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {extra.highlights.map((item, index) => (
              <li key={item.title} data-delay={index} className="reveal px-5 py-8 sm:px-8 sm:py-10">
                <p className="font-display text-[15px] font-bold text-brand-700">0{index + 1}</p>
                <h2 className="mt-2 text-xl font-semibold text-ink-900">{item.title}</h2>
                <p className="mt-2 text-[15.5px] leading-7 text-slate-700">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
        {/* On phones the "Jump to" strip sticks under the header; on desktop it is a sticky side column. */}
        <aside className="sticky top-[76px] z-30 -mx-5 -mt-14 min-w-0 border-b border-slate-200 bg-white/95 px-5 py-3 backdrop-blur sm:top-[84px] sm:-mx-8 sm:-mt-16 sm:px-8 lg:static lg:mx-0 lg:mt-0 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          <div className="lg:sticky lg:top-24">
            <SectionNav entries={entries} />
          </div>
        </aside>

        <div className="min-w-0">
          {section.groups.map((group, index) => (
            <div key={group.title ?? index} className={index > 0 ? "mt-4 border-t-2 border-ink-900 pt-14" : ""}>
              {group.title && (
                <div className="mb-10 flex flex-wrap items-center gap-3">
                  <p className="font-display text-xl font-bold text-ink-900 sm:text-2xl">{group.title}</p>
                  {group.badge && (
                    <span className="rounded-full bg-brand-50 px-3 py-1 font-display text-[13px] font-semibold text-brand-700">
                      {group.badge}
                    </span>
                  )}
                </div>
              )}
              {group.programmes.map((programme) => (
                <ProgrammeBlock key={programme.id} section={section} programme={programme} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {extra && (
        <>
          <section aria-labelledby="process-title" className="bg-paper px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
            <CenteredHeading id="process-title" kicker="How it works" title="What to expect" />
            <ol
              className={`mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 ${extra.steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
            >
              {extra.steps.map((step, index) => (
                <li key={step.title} data-delay={index} className="reveal rounded-lg bg-white p-6 shadow-[0_1px_0_rgb(15_23_42/0.06)] ring-1 ring-slate-200">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 font-display text-[15px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-7 text-slate-700">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="faq-title" className="px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
              <LeftHeading id="faq-title" kicker="Questions" title="Frequently asked">
                <p>Anything else you would like to know? An advisor is happy to help.</p>
              </LeftHeading>
              <div className="reveal divide-y divide-slate-200 border-y border-slate-200">
                {extra.faqs.map((faq) => (
                  <details key={faq.q} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-[17px] font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <ChevronDown
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180"
                      />
                    </summary>
                    <p className="pb-6 pr-8 text-[15.5px] leading-7 text-slate-700">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <CtaBand />
    </main>
  );
}
