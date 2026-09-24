import React from "react";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-136px)] flex flex-col items-center justify-center bg-white px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtle pill tag */}
        <div className="inline-block px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wide uppercase mb-6">
          Next 1 Education Platform
        </div>

        {/* Clean, editorial headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Discover Your Perfect Career
        </h1>

        {/* Clean subtitle */}
        <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Make smart decisions with our structured guidance, scientific stream selection, and expert career coaches.
        </p>

        {/* Minimal clean button */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="/lets-talk"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            Get Started
          </a>
        </div>

        {/* Subtle navigation notice */}
        <div className="mt-16 pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Hover over Students, Services, Working Professionals, or Institutions in the navigation bar above
          </p>
        </div>
      </div>
    </div>
  );
}
