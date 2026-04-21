import { createClient } from '@/lib/supabase/server';

export async function searchUsers(query: string, excludeUserId: string) {
  const supabase = await createClient();
  if (!supabase) return [];

  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, department_id')
    .neq('id', excludeUserId)
    .ilike('full_name', `%${trimmedQuery}%`)
    .limit(10);

  if (error) throw error;
  return data ?? [];
}
