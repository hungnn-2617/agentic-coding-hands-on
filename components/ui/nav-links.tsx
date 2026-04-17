'use client';

import { usePathname } from 'next/navigation';
import { useLanguage } from '@/hooks/use-language';
import { NavLink } from '@/components/ui/nav-link';

export function NavLinks() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/', label: t('nav.about') },
    { href: '/awards-information', label: t('nav.awards') },
    { href: '/sun-kudos', label: t('nav.kudos') },
  ];

  return (
    <nav className="hidden sm:flex items-center gap-6" aria-label="Main navigation">
      {navItems.map((item) => (
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
