import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Atharv Chaudhari | The Journey',
  description: 'Cinematic portfolio — AI, ML, Agentic Systems, Data & Robotics.',
  icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
