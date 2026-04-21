-- ==========================================
-- CLOUD SEED: Test Data for Supabase Cloud
-- Run this in Supabase Dashboard > SQL Editor
-- ==========================================

-- 1. Seed Departments
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

-- 2. Seed Hashtags
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

-- 3. Seed Badges
INSERT INTO badges (name, description, image_url, drop_rate) VALUES
    ('Stay Gold', 'Stay Gold badge', '/images/badges/stay-gold.png', 30.00),
    ('Flow to Horizon', 'Flow to Horizon badge', '/images/badges/flow-to-horizon.png', 25.00),
    ('Touch of Light', 'Touch of Light badge', '/images/badges/touch-of-light.png', 20.00),
    ('Beyond the Boundary', 'Beyond the Boundary badge', '/images/badges/beyond-boundary.png', 10.00),
    ('Revival', 'Revival badge', '/images/badges/revival.png', 10.00),
    ('Root Further', 'Root Further badge', '/images/badges/root-further.png', 5.00)
ON CONFLICT (name) DO NOTHING;

-- 4. Seed Award Categories
INSERT INTO award_categories (name, slug, description, quantity, unit_type, prize_value, display_order) VALUES
    ('Top Talent', 'top-talent', 'Vinh danh top cá nhân xuất sắc', 10, 'unit', 7000000, 1),
    ('Top Project', 'top-project', 'Vinh danh top dự án xuất sắc', 2, 'team', 15000000, 2),
    ('Top Project Leader', 'top-project-leader', 'Vinh danh top lãnh đạo dự án xuất sắc', 3, 'individual', 7000000, 3),
    ('Best Manager', 'best-manager', 'Vinh danh quản lý xuất sắc nhất', 1, 'individual', 10000000, 4),
    ('Signature 2025 - Creator', 'signature-2025-creator', 'Giải thưởng đặc biệt Signature 2025', 1, 'individual', 5000000, 5),
    ('MVP', 'mvp', 'Most Valuable Person', 1, 'individual', 15000000, 6)
ON CONFLICT (slug) DO NOTHING;

-- 5. Seed Campaign
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

-- 6. Create Test Users in auth.users (will auto-create profiles via trigger)
-- Password: Test@123456
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
    updated_at,
    confirmation_token,
    recovery_token
)
VALUES
    (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567801',
        '00000000-0000-0000-0000-000000000000',
        'nguyen.van.a@sun-asterisk.com',
        crypt('Test@123456', gen_salt('bf')),
        NOW(),
        '{"provider": "email", "providers": ["email"]}',
        '{"full_name": "Nguyễn Văn A", "avatar_url": "https://i.pravatar.cc/150?u=user1"}',
        'authenticated',
        'authenticated',
        NOW(),
        NOW(),
        '',
        ''
    ),
    (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567802',
        '00000000-0000-0000-0000-000000000000',
        'tran.thi.b@sun-asterisk.com',
        crypt('Test@123456', gen_salt('bf')),
        NOW(),
        '{"provider": "email", "providers": ["email"]}',
        '{"full_name": "Trần Thị B", "avatar_url": "https://i.pravatar.cc/150?u=user2"}',
        'authenticated',
        'authenticated',
        NOW(),
        NOW(),
        '',
        ''
    ),
    (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567803',
        '00000000-0000-0000-0000-000000000000',
        'le.van.c@sun-asterisk.com',
        crypt('Test@123456', gen_salt('bf')),
        NOW(),
        '{"provider": "email", "providers": ["email"]}',
        '{"full_name": "Lê Văn C", "avatar_url": "https://i.pravatar.cc/150?u=user3"}',
        'authenticated',
        'authenticated',
        NOW(),
        NOW(),
        '',
        ''
    ),
    (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567804',
        '00000000-0000-0000-0000-000000000000',
        'pham.thi.d@sun-asterisk.com',
        crypt('Test@123456', gen_salt('bf')),
        NOW(),
        '{"provider": "email", "providers": ["email"]}',
        '{"full_name": "Phạm Thị D", "avatar_url": "https://i.pravatar.cc/150?u=user4"}',
        'authenticated',
        'authenticated',
        NOW(),
        NOW(),
        '',
        ''
    ),
    (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567805',
        '00000000-0000-0000-0000-000000000000',
        'hoang.van.e@sun-asterisk.com',
        crypt('Test@123456', gen_salt('bf')),
        NOW(),
        '{"provider": "email", "providers": ["email"]}',
        '{"full_name": "Hoàng Văn E", "avatar_url": "https://i.pravatar.cc/150?u=user5"}',
        'authenticated',
        'authenticated',
        NOW(),
        NOW(),
        '',
        ''
    )
ON CONFLICT (id) DO NOTHING;

-- 7. Update profiles with department_id (trigger creates profiles but without department)
UPDATE profiles SET department_id = (SELECT id FROM departments WHERE name = 'Engineering')
WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567801';

UPDATE profiles SET department_id = (SELECT id FROM departments WHERE name = 'Design')
WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567802';

UPDATE profiles SET department_id = (SELECT id FROM departments WHERE name = 'Product')
WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567803';

UPDATE profiles SET department_id = (SELECT id FROM departments WHERE name = 'HR'), role = 'admin'
WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567804';

UPDATE profiles SET department_id = (SELECT id FROM departments WHERE name = 'Engineering')
WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567805';

-- Verify results
SELECT 'Departments' as table_name, count(*) as count FROM departments
UNION ALL SELECT 'Hashtags', count(*) FROM hashtags
UNION ALL SELECT 'Badges', count(*) FROM badges
UNION ALL SELECT 'Profiles', count(*) FROM profiles
UNION ALL SELECT 'Award Categories', count(*) FROM award_categories
UNION ALL SELECT 'Auth Users', count(*) FROM auth.users;
