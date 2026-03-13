'use client';

import cartStore from '@/lib/cartStore';
import { useTranslations } from 'next-intl';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';

const CartSummary = observer(function CartSummary() {
  const t = useTranslations('Cart');
  return (
    <div className="w-auto md:w-96 p-4 border rounded-2xl bg-primary/25 h-fit flex flex-col gap-4">
      <h3 className="text-lg font-bold">{t('Summary')}</h3>
      <hr className="border-secondary" />
      <div className="font-bold flex justify-between">
        <div>{t('SubTotal')}:</div>
        <div>${cartStore.cart.total.toFixed(2)}</div>
      </div>
      {cartStore.cart.total > cartStore.cart.discountedTotal && (
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
