interface FlagEnIconProps {
  className?: string;
}

export function FlagEnIcon({ className }: FlagEnIconProps) {
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
      <g clipPath="url(#clip0_flag_en)">
        <rect width="20" height="15" transform="translate(2 5)" fill="#012169" />
        <path d="M2 5L22 20M22 5L2 20" stroke="white" strokeWidth="2" />
        <path d="M2 5L22 20M22 5L2 20" stroke="#C8102E" strokeWidth="1" />
        <path d="M12 5V20M2 12.5H22" stroke="white" strokeWidth="4" />
        <path d="M12 5V20M2 12.5H22" stroke="#C8102E" strokeWidth="2" />
      </g>
      <defs>
        <clipPath id="clip0_flag_en">
          <rect width="20" height="15" fill="white" transform="translate(2 5)" />
        </clipPath>
      </defs>
    </svg>
  );
}
