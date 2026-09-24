import Link from "next/link";

const phoneNumber = "+91 98765 43210";

export default function LetsTalkPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f7faff] px-4 py-10 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#0056d2]"
        >
          <span aria-hidden="true">←</span>
          Back to home
        </Link>

        <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-7 sm:p-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0056d2]">
            Next 1 Education
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Let&apos;s make your next step clearer.
          </h1>
          <p className="mt-4 max-w-lg text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
            Choose a quick conversation or send us a message. We&apos;ll help you find the right place to begin.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href="https://wa.me/919876543210?text=Hello%20Next%201%20Education%2C%20I%20would%20like%20guidance."
              className="rounded-xl border border-blue-100 bg-blue-50 p-5 transition-colors hover:border-blue-200 hover:bg-blue-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2]/40"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0056d2] text-white">
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
                </svg>
              </span>
              <span className="mt-5 block text-base font-bold text-slate-900">Send a message</span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-600">Start a WhatsApp conversation.</span>
            </a>

            <a
              href="tel:+919876543210"
              className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-rose-200 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e85870]/40"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-[#c63d57]">
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="mt-5 block text-base font-bold text-slate-900">Call an advisor</span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-600">{phoneNumber}</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
