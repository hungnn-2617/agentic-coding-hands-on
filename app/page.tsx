import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Root page - Redirects based on authentication status.
 * Authenticated users see the homepage (to be implemented).
 * Unauthenticated users are redirected to login.
 */
export default async function Home() {
  const supabase = await createClient();

  // If Supabase is not configured, redirect to login
  if (!supabase) {
    redirect('/login');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Temporary placeholder for authenticated users
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00101A] text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to SAA 2025</h1>
      <p className="text-lg text-white/70">
        Logged in as: {user.email}
      </p>
    </div>
  );
}
