import Link from 'next/link';

export default function MainNotFound() {
  return (
    <div className="min-h-screen bg-[#00101A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <h1 className="text-6xl font-bold text-[#FFEA9E]">404</h1>
        <div className="flex flex-col gap-2">
          <h2 className="text-white text-xl font-semibold">Page not found</h2>
          <p className="text-white/50 text-sm max-w-md">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className="px-6 py-2.5 bg-[#FFEA9E] text-[#00101A] text-sm font-medium rounded-lg hover:bg-[#FFEA9E]/90 transition-colors"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
