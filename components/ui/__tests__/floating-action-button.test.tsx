import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FloatingActionButton } from '../floating-action-button';

// Mock next/navigation
const mockPush = vi.fn();
let mockPathname = '/';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
}));

function renderFAB(onWriteKudo = vi.fn()) {
  return { onWriteKudo, ...render(<FloatingActionButton onWriteKudo={onWriteKudo} />) };
}

describe('FloatingActionButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockPathname = '/';
  });

  // T027: Test collapsed state
  describe('collapsed state', () => {
    it('renders pill with "/" divider', () => {
      renderFAB();
      expect(screen.getByText('/')).toBeInTheDocument();
    });

    it('has correct accessibility attributes', () => {
      renderFAB();
      const fab = screen.getByRole('button', { name: 'Quick actions' });
      expect(fab).toBeInTheDocument();
      expect(fab).toHaveAttribute('aria-expanded', 'false');
      expect(fab).toHaveAttribute('tabindex', '0');
    });
  });

  // T028: Test expand/collapse toggle
  describe('expand/collapse toggle', () => {
    it('expands to show 3 action buttons on click', () => {
      renderFAB();
      fireEvent.click(screen.getByRole('button', { name: 'Quick actions' }));

      expect(screen.getByRole('menu')).toBeInTheDocument();
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3);
    });

    it('shows correct button labels when expanded', () => {
      renderFAB();
      fireEvent.click(screen.getByRole('button', { name: 'Quick actions' }));

      expect(screen.getByText('Thể lệ')).toBeInTheDocument();
      expect(screen.getByText('Viết KUDOS')).toBeInTheDocument();
    });

    it('collapses back to pill when close button is clicked', () => {
      renderFAB();
      fireEvent.click(screen.getByRole('button', { name: 'Quick actions' }));

      const closeButton = screen.getByRole('menuitem', { name: 'Close menu' });
      fireEvent.click(closeButton);

      act(() => { vi.advanceTimersByTime(300); });

      expect(screen.getByRole('button', { name: 'Quick actions' })).toBeInTheDocument();
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  // T029: Test "Viết KUDOS" action
  describe('"Viết KUDOS" action', () => {
    it('calls onWriteKudo callback and collapses', () => {
      const { onWriteKudo } = renderFAB();
      fireEvent.click(screen.getByRole('button', { name: 'Quick actions' }));
      fireEvent.click(screen.getByText('Viết KUDOS'));

      expect(onWriteKudo).toHaveBeenCalledOnce();
      expect(screen.getByRole('button', { name: 'Quick actions' })).toBeInTheDocument();
    });
  });

  // T030: Test "Thể lệ" action
  describe('"Thể lệ" action', () => {
    it('calls router.push and collapses', () => {
      renderFAB();
      fireEvent.click(screen.getByRole('button', { name: 'Quick actions' }));
      fireEvent.click(screen.getByText('Thể lệ'));

      expect(mockPush).toHaveBeenCalledWith('/the-le');
      expect(screen.getByRole('button', { name: 'Quick actions' })).toBeInTheDocument();
    });
  });

  // T031: Test Escape dismiss
  describe('Escape dismiss', () => {
    it('collapses expanded menu on Escape key', () => {
      renderFAB();
      fireEvent.click(screen.getByRole('button', { name: 'Quick actions' }));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      fireEvent.keyDown(document, { key: 'Escape' });

      act(() => { vi.advanceTimersByTime(300); });

      expect(screen.getByRole('button', { name: 'Quick actions' })).toBeInTheDocument();
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  // T032: Test outside click dismiss
  describe('outside click dismiss', () => {
    it('collapses expanded menu on outside click', () => {
      renderFAB();
      fireEvent.click(screen.getByRole('button', { name: 'Quick actions' }));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      fireEvent.mouseDown(document.body);

      act(() => { vi.advanceTimersByTime(300); });

      expect(screen.getByRole('button', { name: 'Quick actions' })).toBeInTheDocument();
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  // T033: Test accessibility attributes
  describe('accessibility', () => {
    it('expanded container has role="menu"', () => {
      renderFAB();
      fireEvent.click(screen.getByRole('button', { name: 'Quick actions' }));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('expanded buttons have role="menuitem"', () => {
      renderFAB();
      fireEvent.click(screen.getByRole('button', { name: 'Quick actions' }));
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3);
    });

    it('collapsed pill can be activated with Enter key', () => {
      renderFAB();
      const fab = screen.getByRole('button', { name: 'Quick actions' });
      fireEvent.keyDown(fab, { key: 'Enter' });
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('collapsed pill can be activated with Space key', () => {
      renderFAB();
      const fab = screen.getByRole('button', { name: 'Quick actions' });
      fireEvent.keyDown(fab, { key: ' ' });
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });
});
