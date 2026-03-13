'use client';

import cartStore from '@/lib/cartStore';
import { useLocale, useTranslations } from 'next-intl';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useCheckout } from './CheckoutContext';

const CheckoutSummary = observer(function CheckoutSummary() {
  const t = useTranslations('Checkout');
  const locale = useLocale();
  const router = useRouter();
  const { step } = useCheckout();
  const [mounted, setMounted] = useState(false);
  const canCheckout = step >= 4;
  const checkoutButtonClassName =
    'w-full mt-4 bg-primary text-white py-2 rounded hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary';

  const handleCheckout = () => {
    const randomSlug =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2, 12);

    router.push(`/${locale}/confirmation/${randomSlug}`);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-auto md:w-96 p-4 border rounded-2xl bg-primary/25 h-fit flex flex-col gap-4 sticky top-4">
        <h3 className="text-lg font-bold">{t('Summary')}</h3>
        <hr className="border-secondary" />
        <div className="font-bold flex justify-between">
          <div>{t('SubTotal')}:</div>
          <div>$0.00</div>
        </div>
        <hr className="border-secondary" />
        {canCheckout ? (
          <button type="button" className={checkoutButtonClassName} onClick={handleCheckout}>
            {t('Checkout')}
          </button>
        ) : (
          <button type="button" disabled className={checkoutButtonClassName}>
            {t('Checkout')}
          </button>
        )}
        <hr className="border-secondary" />
        <Accordion type="single" collapsible>
          <AccordionItem value="cart" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex justify-between flex-1">
                <span className="font-bold">Cart</span>
                <span className="font-bold">$0.00</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground text-sm">Loading…</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  return (
    <div className="w-auto md:w-96 p-4 border rounded-2xl bg-primary/25 h-fit flex flex-col gap-4 sticky top-4">
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
      {canCheckout ? (
        <button type="button" className={checkoutButtonClassName} onClick={handleCheckout}>
          {t('Checkout')}
        </button>
      ) : (
        <button type="button" disabled className={checkoutButtonClassName}>
          {t('Checkout')}
        </button>
      )}
      <hr className="border-secondary" />
      <Accordion type="single" collapsible>
        <AccordionItem value="cart" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline">
            <div className="flex justify-between flex-1">
              <span className="font-bold">
                {t('Cart')} ({cartStore.cart.totalQuantity})
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3">
              {cartStore.cart.products.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="rounded-md object-contain size-12 shrink-0 border bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {t('Qty')}: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium shrink-0">${item.discountedTotal.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
});

export default CheckoutSummary;
