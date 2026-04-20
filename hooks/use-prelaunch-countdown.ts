'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { checkLaunchStatus } from '@/lib/services/prelaunch';

interface UsePrelaunchCountdownProps {
  serverTime: string;
  eventStartDate: string;
}

interface PrelaunchCountdownResult {
  days: string;
  hours: string;
  minutes: string;
  isExpired: boolean;
  hasError: boolean;
}

function zeroPad(num: number): string {
  return String(Math.min(99, Math.max(0, num))).padStart(2, '0');
}

function computeCountdown(remaining: number) {
  if (remaining <= 0) {
    return { days: '00', hours: '00', minutes: '00', isExpired: true };
  }
  const totalMinutes = Math.floor(remaining / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);
  return {
    days: zeroPad(Math.floor(totalHours / 24)),
    hours: zeroPad(totalHours % 24),
    minutes: zeroPad(totalMinutes % 60),
    isExpired: false,
  };
}

export function usePrelaunchCountdown({
  serverTime,
  eventStartDate,
}: UsePrelaunchCountdownProps): PrelaunchCountdownResult {
  const router = useRouter();
  const clockOffset = useRef<number>(0);
  const retryCount = useRef(0);
  const maxRetries = 4;

  // Compute initial state from pure props only (no Date.now() during render)
  const [state, setState] = useState<PrelaunchCountdownResult>(() => {
    const remaining =
      new Date(eventStartDate).getTime() - new Date(serverTime).getTime();
    return { ...computeCountdown(remaining), hasError: false };
  });

  // Initialize clock offset and start 1s countdown tick
  useEffect(() => {
    clockOffset.current = new Date(serverTime).getTime() - Date.now();

    const interval = setInterval(() => {
      const remaining =
        new Date(eventStartDate).getTime() - (Date.now() + clockOffset.current);
      const result = computeCountdown(remaining);

      setState((prev) => ({ ...prev, ...result }));

      if (result.isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [serverTime, eventStartDate]);

  // 30s polling for launch status
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const status = await checkLaunchStatus();
        if (status.launched) {
          setState((prev) => ({ ...prev, isExpired: true }));
        }
        retryCount.current = 0;
      } catch (error: unknown) {
        if (error instanceof Response) {
          if (error.status === 401) {
            router.push('/login');
            return;
          }
          if (error.status === 404) {
            router.push('/');
            return;
          }
        }
        retryCount.current += 1;
        if (retryCount.current >= maxRetries) {
          setState((prev) => ({ ...prev, hasError: true }));
        }
      }
    }, 30_000);

    return () => clearInterval(pollInterval);
  }, [router]);

  // Auto-redirect on expiry
  useEffect(() => {
    if (state.isExpired) {
      router.push('/');
    }
  }, [state.isExpired, router]);

  return state;
}
