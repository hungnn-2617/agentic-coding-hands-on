'use client';

import { usePathname } from 'next/navigation';
import { NavLink } from '@/components/ui/nav-link';

const NAV_ITEMS = [
  { href: '/', label: 'About SAA 2025' },
  { href: '/awards-information', label: 'Award Information' },
  { href: '/sun-kudos', label: 'Sun* Kudos' },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden sm:flex items-center gap-6" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          active={pathname === item.href}
        />
      ))}
    </nav>
  );
}
