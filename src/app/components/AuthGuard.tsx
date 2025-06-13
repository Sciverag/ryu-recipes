// src/components/AuthGuard.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  requireAuth?: boolean;
};

export default function AuthGuard({ children, requireAuth = true }: Props) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !isLoggedIn) {
      router.back();
    }

    if (!requireAuth && isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, requireAuth, router]);

  if ((requireAuth && !isLoggedIn) || (!requireAuth && isLoggedIn)) {
    return null;
  }

  return <>{children}</>;
}
