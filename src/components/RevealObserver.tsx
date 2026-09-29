"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal, .words, .reveal-img";

/**
 * Marks animated elements with `data-in` once they scroll into view, so CSS can
 * transition them in. Watches the DOM so content from client navigations is picked up.
 */
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    (window as unknown as { __reveal?: boolean }).__reveal = true;
    if (!root.classList.contains("motion")) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const scan = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.dataset.in === undefined && !el.dataset.watched) {
          el.dataset.watched = "";
          io.observe(el);
        }
      });
    };

    scan(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(SELECTOR)) scan(node.parentElement ?? document);
          else scan(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
