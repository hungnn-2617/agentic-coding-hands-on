'use server';

import { createClient } from '@/lib/supabase/server';
import { toggleLike } from '@/lib/services/kudo-like-service';

/**
 * Server action to toggle a like on a kudo post.
 * Validates that the user is authenticated before proceeding.
 */
export async function toggleKudoLikeAction(
  kudoId: string
): Promise<{ liked: boolean; newCount: number }> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Supabase not configured');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  return toggleLike(kudoId, user.id);
}

/**
 * Server action to open the user's first unopened secret box.
 * Validates authentication, finds the earliest unopened box, and marks it as opened.
 */
export async function openSecretBoxAction(): Promise<{
  success: boolean;
  prizeId: number | null;
}> {
  const supabase = await createClient();
  if (!supabase) return { success: false, prizeId: null };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, prizeId: null };

  // Find the first unopened secret box for this user
  const { data: box, error: fetchError } = await supabase
    .from('secret_boxes')
    .select('id, badge_id')
    .eq('user_id', user.id)
    .eq('is_opened', false)
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (fetchError || !box) {
    return { success: false, prizeId: null };
  }

  // Mark the box as opened
  const { error: updateError } = await supabase
    .from('secret_boxes')
    .update({ is_opened: true, opened_at: new Date().toISOString() })
    .eq('id', box.id);

  if (updateError) {
    return { success: false, prizeId: null };
  }

  return { success: true, prizeId: box.badge_id };
}
