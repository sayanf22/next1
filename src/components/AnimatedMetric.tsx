"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedMetricProps = {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
};

export default function AnimatedMetric({
  value,
  label,
  suffix = "",
  delay = 0,
}: AnimatedMetricProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setCount(value);
      return;
    }

    let started = false;
    let frame = 0;
    let delayTimer = 0;
    const duration = 1400;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        delayTimer = window.setTimeout(() => {
          const startTime = performance.now();
          const tick = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(value * easedProgress));

            if (progress < 1) {
              frame = window.requestAnimationFrame(tick);
            } else {
              setCount(value);
            }
          };

          frame = window.requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.45 },
    );

    observer.observe(item);

    return () => {
      observer.disconnect();
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(frame);
    };
  }, [delay, value]);

  return (
    <li ref={itemRef} className="py-5 text-center">
      <p aria-hidden="true" className="text-5xl font-bold tracking-tight text-[#07699b] sm:text-6xl">
        {count.toLocaleString("en-IN")}{suffix}
      </p>
      <span className="sr-only">
        {value.toLocaleString("en-IN")}{suffix}
      </span>
      <p className="mt-1 text-sm font-medium text-slate-700">{label}</p>
    </li>
  );
}