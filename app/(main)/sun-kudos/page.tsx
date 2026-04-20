import { createClient } from '@/lib/supabase/server';
import { SunKudosClient } from './client';

export default async function SunKudosPage() {
  const supabase = await createClient();
  let userId = '';

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? '';
  }

  return <SunKudosClient userId={userId} />;
}
