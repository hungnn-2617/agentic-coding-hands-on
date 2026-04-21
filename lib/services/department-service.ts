import { createClient } from '@/lib/supabase/server';

/**
 * Fetch all departments ordered by name.
 */
export async function getDepartments(): Promise<
  { id: number; name: string }[]
> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('departments')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) return [];
  return data ?? [];
}
