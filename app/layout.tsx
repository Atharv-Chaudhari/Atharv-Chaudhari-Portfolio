import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atharv Chaudhari — AI / ML Engineer",
  description: "A cinematic interactive portfolio exploring AI, machine learning, agentic systems, data and robotics.",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
