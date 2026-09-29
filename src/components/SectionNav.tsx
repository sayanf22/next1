"use client";

import { useEffect, useRef, useState } from "react";

export type SectionNavEntry = {
  id: string;
  title: string;
  /** Group label rendered above this entry on desktop. */
  group?: string;
  nested?: boolean;
};

/**
 * "On this page" navigation. A vertical, sticky list on desktop and a sticky horizontal
 * "Jump to" strip on phones. Highlights the subsection currently in view.
 */
export default function SectionNav({ entries }: { entries: SectionNavEntry[] }) {
  const [activeId, setActiveId] = useState(entries[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (records) => {
        records.forEach((record) => visible.set(record.target.id, record.isIntersecting));
        // Prefer the deepest visible entry so a seminar topic wins over its parent.
        const current = [...entries].reverse().find((entry) => visible.get(entry.id));
        if (current) setActiveId(current.id);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );

    entries.forEach((entry) => {
      const el = document.getElementById(entry.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [entries]);

  // On phones, glide the active pill into view within the horizontal strip.
  useEffect(() => {
    const list = listRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const link = list.querySelector<HTMLElement>(`[data-active="true"]`);
    if (!link) return;
    const target = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeId]);

  return (
    <nav aria-label="On this page">
      <p className="mb-3 hidden font-display text-[14px] font-semibold text-ink-900 lg:block">On this page</p>
      <ul
        ref={listRef}
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto scroll-smooth px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:block lg:space-y-0.5 lg:overflow-visible lg:px-0"
      >
        {entries.map((entry, index) => {
          const active = entry.id === activeId;

          return (
            <li key={entry.id} className="shrink-0">
              {entry.group && (
                <p
                  className={`hidden px-3 pb-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-slate-500 lg:block ${
                    index === 0 ? "pt-1" : "pt-5"
                  }`}
                >
                  {entry.group}
                </p>
              )}
              <a
                href={`#${entry.id}`}
                data-active={active}
                aria-current={active ? "location" : undefined}
                className={`block whitespace-nowrap rounded-full border border-slate-300 px-4 py-2 text-[14px] font-medium text-slate-700 transition-colors duration-300 hover:border-ink-900 hover:text-ink-900 data-[active=true]:border-ink-900 data-[active=true]:bg-ink-900 data-[active=true]:text-white lg:whitespace-normal lg:rounded-md lg:border-0 lg:py-2 lg:text-[14.5px] lg:hover:bg-slate-100 lg:data-[active=true]:bg-brand-50 lg:data-[active=true]:font-semibold lg:data-[active=true]:text-brand-800 ${
                  entry.nested ? "lg:pl-7 lg:text-[13.5px]" : "lg:px-3"
                }`}
              >
                {entry.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
