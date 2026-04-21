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
  const { data: recipient, error: recipientError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', payload.recipient_id)
    .single();

  if (recipientError || !recipient) {
    console.error('[createKudo] Recipient lookup failed:', { recipientError, recipient_id: payload.recipient_id });
    throw new Error('Recipient not found');
  }

  const sanitizedContent = sanitizeHtml(payload.content);

  // Strip HTML tags for length check
  const textContent = sanitizedContent.replace(/<[^>]*>/g, '');
  if (textContent.length > KUDO_CONTENT_MAX_LENGTH) {
    throw new Error(`Content exceeds ${KUDO_CONTENT_MAX_LENGTH} characters`);
  }

  const anonymousName = payload.is_anonymous
    ? (payload.anonymous_name?.trim() || 'Ẩn danh')
    : null;

  // Insert kudo record
  const { data: kudo, error: kudoError } = await supabase
    .from('kudos')
    .insert({
      sender_id: senderId,
      receiver_id: payload.recipient_id,
      title: payload.title.trim(),
      content: sanitizedContent,
      is_anonymous: payload.is_anonymous,
      anonymous_name: anonymousName,
    })
    .select()
    .single();

  if (kudoError) {
    console.error('[createKudo] Error inserting kudo:', kudoError);
    throw kudoError;
  }

  // Insert hashtags via junction table
  if (payload.hashtags.length > 0) {
    // Get or create hashtag IDs
    const { data: existingHashtags, error: fetchHashtagsError } = await supabase
      .from('hashtags')
      .select('id, name')
      .in('name', payload.hashtags);

    if (fetchHashtagsError) {
      console.error('[createKudo] Error fetching hashtags:', fetchHashtagsError);
      throw new Error('Failed to fetch hashtags');
    }

    const existingNames = new Set((existingHashtags ?? []).map((h) => h.name));
    const newHashtags = payload.hashtags.filter((name) => !existingNames.has(name));

    // Insert new hashtags (ignore duplicates with onConflict)
    if (newHashtags.length > 0) {
      const { error: insertHashtagError } = await supabase
        .from('hashtags')
        .upsert(
          newHashtags.map((name) => ({ name })),
          { onConflict: 'name', ignoreDuplicates: true }
        );
      if (insertHashtagError) {
        console.error('[createKudo] Error inserting hashtags:', insertHashtagError);
        throw new Error('Failed to create hashtags');
      }
    }

    // Fetch all hashtag IDs (existing + newly created)
    const { data: allHashtags, error: fetchAllError } = await supabase
      .from('hashtags')
      .select('id')
      .in('name', payload.hashtags);

    if (fetchAllError) {
      console.error('[createKudo] Error fetching all hashtags:', fetchAllError);
      throw new Error('Failed to fetch hashtag IDs');
    }

    // Create junction records
    if (allHashtags && allHashtags.length > 0) {
      const { error: hashtagError } = await supabase
        .from('kudo_hashtags')
        .insert(allHashtags.map((h) => ({ kudo_id: kudo.id, hashtag_id: h.id })));
      if (hashtagError) {
        console.error('[createKudo] Error creating kudo_hashtags:', hashtagError);
        throw hashtagError;
      }
    }
  }

  // Insert images
  const images = payload.images ?? [];
  if (images.length > 0) {
    const { error: imageError } = await supabase
      .from('kudo_images')
      .insert(images.map((url, idx) => ({
        kudo_id: kudo.id,
        image_url: url,
        display_order: idx,
      })));
    if (imageError) throw imageError;
  }

  return kudo;
}
