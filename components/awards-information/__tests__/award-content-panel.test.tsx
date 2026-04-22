import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AwardContentPanel } from '../award-content-panel';
import type { PrizeValue } from '@/types/awards';

// Mock the icons
vi.mock('@/components/icons', () => ({
  TargetIcon: ({ className }: { className?: string }) => <svg data-testid="target-icon" className={className} />,
  DiamondIcon: ({ className }: { className?: string }) => <svg data-testid="diamond-icon" className={className} />,
  AwardBadgeIcon: ({ className }: { className?: string }) => <svg data-testid="award-badge-icon" className={className} />,
}));

const defaultProps = {
  title: 'Top Talent',
  description: 'Vinh danh top cá nhân xuất sắc trên mọi phương diện',
  countLabel: 'Số lượng giải',
  count: 10,
  unit: 'Đơn vị',
  valueLabel: 'Giá trị giải thưởng',
  values: [
    { amount: '7.000.000 VNĐ', label: 'cho mỗi giải thưởng', labelEn: 'per prize', resolvedLabel: 'cho mỗi giải thưởng' },
  ] as Array<PrizeValue & { resolvedLabel: string }>,
  orDividerText: 'hoặc',
};

function renderPanel(props = defaultProps) {
  return render(<AwardContentPanel {...props} />);
}

describe('AwardContentPanel', () => {
  describe('rendering', () => {
    it('renders the title', () => {
      renderPanel();

      expect(screen.getByText('Top Talent')).toBeInTheDocument();
    });

    it('renders the description', () => {
      renderPanel();

      expect(screen.getByText('Vinh danh top cá nhân xuất sắc trên mọi phương diện')).toBeInTheDocument();
    });

    it('renders the count label', () => {
      renderPanel();

      expect(screen.getByText('Số lượng giải')).toBeInTheDocument();
    });

    it('renders the count with zero padding', () => {
      renderPanel();

      // Count 10 should be displayed as "10"
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('renders single digit count with zero padding', () => {
      renderPanel({ ...defaultProps, count: 5 });

      // Count 5 should be displayed as "05"
      expect(screen.getByText('05')).toBeInTheDocument();
    });

    it('renders the unit', () => {
      renderPanel();

      expect(screen.getByText('Đơn vị')).toBeInTheDocument();
    });

    it('renders the value label', () => {
      renderPanel();

      expect(screen.getByText('Giá trị giải thưởng')).toBeInTheDocument();
    });

    it('renders prize value amount', () => {
      renderPanel();

      expect(screen.getByText('7.000.000 VNĐ')).toBeInTheDocument();
    });

    it('renders prize value resolved label', () => {
      renderPanel();

      expect(screen.getByText('cho mỗi giải thưởng')).toBeInTheDocument();
    });
  });

  describe('icons', () => {
    it('renders target icon for title', () => {
      renderPanel();

      expect(screen.getByTestId('target-icon')).toBeInTheDocument();
    });

    it('renders diamond icon for count', () => {
      renderPanel();

      expect(screen.getByTestId('diamond-icon')).toBeInTheDocument();
    });

    it('renders award badge icon for values', () => {
      renderPanel();

      expect(screen.getByTestId('award-badge-icon')).toBeInTheDocument();
    });
  });

  describe('multiple values', () => {
    it('renders multiple prize values with or divider', () => {
      const multipleValues = [
        { amount: '5.000.000 VNĐ', label: 'cho giải cá nhân', labelEn: 'for individual', resolvedLabel: 'cho giải cá nhân' },
        { amount: '8.000.000 VNĐ', label: 'cho giải tập thể', labelEn: 'for team', resolvedLabel: 'cho giải tập thể' },
      ] as Array<PrizeValue & { resolvedLabel: string }>;

      renderPanel({ ...defaultProps, values: multipleValues });

      expect(screen.getByText('5.000.000 VNĐ')).toBeInTheDocument();
      expect(screen.getByText('8.000.000 VNĐ')).toBeInTheDocument();
      expect(screen.getByText('cho giải cá nhân')).toBeInTheDocument();
      expect(screen.getByText('cho giải tập thể')).toBeInTheDocument();
    });

    it('renders or divider between multiple values', () => {
      const multipleValues = [
        { amount: '5.000.000 VNĐ', label: 'cho giải cá nhân', labelEn: 'for individual', resolvedLabel: 'cho giải cá nhân' },
        { amount: '8.000.000 VNĐ', label: 'cho giải tập thể', labelEn: 'for team', resolvedLabel: 'cho giải tập thể' },
      ] as Array<PrizeValue & { resolvedLabel: string }>;

      renderPanel({ ...defaultProps, values: multipleValues });

      expect(screen.getByText('hoặc')).toBeInTheDocument();
    });

    it('does not render or divider for single value', () => {
      renderPanel();

      expect(screen.queryByText('hoặc')).not.toBeInTheDocument();
    });

    it('renders multiple value labels', () => {
      const multipleValues = [
        { amount: '5.000.000 VNĐ', label: 'cho giải cá nhân', labelEn: 'for individual', resolvedLabel: 'cho giải cá nhân' },
        { amount: '8.000.000 VNĐ', label: 'cho giải tập thể', labelEn: 'for team', resolvedLabel: 'cho giải tập thể' },
      ] as Array<PrizeValue & { resolvedLabel: string }>;

      renderPanel({ ...defaultProps, values: multipleValues });

      // Value label should appear for each value
      const valueLabels = screen.getAllByText('Giá trị giải thưởng');
      expect(valueLabels).toHaveLength(2);
    });
  });

  describe('empty values', () => {
    it('does not render values section when values array is empty', () => {
      renderPanel({ ...defaultProps, values: [] });

      expect(screen.queryByText('Giá trị giải thưởng')).not.toBeInTheDocument();
      expect(screen.queryByTestId('award-badge-icon')).not.toBeInTheDocument();
    });
  });

  describe('empty label handling', () => {
    it('handles value with empty resolvedLabel', () => {
      const valueWithEmptyLabel = [
        { amount: '10.000.000 VNĐ', label: '', labelEn: '', resolvedLabel: '' },
      ] as Array<PrizeValue & { resolvedLabel: string }>;

      renderPanel({ ...defaultProps, values: valueWithEmptyLabel });

      expect(screen.getByText('10.000.000 VNĐ')).toBeInTheDocument();
      // No label text should be rendered
    });
  });

  describe('styling', () => {
    it('applies backdrop blur styling', () => {
      const { container } = renderPanel();

      const panel = container.querySelector('div');
      expect(panel).toHaveStyle({ backdropFilter: 'blur(32px)' });
    });

    it('has rounded corners', () => {
      const { container } = renderPanel();

      const panel = container.querySelector('div');
      expect(panel?.className).toContain('rounded-2xl');
    });
  });

  describe('count zero padding', () => {
    it('pads single digit to two digits', () => {
      renderPanel({ ...defaultProps, count: 1 });
      expect(screen.getByText('01')).toBeInTheDocument();
    });

    it('pads zero to two digits', () => {
      renderPanel({ ...defaultProps, count: 0 });
      expect(screen.getByText('00')).toBeInTheDocument();
    });

    it('does not pad two digit numbers', () => {
      renderPanel({ ...defaultProps, count: 25 });
      expect(screen.getByText('25')).toBeInTheDocument();
    });

    it('does not pad three digit numbers', () => {
      renderPanel({ ...defaultProps, count: 100 });
      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  describe('text content', () => {
    it('renders title with gold color', () => {
      renderPanel();

      const title = screen.getByText('Top Talent');
      expect(title.className).toContain('text-[#FFEA9E]');
    });

    it('renders description with white color', () => {
      renderPanel();

      const description = screen.getByText('Vinh danh top cá nhân xuất sắc trên mọi phương diện');
      expect(description.className).toContain('text-white');
    });
  });
});
