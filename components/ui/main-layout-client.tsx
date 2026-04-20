'use client';

import { useState } from 'react';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { WriteKudoModal } from '@/components/write-kudo';

interface MainLayoutClientProps {
  children: React.ReactNode;
  userId: string;
}

export function MainLayoutClient({ children, userId }: MainLayoutClientProps) {
  const [isWriteKudoOpen, setIsWriteKudoOpen] = useState(false);

  return (
    <>
      {children}
      <FloatingActionButton onWriteKudo={() => setIsWriteKudoOpen(true)} />
      <WriteKudoModal
        isOpen={isWriteKudoOpen}
        onClose={() => setIsWriteKudoOpen(false)}
        userId={userId}
      />
    </>
  );
}
