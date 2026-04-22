import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  GoogleIcon,
  ChevronDownIcon,
  FlagVnIcon,
  FlagEnIcon,
  BellIcon,
  ArrowRightIcon,
  UserIcon,
  HamburgerIcon,
  PenIcon,
  SaaSmallIcon,
  ChevronRightIcon,
  AwardBadgeIcon,
  DiamondIcon,
  TargetIcon,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  NumberedListIcon,
  LinkIcon,
  QuoteIcon,
  PlusIcon,
  SendIcon,
  CloseIcon,
  HeartIcon,
  SearchIcon,
  ChevronLeftIcon,
  StarIcon,
  GiftIcon,
  ExternalIcon,
  CopyIcon,
  SaaActionIcon,
} from '../index';

describe('Icon Components', () => {
  describe('GoogleIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<GoogleIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<GoogleIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('ChevronDownIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<ChevronDownIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<ChevronDownIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('FlagVnIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<FlagVnIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<FlagVnIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('FlagEnIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<FlagEnIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<FlagEnIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('BellIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<BellIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<BellIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });

    it('has aria-hidden attribute', () => {
      const { container } = render(<BellIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('ArrowRightIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<ArrowRightIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<ArrowRightIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });

    it('has aria-hidden attribute', () => {
      const { container } = render(<ArrowRightIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('UserIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<UserIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<UserIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('HamburgerIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<HamburgerIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<HamburgerIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('PenIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<PenIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<PenIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('SaaSmallIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<SaaSmallIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<SaaSmallIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('ChevronRightIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<ChevronRightIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<ChevronRightIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('AwardBadgeIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<AwardBadgeIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<AwardBadgeIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('DiamondIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<DiamondIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<DiamondIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('TargetIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<TargetIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<TargetIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('BoldIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<BoldIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<BoldIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('ItalicIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<ItalicIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<ItalicIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('StrikethroughIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<StrikethroughIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<StrikethroughIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('NumberedListIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<NumberedListIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<NumberedListIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('LinkIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<LinkIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<LinkIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('QuoteIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<QuoteIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<QuoteIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('PlusIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<PlusIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<PlusIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('SendIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<SendIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<SendIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('CloseIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<CloseIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<CloseIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('HeartIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<HeartIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<HeartIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('SearchIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<SearchIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<SearchIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('ChevronLeftIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<ChevronLeftIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<ChevronLeftIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('StarIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<StarIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<StarIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('GiftIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<GiftIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<GiftIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('ExternalIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<ExternalIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<ExternalIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('CopyIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<CopyIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<CopyIcon className="custom-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('SaaActionIcon', () => {
    it('renders svg element', () => {
      const { container } = render(<SaaActionIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('has correct viewBox', () => {
      const { container } = render(<SaaActionIcon />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });
  });

  describe('All icons have consistent structure', () => {
    const icons = [
      { name: 'GoogleIcon', Component: GoogleIcon },
      { name: 'ChevronDownIcon', Component: ChevronDownIcon },
      { name: 'FlagVnIcon', Component: FlagVnIcon },
      { name: 'FlagEnIcon', Component: FlagEnIcon },
      { name: 'BellIcon', Component: BellIcon },
      { name: 'ArrowRightIcon', Component: ArrowRightIcon },
      { name: 'UserIcon', Component: UserIcon },
      { name: 'HamburgerIcon', Component: HamburgerIcon },
      { name: 'PenIcon', Component: PenIcon },
      { name: 'SaaSmallIcon', Component: SaaSmallIcon },
      { name: 'ChevronRightIcon', Component: ChevronRightIcon },
      { name: 'AwardBadgeIcon', Component: AwardBadgeIcon },
      { name: 'DiamondIcon', Component: DiamondIcon },
      { name: 'TargetIcon', Component: TargetIcon },
      { name: 'BoldIcon', Component: BoldIcon },
      { name: 'ItalicIcon', Component: ItalicIcon },
      { name: 'StrikethroughIcon', Component: StrikethroughIcon },
      { name: 'NumberedListIcon', Component: NumberedListIcon },
      { name: 'LinkIcon', Component: LinkIcon },
      { name: 'QuoteIcon', Component: QuoteIcon },
      { name: 'PlusIcon', Component: PlusIcon },
      { name: 'SendIcon', Component: SendIcon },
      { name: 'CloseIcon', Component: CloseIcon },
      { name: 'HeartIcon', Component: HeartIcon },
      { name: 'SearchIcon', Component: SearchIcon },
      { name: 'ChevronLeftIcon', Component: ChevronLeftIcon },
      { name: 'StarIcon', Component: StarIcon },
      { name: 'GiftIcon', Component: GiftIcon },
      { name: 'ExternalIcon', Component: ExternalIcon },
      { name: 'CopyIcon', Component: CopyIcon },
      { name: 'SaaActionIcon', Component: SaaActionIcon },
    ];

    icons.forEach(({ name, Component }) => {
      it(`${name} renders without crashing`, () => {
        expect(() => render(<Component />)).not.toThrow();
      });

      it(`${name} has svg as root element`, () => {
        const { container } = render(<Component />);
        expect(container.firstChild?.nodeName).toBe('svg');
      });
    });
  });
});
