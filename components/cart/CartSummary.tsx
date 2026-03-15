'use client';

import cartStore from '@/lib/cartStore';
import { hasEffectiveDiscount } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CartSummary = observer(function CartSummary() {
  const t = useTranslations('Cart');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-auto md:w-96 p-4 border rounded-2xl bg-primary/25 h-fit flex flex-col gap-4">
        <h3 className="text-lg font-bold">{t('Summary')}</h3>
        <hr className="border-secondary" />
        <div className="font-bold flex justify-between">
          <div>{t('SubTotal')}:</div>
          <Skeleton className="h-5 w-16" />
        </div>
        <hr className="border-secondary" />
        <button
          type="button"
          disabled
          className="w-full mt-4 bg-primary text-white py-2 rounded hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t('Proceed to Checkout')}
        </button>
      </div>
    );
  }

  const hasDiscount = hasEffectiveDiscount(cartStore.cart.total, cartStore.cart.discountedTotal);

  return (
    <div className="w-auto md:w-96 p-4 border rounded-2xl bg-primary/25 h-fit flex flex-col gap-4">
      <h3 className="text-lg font-bold">{t('Summary')}</h3>
      <hr className="border-secondary" />
      <div className="font-bold flex justify-between">
        <div>{t('SubTotal')}:</div>
        <div>${cartStore.cart.total.toFixed(2)}</div>
      </div>
      {hasDiscount && (
        <>
          <div className="font-bold flex justify-between text-red-500">
            <div>{t('Discount')}:</div>
            <div>-${(cartStore.cart.total - cartStore.cart.discountedTotal).toFixed(2)}</div>
          </div>
          <div className="font-bold flex justify-between">
            <div>{t('Total')}:</div>
            <div>${cartStore.cart.discountedTotal.toFixed(2)}</div>
          </div>
        </>
      )}
      <hr className="border-secondary" />
      <Link href="/checkout">
        <button className="w-full mt-4 bg-primary text-white py-2 rounded hover:bg-primary/90">
          {t('Proceed to Checkout')}
        </button>
      </Link>
    </div>
  );
});

export default CartSummary;
