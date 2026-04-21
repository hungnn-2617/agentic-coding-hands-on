import { createClient } from '@/lib/supabase/client';
import { KUDO_ALLOWED_IMAGE_TYPES, KUDO_MAX_IMAGE_SIZE_MB } from '@/types/kudo';

const BUCKET_NAME = 'kudo-images';

export function validateImageFile(file: File): string | null {
  if (!KUDO_ALLOWED_IMAGE_TYPES.includes(file.type as typeof KUDO_ALLOWED_IMAGE_TYPES[number])) {
    return `Unsupported file type: ${file.type}. Allowed: JPG, PNG, GIF, WebP.`;
  }
  if (file.size > KUDO_MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    return `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max: ${KUDO_MAX_IMAGE_SIZE_MB}MB.`;
  }
  return null;
}

export async function uploadImage(file: File, userId: string): Promise<string> {
  const supabase = createClient();
  if (!supabase) throw new Error('Supabase not configured');

  const dotIndex = file.name.lastIndexOf('.');
  const fileExt = dotIndex > 0 ? file.name.slice(dotIndex + 1) : '';
  const filePath = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}${fileExt ? '.' + fileExt : ''}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

/**
 * Deletes an image from storage.
 * SECURITY: Only allows deleting images owned by the specified user.
 * The storage path format is: {userId}/{timestamp}-{randomId}.{ext}
 */
export async function deleteImage(publicUrl: string, userId: string): Promise<void> {
  const supabase = createClient();
  if (!supabase) return;

  try {
    const url = new URL(publicUrl);
    const pathParts = url.pathname.split(`/storage/v1/object/public/${BUCKET_NAME}/`);
    if (pathParts.length < 2) return;

    const filePath = pathParts[1];

    // SECURITY: Verify the image belongs to the requesting user
    // Path format: {userId}/{timestamp}-{randomId}.{ext}
    const pathUserId = filePath.split('/')[0];
    if (pathUserId !== userId) {
      console.warn(`[Security] User ${userId} attempted to delete image owned by ${pathUserId}`);
      throw new Error('Unauthorized: Cannot delete images owned by other users');
    }

    await supabase.storage.from(BUCKET_NAME).remove([filePath]);
  } catch (error) {
    // Silently fail for invalid URLs but log for security monitoring
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      throw error;
    }
    console.error('[deleteImage] Error:', error);
  }
}
