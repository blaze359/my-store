'use client';

import CartLineItem from '@/components/cart/CartLineItem';
import cartStore from '@/lib/cartStore';
import { observer } from 'mobx-react-lite';
import { useLocale, useTranslations } from 'next-intl';

const CartItems = observer(function CartItems() {
  const locale = useLocale();
  const t = useTranslations('Cart');
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
