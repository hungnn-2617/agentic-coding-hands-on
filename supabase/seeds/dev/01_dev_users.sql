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
