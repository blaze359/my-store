'use client';

import cartStore from '@/lib/cartStore';
import { CartItem } from '@/lib/cartTypes';
import Image from 'next/image';
import Link from 'next/link';
import DisplayPrice from '../DisplayPrice';
import { useTranslations } from 'next-intl';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { observer } from 'mobx-react-lite';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';

interface CartItemProps {
  cartItem: CartItem;
  locale: string;
}

const CartLineItem = observer(function CartLineItem({ cartItem, locale }: Readonly<CartItemProps>) {
  const t = useTranslations('Cart');
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);

  const updateQuantityWithDelay = async (nextQuantity: number) => {
    if (isUpdatingQuantity) return;

    setIsUpdatingQuantity(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    cartStore.setItemQuantity(cartItem.id, nextQuantity);
    setIsUpdatingQuantity(false);
  };

  return (
    <div className="border-b py-4 flex gap-4">
      <div>
        <Link href={`/product/${cartItem.id}`}>
          <Image
            src={cartItem.thumbnail}
            alt={cartItem.title}
            width={100}
            height={100}
            className="object-cover"
          />
        </Link>
      </div>
      <div className="flex justify-between w-full flex-col md:flex-row">
        <div>
          <Link href={`/product/${cartItem.id}`}>
            <h2 className="font-semibold">{cartItem.title}</h2>
          </Link>
          <div className="flex flex-col-reverse">
            <DisplayPrice
              price={cartItem.price}
              discountPercentage={cartItem.discountPercentage}
              locale={locale}
            />
            <div className="flex items-center gap-2">
              <span>{t('Quantity')}:</span>
              <div className="flex h-8 items-center overflow-hidden rounded-md border bg-background">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Decrease quantity"
                  className="rounded-none"
                  onClick={() => void updateQuantityWithDelay(cartItem.quantity - 1)}
                  disabled={isUpdatingQuantity || cartItem.quantity <= 1}
                >
                  -
                </Button>
                <input
                  type="number"
                  min={1}
                  value={cartItem.quantity}
                  onChange={(event) => {
                    const parsedValue = Number.parseInt(event.target.value, 10);
                    if (Number.isNaN(parsedValue)) return;

                    void updateQuantityWithDelay(parsedValue);
                  }}
                  disabled={isUpdatingQuantity}
                  aria-label="Quantity"
                  className="h-full w-12 border-x text-center text-sm tabular-nums outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Increase quantity"
                  className="rounded-none"
                  onClick={() => void updateQuantityWithDelay(cartItem.quantity + 1)}
                  disabled={isUpdatingQuantity}
                >
                  +
                </Button>
              </div>
              {isUpdatingQuantity ? <Spinner className="text-muted-foreground" /> : null}
            </div>
          </div>
        </div>
        <div className="md:w-40 shrink-0 text-left md:text-right">
          <p className="whitespace-nowrap">
            {t('Total')}:{' '}
            <span className="inline-block min-w-24 text-right tabular-nums">
              {formatCurrency(cartItem.discountedTotal, locale)}
            </span>
          </p>
          <button
            className="text-sm text-red-500 hover:underline md:ml-auto"
            onClick={() => {
              cartStore.removeFromCart(cartItem.id);
              toast.error('Removed from cart', {
                description: cartItem.title,
                duration: 4000,
              });
            }}
          >
            {t('Remove')}
          </button>
        </div>
      </div>
    </div>
  );
});

export default CartLineItem;
