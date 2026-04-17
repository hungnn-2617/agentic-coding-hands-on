'use client';

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#00101A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <span className="text-red-400 text-2xl">!</span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-white text-xl font-semibold">
            Something went wrong
          </h2>
          <p className="text-white/50 text-sm max-w-md">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
        </div>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-[#FFEA9E] text-[#00101A] text-sm font-medium rounded-lg hover:bg-[#FFEA9E]/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
