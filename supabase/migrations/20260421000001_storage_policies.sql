-- ==========================================
-- Storage bucket and RLS policies for kudo-images
-- ==========================================
-- NOTE: For Supabase Cloud, storage policies must be created via Dashboard:
-- 1. Go to Storage > Create new bucket "kudo-images" (public)
-- 2. Go to Storage > Policies and add the policies below
--
-- For local development with supabase CLI, this migration works.
-- ==========================================

-- Create the kudo-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'kudo-images',
    'kudo-images',
    true,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- RLS is already enabled on storage.objects by Supabase
-- Just create the policies

-- Policy: Allow authenticated users to upload images to kudo-images bucket
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'kudo-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow public read access to kudo-images
CREATE POLICY "Allow public read access to kudo-images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'kudo-images');

-- Policy: Allow users to delete their own images
CREATE POLICY "Allow users to delete own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'kudo-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow users to update their own images
CREATE POLICY "Allow users to update own images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'kudo-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
);
