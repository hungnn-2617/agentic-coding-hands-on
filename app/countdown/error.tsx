'use client';

import { ComingSoonFallback } from '@/components/countdown-prelaunch/coming-soon-fallback';

export default function CountdownError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (process.env.NODE_ENV === 'development') {
    console.error('Countdown page error:', error);
  }

  return <ComingSoonFallback reset={reset} />;
}
