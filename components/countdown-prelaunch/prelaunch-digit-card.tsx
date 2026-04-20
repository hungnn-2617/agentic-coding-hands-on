interface PrelaunchDigitCardProps {
  digit: string;
}

export function PrelaunchDigitCard({ digit }: PrelaunchDigitCardProps) {
  return (
    <div
      className="
        prelaunch-digit-card
        relative
        w-12 h-[77px]
        sm:w-[54px] sm:h-[86px]
        md:w-15 md:h-24
        lg:w-[77px] lg:h-[123px]
        rounded-xl
        border-[0.5px] sm:border-[0.6px] md:border-[0.65px] lg:border-[0.75px]
        border-[#FFEA9E]
        overflow-hidden
      "
      style={{
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
      }}
    >
      {/* Background layer with opacity — separate from text to keep text fully opaque */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.10) 100%)',
        }}
      />
      {/* Digit text — fully opaque, centered, animated on change */}
      <span
        key={digit}
        className="
          absolute inset-0 flex items-center justify-center
          text-white
          text-[40px] sm:text-[48px] md:text-[56px] lg:text-[73.73px]
          font-normal
          animate-[digitFade_300ms_ease-in-out]
        "
        style={{
          fontFamily: "var(--font-digital-numbers)",
        }}
        suppressHydrationWarning
      >
        {digit}
      </span>
    </div>
  );
}
