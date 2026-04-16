'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for auth route group.
 * Shows error message with retry button on dark background.
 */
export default function AuthError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Auth error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#00101A]">
      <div className="flex flex-col items-center gap-6 max-w-md text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Đã xảy ra lỗi</h2>
          <p className="text-white/70 text-sm">
            Có lỗi xảy ra trong quá trình xác thực. Vui lòng thử lại.
          </p>
        </div>

        <button
          onClick={reset}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FFEA9E] rounded-lg font-bold text-[#00101A] transition-all duration-150 hover:brightness-105 hover:shadow-lg focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFEA9E]"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
