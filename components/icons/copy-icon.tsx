interface CopyIconProps {
  className?: string;
}

export function CopyIcon({ className }: CopyIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="5.333"
        y="5.333"
        width="8.667"
        height="8.667"
        rx="1.333"
        stroke="currentColor"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.333 10.667H2.667A1.333 1.333 0 0 1 1.333 9.333V2.667A1.333 1.333 0 0 1 2.667 1.333H9.333A1.333 1.333 0 0 1 10.667 2.667V3.333"
        stroke="currentColor"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
