import { useLanguage } from '@/hooks/use-language';
import { PenIcon } from '@/components/icons/pen-icon';
import { SearchIcon } from '@/components/icons/search-icon';

interface KVBannerProps {
  onRecognitionClick: () => void;
  onSearchClick: () => void;
}

export function KVBanner({ onRecognitionClick, onSearchClick }: KVBannerProps) {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[280px] md:min-h-[400px] lg:min-h-[512px] flex items-end overflow-hidden">
      {/* KV Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/section-keyvisual.png')" }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(25deg, #00101A 14.74%, rgba(0,19,32,0) 47.8%)',
        }}
      />

      {/* Content — left-aligned per design, px:144px, vertically near bottom */}
      <div className="relative z-10 flex flex-col items-start gap-[10px] px-4 md:px-12 lg:px-[144px] pb-10 md:pb-14 lg:pb-16 w-full">
        {/* Title + Logo */}
        <p className="text-xl md:text-2xl lg:text-4xl font-bold leading-snug text-[var(--color-text-gold)]">
          {t('liveBoard.kvTitle')}
        </p>
        <h1
          className="text-5xl md:text-7xl lg:text-[139.78px] font-normal leading-none tracking-[-0.13em] text-[#DBD1C1]"
          style={{ fontFamily: 'SVN-Gotham, sans-serif' }}
        >
          <span className="text-[var(--color-text-gold)]">✱</span> KUDOS
        </h1>

        {/* CTA Buttons Row */}
        <div className="flex items-center gap-6 mt-6 max-sm:flex-col max-sm:w-full w-full max-w-[1152px]">
          <button
            type="button"
            onClick={onRecognitionClick}
            className="flex flex-1 max-w-[738px] h-[72px] items-center gap-2 px-4 py-6 bg-[rgba(255,234,158,0.10)] border border-[var(--color-border)] rounded-[68px] text-base font-bold leading-6 tracking-[0.15px] text-white cursor-pointer hover:bg-[rgba(255,234,158,0.20)] transition-colors focus:outline-2 focus:outline-[var(--color-border-highlight)] focus:outline-offset-2 max-sm:w-full max-sm:max-w-full"
          >
            <PenIcon className="w-6 h-6 shrink-0" />
            <span className="truncate">{t('liveBoard.cta.recognition')}</span>
          </button>
          <button
            type="button"
            onClick={onSearchClick}
            className="flex w-[381px] h-[72px] items-center gap-2 px-4 py-6 bg-[rgba(255,234,158,0.10)] border border-[var(--color-border)] rounded-[68px] text-base font-bold leading-6 tracking-[0.15px] text-white cursor-pointer hover:bg-[rgba(255,234,158,0.20)] transition-colors focus:outline-2 focus:outline-[var(--color-border-highlight)] focus:outline-offset-2 max-sm:w-full"
          >
            <SearchIcon className="w-6 h-6 shrink-0" />
            <span className="truncate">{t('liveBoard.cta.search')}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
