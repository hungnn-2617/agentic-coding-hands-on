import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Countdown | SAA 2025',
  description: 'Sun Annual Awards 2025 — event countdown',
};

export default function CountdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
