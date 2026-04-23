import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { InstructionText } from '../instruction-text';

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function renderInstructionText(isVisible: boolean) {
  return render(<InstructionText isVisible={isVisible} />, { wrapper });
}

describe('InstructionText', () => {
  describe('visibility', () => {
    it('renders instruction text when isVisible is true', () => {
      renderInstructionText(true);
      expect(screen.getByText('Click vào box để mở')).toBeInTheDocument();
    });

    it('does not render anything when isVisible is false', () => {
      const { container } = renderInstructionText(false);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('styling', () => {
    it('has white text color', () => {
      const { container } = renderInstructionText(true);
      const span = container.querySelector('span');
      expect(span?.className).toContain('text-white');
    });

    it('is centered', () => {
      const { container } = renderInstructionText(true);
      const span = container.querySelector('span');
      expect(span?.className).toContain('text-center');
    });

    it('has bold font weight', () => {
      const { container } = renderInstructionText(true);
      const span = container.querySelector('span');
      expect(span?.className).toContain('font-bold');
    });
  });
});
