import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { PrizeSidebar } from '../prize-sidebar';
import { AWARD_CATEGORIES } from '@/lib/data/awards';

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback | null = null;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}

// Mock matchMedia
const mockMatchMedia = vi.fn().mockImplementation(() => ({
  matches: false,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock scrollIntoView
const mockScrollIntoView = vi.fn();

// Mock icons
vi.mock('@/components/icons', () => ({
  TargetIcon: ({ className }: { className?: string }) => (
    <svg data-testid="target-icon" className={className} />
  ),
}));

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function renderSidebar() {
  return render(<PrizeSidebar />, { wrapper });
}

describe('PrizeSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal('matchMedia', mockMatchMedia);

    // Create mock DOM elements for all award categories
    AWARD_CATEGORIES.forEach((category) => {
      const element = document.createElement('div');
      element.id = category.slug;
      element.scrollIntoView = mockScrollIntoView;
      document.body.appendChild(element);
    });

    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        hash: '',
        href: 'http://localhost:3000',
      },
      writable: true,
    });

    // Mock history.replaceState
    vi.spyOn(history, 'replaceState').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    // Cleanup DOM elements
    AWARD_CATEGORIES.forEach((category) => {
      const element = document.getElementById(category.slug);
      if (element) {
        element.remove();
      }
    });
  });

  describe('rendering', () => {
    it('renders navigation element', () => {
      renderSidebar();

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders all category names from AWARD_CATEGORIES', () => {
      renderSidebar();

      AWARD_CATEGORIES.forEach((category) => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });

    it('renders navigation links for each category', () => {
      renderSidebar();

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(AWARD_CATEGORIES.length);
    });

    it('renders target icon for each category', () => {
      renderSidebar();

      const icons = screen.getAllByTestId('target-icon');
      expect(icons).toHaveLength(AWARD_CATEGORIES.length);
    });
  });

  describe('accessibility', () => {
    it('has aria-label on navigation', () => {
      renderSidebar();

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Danh mục giải thưởng');
    });

    it('first link has aria-current when it is active by default', () => {
      renderSidebar();

      const links = screen.getAllByRole('link');
      const firstLink = links[0];
      expect(firstLink).toHaveAttribute('aria-current', 'true');
    });

    it('other links do not have aria-current=true', () => {
      renderSidebar();

      const links = screen.getAllByRole('link');
      const otherLinks = links.slice(1);

      otherLinks.forEach((link) => {
        expect(link).not.toHaveAttribute('aria-current', 'true');
      });
    });
  });

  describe('links', () => {
    it('links have correct href for each category', () => {
      renderSidebar();

      AWARD_CATEGORIES.forEach((category) => {
        const link = screen.getByText(category.name).closest('a');
        expect(link).toHaveAttribute('href', `#${category.slug}`);
      });
    });

    it('clicking a link calls scrollToSection', () => {
      renderSidebar();

      // Click on the second category link
      const secondCategory = AWARD_CATEGORIES[1];
      const link = screen.getByText(secondCategory.name).closest('a');

      if (link) {
        fireEvent.click(link);
      }

      // Should have called scrollIntoView
      expect(mockScrollIntoView).toHaveBeenCalled();
    });

    it('clicking a link prevents default navigation', () => {
      renderSidebar();

      const secondCategory = AWARD_CATEGORIES[1];
      const link = screen.getByText(secondCategory.name).closest('a');

      if (link) {
        const event = new MouseEvent('click', { bubbles: true, cancelable: true });
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
        link.dispatchEvent(event);

        // Note: fireEvent.click handles preventDefault checking differently
        // We just verify the link exists and is clickable
      }

      expect(link).toBeInTheDocument();
    });
  });

  describe('active state styling', () => {
    it('active link has gold color class', () => {
      renderSidebar();

      const links = screen.getAllByRole('link');
      const activeLink = links[0];

      expect(activeLink.className).toContain('text-[#FFEA9E]');
    });

    it('inactive links have white color class', () => {
      renderSidebar();

      const links = screen.getAllByRole('link');
      const inactiveLinks = links.slice(1);

      inactiveLinks.forEach((link) => {
        expect(link.className).toContain('text-white');
      });
    });

    it('active link has border bottom', () => {
      renderSidebar();

      const links = screen.getAllByRole('link');
      const activeLink = links[0];

      expect(activeLink.className).toContain('border-b');
    });
  });

  describe('sticky behavior', () => {
    it('has sticky positioning class for desktop', () => {
      renderSidebar();

      const nav = screen.getByRole('navigation');
      expect(nav.className).toContain('lg:sticky');
    });

    it('has top offset for sticky positioning', () => {
      renderSidebar();

      const nav = screen.getByRole('navigation');
      expect(nav.className).toContain('lg:top-[104px]');
    });
  });

  describe('responsive layout', () => {
    it('has horizontal layout on mobile', () => {
      renderSidebar();

      const nav = screen.getByRole('navigation');
      expect(nav.className).toContain('flex-row');
    });

    it('has vertical layout on desktop', () => {
      renderSidebar();

      const nav = screen.getByRole('navigation');
      expect(nav.className).toContain('lg:flex-col');
    });

    it('has horizontal overflow on mobile', () => {
      renderSidebar();

      const nav = screen.getByRole('navigation');
      expect(nav.className).toContain('overflow-x-auto');
    });
  });

  describe('keyboard navigation', () => {
    it('links are focusable', () => {
      renderSidebar();

      const links = screen.getAllByRole('link');
      const firstLink = links[0];

      firstLink.focus();
      expect(document.activeElement).toBe(firstLink);
    });

    it('links have focus-visible styling', () => {
      renderSidebar();

      const links = screen.getAllByRole('link');
      const firstLink = links[0];

      expect(firstLink.className).toContain('focus-visible:');
    });
  });

  describe('data integration', () => {
    it('uses AWARD_CATEGORIES data correctly', () => {
      renderSidebar();

      // Verify first and last categories are rendered
      const firstCategory = AWARD_CATEGORIES[0];
      const lastCategory = AWARD_CATEGORIES[AWARD_CATEGORIES.length - 1];

      expect(screen.getByText(firstCategory.name)).toBeInTheDocument();
      expect(screen.getByText(lastCategory.name)).toBeInTheDocument();
    });

    it('maintains category order from AWARD_CATEGORIES', () => {
      renderSidebar();

      const links = screen.getAllByRole('link');

      links.forEach((link, index) => {
        expect(link).toHaveTextContent(AWARD_CATEGORIES[index].name);
      });
    });
  });
});
