import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { LoginButton } from '../login-button';

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

// Mock the Supabase client
const mockSignInWithOAuth = vi.fn();
const mockIsSupabaseConfigured = vi.fn();

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithOAuth: mockSignInWithOAuth,
    },
  }),
  isSupabaseConfigured: () => mockIsSupabaseConfigured(),
}));

describe('LoginButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignInWithOAuth.mockResolvedValue({ data: {}, error: null });
    mockIsSupabaseConfigured.mockReturnValue(true);
  });

  it('renders with correct text and Google icon', () => {
    render(<LoginButton />, { wrapper });

    // Vietnamese: "Đăng nhập với Google"
    expect(screen.getByText('Đăng nhập với Google')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByLabelText('Sign in with Google')).toBeInTheDocument();
  });

  it('calls signInWithOAuth with google provider when clicked', async () => {
    render(<LoginButton />, { wrapper });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSignInWithOAuth).toHaveBeenCalledTimes(1);
      expect(mockSignInWithOAuth).toHaveBeenCalledWith({
        provider: 'google',
        options: {
          redirectTo: expect.stringContaining('/auth/callback'),
        },
      });
    });
  });

  it('disables button and shows loading state after click', async () => {
    // Make the signInWithOAuth never resolve to keep loading state
    mockSignInWithOAuth.mockImplementation(() => new Promise(() => {}));

    render(<LoginButton />, { wrapper });

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(screen.getByText('Đang đăng nhập...')).toBeInTheDocument();
    });
  });

  it('prevents double-click by disabling immediately', async () => {
    mockSignInWithOAuth.mockImplementation(() => new Promise(() => {}));

    render(<LoginButton />, { wrapper });

    const button = screen.getByRole('button');

    // Click twice rapidly
    fireEvent.click(button);
    fireEvent.click(button);

    await waitFor(() => {
      // Should only be called once due to loading state preventing second click
      expect(mockSignInWithOAuth).toHaveBeenCalledTimes(1);
    });
  });

  it('shows error message when Supabase is not configured', async () => {
    mockIsSupabaseConfigured.mockReturnValue(false);

    render(<LoginButton />, { wrapper });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Supabase chưa được cấu hình/)).toBeInTheDocument();
    });
  });

  it('re-enables button and shows error if OAuth fails', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockSignInWithOAuth.mockRejectedValue(new Error('OAuth failed'));

    render(<LoginButton />, { wrapper });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      // Vietnamese: "Đăng nhập với Google"
      expect(screen.getByText('Đăng nhập với Google')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    consoleError.mockRestore();
  });
});
