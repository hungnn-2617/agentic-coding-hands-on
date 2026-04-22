import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { PrizeContentSection } from '../prize-content-section';
import { AWARD_CATEGORIES } from '@/lib/data/awards';

// Mock useScrollSpy for PrizeSidebar
vi.mock('@/hooks/use-scroll-spy', () => ({
  useScrollSpy: vi.fn(() => ({
    activeSectionId: 'top-talent',
    scrollToSection: vi.fn(),
  })),
}));

// Mock child components
vi.mock('../prize-sidebar', () => ({
  PrizeSidebar: () => <nav data-testid="prize-sidebar">Sidebar</nav>,
}));

vi.mock('../award-detail-card', () => ({
  AwardDetailCard: ({
    slug,
    title,
    description,
    thumbnailUrl,
    prizeCount,
    prizeUnit,
    prizeValues,
    countLabel,
    valueLabel,
    orDividerText,
    isReversed,
    isFirst,
    isLast,
  }: {
    slug: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    prizeCount: number;
    prizeUnit: string;
    prizeValues: Array<{ amount: string; resolvedLabel: string }>;
    countLabel: string;
    valueLabel: string;
    orDividerText: string;
    isReversed: boolean;
    isFirst: boolean;
    isLast: boolean;
  }) => (
    <article
      data-testid={`award-card-${slug}`}
      data-title={title}
      data-prize-count={prizeCount}
      data-prize-unit={prizeUnit}
      data-is-reversed={isReversed.toString()}
      data-is-first={isFirst.toString()}
      data-is-last={isLast.toString()}
      data-count-label={countLabel}
      data-value-label={valueLabel}
      data-or-divider={orDividerText}
    >
      <span data-testid="description">{description}</span>
      <span data-testid="prize-values">{JSON.stringify(prizeValues)}</span>
    </article>
  ),
}));

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function renderSection() {
  return render(<PrizeContentSection />, { wrapper });
}

describe('PrizeContentSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders as a section element', () => {
      const { container } = renderSection();

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders PrizeSidebar component', () => {
      renderSection();

      expect(screen.getByTestId('prize-sidebar')).toBeInTheDocument();
    });

    it('renders all award categories', () => {
      renderSection();

      AWARD_CATEGORIES.forEach((category) => {
        expect(screen.getByTestId(`award-card-${category.slug}`)).toBeInTheDocument();
      });
    });

    it('renders correct number of award cards', () => {
      renderSection();

      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(AWARD_CATEGORIES.length);
    });
  });

  describe('award card props', () => {
    it('passes correct title to each card', () => {
      renderSection();

      AWARD_CATEGORIES.forEach((category) => {
        const card = screen.getByTestId(`award-card-${category.slug}`);
        expect(card).toHaveAttribute('data-title', category.name);
      });
    });

    it('passes correct prize count to each card', () => {
      renderSection();

      AWARD_CATEGORIES.forEach((category) => {
        const card = screen.getByTestId(`award-card-${category.slug}`);
        expect(card).toHaveAttribute('data-prize-count', category.prizeCount.toString());
      });
    });

    it('passes Vietnamese description by default', () => {
      renderSection();

      const firstCard = screen.getByTestId(`award-card-${AWARD_CATEGORIES[0].slug}`);
      const description = firstCard.querySelector('[data-testid="description"]');
      expect(description).toHaveTextContent(AWARD_CATEGORIES[0].fullDescription);
    });

    it('passes Vietnamese prize unit by default', () => {
      renderSection();

      const firstCard = screen.getByTestId(`award-card-${AWARD_CATEGORIES[0].slug}`);
      expect(firstCard).toHaveAttribute('data-prize-unit', AWARD_CATEGORIES[0].prizeUnit);
    });
  });

  describe('alternating layout', () => {
    it('first card is not reversed', () => {
      renderSection();

      const firstCard = screen.getByTestId(`award-card-${AWARD_CATEGORIES[0].slug}`);
      expect(firstCard).toHaveAttribute('data-is-reversed', 'false');
    });

    it('second card is reversed', () => {
      renderSection();

      if (AWARD_CATEGORIES.length >= 2) {
        const secondCard = screen.getByTestId(`award-card-${AWARD_CATEGORIES[1].slug}`);
        expect(secondCard).toHaveAttribute('data-is-reversed', 'true');
      }
    });

    it('third card is not reversed', () => {
      renderSection();

      if (AWARD_CATEGORIES.length >= 3) {
        const thirdCard = screen.getByTestId(`award-card-${AWARD_CATEGORIES[2].slug}`);
        expect(thirdCard).toHaveAttribute('data-is-reversed', 'false');
      }
    });

    it('alternates reversed state based on index', () => {
      renderSection();

      AWARD_CATEGORIES.forEach((category, index) => {
        const card = screen.getByTestId(`award-card-${category.slug}`);
        const expectedReversed = index % 2 !== 0;
        expect(card).toHaveAttribute('data-is-reversed', expectedReversed.toString());
      });
    });
  });

  describe('first and last card markers', () => {
    it('marks first card as isFirst', () => {
      renderSection();

      const firstCard = screen.getByTestId(`award-card-${AWARD_CATEGORIES[0].slug}`);
      expect(firstCard).toHaveAttribute('data-is-first', 'true');
    });

    it('non-first cards are not marked as isFirst', () => {
      renderSection();

      AWARD_CATEGORIES.slice(1).forEach((category) => {
        const card = screen.getByTestId(`award-card-${category.slug}`);
        expect(card).toHaveAttribute('data-is-first', 'false');
      });
    });

    it('marks last card as isLast', () => {
      renderSection();

      const lastCategory = AWARD_CATEGORIES[AWARD_CATEGORIES.length - 1];
      const lastCard = screen.getByTestId(`award-card-${lastCategory.slug}`);
      expect(lastCard).toHaveAttribute('data-is-last', 'true');
    });

    it('non-last cards are not marked as isLast', () => {
      renderSection();

      AWARD_CATEGORIES.slice(0, -1).forEach((category) => {
        const card = screen.getByTestId(`award-card-${category.slug}`);
        expect(card).toHaveAttribute('data-is-last', 'false');
      });
    });
  });

  describe('translation labels', () => {
    it('passes count label from translation', () => {
      renderSection();

      const firstCard = screen.getByTestId(`award-card-${AWARD_CATEGORIES[0].slug}`);
      // Vietnamese translation with colon
      expect(firstCard).toHaveAttribute('data-count-label', 'Số lượng giải thưởng:');
    });

    it('passes value label from translation', () => {
      renderSection();

      const firstCard = screen.getByTestId(`award-card-${AWARD_CATEGORIES[0].slug}`);
      // Vietnamese translation with colon
      expect(firstCard).toHaveAttribute('data-value-label', 'Giá trị giải thưởng:');
    });

    it('passes or divider text from translation', () => {
      renderSection();

      const firstCard = screen.getByTestId(`award-card-${AWARD_CATEGORIES[0].slug}`);
      // Vietnamese translation (capitalized)
      expect(firstCard).toHaveAttribute('data-or-divider', 'Hoặc');
    });
  });

  describe('prize values resolution', () => {
    it('resolves prize values with Vietnamese labels by default', () => {
      renderSection();

      const firstCategory = AWARD_CATEGORIES[0];
      const firstCard = screen.getByTestId(`award-card-${firstCategory.slug}`);
      const prizeValuesEl = firstCard.querySelector('[data-testid="prize-values"]');
      const prizeValues = JSON.parse(prizeValuesEl?.textContent ?? '[]');

      // Check that resolvedLabel matches Vietnamese label
      prizeValues.forEach((value: { resolvedLabel: string; label: string }, index: number) => {
        const originalValue = firstCategory.prizeValues[index];
        expect(value.resolvedLabel).toBe(originalValue.label);
      });
    });
  });

  describe('layout structure', () => {
    it('has flex layout', () => {
      const { container } = renderSection();

      const section = container.querySelector('section');
      expect(section?.className).toContain('flex');
    });

    it('has column layout on mobile', () => {
      const { container } = renderSection();

      const section = container.querySelector('section');
      expect(section?.className).toContain('flex-col');
    });

    it('has row layout on desktop', () => {
      const { container } = renderSection();

      const section = container.querySelector('section');
      expect(section?.className).toContain('lg:flex-row');
    });

    it('has gap between sidebar and content', () => {
      const { container } = renderSection();

      const section = container.querySelector('section');
      expect(section?.className).toContain('gap-6');
      expect(section?.className).toContain('lg:gap-20');
    });
  });

  describe('card container', () => {
    it('has flex column layout', () => {
      const { container } = renderSection();

      const cardContainer = container.querySelector('div.flex.flex-col.gap-10');
      expect(cardContainer).toBeInTheDocument();
    });

    it('has flex-1 to fill remaining space', () => {
      const { container } = renderSection();

      const cardContainer = container.querySelector('div.flex-1');
      expect(cardContainer).toBeInTheDocument();
    });
  });

  describe('data integrity', () => {
    it('uses category id as key (no duplicate keys)', () => {
      renderSection();

      // If there were duplicate keys, React would log a warning
      // and only render some cards. Verify all cards are rendered.
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(AWARD_CATEGORIES.length);
    });

    it('preserves all prize value properties', () => {
      renderSection();

      AWARD_CATEGORIES.forEach((category) => {
        const card = screen.getByTestId(`award-card-${category.slug}`);
        const prizeValuesEl = card.querySelector('[data-testid="prize-values"]');
        const prizeValues = JSON.parse(prizeValuesEl?.textContent ?? '[]');

        expect(prizeValues).toHaveLength(category.prizeValues.length);

        prizeValues.forEach((value: { amount: string; label: string; labelEn?: string }, index: number) => {
          const originalValue = category.prizeValues[index];
          expect(value.amount).toBe(originalValue.amount);
        });
      });
    });
  });
});
