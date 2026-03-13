'use client';

import cartStore from '@/lib/cartStore';
import { useTranslations } from 'next-intl';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

const CartHeader = observer(function CartHeader() {
  const t = useTranslations('Cart');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <h1 className="font-bold text-2xl">
        {t('Cart')}{' '}
        {mounted ? (
          <span>({cartStore.cart.totalProducts})</span>
        ) : (
          <Skeleton className="inline-block h-6 w-10 align-middle" />
        )}
      </h1>
      <button className="text-sm text-primary hover:underline" onClick={cartStore.clearCart}>
        {t('Clear Cart')}
      </button>
    </>
  );
});

export default CartHeader;
