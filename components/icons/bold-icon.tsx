interface BoldIconProps {
  className?: string;
}

export function BoldIcon({ className }: BoldIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
