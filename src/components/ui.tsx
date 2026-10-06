import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { ImageRef } from "@/data/details";
import Words from "@/components/Words";
import { contact } from "@/data/programmes";

const btnBase =
  "btn-sweep group inline-flex h-12 items-center justify-center gap-2.5 rounded-md px-6 font-display text-[14.5px] font-semibold";

/** Navy button; a blue fill sweeps across on hover. */
export const btnPrimary = `${btnBase} bg-ink-900 text-white`;
/** Outlined button; fills navy on hover. */
export const btnOutline = `${btnBase} btn-outline`;
/** White button for dark backgrounds. */
export const btnLight = `${btnBase} btn-light`;

export function ButtonArrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
      strokeWidth={2.4}
    />
  );
}

/** Small highlighted label that sits above headings. */
export function Kicker({ children, tone = "light", center = false }: { children: ReactNode; tone?: "light" | "dark"; center?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2.5 font-display text-[13.5px] font-semibold uppercase tracking-[0.12em] ${
        center ? "justify-center" : ""
      } ${tone === "dark" ? "text-brand-300" : "text-brand-700"}`}
    >
      <span aria-hidden="true" className={`h-0.5 w-6 ${tone === "dark" ? "bg-brand-300" : "bg-brand-600"}`} />
      {children}
    </p>
  );
}

/** Centred section heading. */
export function CenteredHeading({
  id,
  kicker,
  title,
  tone = "light",
  children,
}: {
  id?: string;
  kicker: string;
  title: string;
  tone?: "light" | "dark";
  children?: ReactNode;
}) {
  const dark = tone === "dark";

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="reveal">
        <Kicker tone={tone} center>
          {kicker}
        </Kicker>
      </div>
      <h2
        id={id}
        className={`mt-4 text-balance text-[2rem] font-bold leading-[1.15] tracking-tight sm:text-[2.6rem] ${dark ? "text-white" : "text-ink-900"}`}
      >
        <Words text={title} delay={120} />
      </h2>
      {children && (
        <div
          data-delay="3"
          className={`reveal mt-5 text-[16.5px] leading-8 sm:text-[17px] ${dark ? "text-slate-300" : "text-slate-700"}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/** Left-aligned section heading. */
export function LeftHeading({ id, kicker, title, children }: { id?: string; kicker: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <div className="reveal">
        <Kicker>{kicker}</Kicker>
      </div>
      <h2 id={id} className="mt-4 text-balance text-[2rem] font-bold leading-[1.15] tracking-tight text-ink-900 sm:text-[2.6rem]">
        <Words text={title} delay={120} />
      </h2>
      {children && (
        <div data-delay="3" className="reveal mt-4 text-[16.5px] leading-8 text-slate-700 sm:text-[17px]">
          {children}
        </div>
      )}
    </div>
  );
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Header used at the top of every inner page, with an optional image. */
export function PageHeader({
  crumb,
  kicker,
  title,
  intro,
  image,
  children,
}: {
  crumb: string;
  kicker: string;
  title: string;
  intro: string;
  image?: ImageRef;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-slate-200 bg-paper">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:pb-20">
        <nav aria-label="Breadcrumb" className="rise">
          <ol className="flex items-center gap-1.5 text-[14px] font-medium text-slate-500">
            <li>
              <Link href="/" className="transition-colors duration-200 hover:text-brand-700">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </li>
            <li aria-current="page" className="text-ink-900">
              {crumb}
            </li>
          </ol>
        </nav>

        <div className={`mt-10 grid items-center gap-10 sm:mt-12 ${image ? "lg:grid-cols-[1.1fr_1fr] lg:gap-14" : ""}`}>
          <div className="max-w-3xl">
            <div className="rise" style={d(60)}>
              <Kicker>{kicker}</Kicker>
            </div>
            <h1 className="mt-4 text-balance text-[2.3rem] font-bold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.5rem]">
              <Words text={title} delay={120} />
            </h1>
            <p className="rise mt-6 text-[17px] leading-8 text-slate-700 sm:text-lg sm:leading-8" style={d(180)}>
              {intro}
            </p>
            {children && (
              <div className="rise mt-8" style={d(240)}>
                {children}
              </div>
            )}
          </div>

          {image && (
            <div className="relative">
              <div aria-hidden="true" className="rise absolute -bottom-3 -right-3 hidden h-full w-full rounded-lg border-2 border-ink-900/15 sm:block" style={d(700)} />
              <div className="reveal-img relative rounded-lg" style={{ "--id": "200ms" } as CSSProperties}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  priority
                  sizes="(min-width: 1024px) 560px, calc(100vw - 2.5rem)"
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/** Closing call to action used across pages. */
export function CtaBand({
  title = "Not sure where to begin?",
  text = "Speak with an advisor and we will help you find the right place to start.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-ink-900">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="reveal max-w-2xl">
          <Kicker tone="dark">Let&apos;s talk</Kicker>
          <h2 id="cta-title" className="mt-4 text-[2rem] font-bold leading-tight tracking-tight text-white sm:text-[2.6rem]">
            <Words text={title} delay={120} />
          </h2>
          <p className="mt-4 text-[16.5px] leading-7 text-slate-300 sm:text-[17px]">{text}</p>
        </div>
        <a
          href={contact.calendly}
          target="_blank"
          rel="noopener"
          className={`${btnLight} reveal w-full shrink-0 sm:w-auto`}
        >
          Schedule a consultation
          <span className="sr-only"> (opens in a new tab)</span>
          <ButtonArrow />
        </a>
      </div>
    </section>
  );
}
