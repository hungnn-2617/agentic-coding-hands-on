'use client';

import { useState } from 'react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { GoogleIcon } from '@/components/icons';

/**
 * Login button component that initiates Google OAuth via Supabase.
 * Shows loading state and prevents double-click.
 */
export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setError('Supabase chưa được cấu hình. Vui lòng kiểm tra file .env.local');
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error('Could not create Supabase client');
      }
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 w-fit">
      <button
        onClick={handleLogin}
        disabled={isLoading}
        aria-label="Sign in with Google"
        className={`
          flex items-center justify-center gap-2
          w-auto min-w-[280px] sm:min-w-[305px]
          h-[60px] px-6 py-4
          bg-[#FFEA9E] rounded-lg
          font-bold text-lg sm:text-[22px] leading-7 text-[#00101A]
          cursor-pointer
          transition-all duration-150 ease-in-out
          hover:brightness-105 hover:shadow-lg
          focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFEA9E]
          disabled:opacity-70 disabled:cursor-wait
        `}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-6 w-6 text-[#00101A]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Đang đăng nhập...</span>
          </>
        ) : (
          <>
            <span>LOGIN With Google</span>
            <GoogleIcon className="w-6 h-6" />
          </>
        )}
      </button>
      {error && (
        <p className="text-red-400 text-sm text-center sm:text-left" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
