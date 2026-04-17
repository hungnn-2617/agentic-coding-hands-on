interface SaaSmallIconProps {
  className?: string;
}

export function SaaSmallIcon({ className }: SaaSmallIconProps) {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 0l2.35 6.76H19l-5.38 3.9 2.06 6.34L10 13.1 4.32 17l2.06-6.34L1 6.76h6.65L10 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
