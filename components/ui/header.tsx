import Image from 'next/image';
import type { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
}

/**
 * Header component with SAA 2025 logo and optional children (e.g., language selector).
 * Fixed position at top with glass-morphism effect.
 */
export function Header({ children }: HeaderProps) {
  return (
    <header
      className="fixed top-0 z-50 w-full h-20 px-4 sm:px-12 lg:px-36 py-3 bg-[#0B0F12]/80 backdrop-blur-md flex items-center justify-between"
      role="banner"
    >
      <div className="flex items-center">
        <Image
          src="/images/saa-logo.png"
          alt="SAA 2025 Logo"
          width={52}
          height={56}
          className="w-[52px] h-14 object-contain"
          priority
        />
      </div>
      {children && <nav className="flex items-center">{children}</nav>}
    </header>
  );
}
