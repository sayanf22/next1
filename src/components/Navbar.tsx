"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigationData, type SubItem } from "@/data/navigationData";

function MobileMenuLink({
  item,
  onNavigate,
}: {
  item: SubItem;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={item.href}
      className="group flex min-h-16 items-center justify-between gap-4 border-b border-slate-100 px-2 py-4 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2]/35 last:border-b-0"
      onClick={onNavigate}
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-snug text-slate-900">
          {item.title}
          {item.categoryTag && (
            <span className="font-normal text-slate-500"> — {item.categoryTag}</span>
          )}
        </span>
        <span className="mt-1 line-clamp-1 block text-xs leading-relaxed text-slate-500">
          {item.description}
        </span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#0056d2]">
        <span>View details</span>
        <svg
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<{ [key: string]: boolean }>({});
  const headerRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep dismissal behavior predictable for keyboard and pointer users.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Lock background scroll while the mobile drawer is open, then restore its previous value.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(id);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const closeDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(null);
  };

  const toggleMobileSubmenu = (id: string) => {
    setMobileExpanded((prev) => ({
      [id]: !prev[id],
    }));
  };

  const isOpen = Boolean(activeMenu);
  const currentItemData =
    navigationData.find((item) => item.id === activeMenu) ||
    navigationData[0];
  const contactPhone = navigationData.find((item) => item.sideContact)?.sideContact?.phone;
  const mobileNavigationItems = [...navigationData].sort(
    (left, right) => Number(Boolean(right.isCta)) - Number(Boolean(left.isCta)),
  );

  const renderDesktopItem = (subItem: SubItem, asCard = false) => (
    <div
      key={subItem.title}
      className={`mega-menu-item ${asCard ? "mega-menu-card rounded-xl p-4" : ""}`}
      style={{ "--nav-accent": currentItemData.accentColor } as React.CSSProperties}
    >
      {subItem.children?.length ? (
        <div>
          <div className="flex flex-wrap items-baseline gap-2">
            <h4 className="mega-menu-item-title text-sm font-bold text-slate-900">
              {subItem.title}
            </h4>
            {subItem.categoryTag && (
              <span className="text-xs font-medium text-slate-500">
                {subItem.categoryTag}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
            {subItem.description}
          </p>
        </div>
      ) : (
        <Link href={subItem.href} onClick={closeDropdown} className="block">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="mega-menu-item-title text-sm font-bold text-slate-900 transition-colors">
              {subItem.title}
            </span>
            {subItem.categoryTag && (
              <span className="text-xs font-medium text-slate-500">
                {subItem.categoryTag}
              </span>
            )}
          </div>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {subItem.description}
          </p>
          <span className="mt-1.5 inline-flex items-center text-xs font-semibold mega-menu-accent-text">
            {subItem.linkText || "View Program Details"} &gt;
          </span>
        </Link>
      )}

      {subItem.children?.length ? (
        <div className="mega-menu-child-links mt-4 space-y-3 border-t border-slate-100 pt-3">
          {subItem.children.map((child) => (
            <Link
              key={child.title}
              href={child.href}
              onClick={closeDropdown}
              className="mega-menu-child-link block rounded-r-lg py-1 pl-3"
            >
              <span className="flex flex-wrap items-baseline gap-2">
                <span className="mega-menu-item-title text-xs font-bold text-slate-800 transition-colors">
                  {child.title}
                </span>
                {child.categoryTag && (
                  <span className="text-[11px] font-medium text-slate-500">
                    {child.categoryTag}
                  </span>
                )}
              </span>
              <span className="mt-1 block text-[11px] leading-relaxed text-slate-500">
                {child.description}
              </span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white"
      role="banner"
      onMouseLeave={handleMouseLeave}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          closeDropdown();
        }
      }}
    >
      <div className="mx-auto max-w-[1750px] px-4 sm:px-8 xl:px-8">
        <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          {/* Prominent High-Visibility Brand Logo on Left */}
          <div className="flex min-w-0 items-center">
            <Link
              href="/"
              className="flex items-center group transition-opacity hover:opacity-95"
              aria-label="Next 1 Education Home"
              onClick={closeDropdown}
              onFocus={closeDropdown}
            >
              <div className="relative h-14 w-44 sm:h-16 sm:w-56 xl:h-16 xl:w-64">
                <Image
                  src="/logo/custom-vertical-no-tagline-transparent-3000x1000.png"
                  alt="Next 1 Education - Education | Career Counseling | Skill Development"
                  fill
                  sizes="(max-width: 639px) 176px, (max-width: 1279px) 224px, 256px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Center the desktop links between the brand and the contact action. */}
          <nav
            className="hidden items-center justify-self-center space-x-1.5 xl:flex 2xl:space-x-3"
            role="navigation"
            aria-label="Main Navigation"
            onMouseLeave={handleMouseLeave}
          >
            {navigationData.filter((item) => !item.isCta).map((item) => {
              const isItemActive = activeMenu === item.id;
              const hasDropdown = Boolean(item.categories || item.items);

              return (
                <div
                  key={item.id}
                  className="relative py-2"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveMenu(item.id)}
                    onFocus={() => handleMouseEnter(item.id)}
                    style={{ "--nav-accent": item.accentColor } as React.CSSProperties}
                    className={"nav-category-trigger inline-flex items-center gap-1.5 rounded-[4px] px-3 py-1 text-sm font-semibold cursor-pointer " + (isItemActive ? "is-active" : "")}
                    aria-expanded={isItemActive}
                    aria-haspopup="true"
                    aria-controls="mega-menu-panel"
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <svg
                        className={"w-3.5 h-3.5 transition-transform duration-300 " + (isItemActive ? "rotate-180 text-white" : "text-slate-400")}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Contact action sits at the far right and expands on hover or keyboard focus. */}
          <div className="hidden items-center justify-self-end xl:flex">
            {navigationData.filter((item) => item.isCta).map((item) => (
              <Link
                key={item.id}
                href={item.href || "/lets-talk"}
                className="nav-talk-cta group relative inline-flex h-11 w-11 items-center gap-2 overflow-hidden rounded-full px-3 text-sm font-semibold text-white active:translate-y-0"
                aria-label="Let's Talk - Connect with our Career Counselors"
              >
                <svg
                  className="h-4 w-4 shrink-0 text-white/95 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="nav-talk-label whitespace-nowrap tracking-wide">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* On touch layouts, keep the header focused on the brand and a clear menu control. */}
          <div className="flex items-center justify-self-end xl:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-rose-50 hover:text-[#e85870] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e85870]/40"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative flex h-[18px] w-[22px] flex-col justify-between">
                <span className={"h-0.5 w-full rounded-full bg-current transition-transform duration-200 motion-reduce:transition-none " + (mobileMenuOpen ? "translate-y-2 rotate-45" : "")} />
                <span className={"h-0.5 w-full rounded-full bg-current transition-opacity duration-150 motion-reduce:transition-none " + (mobileMenuOpen ? "opacity-0" : "opacity-100")} />
                <span className={"h-0.5 w-full rounded-full bg-current transition-transform duration-200 motion-reduce:transition-none " + (mobileMenuOpen ? "-translate-y-2 -rotate-45" : "")} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Two-Way Smooth Expand & Collapse Mega-Menu Container */}
      <div
        id="mega-menu-panel"
        role="region"
        aria-label={`${currentItemData.label} navigation`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`mega-menu-layer absolute top-full left-0 right-0 z-50 w-full ${
          isOpen ? "is-open" : ""
        }`}
        onMouseEnter={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }}
      >
        <div className="mega-menu-surface relative">
          {/* Close X Button in top right */}
          <button
            type="button"
            onClick={closeDropdown}
            className="absolute top-5 right-6 text-slate-400 hover:text-slate-800 p-1.5 rounded-md hover:bg-slate-100 transition-colors text-lg font-light leading-none z-10 cursor-pointer"
            aria-label="Close menu"
          >
            ✕
          </button>

          {/* Dynamic Content Container with subtle cross-fade on category switch */}
          <div key={currentItemData.id} className="grid grid-cols-12 p-8 lg:p-10 gap-8 lg:gap-12 animate-category-fade">
            {/* Content Columns */}
            <div className="col-span-12 lg:col-span-9 grid max-w-[1180px] grid-cols-1 gap-6 md:grid-cols-2 lg:ml-auto lg:gap-8">
              {currentItemData.categories &&
                currentItemData.categories.map((category) => (
                  <section key={category.categoryTitle}>
                      {/* Category Heading (Using distinct signature accent color) */}
                      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <h3
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: currentItemData.accentColor }}
                        >
                          {category.categoryTitle}
                        </h3>
                        {category.badge && (
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {category.badge}
                          </span>
                        )}
                      </div>

                      {/* Sub-items List (NO DECORATIVE ICONS, Pure Editorial Hierarchy) */}
                      <div className="space-y-5">
                        {category.items.map((subItem) => renderDesktopItem(subItem))}
                      </div>
                  </section>
                ))}
              {currentItemData.items?.map((subItem) =>
                renderDesktopItem(subItem, true),
              )}
            </div>

            {/* Right Column: Counselor Assistance & Quick Links */}
            {currentItemData.sideContact && (
              <div className="col-span-12 lg:col-span-3 -m-8 flex flex-col justify-between border-t border-slate-100 bg-slate-50/90 p-8 lg:-m-10 lg:border-l lg:border-t-0 lg:p-10">
                  <div>
                    {/* Helpline */}
                    <div className="mb-6">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {currentItemData.sideContact.phoneLabel}
                      </span>
                      <a
                        href={`tel:${currentItemData.sideContact.phone.replace(/\s+/g, "")}`}
                        className="text-base font-bold text-slate-900 transition-colors block hover:text-blue-600"
                      >
                        {currentItemData.sideContact.phone}
                      </a>
                    </div>

                    {/* Send Message */}
                    <div className="mb-8">
                      <Link
                        href={currentItemData.sideContact.actionHref}
                        onClick={closeDropdown}
                        className="inline-block text-xs font-semibold hover:underline transition-colors"
                        style={{ color: currentItemData.accentColor }}
                      >
                        {currentItemData.sideContact.actionLabel} &gt;
                      </Link>
                    </div>

                    {/* Quick Links */}
                    <div className="border-t border-slate-200/80 pt-6 space-y-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Quick Explore
                      </span>
                      {currentItemData.sideContact.quickLinks.map((ql) => (
                        <Link
                          key={ql.label}
                          href={ql.href}
                          onClick={closeDropdown}
                          className="block text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                        >
                          {ql.label} &gt;
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200/60">
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Next 1 Education provides certified stream &amp; career guidance across 100+ disciplines.
                    </p>
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        className={"mobile-nav-backdrop xl:hidden fixed inset-x-0 bottom-0 top-16 z-30 " + (mobileMenuOpen ? "is-open" : "")}
        onClick={() => setMobileMenuOpen(false)}
        aria-label="Close navigation menu"
        tabIndex={mobileMenuOpen ? 0 : -1}
      />

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation"
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
        className={`mobile-nav-drawer xl:hidden fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-slate-200 bg-white px-6 pb-8 pt-3 sm:px-8 ${
          mobileMenuOpen ? "is-open" : ""
        }`}
      >
        <div className="mobile-nav-content mx-auto w-full max-w-2xl">
          <nav aria-label="Mobile Navigation">
        {mobileNavigationItems.map((item) => {
          if (item.isCta) {
            return (
              <div key={item.id} className="mobile-nav-actions flex flex-row items-stretch gap-3 border-b border-slate-200 py-5">
                <Link
                  href={item.href || "/lets-talk"}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#0056d2] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0043a8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2]/40"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
                {contactPhone && (
                  <a
                    href={"tel:" + contactPhone.replace(/\s+/g, "")}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2]/40"
                  >
                    <svg aria-hidden="true" className="h-4 w-4 text-[#0056d2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>Call us</span>
                  </a>
                )}
              </div>
            );
          }

          const isExpanded = Boolean(mobileExpanded[item.id]);

          return (
            <div
              key={item.id}
              className={"mobile-nav-category border-b border-slate-200 " + (isExpanded ? "is-expanded" : "")}
            >
              <button
                type="button"
                onClick={() => toggleMobileSubmenu(item.id)}
                className="mobile-nav-category-trigger flex min-h-14 w-full items-center justify-between py-4 text-[15px] font-semibold text-slate-900 transition-colors sm:text-base"
                aria-expanded={isExpanded}
                aria-controls={`mobile-nav-${item.id}`}
              >
                <span>{item.label}</span>
                <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                  {isExpanded ? "Close" : "Explore"}
                  <svg className={`h-4 w-4 text-[#0056d2] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>

              {(item.categories || item.items) && (
                <div
                  id={`mobile-nav-${item.id}`}
                  aria-hidden={!isExpanded}
                  inert={!isExpanded}
                  className={`mobile-nav-accordion ${isExpanded ? "is-open" : ""}`}
                >
                  <div className="mobile-nav-accordion-inner space-y-7 py-3">
                    {item.categories?.map((cat) => (
                      <section key={cat.categoryTitle} className="space-y-1">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                            {cat.categoryTitle}
                          </p>
                          {cat.badge && <span className="text-[11px] font-medium text-slate-400">{cat.badge}</span>}
                        </div>
                        <div>
                          {cat.items.map((sub) => (
                            <MobileMenuLink key={sub.title} item={sub} onNavigate={() => setMobileMenuOpen(false)} />
                          ))}
                        </div>
                      </section>
                    ))}
                    {item.items?.map((sub) => (
                      <section key={sub.title} className="space-y-1">
                        {sub.children?.length ? (
                          <>
                            <MobileMenuLink item={sub} onNavigate={() => setMobileMenuOpen(false)} />
                            <div className="ml-3 pl-3">
                              <p className="py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">Workshop topics</p>
                              {sub.children.map((child) => (
                                <MobileMenuLink key={child.title} item={child} onNavigate={() => setMobileMenuOpen(false)} />
                              ))}
                            </div>
                          </>
                        ) : (
                          <MobileMenuLink item={sub} onNavigate={() => setMobileMenuOpen(false)} />
                        )}
                      </section>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
          </nav>
        </div>
      </div>
    </header>
  );
}
