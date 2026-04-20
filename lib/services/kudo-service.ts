import { createClient } from '@/lib/supabase/server';
import { sanitizeHtml } from '@/lib/utils/sanitize';
import type { CreateKudoPayload } from '@/types/kudo';
import {
  KUDO_TITLE_MAX_LENGTH,
  KUDO_CONTENT_MAX_LENGTH,
  KUDO_MAX_HASHTAGS,
  KUDO_MAX_IMAGES,
} from '@/types/kudo';

export function validateKudoPayload(payload: CreateKudoPayload, senderId: string): string | null {
  if (!payload.recipient_id) return 'Recipient is required';
  if (payload.recipient_id === senderId) return 'Cannot send a Kudo to yourself';
  if (!payload.title?.trim() || payload.title.length > KUDO_TITLE_MAX_LENGTH) return 'Title is required and must be under 1024 characters';
  if (!payload.content) return 'Content is required';
  if (!payload.hashtags || payload.hashtags.length === 0) return 'At least 1 hashtag is required';
  if (payload.hashtags.length > KUDO_MAX_HASHTAGS) return `Maximum ${KUDO_MAX_HASHTAGS} hashtags allowed`;
  if (payload.images && payload.images.length > KUDO_MAX_IMAGES) return `Maximum ${KUDO_MAX_IMAGES} images allowed`;
  return null;
}

export async function createKudo(payload: CreateKudoPayload, senderId: string) {
  const validationError = validateKudoPayload(payload, senderId);
  if (validationError) throw new Error(validationError);

  const supabase = await createClient();
  if (!supabase) throw new Error('Supabase not configured');

  // Verify recipient exists
  const { data: recipient } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', payload.recipient_id)
    .single();
  if (!recipient) throw new Error('Recipient not found');

  const sanitizedContent = sanitizeHtml(payload.content);

  // Strip HTML tags for length check
  const textContent = sanitizedContent.replace(/<[^>]*>/g, '');
  if (textContent.length > KUDO_CONTENT_MAX_LENGTH) {
    throw new Error(`Content exceeds ${KUDO_CONTENT_MAX_LENGTH} characters`);
  }

  const anonymousName = payload.is_anonymous
    ? (payload.anonymous_name?.trim() || 'Ẩn danh')
    : null;

  const { data, error } = await supabase
    .from('kudos')
    .insert({
      sender_id: senderId,
      recipient_id: payload.recipient_id,
      title: payload.title.trim(),
      content: sanitizedContent,
      hashtags: payload.hashtags,
      images: payload.images ?? [],
      is_anonymous: payload.is_anonymous,
      anonymous_name: anonymousName,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
