import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContactOptions, { ContactCards } from "@/components/ContactOptions";
import { CenteredHeading, LeftHeading, PageHeader } from "@/components/ui";
import { sections } from "@/data/programmes";

export const metadata: Metadata = {
  title: "Let's Talk",
  description: "Book a consultation, fill the enquiry form, or reach a Next 1 Education advisor by email, phone or WhatsApp.",
};

const nextSteps = [
  { title: "Reach out", text: "Book a time, fill the form, or contact us by email, phone or WhatsApp." },
  { title: "Tell us about yourself", text: "Your class, course or role, and the decision you are working on." },
  { title: "Find the right start", text: "An advisor will suggest the programme or service that fits." },
];

export default function LetsTalkPage() {
  return (
    <main>
      <PageHeader
        crumb="Let's Talk"
        kicker="Let's talk"
        title="Let's make your next step clearer."
        intro="Book a consultation, fill in the enquiry form, or reach us directly. We'll help you find the right place to begin."
        image={{ src: "/images/content/services.webp", alt: "An advisor greeting a visitor across a desk" }}
      />

      <section aria-label="Contact options" className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <Suspense fallback={<ContactCards topic={null} />}>
          <ContactOptions />
        </Suspense>
      </section>

      <section aria-labelledby="next-title" className="bg-paper px-5 py-16 sm:px-8 sm:py-20">
        <CenteredHeading id="next-title" kicker="What happens next" title="Three simple steps" />
        <ol className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {nextSteps.map((step, index) => (
            <li key={step.title} data-delay={index} className="reveal rounded-lg bg-white p-6 ring-1 ring-slate-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 font-display text-[15px] font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-[15.5px] leading-7 text-slate-700">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="areas-title" className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <LeftHeading id="areas-title" kicker="Before you get in touch" title="See what we offer" />
        <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <li key={section.id}>
                <Link
                  href={section.href}
                  className="group flex items-center gap-4 py-5 transition-colors duration-200 hover:bg-paper sm:px-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-ink-900 group-hover:text-white">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-semibold text-ink-900">{section.label}</span>
                    <span className="mt-0.5 block text-[15px] leading-6 text-slate-700">{section.menuIntro}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-slate-400 transition-all duration-300 ease-out-soft group-hover:translate-x-1 group-hover:text-ink-900"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
