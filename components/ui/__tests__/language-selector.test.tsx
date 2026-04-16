import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageSelector } from '../language-selector';

describe('LanguageSelector', () => {
  beforeEach(() => {
    // Clear cookies before each test
    document.cookie = 'locale=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders current language "VN" with flag icon and chevron', () => {
    render(<LanguageSelector />);

    expect(screen.getByText('VN')).toBeInTheDocument();
    expect(screen.getByLabelText('Select language')).toBeInTheDocument();
  });

  it('toggles dropdown open when clicked', async () => {
    render(<LanguageSelector />);

    const button = screen.getByLabelText('Select language');

    // Dropdown should be closed initially
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getAllByRole('option')).toHaveLength(2);
    });
  });

  it('toggles dropdown closed when clicked again', async () => {
    render(<LanguageSelector />);

    const button = screen.getByLabelText('Select language');

    // Open
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Close
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <LanguageSelector />
        <button data-testid="outside">Outside</button>
      </div>
    );

    const selectorButton = screen.getByLabelText('Select language');

    // Open dropdown
    fireEvent.click(selectorButton);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('updates display and closes dropdown when selecting an option', async () => {
    render(<LanguageSelector />);

    const button = screen.getByLabelText('Select language');

    // Initially shows VN
    expect(screen.getByText('VN')).toBeInTheDocument();

    // Open dropdown
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Select EN option
    const enOption = screen.getAllByRole('option').find(
      (option) => option.textContent?.includes('EN')
    );
    expect(enOption).toBeDefined();
    fireEvent.click(enOption!);

    await waitFor(() => {
      // Dropdown should be closed
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      // Display should show EN (the button text)
      const updatedButton = screen.getByLabelText('Select language');
      expect(updatedButton.textContent).toContain('EN');
    });
  });

  it('sets locale cookie when selecting an option', async () => {
    render(<LanguageSelector />);

    const button = screen.getByLabelText('Select language');

    // Open dropdown and select EN
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    const enOption = screen.getAllByRole('option').find(
      (option) => option.textContent?.includes('EN')
    );
    fireEvent.click(enOption!);

    await waitFor(() => {
      expect(document.cookie).toContain('locale=en');
    });
  });

  it('closes dropdown on Escape key press', async () => {
    render(<LanguageSelector />);

    const button = screen.getByLabelText('Select language');

    // Open dropdown
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Press Escape
    fireEvent.keyDown(button, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('has correct aria attributes', () => {
    render(<LanguageSelector />);

    const button = screen.getByLabelText('Select language');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');

    // Open dropdown
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
