import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atharv Chaudhari — AI/ML Engineer",
  description:
    "AI/ML engineering, agentic systems, data platforms and interactive explorations in intelligent computing by Atharv Chaudhari.",
  applicationName: "Atharv Chaudhari Portfolio",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Atharv Chaudhari — AI/ML Engineer",
    description: "Engineering intelligent systems, from production AI to future computing.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#050b14",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
