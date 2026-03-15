'use client';

import CartLineItem from '@/components/cart/CartLineItem';
import { Skeleton } from '@/components/ui/skeleton';
import cartStore from '@/lib/cartStore';
import { observer } from 'mobx-react-lite';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const CartItems = observer(function CartItems() {
  const locale = useLocale();
  const t = useTranslations('Cart');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex-1 space-y-4">
        {['cart-line-loading-1', 'cart-line-loading-2'].map((placeholderKey) => (
          <div key={placeholderKey} className="border-b py-4 flex gap-4">
            <Skeleton className="size-24 shrink-0 rounded-md" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-8 w-32" />
            </div>
            <div className="w-32 space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1">
      {cartStore.cart.totalProducts > 0 ? (
        <div>
          <div>
            {cartStore.cart.products.map((item) => (
              <CartLineItem key={item.id} cartItem={item} locale={locale} />
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-4">{t('Your cart is currently empty')}</p>
      )}
    </div>
  );
});

export default CartItems;
