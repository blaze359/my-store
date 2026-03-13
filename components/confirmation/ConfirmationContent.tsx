'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import cartStore from '@/lib/cartStore';
import type { CartItem, CartType } from '@/lib/cartTypes';
import { useTranslations } from 'next-intl';

type ConfirmationSnapshot = {
  orderSlug: string;
  email: string;
  shippingAddress: CartType['shippingAddress'];
  shippingMethod: CartType['shippingMethod'];
  paymentMethod: CartType['paymentMethod'];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  products: CartItem[];
};

type ConfirmationContentProps = {
  orderSlug: string;
  title: string;
};

function createSnapshot(orderSlug: string): ConfirmationSnapshot {
  return {
    orderSlug,
    email: cartStore.cart.email,
    shippingAddress: { ...cartStore.cart.shippingAddress },
    shippingMethod: cartStore.cart.shippingMethod,
    paymentMethod: cartStore.cart.paymentMethod,
    total: cartStore.cart.total,
    discountedTotal: cartStore.cart.discountedTotal,
    totalProducts: cartStore.cart.totalProducts,
    totalQuantity: cartStore.cart.totalQuantity,
    products: cartStore.cart.products.map((item) => ({ ...item })),
  };
}

export default function ConfirmationContent({
  orderSlug,
  title,
}: Readonly<ConfirmationContentProps>) {
  const t = useTranslations('Confirmation');
  const [snapshot] = useState<ConfirmationSnapshot>(() => createSnapshot(orderSlug));

  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      cartStore.resetCart();
    }, 0);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="my-6 space-y-4">
      <h1 className="font-bold text-2xl mb-2">{title}</h1>
      <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
        <p className="font-semibold">{t('Important')}</p>
        <p className="text-sm">{t('ImportantMessage')}</p>
      </div>
      <div className="rounded-xl border p-4 bg-primary/10 space-y-1">
        <p>
          <strong>{t('Order')}:</strong> {snapshot.orderSlug}
        </p>
        <p>
          <strong>{t('Items')}:</strong> {snapshot.totalProducts} ({snapshot.totalQuantity}{' '}
          {t('totalQuantity')})
        </p>
        <p>
          <strong>{t('Total')}:</strong> ${snapshot.discountedTotal.toFixed(2)}
        </p>
        {snapshot.total > snapshot.discountedTotal ? (
          <p>
            <strong>{t('Savings')}:</strong> $
            {(snapshot.total - snapshot.discountedTotal).toFixed(2)}
          </p>
        ) : null}
        <p>
          <strong>{t('Shipping')}:</strong> {snapshot.shippingMethod || t('NotProvided')}
        </p>
        <p>
          <strong>{t('Payment')}:</strong> {snapshot.paymentMethod || t('NotProvided')}
        </p>
        <p>
          <strong>{t('Email')}:</strong> {snapshot.email || t('NotProvided')}
        </p>
      </div>

      <div className="rounded-xl border p-4 space-y-1">
        <h2 className="font-semibold text-lg">{t('ShippingAddress')}</h2>
        <p>
          {snapshot.shippingAddress.firstName} {snapshot.shippingAddress.lastName}
        </p>
        <p>{snapshot.shippingAddress.address}</p>
        <p>
          {snapshot.shippingAddress.city}, {snapshot.shippingAddress.state}{' '}
          {snapshot.shippingAddress.postalCode}
        </p>
      </div>

      <div className="rounded-xl border p-4 space-y-3">
        <h2 className="font-semibold text-lg">{t('OrderItems')}</h2>
        {snapshot.products.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t('NoProductsFound')}</p>
        ) : (
          <>
            <ul className="divide-y">
              {snapshot.products.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="size-16 shrink-0 rounded-lg border bg-white overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium leading-snug">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {t('Qty')}: {item.quantity}
                    </p>
                    {item.discountedTotal < item.total && (
                      <p className="text-xs text-red-500 mt-0.5">
                        {t('Save')} ${(item.total - item.discountedTotal).toFixed(2)}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {item.discountedTotal < item.total && (
                      <p className="text-xs text-muted-foreground line-through">
                        ${item.total.toFixed(2)}
                      </p>
                    )}
                    <p className="font-semibold">${item.discountedTotal.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t pt-3 space-y-1">
              {snapshot.total > snapshot.discountedTotal && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('Subtotal')}</span>
                    <span>${snapshot.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-500">
                    <span>{t('Discount')}</span>
                    <span>-${(snapshot.total - snapshot.discountedTotal).toFixed(2)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between font-bold text-base">
                <span>{t('Total')}</span>
                <span>${snapshot.discountedTotal.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
