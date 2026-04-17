import type { AwardCategory } from '@/types/awards';

export const AWARD_CATEGORIES: AwardCategory[] = [
  {
    id: '1',
    name: 'Top Talent',
    slug: 'top-talent',
    description: 'Vinh danh top cá nhân xuất sắc trên mọi phương diện',
    descriptionEn: 'Honoring top outstanding individuals in all aspects',
    thumbnailUrl: '/images/awards/top-talent.png',
    displayOrder: 1,
    fullDescription:
      'Giải thưởng Top Talent vinh danh những cá nhân xuất sắc - những người không ngừng nâng cao điểm năng lực chuyên môn vững vàng, hiệu suất công việc vượt bậc, luôn mang lại giá trị và sự kỳ vọng, được đánh giá sao bất kể khách hàng và đồng đội. Với tinh thần học không ngừng mới những vẫn cứ chỗc giản phúc, tự luôn là người tiên phong trong lĩnh vực, học đầy đóng tài và tạo tầm hưởng truyền cảm hứng cho tất cả.',
    fullDescriptionEn:
      'The Top Talent award honors outstanding individuals who continuously elevate their professional capabilities, deliver exceptional work performance, and consistently bring value and meet expectations from both clients and colleagues.',
    imageUrl: '/images/award-glow-ring.png',
    prizeCount: 10,
    prizeUnit: 'Đơn vị',
    prizeUnitEn: 'Units',
    prizeValues: [
      { amount: '7.000.000 VNĐ', label: 'cho mỗi giải thưởng', labelEn: 'per prize' },
    ],
  },
  {
    id: '2',
    name: 'Top Project',
    slug: 'top-project',
    description:
      'Vinh danh dự án xuất sắc trên mọi phương diện, dự án có doanh thu nổi',
    descriptionEn:
      'Honoring outstanding projects in all aspects with notable revenue',
    thumbnailUrl: '/images/awards/top-project.png',
    displayOrder: 2,
    fullDescription:
      'Giải thưởng Top Project vinh danh các tập thể dự án xuất sắc với kết quả kinh doanh vượt kỳ vọng. Những dự án tốt và xin thích thành làm việc tốt lầm. Đây là các dự án có sở hữu phẩm lợi kỹ thuật cao, hiệu quả tối ưu nguồn lực và còn để phải đẩy, để cuối cùng ở một sản phẩm hoàn thiện với sự sáng tạo và nhận được phản hồi tích cực từ khách hàng.',
    fullDescriptionEn:
      'The Top Project award honors outstanding project teams that have exceeded business expectations. These are projects with high technical quality, optimal resource efficiency, and positive client feedback.',
    imageUrl: '/images/award-glow-ring.png',
    prizeCount: 2,
    prizeUnit: 'Tập thể',
    prizeUnitEn: 'Teams',
    prizeValues: [
      { amount: '15.000.000 VNĐ', label: 'cho mỗi giải thưởng', labelEn: 'per prize' },
    ],
  },
  {
    id: '3',
    name: 'Top Project Leader',
    slug: 'top-project-leader',
    description:
      'Vinh danh người quản lý truyền cảm hứng và dẫn dắt dự án bứt phá',
    descriptionEn:
      'Honoring inspiring managers who lead breakthrough projects',
    thumbnailUrl: '/images/awards/top-project-leader.png',
    displayOrder: 3,
    fullDescription:
      'Giải thưởng Top Project Leader vinh danh những nhà quản lý dự án xuất sắc - những người hội tụ năng lực, mở, và tự duy "Aim High - Be Agile" trong mọi bài toán. Họ là những người đã chứng minh rằng với sự kỹ năng lãnh đạo vầ kiến thức chuyên môn, việc không gì là không thể qua tất thử thách và đạt được mục tiêu đề ra, với sự cần cốt gắn bó với người của mình, thuyết, tính linh hoạt iveness, và trưởng thành để tất thành phẩm bảo tình hoa - hạnh phúc bên của mình.',
    fullDescriptionEn:
      'The Top Project Leader award honors exceptional project managers who embody leadership, openness, and the "Aim High - Be Agile" mindset. They have proven that with leadership skills and professional expertise, no challenge is insurmountable.',
    imageUrl: '/images/award-glow-ring.png',
    prizeCount: 3,
    prizeUnit: 'Cá nhân',
    prizeUnitEn: 'Individuals',
    prizeValues: [
      { amount: '7.000.000 VNĐ', label: 'cho mỗi giải thưởng', labelEn: 'per prize' },
    ],
  },
  {
    id: '4',
    name: 'Best Manager',
    slug: 'best-manager',
    description:
      'Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm',
    descriptionEn:
      'Honoring managers with strong management skills, leading teams',
    thumbnailUrl: '/images/awards/best-manager.png',
    displayOrder: 4,
    fullDescription:
      'Giải thưởng Best Manager vinh danh những nhà lãnh đạo thực tiễn - người đã bảo sát đội ngũ của mình, tải và kết quả vượt kỳ vọng, tạo động với kiểm dẫn theo quản lý dự phần biến thán cổng các cá nhân. Chất lực tinh cần của họ, đội ngũi hoàn chính phẩm, cả liên với mỗi thừ lãnh. Bằng sáng tạo lực đề áp lực đóng tài và luôn truyền cảm hứng, đội ngũi nghỉ linh hoạt trong kỹ nguyền sự, họ truyền cảm hứng để tập trở và sự truyền và mở lên lý tật dây.',
    fullDescriptionEn:
      'The Best Manager award honors practical leaders who stand by their teams, deliver results exceeding expectations, and inspire continuous growth. Through creativity, dedication, and adaptability, they foster a culture of excellence.',
    imageUrl: '/images/award-glow-ring.png',
    prizeCount: 1,
    prizeUnit: 'Cá nhân',
    prizeUnitEn: 'Individual',
    prizeValues: [
      { amount: '10.000.000 VNĐ', label: '', labelEn: '' },
    ],
  },
  {
    id: '5',
    name: 'Signature 2025 - Creator',
    slug: 'signature-2025-creator',
    description:
      'Vinh danh người có năng lực quản lý tốt, dẫn dắt đội nhóm',
    descriptionEn:
      'Honoring individuals with strong management skills, leading teams',
    thumbnailUrl: '/images/awards/signature-2025.png',
    displayOrder: 5,
    fullDescription:
      'Giải thưởng Signature vinh danh và nhân bài tập trí bảo kiến trình đến dòng trung người và Sun* trường đổi trong từng thời kỳ. Trong năm 2025, giải thưởng Signature vinh danh Creator - cá nhân/tập thể mang lý duy cho đồng và cộng, tất nổi bảo giá trị cho tổ chức cũ, khác hàng và cộng đồng thông qua sáng tạo và tinh thần tiến phong trong hành động.',
    fullDescriptionEn:
      '[EN_PENDING] The Signature 2025 award honors Creators - individuals or teams who bring creative value to the organization, clients, and community through innovation and pioneering spirit.',
    imageUrl: '/images/award-glow-ring.png',
    prizeCount: 1,
    prizeUnit: 'Cá nhân hoặc Tập thể',
    prizeUnitEn: 'Individual or Team',
    prizeValues: [
      { amount: '5.000.000 VNĐ', label: 'cho giải cá nhân', labelEn: 'for individual prize' },
      { amount: '8.000.000 VNĐ', label: 'cho giải tập thể', labelEn: 'for team prize' },
    ],
  },
  {
    id: '6',
    name: 'MVP (Most Valuable Person)',
    slug: 'mvp',
    description:
      'Vinh danh người có năng lực quản lý tốt, dẫn dắt đội nhóm',
    descriptionEn:
      'Honoring individuals with strong management skills, leading teams',
    thumbnailUrl: '/images/awards/mvp.png',
    displayOrder: 6,
    fullDescription:
      'Giải thưởng MVP vinh danh và nhân xuất sắc nhất năm - gương sáng của kiên bảo đã đỡn cho bao sở tập thể, cá nhân từ phát hãng nắng lực vượt bật, tình thái sang trọng hiện bán giới lực, và lẫm tồn hưởng sản chừng lại để mạnh mẽ trọng hành trình cổ Sun* vượt nêm.',
    fullDescriptionEn:
      '[EN_PENDING] The MVP (Most Valuable Person) award honors the most outstanding individual of the year - a shining example of perseverance, excellence, and dedication to Sun*\'s mission.',
    imageUrl: '/images/award-glow-ring.png',
    prizeCount: 1,
    prizeUnit: 'Cá nhân',
    prizeUnitEn: 'Individual',
    prizeValues: [
      { amount: '15.000.000 VNĐ', label: '', labelEn: '' },
    ],
  },
];
