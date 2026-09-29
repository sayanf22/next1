"use client";

import { useEffect, useRef } from "react";

type AnimatedMetricProps = {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
};

function formatMetric(value: number, suffix: string) {
  return `${value.toLocaleString("en-IN")}${suffix}`;
}

/**
 * Counts up once the metric scrolls into view. The final value is rendered on the
 * server, so the number is correct without JavaScript or with reduced motion.
 */
export default function AnimatedMetric({ value, label, suffix = "", delay = 0 }: AnimatedMetricProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    el.textContent = formatMetric(0, suffix);

    let frame = 0;
    let timer = 0;
    const duration = 1600;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        timer = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = formatMetric(Math.round(value * eased), suffix);
            if (progress < 1) frame = window.requestAnimationFrame(tick);
          };
          frame = window.requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
      el.textContent = formatMetric(value, suffix);
    };
  }, [delay, suffix, value]);

  return (
    <li className="reveal px-4 py-7 text-center first:pt-0 last:pb-0 sm:py-0 lg:border-l lg:border-slate-300 lg:first:border-l-0">
      <p aria-hidden="true" className="font-display text-4xl font-bold tabular-nums text-ink-900 sm:text-[3.25rem]">
        <span ref={numberRef}>{formatMetric(value, suffix)}</span>
      </p>
      <span className="sr-only">{formatMetric(value, suffix)}</span>
      <p className="mt-2 text-[15.5px] font-semibold text-brand-700">{label}</p>
    </li>
  );
}
