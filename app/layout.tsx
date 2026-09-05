import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atharv Chaudhari — AI / ML Engineer",
  description: "A cinematic, game-inspired portfolio for Atharv Chaudhari — AI, ML, Agentic Systems, Data and Robotics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
