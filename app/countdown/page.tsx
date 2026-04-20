import { redirect } from 'next/navigation';
import { fetchPrelaunchData } from '@/lib/services/prelaunch';
import { CountdownPageClient } from '@/components/countdown-prelaunch/countdown-page-client';

export default async function CountdownPage() {
  const data = await fetchPrelaunchData();

  // Server-side redirect if event is no longer in prelaunch.
  // The service derives event_status from the date — no need for a separate date check here.
  if (data.event_status !== 'prelaunch') {
    redirect('/');
  }

  return (
    <>
      <CountdownPageClient
        serverTime={data.server_time}
        eventStartDate={data.event_start_date}
      />
      <noscript>
        <div
          style={{
            backgroundColor: '#00101A',
            color: '#FFFFFF',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <p>
            The event starts on{' '}
            {data.event_start_date
              ? new Date(data.event_start_date).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'a future date'}
            . Please enable JavaScript to see the countdown.
          </p>
        </div>
      </noscript>
    </>
  );
}
