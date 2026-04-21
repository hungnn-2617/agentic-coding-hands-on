'use client';

import { Avatar } from '@/components/ui/avatar';
import { StarIcon } from '@/components/icons/star-icon';
import type { KudoUser } from '@/types/kudo';

interface UserInfoProps {
  user: KudoUser & { star_rating: number };
  department?: string;
  className?: string;
}

export function UserInfo({ user, department, className = '' }: UserInfoProps) {
  const stars = Array.from({ length: user.star_rating }, (_, i) => i);

  return (
    <div className={`flex items-center gap-[13px] min-w-0 ${className}`}>
      <Avatar
        src={user.avatar_url}
        alt={user.full_name}
        size={64}
      />
      <div className="flex flex-col gap-[2px] min-w-0">
        <div className="flex items-center gap-1">
          <span className="truncate text-base font-bold leading-6 tracking-[0.15px] text-[#00101A]">
            {user.full_name}
          </span>
          {stars.length > 0 && (
            <span className="flex items-center gap-[2px] shrink-0">
              {stars.map((i) => (
                <StarIcon key={i} className="text-[var(--color-border-highlight)]" />
              ))}
            </span>
          )}
        </div>
        {department && (
          <span className="truncate text-sm font-bold leading-5 tracking-[0.1px] text-[#999]">
            {department}
          </span>
        )}
      </div>
    </div>
  );
}
