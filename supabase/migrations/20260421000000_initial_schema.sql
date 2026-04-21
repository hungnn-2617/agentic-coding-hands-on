-- ==========================================
-- SSA 2025 EX - Initial Database Schema
-- Compatible with Supabase Auth (auth.users)
-- ==========================================

-- ==========================================
-- 1. DEPARTMENTS (Phong ban)
-- ==========================================

CREATE TABLE IF NOT EXISTS departments (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. PROFILES (extends Supabase auth.users)
-- ==========================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR NOT NULL,
    avatar_url VARCHAR,
    department_id BIGINT REFERENCES departments(id),
    role VARCHAR NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    locale VARCHAR NOT NULL DEFAULT 'vi' CHECK (locale IN ('vi', 'en')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_profiles_department_id ON profiles(department_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Trigger to auto-create profile on Supabase Auth signup
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

-- ==========================================
-- 3. AWARD CATEGORIES (He thong giai thuong)
-- ==========================================

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

CREATE INDEX IF NOT EXISTS idx_award_categories_slug ON award_categories(slug);
CREATE INDEX IF NOT EXISTS idx_award_categories_display_order ON award_categories(display_order);

-- ==========================================
-- 4. HASHTAGS
-- ==========================================

CREATE TABLE IF NOT EXISTS hashtags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hashtags_name ON hashtags(name);

-- ==========================================
-- 5. CAMPAIGNS (Admin-configured special periods)
-- ==========================================

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

CREATE INDEX IF NOT EXISTS idx_campaigns_dates ON campaigns(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_campaigns_active ON campaigns(is_active) WHERE is_active = true;

-- ==========================================
-- 6. KUDOS (Loi cam on)
-- ==========================================

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

CREATE INDEX IF NOT EXISTS idx_kudos_sender_id ON kudos(sender_id);
CREATE INDEX IF NOT EXISTS idx_kudos_receiver_id ON kudos(receiver_id);
CREATE INDEX IF NOT EXISTS idx_kudos_status_created ON kudos(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_kudos_created_at ON kudos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_kudos_like_count ON kudos(like_count DESC);

-- ==========================================
-- 7. KUDO_HASHTAGS (M2M: Kudo <-> Hashtag)
-- ==========================================

CREATE TABLE IF NOT EXISTS kudo_hashtags (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    hashtag_id BIGINT NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
    CONSTRAINT uq_kudo_hashtag UNIQUE (kudo_id, hashtag_id)
);

CREATE INDEX IF NOT EXISTS idx_kudo_hashtags_kudo_id ON kudo_hashtags(kudo_id);
CREATE INDEX IF NOT EXISTS idx_kudo_hashtags_hashtag_id ON kudo_hashtags(hashtag_id);

-- ==========================================
-- 8. KUDO_IMAGES (Attachments)
-- ==========================================

CREATE TABLE IF NOT EXISTS kudo_images (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    image_url VARCHAR NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kudo_images_kudo_id ON kudo_images(kudo_id);

-- ==========================================
-- 9. KUDO_MENTIONS (@ mentions in content)
-- ==========================================

CREATE TABLE IF NOT EXISTS kudo_mentions (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    mentioned_user_id UUID NOT NULL REFERENCES profiles(id),
    CONSTRAINT uq_kudo_mention UNIQUE (kudo_id, mentioned_user_id)
);

CREATE INDEX IF NOT EXISTS idx_kudo_mentions_kudo_id ON kudo_mentions(kudo_id);
CREATE INDEX IF NOT EXISTS idx_kudo_mentions_user_id ON kudo_mentions(mentioned_user_id);

-- ==========================================
-- 10. KUDO_LIKES (Hearts / Tha tim)
-- ==========================================

CREATE TABLE IF NOT EXISTS kudo_likes (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id),
    is_special_day BOOLEAN NOT NULL DEFAULT false,
    heart_value INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_kudo_like UNIQUE (kudo_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_kudo_likes_kudo_id ON kudo_likes(kudo_id);
CREATE INDEX IF NOT EXISTS idx_kudo_likes_user_id ON kudo_likes(user_id);

-- Trigger to update like_count on kudos
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
-- 11. BADGES (Huy hieu from Secret Box)
-- ==========================================

CREATE TABLE IF NOT EXISTS badges (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR,
    drop_rate DECIMAL(5, 2) NOT NULL CHECK (drop_rate >= 0 AND drop_rate <= 100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 12. SECRET_BOXES (Hop qua)
-- ==========================================

CREATE TABLE IF NOT EXISTS secret_boxes (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id),
    badge_id BIGINT REFERENCES badges(id),
    is_opened BOOLEAN NOT NULL DEFAULT false,
    opened_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_secret_boxes_user_id ON secret_boxes(user_id);
CREATE INDEX IF NOT EXISTS idx_secret_boxes_user_opened ON secret_boxes(user_id, is_opened);

-- ==========================================
-- 13. NOTIFICATIONS (Thong bao)
-- ==========================================

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

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
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

-- Profiles: users can read all, update own
DROP POLICY IF EXISTS profiles_select ON profiles;
CREATE POLICY profiles_select ON profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS profiles_update ON profiles;
CREATE POLICY profiles_update ON profiles FOR UPDATE USING (auth.uid() = id);

-- Departments: read-only for all authenticated
DROP POLICY IF EXISTS departments_select ON departments;
CREATE POLICY departments_select ON departments FOR SELECT USING (true);

-- Award Categories: read-only for all authenticated
DROP POLICY IF EXISTS award_categories_select ON award_categories;
CREATE POLICY award_categories_select ON award_categories FOR SELECT USING (true);

-- Hashtags: read all, insert for authenticated
DROP POLICY IF EXISTS hashtags_select ON hashtags;
CREATE POLICY hashtags_select ON hashtags FOR SELECT USING (true);
DROP POLICY IF EXISTS hashtags_insert ON hashtags;
CREATE POLICY hashtags_insert ON hashtags FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Campaigns: read for all
DROP POLICY IF EXISTS campaigns_select ON campaigns;
CREATE POLICY campaigns_select ON campaigns FOR SELECT USING (true);

-- Kudos: read published, insert own, update own
DROP POLICY IF EXISTS kudos_select ON kudos;
CREATE POLICY kudos_select ON kudos FOR SELECT USING (status = 'published' OR sender_id = auth.uid());
DROP POLICY IF EXISTS kudos_insert ON kudos;
CREATE POLICY kudos_insert ON kudos FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Kudo Hashtags: read all, insert for authenticated
DROP POLICY IF EXISTS kudo_hashtags_select ON kudo_hashtags;
CREATE POLICY kudo_hashtags_select ON kudo_hashtags FOR SELECT USING (true);
DROP POLICY IF EXISTS kudo_hashtags_insert ON kudo_hashtags;
CREATE POLICY kudo_hashtags_insert ON kudo_hashtags FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Kudo Images: read all, insert for authenticated
DROP POLICY IF EXISTS kudo_images_select ON kudo_images;
CREATE POLICY kudo_images_select ON kudo_images FOR SELECT USING (true);
DROP POLICY IF EXISTS kudo_images_insert ON kudo_images;
CREATE POLICY kudo_images_insert ON kudo_images FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Kudo Mentions: read all, insert for authenticated
DROP POLICY IF EXISTS kudo_mentions_select ON kudo_mentions;
CREATE POLICY kudo_mentions_select ON kudo_mentions FOR SELECT USING (true);
DROP POLICY IF EXISTS kudo_mentions_insert ON kudo_mentions;
CREATE POLICY kudo_mentions_insert ON kudo_mentions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Kudo Likes: read all, insert/delete own
DROP POLICY IF EXISTS kudo_likes_select ON kudo_likes;
CREATE POLICY kudo_likes_select ON kudo_likes FOR SELECT USING (true);
DROP POLICY IF EXISTS kudo_likes_insert ON kudo_likes;
CREATE POLICY kudo_likes_insert ON kudo_likes FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS kudo_likes_delete ON kudo_likes;
CREATE POLICY kudo_likes_delete ON kudo_likes FOR DELETE USING (user_id = auth.uid());

-- Badges: read-only
DROP POLICY IF EXISTS badges_select ON badges;
CREATE POLICY badges_select ON badges FOR SELECT USING (true);

-- Secret Boxes: read own only
DROP POLICY IF EXISTS secret_boxes_select ON secret_boxes;
CREATE POLICY secret_boxes_select ON secret_boxes FOR SELECT USING (user_id = auth.uid());

-- Notifications: read/update own only
DROP POLICY IF EXISTS notifications_select ON notifications;
CREATE POLICY notifications_select ON notifications FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS notifications_update ON notifications;
CREATE POLICY notifications_update ON notifications FOR UPDATE USING (user_id = auth.uid());
