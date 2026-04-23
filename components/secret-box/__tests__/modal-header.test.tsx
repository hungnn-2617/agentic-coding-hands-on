import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { ModalHeader } from '../modal-header';

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function renderModalHeader(onClose = vi.fn()) {
  return render(<ModalHeader onClose={onClose} />, { wrapper });
}

describe('ModalHeader', () => {
  describe('title', () => {
    it('displays the title text in Vietnamese by default', () => {
      renderModalHeader();
      expect(
        screen.getByText('KHÁM PHÁ SECRET BOX CỦA BẠN')
      ).toBeInTheDocument();
    });

    it('has correct heading id for aria-labelledby', () => {
      renderModalHeader();
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveAttribute('id', 'secret-box-modal-title');
    });
  });

  describe('close button', () => {
    it('renders close button', () => {
      renderModalHeader();
      expect(screen.getByLabelText('Đóng')).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
      const onClose = vi.fn();
      renderModalHeader(onClose);

      fireEvent.click(screen.getByLabelText('Đóng'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('close button has type="button"', () => {
      renderModalHeader();
      const button = screen.getByLabelText('Đóng');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('styling', () => {
    it('title has gold color', () => {
      renderModalHeader();
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.className).toContain('text-[#FFEA9E]');
    });

    it('title is centered', () => {
      renderModalHeader();
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.className).toContain('text-center');
    });
  });
});
