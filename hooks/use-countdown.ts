'use client';

import { useState, useEffect } from 'react';

interface CountdownResult {
  days: string;
  hours: string;
  minutes: string;
  isExpired: boolean;
}

function zeroPad(num: number): string {
  return String(Math.max(0, num)).padStart(2, '0');
}

function calculateRemaining(targetDate: Date): CountdownResult {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: '00', hours: '00', minutes: '00', isExpired: true };
  }

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  return {
    days: zeroPad(days),
    hours: zeroPad(hours),
    minutes: zeroPad(minutes),
    isExpired: false,
  };
}

export function useCountdown(): CountdownResult {
  const [result, setResult] = useState<CountdownResult>({
    days: '00',
    hours: '00',
    minutes: '00',
    isExpired: false,
  });

  useEffect(() => {
    const envDate = process.env.NEXT_PUBLIC_EVENT_START_DATE;
    if (!envDate) {
      setResult({ days: '00', hours: '00', minutes: '00', isExpired: false });
      return;
    }

    const targetDate = new Date(envDate);
    if (isNaN(targetDate.getTime())) {
      setResult({ days: '00', hours: '00', minutes: '00', isExpired: false });
      return;
    }

    setResult(calculateRemaining(targetDate));

    const interval = setInterval(() => {
      setResult(calculateRemaining(targetDate));
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  return result;
}
