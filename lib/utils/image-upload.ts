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

export async function deleteImage(publicUrl: string): Promise<void> {
  const supabase = createClient();
  if (!supabase) return;

  const url = new URL(publicUrl);
  const pathParts = url.pathname.split(`/storage/v1/object/public/${BUCKET_NAME}/`);
  if (pathParts.length < 2) return;

  const filePath = pathParts[1];
  await supabase.storage.from(BUCKET_NAME).remove([filePath]);
}
