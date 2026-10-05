"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import { programmeHref, sections, type Section } from "@/data/programmes";

const CLOSE_DELAY = 150;
/** Height of the white logo row on desktop; past this the navy band is stuck to the top. */
const STUCK_AT = 108;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getStuck = () => window.scrollY >= STUCK_AT;
const getScrolled = () => window.scrollY > 8;
const getServerFalse = () => false;

const LOGO = { src: "/logo/next1-logo.webp", width: 720, height: 272 };

/* ------------------------------------------------------------------ */
/* Desktop dropdown                                                    */
/* ------------------------------------------------------------------ */

function DropdownPanel({ section, onNavigate }: { section: Section; onNavigate: () => void }) {
  const twoColumns = section.groups.length > 1;
  const SectionIcon = section.icon;

  return (
    <div
      className={`${twoColumns ? "w-[62rem]" : "w-[36rem]"} max-w-[calc(100vw_-_4rem)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_60px_-28px_rgb(7_15_36/0.4),0_6px_16px_-8px_rgb(7_15_36/0.12)]`}
    >
      <div className="flex items-center gap-4 border-b border-slate-100 bg-paper px-6 py-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-white">
          <SectionIcon aria-hidden="true" className="h-6 w-6" strokeWidth={1.9} />
        </span>
        <div>
          <p className="font-display text-[17px] font-semibold text-ink-900">{section.label}</p>
          <p className="mt-0.5 text-[14.5px] leading-snug text-slate-600">{section.menuIntro}</p>
        </div>
      </div>

      <div
        className={`grid max-h-[calc(100vh_-_24rem)] gap-x-4 overflow-y-auto overscroll-contain p-3 ${twoColumns ? "grid-cols-3" : ""}`}
      >
        {section.groups.map((group, index) => (
          <div
            key={group.title ?? index}
            className={twoColumns && index > 0 ? "col-span-2 border-l border-slate-100 pl-4 [&>ul]:grid [&>ul]:grid-cols-2 [&>ul]:gap-x-2" : ""}
          >
            {group.title && (
              <p className="px-3 pb-1.5 pt-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                {group.title}
              </p>
            )}
            <ul>
              {group.programmes.map((programme) => {
                const Icon = programme.icon;

                return (
                  <li key={programme.id}>
                    <Link
                      href={programmeHref(section, programme.id)}
                      onClick={onNavigate}
                      className="dropdown-link group flex items-start gap-3.5 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-offset-0"
                    >
                      <span className="dropdown-icon mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-2">
                          <span className="text-[15.5px] font-semibold leading-6 text-ink-900">{programme.title}</span>
                          <ArrowRight aria-hidden="true" className="dropdown-arrow h-4 w-4 shrink-0 self-center text-ink-900" strokeWidth={2.2} />
                        </span>
                        <span className="block text-[13px] font-semibold leading-snug text-brand-700">{programme.tag}</span>
                        <span className="mt-1 line-clamp-2 text-[13.5px] leading-[1.45] text-slate-600">{programme.summary}</span>
                      </span>
                    </Link>
                    {programme.topics && (
                      <ul className="mb-1 ml-[4.1rem] space-y-0.5">
                        {programme.topics.map((topic) => (
                          <li key={topic.id}>
                            <Link
                              href={programmeHref(section, topic.id)}
                              onClick={onNavigate}
                              className="block rounded-md px-2.5 py-1.5 text-[14px] font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:text-ink-900"
                            >
                              {topic.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <Link
        href={section.href}
        onClick={onNavigate}
        className="group flex items-center justify-between border-t border-slate-100 px-6 py-4 text-[15px] font-semibold text-ink-900 transition-colors duration-200 hover:bg-slate-50"
      >
        See the full {section.label} page
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
          strokeWidth={2.2}
        />
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const stuck = useSyncExternalStore(subscribeToScroll, getStuck, getServerFalse);
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerFalse);

  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const bandRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const openMenu = (id: string) => {
    cancelClose();
    setOpenId(id);
  };
  const closeMenu = () => {
    cancelClose();
    setOpenId(null);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenId(null), CLOSE_DELAY);
  };
  const closeAll = () => {
    closeMenu();
    setMobileOpen(false);
  };

  // Escape closes menus; clicking outside the band closes the dropdown.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openId) {
        triggerRefs.current[openId]?.focus();
        closeMenu();
      }
      if (mobileOpen) {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (openId && !bandRef.current?.contains(event.target as Node)) closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  });

  useEffect(() => {
    const timer = closeTimer;
    return () => window.clearTimeout(timer.current);
  }, []);

  // Lock page scroll behind the mobile drawer; close it if the screen grows to desktop.
  useEffect(() => {
    if (!mobileOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const desktop = window.matchMedia("(min-width: 80rem)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", onChange);

    return () => {
      document.body.style.overflow = previous;
      desktop.removeEventListener("change", onChange);
    };
  }, [mobileOpen]);

  const onTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, id: string) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu(id);
      requestAnimationFrame(() => {
        document.getElementById(`menu-${id}`)?.querySelector<HTMLElement>("a[href]")?.focus();
      });
    }
  };

  const currentId =
    sections.find((section) => pathname === section.href || pathname.startsWith(`${section.href}/`))?.id ?? null;

  return (
    <>
      {/* Logo row: sticky on phones and tablets, scrolls away on desktop so the navy band takes over. */}
      <div
        data-scrolled={scrolled || mobileOpen}
        className="mobile-bar sticky top-0 z-50 border-b border-slate-200 bg-white xl:static xl:border-b-0"
      >
        <div className="header-in mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:h-[84px] sm:px-8 xl:h-[108px]">
          <Link
            href="/"
            onClick={closeAll}
            aria-label="Next 1 Education home"
            className="shrink-0 transition-opacity duration-200 hover:opacity-85"
          >
            <Image
              src={LOGO.src}
              alt="Next 1 Education"
              width={LOGO.width}
              height={LOGO.height}
              priority
              sizes="(min-width: 1280px) 220px, 170px"
              className="h-[54px] w-auto sm:h-16 xl:h-[82px]"
            />
          </Link>

          <p className="hidden items-center gap-3 font-display text-[14px] font-medium text-slate-600 xl:flex">
            Education
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-600" />
            Career Counseling
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-600" />
            Skill Development
          </p>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-900 transition-colors duration-200 hover:bg-paper xl:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true" className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out-soft ${
                  mobileOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-6 rounded-full bg-current transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out-soft ${
                  mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile drawer: a text-only panel that slides in from the right over a dimmed page. */}
        <div
          aria-hidden="true"
          data-open={mobileOpen}
          onClick={() => setMobileOpen(false)}
          className="drawer-backdrop fixed inset-x-0 bottom-0 top-[76px] z-40 bg-ink-950/45 sm:top-[84px] xl:hidden"
        />
        <div
          id="mobile-menu"
          data-open={mobileOpen}
          inert={!mobileOpen}
          className="mobile-drawer fixed bottom-0 right-0 top-[76px] z-40 flex w-full max-w-[26rem] flex-col bg-white shadow-[-24px_0_48px_-24px_rgb(7_15_36/0.35)] sm:top-[84px] xl:hidden"
        >
          <nav aria-label="Mobile" className="mobile-stagger flex-1 overflow-y-auto overscroll-contain px-6 pb-6 pt-3">
            <p className="pb-2 pt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500">Menu</p>
            {sections.map((section, index) => {
              const expanded = expandedId === section.id;

              return (
                <div key={section.id} style={{ "--i": index } as CSSProperties} className="border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => setExpandedId(expanded ? null : section.id)}
                    aria-expanded={expanded}
                    aria-controls={`mobile-${section.id}`}
                    className="group flex min-h-[3.75rem] w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="font-display text-[18px] font-semibold text-ink-900">{section.label}</span>
                    {/* Plus that turns into a minus when the section is open. */}
                    <span aria-hidden="true" className="relative h-3.5 w-3.5 shrink-0">
                      <span className="absolute left-0 top-1/2 h-0.5 w-3.5 -translate-y-1/2 rounded-full bg-ink-900" />
                      <span className="absolute left-1/2 top-0 h-3.5 w-0.5 -translate-x-1/2 rounded-full bg-ink-900 transition-transform duration-300 ease-out-soft group-aria-expanded:scale-y-0" />
                    </span>
                  </button>

                  <div id={`mobile-${section.id}`} className="accordion" data-open={expanded} inert={!expanded}>
                    <div>
                      <div className="pb-5">
                        <Link
                          href={section.href}
                          onClick={closeAll}
                          style={{ "--ai": 0 } as CSSProperties}
                          className="acc-item block py-2 font-display text-[15px] font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4"
                        >
                          {section.label} overview
                        </Link>
                        {section.groups.map((group, groupIndex) => (
                          <div key={group.title ?? groupIndex}>
                            {group.title && (
                              <p className="pb-1 pt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                                {group.title}
                              </p>
                            )}
                            {group.programmes.map((programme, itemIndex) => (
                              <Link
                                key={programme.id}
                                href={programmeHref(section, programme.id)}
                                onClick={closeAll}
                                style={{ "--ai": itemIndex + 1 + groupIndex * 2 } as CSSProperties}
                                className="acc-item block border-l-2 border-slate-200 py-2.5 pl-4 transition-colors duration-200 active:border-ink-900 active:bg-paper"
                              >
                                <span className="block text-[15.5px] font-semibold leading-snug text-ink-900">{programme.title}</span>
                                <span className="block text-[13.5px] font-medium leading-snug text-slate-500">{programme.tag}</span>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div style={{ "--i": sections.length } as CSSProperties} className="pt-7">
              <Link
                href="/lets-talk"
                onClick={closeAll}
                className="group flex items-center gap-4 rounded-lg border border-slate-200 p-4 transition-colors duration-200 active:bg-paper"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-900 text-white">
                  <Phone aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[16px] font-semibold text-ink-900">Get in touch</span>
                  <span className="block text-[13.5px] font-medium text-slate-500">Call or message an advisor</span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
                />
              </Link>
            </div>
          </nav>

          <div className="border-t border-slate-200 p-5">
            <Link
              href="/lets-talk"
              onClick={closeAll}
              className="btn-sweep flex h-13 items-center justify-center rounded-md bg-ink-900 font-display text-[15.5px] font-semibold text-white"
            >
              Schedule a consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Navy navigation band (desktop) */}
      <div
        ref={bandRef}
        data-stuck={stuck}
        className="site-band sticky top-0 z-50 hidden bg-ink-900 transition-shadow duration-300 xl:block"
        onBlur={(event) => {
          const next = event.relatedTarget as Node | null;
          if (next && !event.currentTarget.contains(next)) closeMenu();
        }}
      >
        <div className="header-in relative mx-auto flex h-16 max-w-7xl items-center justify-center px-8" style={{ "--d": "120ms" } as CSSProperties}>
          {/* Logo hidden from the navy band — scroll-in effect removed per client brief */}

          <nav aria-label="Main">
            <ul className="flex items-center gap-1">
              {sections.map((section, index) => {
                const open = openId === section.id;
                const current = currentId === section.id;
                // Wide menus centre under the whole bar; narrow ones line up with their button.
                const wide = section.groups.length > 1;
                const placement = wide
                  ? "left-1/2 top-[calc(100%_+_0.75rem)] -translate-x-1/2"
                  : `top-[calc(100%_+_0.75rem)] ${index >= 2 ? "right-0" : "left-0"}`;

                return (
                  <li
                    key={section.id}
                    className={wide ? "" : "relative"}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") openMenu(section.id);
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") scheduleClose();
                    }}
                  >
                    <button
                      ref={(el) => {
                        triggerRefs.current[section.id] = el;
                      }}
                      type="button"
                      aria-expanded={open}
                      aria-controls={`menu-${section.id}`}
                      aria-current={current ? "page" : undefined}
                      onClick={(event) => {
                        // Mouse users already see the menu on hover, so a click goes to the page.
                        if ((event.nativeEvent as PointerEvent).pointerType === "mouse") {
                          closeMenu();
                          router.push(section.href);
                          return;
                        }
                        if (open) closeMenu();
                        else openMenu(section.id);
                      }}
                      onKeyDown={(event) => onTriggerKeyDown(event, section.id)}
                      className={`group inline-flex h-10 items-center gap-1.5 rounded-md px-4 font-display text-[15px] font-medium transition-colors duration-200 hover:bg-white/10 hover:text-white aria-expanded:bg-white/10 aria-expanded:text-white ${
                        current ? "bg-white/10 text-white" : "text-slate-200"
                      }`}
                    >
                      {section.label}
                      <ChevronDown
                        aria-hidden="true"
                        className="h-4 w-4 opacity-70 transition-transform duration-300 ease-out-soft group-aria-expanded:rotate-180"
                        strokeWidth={2.2}
                      />
                    </button>

                    <div
                      id={`menu-${section.id}`}
                      data-open={open}
                      inert={!open}
                      className={`dropdown absolute ${placement}`}
                    >
                      <DropdownPanel section={section} onNavigate={closeAll} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            href="/lets-talk"
            onClick={closeAll}
            aria-label="Let's Talk"
            className="talk-btn absolute right-8 inline-flex h-10 items-center gap-2 overflow-hidden rounded-full bg-brand-600 px-3 text-white hover:bg-brand-500"
          >
            <Phone aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2.2} />
            <span className="talk-label whitespace-nowrap font-display text-[14px] font-semibold">Let&apos;s Talk</span>
          </Link>
        </div>
      </div>
    </>
  );
}
