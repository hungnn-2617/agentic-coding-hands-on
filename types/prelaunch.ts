export interface PrelaunchResponse {
  event_start_date: string;
  server_time: string;
  event_status: 'prelaunch' | 'active' | 'ended';
  event_name: string;
}

export interface PrelaunchStatusResponse {
  launched: boolean;
}
