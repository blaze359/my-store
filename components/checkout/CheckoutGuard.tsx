'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hydrateStore } from 'mobx-persist-store';
import cartStore from '@/lib/cartStore';
import CheckoutFlow, { getSavedCheckoutStep } from './CheckoutFlow';

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

  if (!isReady || !canAccess) {
    return null;
  }

  return <CheckoutFlow initialStep={initialStep} />;
}
