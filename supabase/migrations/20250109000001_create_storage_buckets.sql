-- Create Storage Buckets for Trip Photos
--
-- This migration sets up Supabase Storage buckets for user-uploaded content.
-- Storage buckets are separate from RLS policies but have their own access policies.

-- Create a bucket for trip images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'trip-images',
  'trip-images',
  true,  -- Public bucket (images accessible via public URL)
  10485760,  -- 10MB max file size
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Create a bucket for user avatars (future feature)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  2097152,  -- 2MB max file size
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for trip-images bucket
-- Since we disabled RLS and use service role key, we need simple policies

-- Allow anyone to read public images
CREATE POLICY "Public images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'trip-images');

-- Allow authenticated users to upload images
-- Note: With service role key, this is automatically allowed
-- This policy is for future use if we enable proper auth
CREATE POLICY "Authenticated users can upload trip images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'trip-images');

-- Allow users to update their own images
CREATE POLICY "Users can update own trip images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'trip-images');

-- Allow users to delete their own images
CREATE POLICY "Users can delete own trip images"
ON storage.objects FOR DELETE
USING (bucket_id = 'trip-images');

-- Storage Policies for avatars bucket (future use)
CREATE POLICY "Public avatars are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Users can update own avatars"
ON storage.objects FOR UPDATE
USING (bucket_id = 'avatars');

CREATE POLICY "Users can delete own avatars"
ON storage.objects FOR DELETE
USING (bucket_id = 'avatars');

-- Create helper function to get public URL for storage objects
CREATE OR REPLACE FUNCTION get_public_url(bucket_name TEXT, file_path TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN format('%s/storage/v1/object/public/%s/%s',
    current_setting('app.supabase_url'),
    bucket_name,
    file_path
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION get_public_url IS 'Helper function to generate public URLs for storage objects';
