import { createClient } from '@/lib/supabase/server';

/**
 * Toggle a like on a kudo post.
 * If the user already liked it, the like is removed; otherwise a new like is created.
 * Note: The database has a trigger that auto-updates like_count, so we rely on that.
 */
export async function toggleLike(
  kudoId: string | number,
  userId: string
): Promise<{ liked: boolean; newCount: number }> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Supabase not configured');

  const numericKudoId = typeof kudoId === 'string' ? parseInt(kudoId, 10) : kudoId;

  // Check if user already liked this kudo
  const { data: existingLike } = await supabase
    .from('kudo_likes')
    .select('id')
    .eq('kudo_id', numericKudoId)
    .eq('user_id', userId)
    .single();

  if (existingLike) {
    // Unlike: remove the like (trigger will decrement count)
    const { error: deleteError } = await supabase
      .from('kudo_likes')
      .delete()
      .eq('id', existingLike.id);

    if (deleteError) throw deleteError;

    // Fetch updated like_count
    const { data: kudo } = await supabase
      .from('kudos')
      .select('like_count')
      .eq('id', numericKudoId)
      .single();

    return { liked: false, newCount: kudo?.like_count ?? 0 };
  } else {
    // Like: insert a new like (trigger will increment count)
    const { error: insertError } = await supabase
      .from('kudo_likes')
      .insert({ kudo_id: numericKudoId, user_id: userId });

    if (insertError) throw insertError;

    // Fetch updated like_count
    const { data: kudo } = await supabase
      .from('kudos')
      .select('like_count')
      .eq('id', numericKudoId)
      .single();

    return { liked: true, newCount: kudo?.like_count ?? 0 };
  }
}

/**
 * Get the set of kudo IDs that a user has liked.
 * Returns string IDs for consistency with the feed.
 */
export async function getUserLikedKudoIds(
  userId: string
): Promise<Set<string>> {
  const supabase = await createClient();
  if (!supabase) return new Set();

  const { data, error } = await supabase
    .from('kudo_likes')
    .select('kudo_id')
    .eq('user_id', userId);

  if (error || !data) return new Set();

  return new Set(data.map((row) => String(row.kudo_id)));
}
