import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";

const motionScript = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('motion');setTimeout(function(){if(!window.__reveal)d.classList.remove('motion')},4000)}catch(e){}})();`;

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b1736",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://next1education.com"),
  title: {
    default: "Next 1 Education | Stream Selection, Career Counseling & Mentorship",
    template: "%s | Next 1 Education",
  },
  description:
    "Career guidance for school students (Class 8–12), college students, working professionals and institutions: stream selection, resume writing, career coaching and college consultation.",
  keywords: [
    "career counseling",
    "stream selection class 10",
    "stream selection class 11 12",
    "college consultation",
    "resume writing service",
    "career coaching India",
    "Next 1 Education",
    "student mentoring",
  ],
  authors: [{ name: "Next 1 Education" }],
  openGraph: {
    title: "Next 1 Education | Stream Selection, Career Counseling & Mentorship",
    description: "Career guidance for students, working professionals and institutions.",
    url: "https://next1education.com",
    siteName: "Next 1 Education",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Next 1 Education Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Enable entrance animations only when JS runs and motion is allowed; fall back to visible content. */}
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink-900 antialiased">
        <RevealObserver />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <div id="content" className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
