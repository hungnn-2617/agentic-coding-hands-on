import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AwardDetailCard } from '../award-detail-card';
import type { PrizeValue } from '@/types/awards';

// Mock child components
vi.mock('../award-image', () => ({
  AwardImage: ({ thumbnailUrl, altText, priority }: { thumbnailUrl: string; altText: string; priority?: boolean }) => (
    <div data-testid="award-image" data-thumbnail={thumbnailUrl} data-alt={altText} data-priority={priority?.toString()}>
      {altText}
    </div>
  ),
}));

vi.mock('../award-content-panel', () => ({
  AwardContentPanel: ({ title, description, countLabel, count, unit, valueLabel, values, orDividerText }: {
    title: string;
    description: string;
    countLabel: string;
    count: number;
    unit: string;
    valueLabel: string;
    values: Array<PrizeValue & { resolvedLabel: string }>;
    orDividerText: string;
  }) => (
    <div data-testid="award-content-panel">
      <span data-testid="panel-title">{title}</span>
      <span data-testid="panel-description">{description}</span>
      <span data-testid="panel-count">{count}</span>
      <span data-testid="panel-unit">{unit}</span>
    </div>
  ),
}));

const defaultProps = {
  slug: 'top-talent',
  title: 'Top Talent',
  description: 'Vinh danh top cá nhân xuất sắc',
  thumbnailUrl: '/images/awards/top-talent.png',
  prizeCount: 10,
  prizeUnit: 'Đơn vị',
  prizeValues: [
    { amount: '7.000.000 VNĐ', label: 'cho mỗi giải thưởng', labelEn: 'per prize', resolvedLabel: 'cho mỗi giải thưởng' },
  ] as Array<PrizeValue & { resolvedLabel: string }>,
  countLabel: 'Số lượng giải',
  valueLabel: 'Giá trị giải thưởng',
  orDividerText: 'hoặc',
  isReversed: false,
  isFirst: true,
  isLast: false,
};

function renderCard(props = defaultProps) {
  return render(<AwardDetailCard {...props} />);
}

describe('AwardDetailCard', () => {
  describe('rendering', () => {
    it('renders as an article element', () => {
      renderCard();

      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('has correct id from slug', () => {
      renderCard();

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('id', 'top-talent');
    });

    it('renders AwardImage component', () => {
      renderCard();

      expect(screen.getByTestId('award-image')).toBeInTheDocument();
    });

    it('renders AwardContentPanel component', () => {
      renderCard();

      expect(screen.getByTestId('award-content-panel')).toBeInTheDocument();
    });

    it('passes correct props to AwardImage', () => {
      renderCard();

      const image = screen.getByTestId('award-image');
      expect(image).toHaveAttribute('data-thumbnail', '/images/awards/top-talent.png');
      expect(image).toHaveAttribute('data-alt', 'Top Talent award badge');
    });

    it('passes correct props to AwardContentPanel', () => {
      renderCard();

      expect(screen.getByTestId('panel-title')).toHaveTextContent('Top Talent');
      expect(screen.getByTestId('panel-description')).toHaveTextContent('Vinh danh top cá nhân xuất sắc');
      expect(screen.getByTestId('panel-count')).toHaveTextContent('10');
      expect(screen.getByTestId('panel-unit')).toHaveTextContent('Đơn vị');
    });
  });

  describe('layout direction', () => {
    it('renders in normal order when isReversed is false', () => {
      const { container } = renderCard({ ...defaultProps, isReversed: false });

      const flexContainer = container.querySelector('div[class*="flex"]');
      expect(flexContainer?.className).not.toContain('lg:flex-row-reverse');
    });

    it('renders in reversed order when isReversed is true', () => {
      const { container } = renderCard({ ...defaultProps, isReversed: true });

      const flexContainer = container.querySelector('div[class*="flex"]');
      expect(flexContainer?.className).toContain('lg:flex-row-reverse');
    });
  });

  describe('divider', () => {
    it('renders divider when not last card', () => {
      const { container } = renderCard({ ...defaultProps, isLast: false });

      const divider = container.querySelector('div.h-px');
      expect(divider).toBeInTheDocument();
    });

    it('does not render divider when last card', () => {
      const { container } = renderCard({ ...defaultProps, isLast: true });

      const divider = container.querySelector('div.h-px');
      expect(divider).not.toBeInTheDocument();
    });

    it('divider has correct background color', () => {
      const { container } = renderCard({ ...defaultProps, isLast: false });

      const divider = container.querySelector('div.h-px');
      expect(divider?.className).toContain('bg-[#2E3940]');
    });
  });

  describe('image priority', () => {
    it('passes priority true to first card image', () => {
      renderCard({ ...defaultProps, isFirst: true });

      const image = screen.getByTestId('award-image');
      expect(image).toHaveAttribute('data-priority', 'true');
    });

    it('passes priority false to non-first card image', () => {
      renderCard({ ...defaultProps, isFirst: false });

      const image = screen.getByTestId('award-image');
      expect(image).toHaveAttribute('data-priority', 'false');
    });
  });

  describe('scroll anchor', () => {
    it('has scroll-mt class for sticky header offset', () => {
      renderCard();

      const article = screen.getByRole('article');
      expect(article.className).toContain('scroll-mt-');
    });
  });

  describe('alt text generation', () => {
    it('generates correct alt text for award image', () => {
      renderCard({ ...defaultProps, title: 'Best Manager' });

      const image = screen.getByTestId('award-image');
      expect(image).toHaveAttribute('data-alt', 'Best Manager award badge');
    });
  });

  describe('responsive layout', () => {
    it('has flex column on mobile', () => {
      const { container } = renderCard();

      const flexContainer = container.querySelector('div[class*="flex-col"]');
      expect(flexContainer).toBeInTheDocument();
    });

    it('has flex row on desktop', () => {
      const { container } = renderCard();

      const flexContainer = container.querySelector('div[class*="lg:flex-row"]');
      expect(flexContainer).toBeInTheDocument();
    });
  });

  describe('different slugs', () => {
    it('renders correct id for top-project', () => {
      renderCard({ ...defaultProps, slug: 'top-project', title: 'Top Project' });

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('id', 'top-project');
    });

    it('renders correct id for mvp', () => {
      renderCard({ ...defaultProps, slug: 'mvp', title: 'MVP' });

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('id', 'mvp');
    });
  });

  describe('edge cases', () => {
    it('handles empty prizeValues array', () => {
      renderCard({ ...defaultProps, prizeValues: [] });

      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('handles zero prizeCount', () => {
      renderCard({ ...defaultProps, prizeCount: 0 });

      expect(screen.getByTestId('panel-count')).toHaveTextContent('0');
    });

    it('handles multiple prizeValues', () => {
      const multipleValues = [
        { amount: '5.000.000 VNĐ', label: 'for individual', labelEn: 'for individual', resolvedLabel: 'for individual' },
        { amount: '8.000.000 VNĐ', label: 'for team', labelEn: 'for team', resolvedLabel: 'for team' },
      ] as Array<PrizeValue & { resolvedLabel: string }>;

      renderCard({ ...defaultProps, prizeValues: multipleValues });

      expect(screen.getByRole('article')).toBeInTheDocument();
    });
  });
});
