import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { contact, programmeHref, sections, sectionProgrammes, telHref, whatsappHref } from "@/data/programmes";

/** Pages column: just the top-level navigation links */
const pageLinks = [
  { label: "Home", href: "/" },
  { label: "Students", href: "/students" },
  { label: "Working Professionals", href: "/working-professionals" },
  { label: "Institutions", href: "/institutions" },
  { label: "Services", href: "/services" },
  { label: "Let's Talk", href: "/lets-talk" },
];

/** Services section only */
const servicesSection = sections.find((s) => s.id === "services")!;

const linkClass =
  "text-[15px] text-slate-600 transition-colors duration-200 hover:text-ink-900";
const headingClass =
  "font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-900";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white text-ink-900">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 lg:pb-16 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1.6fr] lg:gap-20">

          {/* Brand + contact */}
          <div>
            <Link href="/" aria-label="Next 1 Education home" className="inline-block">
              <Image
                src="/logo/next1-logo.webp"
                alt="Next 1 Education"
                width={720}
                height={272}
                sizes="200px"
                className="h-[64px] w-auto"
              />
            </Link>

            <p className="mt-5 max-w-sm text-[15.5px] leading-7 text-slate-600">
              Education, career counselling and skill development for students, working
              professionals and institutions.
            </p>

            {/* Contact details */}
            <ul className="mt-7 space-y-3.5">
              <li>
                <a
                  href={telHref(contact.phone)}
                  className="group inline-flex items-center gap-3 text-[15px] font-medium text-slate-700 transition-colors duration-200 hover:text-ink-900"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-ink-900 group-hover:text-white">
                    <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                  </span>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@next1education.com"
                  className="group inline-flex items-center gap-3 text-[15px] font-medium text-slate-700 transition-colors duration-200 hover:text-ink-900"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-ink-900 group-hover:text-white">
                    <Mail aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                  </span>
                  info@next1education.com
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  className="group inline-flex items-center gap-3 text-[15px] font-medium text-slate-700 transition-colors duration-200 hover:text-ink-900"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-ink-900 group-hover:text-white">
                    <MessageCircle aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                  </span>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/next1education/"
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-3 text-[15px] font-medium text-slate-700 transition-colors duration-200 hover:text-ink-900"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-ink-900 group-hover:text-white">
                    {/* LinkedIn icon — not in this version of lucide-react */}
                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </span>
                  LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>

            <Link
              href="/lets-talk"
              className="btn-sweep group mt-8 inline-flex h-12 items-center gap-2.5 rounded-md bg-ink-900 px-6 font-display text-[14.5px] font-semibold text-white"
            >
              Schedule a consultation
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
                strokeWidth={2.4}
              />
            </Link>
          </div>

          {/* Link columns: Pages + Services */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-12"
          >
            {/* Pages */}
            <div>
              <p className={headingClass}>Pages</p>
              <ul className="mt-5 space-y-3">
                {pageLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <p className={headingClass}>Services</p>
              <ul className="mt-5 space-y-3">
                {sectionProgrammes(servicesSection).map((programme) => (
                  <li key={programme.id}>
                    <Link
                      href={programmeHref(servicesSection, programme.id)}
                      className={linkClass}
                    >
                      {programme.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-slate-200 pt-7 text-[13.5px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Next 1 Education. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>
              Built by{" "}
              <a
                href="https://whycreatives.in"
                target="_blank"
                rel="noopener"
                className="font-semibold text-ink-900 underline decoration-slate-300 underline-offset-4 transition-colors duration-200 hover:decoration-ink-900"
              >
                WhyCreatives
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
