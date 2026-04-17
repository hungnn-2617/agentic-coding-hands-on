import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { LanguageSelector } from '../language-selector';

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function renderSelector() {
  return render(<LanguageSelector />, { wrapper });
}

describe('LanguageSelector', () => {
  beforeEach(() => {
    document.cookie = 'locale=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders current language "VN" with flag icon and chevron', () => {
    renderSelector();
    expect(screen.getByText('VN')).toBeInTheDocument();
    expect(screen.getByLabelText('Chọn ngôn ngữ')).toBeInTheDocument();
  });

  it('toggles dropdown open when clicked', async () => {
    renderSelector();
    const button = screen.getByLabelText('Chọn ngôn ngữ');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getAllByRole('option')).toHaveLength(2);
    });
  });

  it('toggles dropdown closed when clicked again', async () => {
    renderSelector();
    const button = screen.getByLabelText('Chọn ngôn ngữ');
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
        <button data-testid="outside">Outside</button>
      </LanguageProvider>,
    );
    const selectorButton = screen.getByLabelText('Chọn ngôn ngữ');
    fireEvent.click(selectorButton);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    fireEvent.mouseDown(screen.getByTestId('outside'));
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('updates display and closes dropdown when selecting EN', async () => {
    renderSelector();
    const button = screen.getByLabelText('Chọn ngôn ngữ');
    expect(screen.getByText('VN')).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    const enOption = screen.getAllByRole('option').find(
      (option) => option.textContent?.includes('EN'),
    );
    fireEvent.click(enOption!);
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.getByText('EN')).toBeInTheDocument();
    });
  });

  it('sets locale cookie via context when selecting EN', async () => {
    renderSelector();
    const button = screen.getByLabelText('Chọn ngôn ngữ');
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    const enOption = screen.getAllByRole('option').find(
      (option) => option.textContent?.includes('EN'),
    );
    fireEvent.click(enOption!);
    await waitFor(() => {
      expect(document.cookie).toContain('locale=en');
    });
  });

  it('closes dropdown on Escape key press', async () => {
    renderSelector();
    const button = screen.getByLabelText('Chọn ngôn ngữ');
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    fireEvent.keyDown(button, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('has correct aria attributes', () => {
    renderSelector();
    const button = screen.getByLabelText('Chọn ngôn ngữ');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('selected item has golden highlight background', async () => {
    renderSelector();
    const button = screen.getByLabelText('Chọn ngôn ngữ');
    fireEvent.click(button);
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      const selectedOption = options.find(
        (opt) => opt.getAttribute('aria-selected') === 'true',
      );
      expect(selectedOption).toBeDefined();
      expect(selectedOption?.className).toContain('bg-[rgba(255,234,158,0.2)]');
    });
  });

  it('supports Arrow key navigation between options', async () => {
    renderSelector();
    const button = screen.getByLabelText('Chọn ngôn ngữ');
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    const listbox = screen.getByRole('listbox');
    const options = screen.getAllByRole('option');

    // ArrowDown should focus the next option
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(options[1]);

    // ArrowUp should go back
    fireEvent.keyDown(listbox, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(options[0]);
  });

  it('selects focused option on Enter key', async () => {
    renderSelector();
    const button = screen.getByLabelText('Chọn ngôn ngữ');
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    const listbox = screen.getByRole('listbox');

    // Move to EN option (index 1)
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    // Press Enter to select
    fireEvent.keyDown(listbox, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.getByText('EN')).toBeInTheDocument();
    });
  });
});
