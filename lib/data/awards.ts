import type { AwardCategory } from '@/types/awards';

export const AWARD_CATEGORIES: AwardCategory[] = [
  {
    id: '1',
    name: 'Top Talent',
    slug: 'top-talent',
    description: 'Vinh danh top cá nhân xuất sắc trên mọi phương diện',
    thumbnailUrl: '/images/awards/top-talent.png',
    displayOrder: 1,
  },
  {
    id: '2',
    name: 'Top Project',
    slug: 'top-project',
    description:
      'Vinh danh dự án xuất sắc trên mọi phương diện, dự án có doanh thu nổi',
    thumbnailUrl: '/images/awards/top-project.png',
    displayOrder: 2,
  },
  {
    id: '3',
    name: 'Top Project Leader',
    slug: 'top-project-leader',
    description:
      'Vinh danh người quản lý truyền cảm hứng và dẫn dắt dự án bứt phá',
    thumbnailUrl: '/images/awards/top-project-leader.png',
    displayOrder: 3,
  },
  {
    id: '4',
    name: 'Best Manager',
    slug: 'best-manager',
    description:
      'Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm',
    thumbnailUrl: '/images/awards/best-manager.png',
    displayOrder: 4,
  },
  {
    id: '5',
    name: 'Signature 2025 - Creator',
    slug: 'signature-2025-creator',
    description:
      'Vinh danh người có năng lực quản lý tốt, dẫn dắt đội nhóm',
    thumbnailUrl: '/images/awards/signature-2025.png',
    displayOrder: 5,
  },
  {
    id: '6',
    name: 'MVP (Most Valuable Person)',
    slug: 'mvp',
    description:
      'Vinh danh người có năng lực quản lý tốt, dẫn dắt đội nhóm',
    thumbnailUrl: '/images/awards/mvp.png',
    displayOrder: 6,
  },
];
