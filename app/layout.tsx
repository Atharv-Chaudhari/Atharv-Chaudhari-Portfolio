import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: "Atharv Chaudhari — AI & ML Engineer",
  description: "Portfolio of Atharv Chaudhari: AI/ML engineering, agentic systems, data platforms, and future intelligence.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Atharv Chaudhari — AI & ML Engineer",
    description: "Engineering intelligent systems, from agentic AI to production data platforms.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}