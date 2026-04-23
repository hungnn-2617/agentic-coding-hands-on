interface DividerProps {
  className?: string;
}

/**
 * Divider Component
 *
 * A simple horizontal line divider used for visual separation.
 */
export function Divider({ className = '' }: DividerProps) {
  return (
    <div
      className={`w-full h-px bg-[#2E3940] ${className}`}
      role="separator"
      aria-hidden="true"
    />
  );
}
