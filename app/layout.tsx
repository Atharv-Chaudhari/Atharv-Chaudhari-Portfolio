import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atharv Chaudhari — AI / ML Engineer",
  description: "A cinematic personal portfolio spanning AI, machine learning, agentic systems, data engineering and robotics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
