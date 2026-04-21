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
