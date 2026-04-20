'use client';

import { useLanguage } from '@/hooks/use-language';

interface ComingSoonFallbackProps {
  reset?: () => void;
}

export function ComingSoonFallback({ reset }: ComingSoonFallbackProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-[#00101A] min-h-screen flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center gap-6 text-center px-6">
        <h1 className="text-white font-bold text-2xl lg:text-4xl font-montserrat">
          {t('prelaunch.comingSoon')}
        </h1>
        {reset && (
          <button
            type="button"
            onClick={reset}
            className="
              px-6 py-3 rounded-lg
              bg-[#FFEA9E] text-[#00101A]
              font-bold font-montserrat
              hover:opacity-90 transition-opacity
            "
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
