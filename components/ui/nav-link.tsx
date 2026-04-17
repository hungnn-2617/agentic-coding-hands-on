import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
}

export function NavLink({ href, label, active = false }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`
        px-4 py-2 rounded text-base font-bold leading-6 tracking-[0.15px]
        transition-colors duration-150
        focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2
        ${
          active
            ? 'text-[#FFEA9E] border-b border-[#FFEA9E]'
            : 'text-white hover:bg-white/10'
        }
      `}
      style={active ? { textShadow: '0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287' } : undefined}
    >
      {label}
    </Link>
  );
}
