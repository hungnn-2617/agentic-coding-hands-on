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
