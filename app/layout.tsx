import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atharv — AI • ML • Robotics",
  description: "Interactive personal portfolio for an AI, ML, data and robotics technologist.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}