'use client';

export default function SunKudosError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-24 px-4 text-center">
      <h2 className="text-2xl font-bold text-[#FFEA9E]">Something went wrong</h2>
      <p className="text-base text-white/70">{error.message}</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-[#FFEA9E] text-[#00101A] font-bold rounded-lg hover:bg-[#F5E088] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
