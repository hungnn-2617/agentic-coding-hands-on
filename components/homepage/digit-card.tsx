interface DigitCardProps {
  digit: string;
}

export function DigitCard({ digit }: DigitCardProps) {
  return (
    <div
      className="
        w-[51px] h-[82px] flex items-center justify-center
        rounded-lg border-[0.5px] border-[#FFEA9E]
        opacity-50
      "
      style={{
        background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.10) 100%)',
        backdropFilter: 'blur(16.64px)',
        WebkitBackdropFilter: 'blur(16.64px)',
      }}
    >
      <span
        className="text-white text-center"
        style={{
          fontFamily: "var(--font-digital-numbers, 'Courier New', monospace)",
          fontSize: '49.15px',
          fontWeight: 400,
        }}
        suppressHydrationWarning
      >
        {digit}
      </span>
    </div>
  );
}
