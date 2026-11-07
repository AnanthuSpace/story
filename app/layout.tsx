import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Cursor } from "@/components/ui/Cursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { profile } from "@/data/profile";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteDescription = `${profile.summary} ${profile.name} — ${profile.role} in ${profile.location}. Contact ${profile.email}.`;

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: siteDescription,
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: siteDescription,
    type: "website",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: siteDescription,
  email: profile.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Alappuzha",
    addressRegion: "Kerala",
    addressCountry: "India",
  },
};

export const viewport: Viewport = {
  themeColor: "#E8D2B5",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="paper-grain" aria-hidden="true" />
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
