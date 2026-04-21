-- ==========================================
-- FULL SETUP: Schema + Seed for Supabase Cloud
-- Run this in Supabase Dashboard > SQL Editor
-- ==========================================

-- ==========================================
-- PART 1: CREATE TABLES
-- ==========================================

-- 1. DEPARTMENTS
CREATE TABLE IF NOT EXISTS departments (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR NOT NULL,
    avatar_url VARCHAR,
    department_id BIGINT,
    role VARCHAR NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    locale VARCHAR NOT NULL DEFAULT 'vi' CHECK (locale IN ('vi', 'en')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

ALTER TABLE profiles ADD CONSTRAINT fk_profiles_department
    FOREIGN KEY (department_id) REFERENCES departments(id);

-- 3. HASHTAGS
CREATE TABLE IF NOT EXISTS hashtags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BADGES
CREATE TABLE IF NOT EXISTS badges (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR,
    drop_rate DECIMAL(5, 2) NOT NULL CHECK (drop_rate >= 0 AND drop_rate <= 100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. AWARD CATEGORIES
CREATE TABLE IF NOT EXISTS award_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    slug VARCHAR NOT NULL UNIQUE,
    description TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_type VARCHAR NOT NULL DEFAULT 'individual' CHECK (unit_type IN ('individual', 'team', 'unit')),
    prize_value DECIMAL(12, 0) NOT NULL DEFAULT 0,
    image_url VARCHAR,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CAMPAIGNS
CREATE TABLE IF NOT EXISTS campaigns (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    heart_multiplier INTEGER NOT NULL DEFAULT 2,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT chk_campaign_dates CHECK (start_date < end_date)
);

-- 7. KUDOS
CREATE TABLE IF NOT EXISTS kudos (
    id BIGSERIAL PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES profiles(id),
    receiver_id UUID NOT NULL REFERENCES profiles(id),
    title VARCHAR NOT NULL,
    content TEXT NOT NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT false,
    anonymous_name VARCHAR,
    status VARCHAR NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'spam', 'hidden')),
    like_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 8. KUDO_HASHTAGS
CREATE TABLE IF NOT EXISTS kudo_hashtags (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    hashtag_id BIGINT NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
    CONSTRAINT uq_kudo_hashtag UNIQUE (kudo_id, hashtag_id)
);

-- 9. KUDO_IMAGES
CREATE TABLE IF NOT EXISTS kudo_images (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    image_url VARCHAR NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. KUDO_MENTIONS
CREATE TABLE IF NOT EXISTS kudo_mentions (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    mentioned_user_id UUID NOT NULL REFERENCES profiles(id),
    CONSTRAINT uq_kudo_mention UNIQUE (kudo_id, mentioned_user_id)
);

-- 11. KUDO_LIKES
CREATE TABLE IF NOT EXISTS kudo_likes (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id),
    is_special_day BOOLEAN NOT NULL DEFAULT false,
    heart_value INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_kudo_like UNIQUE (kudo_id, user_id)
);

-- 12. SECRET_BOXES
CREATE TABLE IF NOT EXISTS secret_boxes (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id),
    badge_id BIGINT REFERENCES badges(id),
    is_opened BOOLEAN NOT NULL DEFAULT false,
    opened_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id),
    type VARCHAR NOT NULL CHECK (type IN ('kudo_received', 'like_received', 'box_received', 'mention', 'system')),
    title VARCHAR NOT NULL,
    content TEXT,
    reference_type VARCHAR,
    reference_id BIGINT,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- PART 2: TRIGGERS
-- ==========================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', ''),
        COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', NEW.raw_user_meta_data ->> 'picture', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update like_count trigger
CREATE OR REPLACE FUNCTION update_kudo_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE kudos SET like_count = like_count + NEW.heart_value WHERE id = NEW.kudo_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE kudos SET like_count = like_count - OLD.heart_value WHERE id = OLD.kudo_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_update_like_count ON kudo_likes;
CREATE TRIGGER trg_update_like_count
    AFTER INSERT OR DELETE ON kudo_likes
    FOR EACH ROW EXECUTE FUNCTION update_kudo_like_count();

-- ==========================================
-- PART 3: ROW LEVEL SECURITY
-- ==========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE award_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE kudos ENABLE ROW LEVEL SECURITY;
ALTER TABLE kudo_hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE kudo_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE kudo_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kudo_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE secret_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS profiles_select ON profiles;
CREATE POLICY profiles_select ON profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS profiles_update ON profiles;
CREATE POLICY profiles_update ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS departments_select ON departments;
CREATE POLICY departments_select ON departments FOR SELECT USING (true);

DROP POLICY IF EXISTS award_categories_select ON award_categories;
CREATE POLICY award_categories_select ON award_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS hashtags_select ON hashtags;
CREATE POLICY hashtags_select ON hashtags FOR SELECT USING (true);
DROP POLICY IF EXISTS hashtags_insert ON hashtags;
CREATE POLICY hashtags_insert ON hashtags FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS campaigns_select ON campaigns;
CREATE POLICY campaigns_select ON campaigns FOR SELECT USING (true);

DROP POLICY IF EXISTS kudos_select ON kudos;
CREATE POLICY kudos_select ON kudos FOR SELECT USING (status = 'published' OR sender_id = auth.uid());
DROP POLICY IF EXISTS kudos_insert ON kudos;
CREATE POLICY kudos_insert ON kudos FOR INSERT WITH CHECK (sender_id = auth.uid());

DROP POLICY IF EXISTS kudo_hashtags_select ON kudo_hashtags;
CREATE POLICY kudo_hashtags_select ON kudo_hashtags FOR SELECT USING (true);
DROP POLICY IF EXISTS kudo_hashtags_insert ON kudo_hashtags;
CREATE POLICY kudo_hashtags_insert ON kudo_hashtags FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS kudo_images_select ON kudo_images;
CREATE POLICY kudo_images_select ON kudo_images FOR SELECT USING (true);
DROP POLICY IF EXISTS kudo_images_insert ON kudo_images;
CREATE POLICY kudo_images_insert ON kudo_images FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS kudo_mentions_select ON kudo_mentions;
CREATE POLICY kudo_mentions_select ON kudo_mentions FOR SELECT USING (true);
DROP POLICY IF EXISTS kudo_mentions_insert ON kudo_mentions;
CREATE POLICY kudo_mentions_insert ON kudo_mentions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS kudo_likes_select ON kudo_likes;
CREATE POLICY kudo_likes_select ON kudo_likes FOR SELECT USING (true);
DROP POLICY IF EXISTS kudo_likes_insert ON kudo_likes;
CREATE POLICY kudo_likes_insert ON kudo_likes FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS kudo_likes_delete ON kudo_likes;
CREATE POLICY kudo_likes_delete ON kudo_likes FOR DELETE USING (user_id = auth.uid());

DROP POLICY IF EXISTS badges_select ON badges;
CREATE POLICY badges_select ON badges FOR SELECT USING (true);

DROP POLICY IF EXISTS secret_boxes_select ON secret_boxes;
CREATE POLICY secret_boxes_select ON secret_boxes FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS notifications_select ON notifications;
CREATE POLICY notifications_select ON notifications FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS notifications_update ON notifications;
CREATE POLICY notifications_update ON notifications FOR UPDATE USING (user_id = auth.uid());

-- ==========================================
-- PART 3.5: STORAGE BUCKET AND POLICIES
-- ==========================================

-- Create the kudo-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'kudo-images',
    'kudo-images',
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to upload images to kudo-images bucket
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'kudo-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow public read access to kudo-images
DROP POLICY IF EXISTS "Allow public read access to kudo-images" ON storage.objects;
CREATE POLICY "Allow public read access to kudo-images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'kudo-images');

-- Policy: Allow users to delete their own images
DROP POLICY IF EXISTS "Allow users to delete own images" ON storage.objects;
CREATE POLICY "Allow users to delete own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'kudo-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow users to update their own images
DROP POLICY IF EXISTS "Allow users to update own images" ON storage.objects;
CREATE POLICY "Allow users to update own images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'kudo-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ==========================================
-- PART 4: SEED DATA
-- ==========================================

-- Departments
INSERT INTO departments (name) VALUES
    ('Engineering'), ('Design'), ('Product'), ('HR'),
    ('Marketing'), ('Sales'), ('Finance'), ('Operations')
ON CONFLICT (name) DO NOTHING;

-- Hashtags
INSERT INTO hashtags (name) VALUES
    ('Thank you'), ('Teamwork'), ('Creative'), ('Dedicated'),
    ('Hardworking'), ('Supportive'), ('Mentor'), ('Leadership'),
    ('Responsible'), ('Innovative')
ON CONFLICT (name) DO NOTHING;

-- Badges
INSERT INTO badges (name, description, image_url, drop_rate) VALUES
    ('Stay Gold', 'Stay Gold badge', '/images/badges/stay-gold.png', 30.00),
    ('Flow to Horizon', 'Flow to Horizon badge', '/images/badges/flow-to-horizon.png', 25.00),
    ('Touch of Light', 'Touch of Light badge', '/images/badges/touch-of-light.png', 20.00),
    ('Beyond the Boundary', 'Beyond the Boundary badge', '/images/badges/beyond-boundary.png', 10.00),
    ('Revival', 'Revival badge', '/images/badges/revival.png', 10.00),
    ('Root Further', 'Root Further badge', '/images/badges/root-further.png', 5.00)
ON CONFLICT (name) DO NOTHING;

-- Award Categories
INSERT INTO award_categories (name, slug, description, quantity, unit_type, prize_value, display_order) VALUES
    ('Top Talent', 'top-talent', 'Top individual award', 10, 'unit', 7000000, 1),
    ('Top Project', 'top-project', 'Top project award', 2, 'team', 15000000, 2),
    ('Top Project Leader', 'top-project-leader', 'Top project leader award', 3, 'individual', 7000000, 3),
    ('Best Manager', 'best-manager', 'Best manager award', 1, 'individual', 10000000, 4),
    ('Signature 2025 - Creator', 'signature-2025-creator', 'Signature 2025 special award', 1, 'individual', 5000000, 5),
    ('MVP', 'mvp', 'Most Valuable Person', 1, 'individual', 15000000, 6)
ON CONFLICT (slug) DO NOTHING;

-- Campaign
INSERT INTO campaigns (name, description, start_date, end_date, heart_multiplier, is_active)
VALUES ('Sun* Annual Awards 2025', 'ROOT FURTHER', '2025-03-01', '2025-06-30', 1, true)
ON CONFLICT DO NOTHING;

-- ==========================================
-- PART 5: TEST USERS
-- ==========================================

INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, aud, role, created_at, updated_at, confirmation_token, recovery_token)
VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', '00000000-0000-0000-0000-000000000000', 'nguyen.van.a@sun-asterisk.com', crypt('Test@123456', gen_salt('bf')), NOW(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Nguyen Van A", "avatar_url": "https://i.pravatar.cc/150?u=user1"}', 'authenticated', 'authenticated', NOW(), NOW(), '', ''),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', '00000000-0000-0000-0000-000000000000', 'tran.thi.b@sun-asterisk.com', crypt('Test@123456', gen_salt('bf')), NOW(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Tran Thi B", "avatar_url": "https://i.pravatar.cc/150?u=user2"}', 'authenticated', 'authenticated', NOW(), NOW(), '', ''),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', '00000000-0000-0000-0000-000000000000', 'le.van.c@sun-asterisk.com', crypt('Test@123456', gen_salt('bf')), NOW(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Le Van C", "avatar_url": "https://i.pravatar.cc/150?u=user3"}', 'authenticated', 'authenticated', NOW(), NOW(), '', ''),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', '00000000-0000-0000-0000-000000000000', 'pham.thi.d@sun-asterisk.com', crypt('Test@123456', gen_salt('bf')), NOW(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Pham Thi D", "avatar_url": "https://i.pravatar.cc/150?u=user4"}', 'authenticated', 'authenticated', NOW(), NOW(), '', ''),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', '00000000-0000-0000-0000-000000000000', 'hoang.van.e@sun-asterisk.com', crypt('Test@123456', gen_salt('bf')), NOW(), '{"provider": "email", "providers": ["email"]}', '{"full_name": "Hoang Van E", "avatar_url": "https://i.pravatar.cc/150?u=user5"}', 'authenticated', 'authenticated', NOW(), NOW(), '', '')
ON CONFLICT (id) DO NOTHING;

-- Update profiles with departments
UPDATE profiles SET department_id = (SELECT id FROM departments WHERE name = 'Engineering') WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567801';
UPDATE profiles SET department_id = (SELECT id FROM departments WHERE name = 'Design') WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567802';
UPDATE profiles SET department_id = (SELECT id FROM departments WHERE name = 'Product') WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567803';
UPDATE profiles SET department_id = (SELECT id FROM departments WHERE name = 'HR'), role = 'admin' WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567804';
UPDATE profiles SET department_id = (SELECT id FROM departments WHERE name = 'Engineering') WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567805';

-- Verify
SELECT 'Setup completed!' as status;
SELECT table_name, count FROM (
    SELECT 'departments' as table_name, count(*)::text as count FROM departments
    UNION ALL SELECT 'profiles', count(*)::text FROM profiles
    UNION ALL SELECT 'hashtags', count(*)::text FROM hashtags
    UNION ALL SELECT 'badges', count(*)::text FROM badges
) t;
