'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import cartStore from '@/lib/cartStore';

type ConfirmationGuardProps = {
  children: React.ReactNode;
};

export default function ConfirmationGuard({ children }: Readonly<ConfirmationGuardProps>) {
  const router = useRouter();
  const isAllowed = cartStore.cart.orderPlaced;

  useEffect(() => {
    if (!isAllowed) {
      router.replace('/checkout');
    }
  }, [isAllowed, router]);

  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
}
