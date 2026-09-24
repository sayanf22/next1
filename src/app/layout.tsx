import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});


export const viewport: Viewport = {
  themeColor: "#0f172a",
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
    "Empowering school students (Class 8–12), college grads, and working professionals with scientific stream selection, ATS resume writing, 1-on-1 career coaching, and college consultation.",
  keywords: [
    "career counseling",
    "stream selection class 10",
    "stream selection class 11 12",
    "college consultation",
    "resume writing service",
    "career coaching India",
    "Next 1 Education",
    "student mentoring",
    "corporate workshops",
  ],
  authors: [{ name: "Next 1 Education" }],
  openGraph: {
    title: "Next 1 Education | Stream Selection, Career Counseling & Mentorship",
    description:
      "Scientific psychometric assessments, 1-on-1 career coaching, resume writing, and institutional training programs.",
    url: "https://next1education.com",
    siteName: "Next 1 Education",
    images: [
      {
        url: "/logo/custom-vertical-no-tagline-transparent-3000x1000.png",
        width: 1200,
        height: 400,
        alt: "Next 1 Education Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${openSans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
