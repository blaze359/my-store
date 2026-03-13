'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hydrateStore } from 'mobx-persist-store';
import cartStore from '@/lib/cartStore';
import CheckoutFlow, { getSavedCheckoutStep } from './CheckoutFlow';
import { Skeleton } from '../ui/skeleton';

export default function CheckoutGuard() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [canAccess, setCanAccess] = useState(false);
  const [initialStep, setInitialStep] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      await hydrateStore(cartStore);
      if (!isMounted) {
        return;
      }

      if (cartStore.cart.totalProducts === 0) {
        setCanAccess(false);
        setIsReady(true);
        router.replace('/cart');
        return;
      }

      setInitialStep(getSavedCheckoutStep());
      setCanAccess(true);
      setIsReady(true);
    };

    void initialize();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (!isReady) {
    return (
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 space-y-4">
          <Skeleton className="h-44 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
        <div className="w-auto md:w-96">
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!canAccess) {
    return null;
  }

  return <CheckoutFlow initialStep={initialStep} />;
}
