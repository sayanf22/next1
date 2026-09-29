import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { contact, programmeHref, sections, sectionProgrammes, telHref, whatsappHref } from "@/data/programmes";

const quickLinks = [
  { label: "Home", href: "/" },
  ...sections.map((section) => ({ label: section.label, href: section.href })),
  { label: "Let's Talk", href: "/lets-talk" },
];

const linkClass = "text-[15.5px] text-white/80 transition-colors duration-200 hover:text-white";
const headingClass = "font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-white";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 lg:pb-16 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_2fr] lg:gap-20">
          {/* Brand and contact */}
          <div>
            <Link href="/" aria-label="Next 1 Education home" className="inline-block">
              <Image
                src="/logo/next1-logo.webp"
                alt="Next 1 Education"
                width={720}
                height={272}
                sizes="210px"
                className="h-[72px] w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-6 max-w-sm text-[16px] leading-7 text-white/80">
              Education, career counselling and skill development for students, working professionals and
              institutions.
            </p>

            <ul className="mt-8 space-y-4">
              <li>
                <a href={telHref(contact.phone)} className="group inline-flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                    <Phone aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block text-[13px] font-medium text-white/60">Call us</span>
                    <span className="block text-[16px] font-semibold text-white">{contact.phone}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={whatsappHref()} className="group inline-flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                    <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block text-[13px] font-medium text-white/60">WhatsApp</span>
                    <span className="block text-[16px] font-semibold text-white">Send us a message</span>
                  </span>
                </a>
              </li>
            </ul>

            <Link
              href="/lets-talk"
              className="btn-sweep btn-light group mt-9 inline-flex h-12 items-center gap-2.5 rounded-md px-6 font-display text-[14.5px] font-semibold"
            >
              Schedule a consultation
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
                strokeWidth={2.4}
              />
            </Link>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3">
            <div>
              <p className={headingClass}>Pages</p>
              <ul className="mt-6 space-y-3.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {sections.map((section) => (
              <div key={section.id}>
                <p className={headingClass}>{section.label}</p>
                <ul className="mt-6 space-y-3.5">
                  {sectionProgrammes(section).map((programme) => (
                    <li key={programme.id}>
                      <Link href={programmeHref(section, programme.id)} className={linkClass}>
                        {programme.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-8 text-[14.5px] text-white/70 md:flex-row md:items-center md:justify-between">
          <p>© {year} Next 1 Education. All rights reserved.</p>
          <p>
            Built by{" "}
            <a
              href="https://whycreatives.in"
              target="_blank"
              rel="noopener"
              className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors duration-200 hover:decoration-white"
            >
              WhyCreatives
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
