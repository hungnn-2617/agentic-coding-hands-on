import { createClient } from '@/lib/supabase/server';

export async function getHashtags() {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('hashtags')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function createHashtag(name: string, userId: string) {
  const supabase = await createClient();
  if (!supabase) throw new Error('Supabase not configured');

  const trimmed = name.trim().toLowerCase();
  if (!trimmed || trimmed.length > 100) {
    throw new Error('Hashtag name must be 1-100 characters');
  }

  // Check duplicate
  const { data: existing } = await supabase
    .from('hashtags')
    .select('id')
    .eq('name', trimmed)
    .single();

  if (existing) {
    throw new Error('Hashtag already exists');
  }

  const { data, error } = await supabase
    .from('hashtags')
    .insert({ name: trimmed, created_by: userId })
    .select()
    .single();

  if (error) throw error;
  return data;
}
