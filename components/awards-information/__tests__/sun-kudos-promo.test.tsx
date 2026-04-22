import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { SunKudosPromo } from '../sun-kudos-promo';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; fill?: boolean; className?: string }) => (
    <img src={src} alt={alt} data-testid="next-image" {...props} />
  ),
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  ),
}));

// Mock the arrow icon
vi.mock('@/components/icons', () => ({
  ArrowRightIcon: ({ className }: { className?: string }) => (
    <svg data-testid="arrow-right-icon" className={className} />
  ),
}));

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function renderPromo() {
  return render(<SunKudosPromo />, { wrapper });
}

describe('SunKudosPromo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders as a section element', () => {
      const { container } = renderPromo();

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders the subtitle/label', () => {
      renderPromo();

      // Vietnamese text for kudos label
      expect(screen.getByText(/Sun\* Kudos/i)).toBeInTheDocument();
    });

    it('renders the title', () => {
      renderPromo();

      // Title text
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toBeInTheDocument();
    });

    it('renders the badge text', () => {
      renderPromo();

      // Badge should have uppercase styling
      const badge = document.querySelector('.uppercase');
      expect(badge).toBeInTheDocument();
    });

    it('renders the description', () => {
      renderPromo();

      // Description text - should be a paragraph
      const paragraphs = document.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThan(0);
    });

    it('renders the CTA button/link', () => {
      renderPromo();

      const link = screen.getByTestId('next-link');
      expect(link).toBeInTheDocument();
    });
  });

  describe('CTA link', () => {
    it('links to /sun-kudos page', () => {
      renderPromo();

      const link = screen.getByTestId('next-link');
      expect(link).toHaveAttribute('href', '/sun-kudos');
    });

    it('contains arrow right icon', () => {
      renderPromo();

      expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument();
    });

    it('has correct button styling', () => {
      renderPromo();

      const link = screen.getByTestId('next-link');
      expect(link.className).toContain('bg-[#FFEA9E]');
    });
  });

  describe('background image', () => {
    it('renders background image', () => {
      renderPromo();

      const images = screen.getAllByTestId('next-image');
      const bgImage = images.find((img) => img.getAttribute('src')?.includes('kudos-section-bg'));
      expect(bgImage).toBeInTheDocument();
    });

    it('background image has aria-hidden for accessibility', () => {
      renderPromo();

      const images = screen.getAllByTestId('next-image');
      const bgImage = images.find((img) => img.getAttribute('src')?.includes('kudos-section-bg'));
      expect(bgImage).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('KUDOS text overlay', () => {
    it('renders KUDOS decorative text', () => {
      renderPromo();

      expect(screen.getByText('KUDOS')).toBeInTheDocument();
    });

    it('KUDOS text has aria-hidden for accessibility', () => {
      renderPromo();

      const kudosText = screen.getByText('KUDOS');
      expect(kudosText).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('styling', () => {
    it('has dark background color', () => {
      const { container } = renderPromo();

      const section = container.querySelector('section');
      expect(section?.className).toContain('bg-[#0F0F0F]');
    });

    it('has rounded corners', () => {
      const { container } = renderPromo();

      const section = container.querySelector('section');
      expect(section?.className).toContain('rounded-2xl');
    });

    it('has overflow hidden for rounded corners', () => {
      const { container } = renderPromo();

      const section = container.querySelector('section');
      expect(section?.className).toContain('overflow-hidden');
    });
  });

  describe('responsive layout', () => {
    it('has flex layout', () => {
      const { container } = renderPromo();

      const flexContainer = container.querySelector('div[class*="flex"]');
      expect(flexContainer).toBeInTheDocument();
    });

    it('has column layout on mobile', () => {
      const { container } = renderPromo();

      const flexContainer = container.querySelector('div[class*="flex-col"]');
      expect(flexContainer).toBeInTheDocument();
    });

    it('has row layout on desktop', () => {
      const { container } = renderPromo();

      const flexContainer = container.querySelector('div[class*="lg:flex-row"]');
      expect(flexContainer).toBeInTheDocument();
    });

    it('image section is hidden on mobile', () => {
      const { container } = renderPromo();

      const imageSection = container.querySelector('div[class*="hidden lg:block"]');
      expect(imageSection).toBeInTheDocument();
    });
  });

  describe('text styling', () => {
    it('title has gold color', () => {
      renderPromo();

      const title = screen.getByRole('heading', { level: 2 });
      expect(title.className).toContain('text-[#FFEA9E]');
    });

    it('subtitle has white color', () => {
      const { container } = renderPromo();

      // First p element should be the subtitle
      const subtitle = container.querySelector('p.text-white');
      expect(subtitle).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('decorative images have empty alt text', () => {
      renderPromo();

      const images = screen.getAllByTestId('next-image');
      const bgImage = images.find((img) => img.getAttribute('src')?.includes('kudos-section-bg'));
      expect(bgImage).toHaveAttribute('alt', '');
    });

    it('CTA has readable text content', () => {
      renderPromo();

      const link = screen.getByTestId('next-link');
      expect(link.textContent).toBeTruthy();
    });
  });

  describe('content translation', () => {
    it('uses translation keys from useLanguage hook', () => {
      renderPromo();

      // Verify content is rendered (translation is working)
      // The actual text depends on the language context
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });
  });

  describe('link hover states', () => {
    it('link has hover transition classes', () => {
      renderPromo();

      const link = screen.getByTestId('next-link');
      expect(link.className).toContain('transition');
    });

    it('link has focus-visible styling', () => {
      renderPromo();

      const link = screen.getByTestId('next-link');
      expect(link.className).toContain('focus-visible:');
    });
  });
});
