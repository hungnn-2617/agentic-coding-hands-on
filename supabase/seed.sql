-- ==========================================
-- SEED DATA: Departments
-- ==========================================

INSERT INTO departments (name) VALUES
    ('Engineering'),
    ('Design'),
    ('Product'),
    ('HR'),
    ('Marketing'),
    ('Sales'),
    ('Finance'),
    ('Operations')
ON CONFLICT (name) DO NOTHING;

-- ==========================================
-- SEED DATA: Badges
-- ==========================================

INSERT INTO badges (name, description, image_url, drop_rate) VALUES
    ('Stay Gold', 'Stay Gold badge - Luôn giữ vững giá trị cốt lõi', '/images/badges/stay-gold.png', 30.00),
    ('Flow to Horizon', 'Flow to Horizon badge - Không ngừng tiến về phía trước', '/images/badges/flow-to-horizon.png', 25.00),
    ('Touch of Light', 'Touch of Light badge - Mang ánh sáng đến mọi người', '/images/badges/touch-of-light.png', 20.00),
    ('Beyond the Boundary', 'Beyond the Boundary badge - Vượt qua mọi giới hạn', '/images/badges/beyond-boundary.png', 10.00),
    ('Revival', 'Revival badge - Hồi sinh và đổi mới', '/images/badges/revival.png', 10.00),
    ('Root Further', 'Root Further badge - Bám rễ sâu hơn', '/images/badges/root-further.png', 5.00)
ON CONFLICT (name) DO NOTHING;

-- ==========================================
-- SEED DATA: Award Categories
-- ==========================================

INSERT INTO award_categories (name, slug, description, quantity, unit_type, prize_value, display_order) VALUES
    ('Top Talent', 'top-talent', 'Vinh danh top cá nhân xuất sắc trên mọi phương diện', 10, 'unit', 7000000, 1),
    ('Top Project', 'top-project', 'Vinh danh top dự án xuất sắc', 2, 'team', 15000000, 2),
    ('Top Project Leader', 'top-project-leader', 'Vinh danh top lãnh đạo dự án xuất sắc', 3, 'individual', 7000000, 3),
    ('Best Manager', 'best-manager', 'Vinh danh quản lý xuất sắc nhất', 1, 'individual', 10000000, 4),
    ('Signature 2025 - Creator', 'signature-2025-creator', 'Giải thưởng đặc biệt Signature 2025', 1, 'individual', 5000000, 5),
    ('MVP', 'mvp', 'Most Valuable Person', 1, 'individual', 15000000, 6)
ON CONFLICT (slug) DO NOTHING;

-- ==========================================
-- SEED DATA: Hashtags
-- ==========================================

INSERT INTO hashtags (name) VALUES
    ('Cảm ơn'),
    ('Teamwork'),
    ('Sáng tạo'),
    ('Tận tâm'),
    ('Chăm chỉ'),
    ('Hỗ trợ'),
    ('Mentor'),
    ('Leadership'),
    ('Trách nhiệm'),
    ('Đổi mới')
ON CONFLICT (name) DO NOTHING;

-- ==========================================
-- SEED DATA: Default Campaign
-- ==========================================

INSERT INTO campaigns (name, description, start_date, end_date, heart_multiplier, is_active)
VALUES (
    'Sun* Annual Awards 2025',
    'Chương trình vinh danh Sun* Annual Awards 2025 - ROOT FURTHER',
    '2025-03-01 00:00:00+07',
    '2025-06-30 23:59:59+07',
    1,
    true
)
ON CONFLICT DO NOTHING;
-- ==========================================
-- DEV SEED: Test Users for Development
-- ==========================================
-- These users are created directly in auth.users and profiles
-- for local development and testing purposes.
--
-- IMPORTANT: This seed requires running with service_role key
-- or via Supabase CLI which has elevated permissions.
-- ==========================================

-- Create test users in auth.users
-- Password for all test users: Test@123456
-- (bcrypt hash of 'Test@123456' with cost 10)

DO $$
DECLARE
    user1_id UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567801';
    user2_id UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567802';
    user3_id UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567803';
    user4_id UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567804';
    user5_id UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567805';
    dept_engineering_id BIGINT;
    dept_design_id BIGINT;
    dept_product_id BIGINT;
    dept_hr_id BIGINT;
BEGIN
    -- Get department IDs
    SELECT id INTO dept_engineering_id FROM departments WHERE name = 'Engineering';
    SELECT id INTO dept_design_id FROM departments WHERE name = 'Design';
    SELECT id INTO dept_product_id FROM departments WHERE name = 'Product';
    SELECT id INTO dept_hr_id FROM departments WHERE name = 'HR';

    -- Insert test users into auth.users (if not exists)
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        aud,
        role,
        created_at,
        updated_at
    )
    VALUES
        (
            user1_id,
            '00000000-0000-0000-0000-000000000000',
            'nguyen.van.a@sun-asterisk.com',
            '$2a$10$PznXkPFJGP0QKUxXfLv5M.OaEpqsaKz5dq5Rj5rH3m5vR1yK0rQ4K',
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"full_name": "Nguyễn Văn A", "avatar_url": "https://i.pravatar.cc/150?u=user1"}',
            'authenticated',
            'authenticated',
            NOW(),
            NOW()
        ),
        (
            user2_id,
            '00000000-0000-0000-0000-000000000000',
            'tran.thi.b@sun-asterisk.com',
            '$2a$10$PznXkPFJGP0QKUxXfLv5M.OaEpqsaKz5dq5Rj5rH3m5vR1yK0rQ4K',
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"full_name": "Trần Thị B", "avatar_url": "https://i.pravatar.cc/150?u=user2"}',
            'authenticated',
            'authenticated',
            NOW(),
            NOW()
        ),
        (
            user3_id,
            '00000000-0000-0000-0000-000000000000',
            'le.van.c@sun-asterisk.com',
            '$2a$10$PznXkPFJGP0QKUxXfLv5M.OaEpqsaKz5dq5Rj5rH3m5vR1yK0rQ4K',
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"full_name": "Lê Văn C", "avatar_url": "https://i.pravatar.cc/150?u=user3"}',
            'authenticated',
            'authenticated',
            NOW(),
            NOW()
        ),
        (
            user4_id,
            '00000000-0000-0000-0000-000000000000',
            'pham.thi.d@sun-asterisk.com',
            '$2a$10$PznXkPFJGP0QKUxXfLv5M.OaEpqsaKz5dq5Rj5rH3m5vR1yK0rQ4K',
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"full_name": "Phạm Thị D", "avatar_url": "https://i.pravatar.cc/150?u=user4"}',
            'authenticated',
            'authenticated',
            NOW(),
            NOW()
        ),
        (
            user5_id,
            '00000000-0000-0000-0000-000000000000',
            'hoang.van.e@sun-asterisk.com',
            '$2a$10$PznXkPFJGP0QKUxXfLv5M.OaEpqsaKz5dq5Rj5rH3m5vR1yK0rQ4K',
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"full_name": "Hoàng Văn E", "avatar_url": "https://i.pravatar.cc/150?u=user5"}',
            'authenticated',
            'authenticated',
            NOW(),
            NOW()
        )
    ON CONFLICT (id) DO NOTHING;

    -- Insert profiles (in case trigger didn't fire or for explicit control)
    INSERT INTO profiles (id, full_name, avatar_url, department_id, role)
    VALUES
        (user1_id, 'Nguyễn Văn A', 'https://i.pravatar.cc/150?u=user1', dept_engineering_id, 'user'),
        (user2_id, 'Trần Thị B', 'https://i.pravatar.cc/150?u=user2', dept_design_id, 'user'),
        (user3_id, 'Lê Văn C', 'https://i.pravatar.cc/150?u=user3', dept_product_id, 'user'),
        (user4_id, 'Phạm Thị D', 'https://i.pravatar.cc/150?u=user4', dept_hr_id, 'admin'),
        (user5_id, 'Hoàng Văn E', 'https://i.pravatar.cc/150?u=user5', dept_engineering_id, 'user')
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url,
        department_id = EXCLUDED.department_id,
        role = EXCLUDED.role;

    RAISE NOTICE 'Created 5 test users for development';
END $$;
-- ==========================================
-- DEV SEED: Sample Kudos for Development
-- ==========================================

DO $$
DECLARE
    user1_id UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567801';
    user2_id UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567802';
    user3_id UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567803';
    user4_id UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567804';
    user5_id UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567805';
    hashtag_camoi_id BIGINT;
    hashtag_teamwork_id BIGINT;
    hashtag_sangtao_id BIGINT;
    hashtag_tantam_id BIGINT;
    hashtag_mentor_id BIGINT;
    kudo1_id BIGINT;
    kudo2_id BIGINT;
    kudo3_id BIGINT;
    kudo4_id BIGINT;
    kudo5_id BIGINT;
BEGIN
    -- Get hashtag IDs
    SELECT id INTO hashtag_camoi_id FROM hashtags WHERE name = 'Cảm ơn';
    SELECT id INTO hashtag_teamwork_id FROM hashtags WHERE name = 'Teamwork';
    SELECT id INTO hashtag_sangtao_id FROM hashtags WHERE name = 'Sáng tạo';
    SELECT id INTO hashtag_tantam_id FROM hashtags WHERE name = 'Tận tâm';
    SELECT id INTO hashtag_mentor_id FROM hashtags WHERE name = 'Mentor';

    -- Insert sample kudos
    INSERT INTO kudos (sender_id, receiver_id, title, content, is_anonymous, status, created_at)
    VALUES
        (user1_id, user2_id, 'Cảm ơn vì thiết kế tuyệt vời!', '<p>Cảm ơn <strong>Trần Thị B</strong> đã thiết kế UI/UX cho dự án mới. Design rất đẹp và user-friendly!</p>', false, 'published', NOW() - INTERVAL '2 days')
    RETURNING id INTO kudo1_id;

    INSERT INTO kudos (sender_id, receiver_id, title, content, is_anonymous, status, created_at)
    VALUES
        (user2_id, user3_id, 'Support xuất sắc!', '<p>Cảm ơn anh <strong>Lê Văn C</strong> đã support team trong sprint vừa rồi. Nhờ anh mà team hoàn thành đúng deadline!</p>', false, 'published', NOW() - INTERVAL '1 day')
    RETURNING id INTO kudo2_id;

    INSERT INTO kudos (sender_id, receiver_id, title, content, is_anonymous, anonymous_name, status, created_at)
    VALUES
        (user3_id, user4_id, 'Manager tuyệt vời nhất!', '<p>Cảm ơn chị đã luôn lắng nghe và hỗ trợ team. Chị là manager tuyệt vời nhất!</p>', true, 'Người hâm mộ', 'published', NOW() - INTERVAL '12 hours')
    RETURNING id INTO kudo3_id;

    INSERT INTO kudos (sender_id, receiver_id, title, content, is_anonymous, status, created_at)
    VALUES
        (user4_id, user5_id, 'Code review rất kỹ!', '<p>Cảm ơn <strong>Hoàng Văn E</strong> đã review code rất kỹ lưỡng. Những góp ý của bạn giúp code clean hơn rất nhiều!</p>', false, 'published', NOW() - INTERVAL '6 hours')
    RETURNING id INTO kudo4_id;

    INSERT INTO kudos (sender_id, receiver_id, title, content, is_anonymous, status, created_at)
    VALUES
        (user5_id, user1_id, 'Mentor tận tâm!', '<p>Cảm ơn anh <strong>Nguyễn Văn A</strong> đã mentor em trong suốt thời gian qua. Em học được rất nhiều từ anh!</p>', false, 'published', NOW() - INTERVAL '3 hours')
    RETURNING id INTO kudo5_id;

    -- Link kudos with hashtags
    INSERT INTO kudo_hashtags (kudo_id, hashtag_id) VALUES
        (kudo1_id, hashtag_camoi_id),
        (kudo1_id, hashtag_sangtao_id),
        (kudo2_id, hashtag_teamwork_id),
        (kudo2_id, hashtag_tantam_id),
        (kudo3_id, hashtag_camoi_id),
        (kudo4_id, hashtag_teamwork_id),
        (kudo5_id, hashtag_mentor_id),
        (kudo5_id, hashtag_tantam_id)
    ON CONFLICT DO NOTHING;

    -- Add some likes
    INSERT INTO kudo_likes (kudo_id, user_id, heart_value) VALUES
        (kudo1_id, user3_id, 1),
        (kudo1_id, user4_id, 1),
        (kudo1_id, user5_id, 1),
        (kudo2_id, user1_id, 1),
        (kudo2_id, user4_id, 1),
        (kudo3_id, user1_id, 1),
        (kudo3_id, user2_id, 1),
        (kudo3_id, user5_id, 1),
        (kudo4_id, user1_id, 1),
        (kudo5_id, user2_id, 1),
        (kudo5_id, user3_id, 1)
    ON CONFLICT DO NOTHING;

    -- Add some secret boxes as rewards
    INSERT INTO secret_boxes (user_id, badge_id, is_opened, opened_at, created_at)
    SELECT
        user2_id,
        id,
        true,
        NOW() - INTERVAL '1 day',
        NOW() - INTERVAL '2 days'
    FROM badges WHERE name = 'Stay Gold'
    ON CONFLICT DO NOTHING;

    INSERT INTO secret_boxes (user_id, badge_id, is_opened, created_at)
    SELECT
        user3_id,
        id,
        false,
        NOW() - INTERVAL '1 day'
    FROM badges WHERE name = 'Flow to Horizon'
    ON CONFLICT DO NOTHING;

    RAISE NOTICE 'Created sample kudos, likes, and secret boxes for development';
END $$;
