-- ==========================================
-- SSA 2025 EX - Database Schema
-- Compatible with Supabase Auth (auth.users)
-- Generated from Figma designs
-- ==========================================

-- ==========================================
-- 1. PROFILES (extends Supabase auth.users)
-- ==========================================

CREATE TABLE profiles (
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

CREATE INDEX idx_profiles_department_id ON profiles(department_id);
CREATE INDEX idx_profiles_role ON profiles(role);

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

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 2. DEPARTMENTS (Phong ban)
-- ==========================================

CREATE TABLE departments (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles
    ADD CONSTRAINT fk_profiles_department
    FOREIGN KEY (department_id) REFERENCES departments(id);

-- ==========================================
-- 3. AWARD CATEGORIES (He thong giai thuong)
-- ==========================================

CREATE TABLE award_categories (
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

CREATE INDEX idx_award_categories_slug ON award_categories(slug);
CREATE INDEX idx_award_categories_display_order ON award_categories(display_order);

-- ==========================================
-- 4. HASHTAGS
-- ==========================================

CREATE TABLE hashtags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hashtags_name ON hashtags(name);

-- ==========================================
-- 5. CAMPAIGNS (Admin-configured special periods)
-- ==========================================

CREATE TABLE campaigns (
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

CREATE INDEX idx_campaigns_dates ON campaigns(start_date, end_date);
CREATE INDEX idx_campaigns_active ON campaigns(is_active) WHERE is_active = true;

-- ==========================================
-- 6. KUDOS (Loi cam on)
-- ==========================================

CREATE TABLE kudos (
    id BIGSERIAL PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES profiles(id),
    receiver_id UUID NOT NULL REFERENCES profiles(id),
    title VARCHAR NOT NULL,
    content TEXT NOT NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT false,
    anonymous_name VARCHAR,
    status VARCHAR NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'spam', 'hidden')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_kudos_sender_id ON kudos(sender_id);
CREATE INDEX idx_kudos_receiver_id ON kudos(receiver_id);
CREATE INDEX idx_kudos_status_created ON kudos(status, created_at DESC);
CREATE INDEX idx_kudos_created_at ON kudos(created_at DESC);

-- ==========================================
-- 7. KUDO_HASHTAGS (M2M: Kudo <-> Hashtag)
-- ==========================================

CREATE TABLE kudo_hashtags (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    hashtag_id BIGINT NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
    CONSTRAINT uq_kudo_hashtag UNIQUE (kudo_id, hashtag_id)
);

CREATE INDEX idx_kudo_hashtags_kudo_id ON kudo_hashtags(kudo_id);
CREATE INDEX idx_kudo_hashtags_hashtag_id ON kudo_hashtags(hashtag_id);

-- ==========================================
-- 8. KUDO_IMAGES (Attachments)
-- ==========================================

CREATE TABLE kudo_images (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    image_url VARCHAR NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_kudo_images_kudo_id ON kudo_images(kudo_id);

-- ==========================================
-- 9. KUDO_MENTIONS (@ mentions in content)
-- ==========================================

CREATE TABLE kudo_mentions (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    mentioned_user_id UUID NOT NULL REFERENCES profiles(id),
    CONSTRAINT uq_kudo_mention UNIQUE (kudo_id, mentioned_user_id)
);

CREATE INDEX idx_kudo_mentions_kudo_id ON kudo_mentions(kudo_id);
CREATE INDEX idx_kudo_mentions_user_id ON kudo_mentions(mentioned_user_id);

-- ==========================================
-- 10. KUDO_LIKES (Hearts / Tha tim)
-- ==========================================

CREATE TABLE kudo_likes (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id),
    is_special_day BOOLEAN NOT NULL DEFAULT false,
    heart_value INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_kudo_like UNIQUE (kudo_id, user_id)
);

CREATE INDEX idx_kudo_likes_kudo_id ON kudo_likes(kudo_id);
CREATE INDEX idx_kudo_likes_user_id ON kudo_likes(user_id);

-- ==========================================
-- 11. BADGES (Huy hieu from Secret Box)
-- ==========================================

CREATE TABLE badges (
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

CREATE TABLE secret_boxes (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id),
    badge_id BIGINT REFERENCES badges(id),
    is_opened BOOLEAN NOT NULL DEFAULT false,
    opened_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_secret_boxes_user_id ON secret_boxes(user_id);
CREATE INDEX idx_secret_boxes_user_opened ON secret_boxes(user_id, is_opened);

-- ==========================================
-- 13. NOTIFICATIONS (Thong bao)
-- ==========================================

CREATE TABLE notifications (
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

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- ==========================================
-- SEED DATA: Badges
-- ==========================================

INSERT INTO badges (name, description, image_url, drop_rate) VALUES
    ('Stay Gold', 'Stay Gold badge', '', 30.00),
    ('Flow to Horizon', 'Flow to Horizon badge', '', 25.00),
    ('Touch of Light', 'Touch of Light badge', '', 20.00),
    ('Beyond the Boundary', 'Beyond the Boundary badge', '', 10.00),
    ('Revival', 'Revival badge', '', 10.00),
    ('Root Further', 'Root Further badge', '', 5.00);

-- ==========================================
-- SEED DATA: Award Categories
-- ==========================================

INSERT INTO award_categories (name, slug, description, quantity, unit_type, prize_value, display_order) VALUES
    ('Top Talent', 'top-talent', 'Vinh danh top ca nhan xuat sac tren moi phuong dien', 10, 'unit', 7000000, 1),
    ('Top Project', 'top-project', 'Vinh danh top du an xuat sac', 2, 'team', 15000000, 2),
    ('Top Project Leader', 'top-project-leader', 'Vinh danh top lanh dao du an xuat sac', 3, 'individual', 7000000, 3),
    ('Best Manager', 'best-manager', 'Vinh danh quan ly xuat sac nhat', 1, 'individual', 10000000, 4),
    ('Signature 2025 - Creator', 'signature-2025-creator', 'Giai thuong dac biet Signature 2025', 1, 'individual', 5000000, 5),
    ('MVP', 'mvp', 'Most Valuable Person', 1, 'individual', 15000000, 6);

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
CREATE POLICY profiles_select ON profiles FOR SELECT USING (true);
CREATE POLICY profiles_update ON profiles FOR UPDATE USING (auth.uid() = id);

-- Departments: read-only for all authenticated
CREATE POLICY departments_select ON departments FOR SELECT USING (true);

-- Award Categories: read-only for all authenticated
CREATE POLICY award_categories_select ON award_categories FOR SELECT USING (true);

-- Hashtags: read-only for all authenticated
CREATE POLICY hashtags_select ON hashtags FOR SELECT USING (true);

-- Campaigns: read for all, write for admin
CREATE POLICY campaigns_select ON campaigns FOR SELECT USING (true);

-- Kudos: read published, insert own, update own
CREATE POLICY kudos_select ON kudos FOR SELECT USING (status = 'published' OR sender_id = auth.uid());
CREATE POLICY kudos_insert ON kudos FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Kudo Hashtags: read all, insert with own kudos
CREATE POLICY kudo_hashtags_select ON kudo_hashtags FOR SELECT USING (true);

-- Kudo Images: read all, insert with own kudos
CREATE POLICY kudo_images_select ON kudo_images FOR SELECT USING (true);

-- Kudo Mentions: read all
CREATE POLICY kudo_mentions_select ON kudo_mentions FOR SELECT USING (true);

-- Kudo Likes: read all, insert/delete own
CREATE POLICY kudo_likes_select ON kudo_likes FOR SELECT USING (true);
CREATE POLICY kudo_likes_insert ON kudo_likes FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY kudo_likes_delete ON kudo_likes FOR DELETE USING (user_id = auth.uid());

-- Badges: read-only
CREATE POLICY badges_select ON badges FOR SELECT USING (true);

-- Secret Boxes: read own only
CREATE POLICY secret_boxes_select ON secret_boxes FOR SELECT USING (user_id = auth.uid());

-- Notifications: read own only
CREATE POLICY notifications_select ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY notifications_update ON notifications FOR UPDATE USING (user_id = auth.uid());
