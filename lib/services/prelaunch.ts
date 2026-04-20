import type { PrelaunchResponse, PrelaunchStatusResponse } from '@/types/prelaunch';
import { EVENT_START_DATE, EVENT_NAME } from '@/lib/constants';

/**
 * Fetch prelaunch event data including countdown target and server time.
 * TODO: Replace with Supabase query when backend is ready.
 */
export async function fetchPrelaunchData(): Promise<PrelaunchResponse> {
  const now = new Date();

  // Derive event_status from the date
  let eventStatus: PrelaunchResponse['event_status'] = 'prelaunch';
  if (EVENT_START_DATE) {
    const startTime = new Date(EVENT_START_DATE).getTime();
    if (!isNaN(startTime) && startTime <= now.getTime()) {
      eventStatus = 'active';
    }
  }

  return {
    event_start_date: EVENT_START_DATE,
    server_time: now.toISOString(),
    event_status: eventStatus,
    event_name: EVENT_NAME,
  };
}

/**
 * Check if the event has launched (triggers redirect).
 * TODO: Replace with Supabase query or API call when backend is ready.
 */
export async function checkLaunchStatus(): Promise<PrelaunchStatusResponse> {
  if (EVENT_START_DATE) {
    const startTime = new Date(EVENT_START_DATE).getTime();
    if (!isNaN(startTime) && startTime <= Date.now()) {
      return { launched: true };
    }
  }
  return { launched: false };
}
