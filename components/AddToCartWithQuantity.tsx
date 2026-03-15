'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import cartStore from '@/lib/cartStore';
import { Product } from '@/lib/productTypes';
import { Button } from '@/components/ui/button';
import { Spinner } from './ui/spinner';

type AddToCartWithQuantityProps = {
  product: Product;
  className?: string;
};

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

export default function AddToCartWithQuantity({
  product,
  className,
}: Readonly<AddToCartWithQuantityProps>) {
  const t = useTranslations('Product');
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const clampQuantity = (value: number) => {
    return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, value));
  };

  const handleQuantityChange = (value: string) => {
    const parsedValue = Number.parseInt(value, 10);

    if (Number.isNaN(parsedValue)) {
      setQuantity(MIN_QUANTITY);
      return;
    }

    setQuantity(clampQuantity(parsedValue));
  };

  const handleQuantityBlur = () => {
    setQuantity((currentQuantity) => clampQuantity(currentQuantity));
  };

  async function handleClick() {
    if (!product || adding) return;

    setAdding(true);

    const cartData = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
    };

    await new Promise((resolve) => setTimeout(resolve, 800));
    cartStore.addToCart(cartData, quantity);
    toast.success('Added to cart', {
      description: `${product.title} (x${quantity})`,
      duration: 4000,
    });
    setAdding(false);
  }

  return (
    <div className={`flex w-full items-center gap-2 ${className ?? ''}`}>
      <div className="flex h-9 items-center overflow-hidden rounded-md border bg-background">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((currentQuantity) => clampQuantity(currentQuantity - 1))}
          disabled={adding || quantity <= MIN_QUANTITY}
          className="rounded-none"
        >
          -
        </Button>
        <input
          type="number"
          min={MIN_QUANTITY}
          max={MAX_QUANTITY}
          value={quantity}
          onChange={(event) => handleQuantityChange(event.target.value)}
          onBlur={handleQuantityBlur}
          disabled={adding}
          aria-label="Quantity"
          className="h-full w-14 border-x text-center text-sm tabular-nums outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Increase quantity"
          onClick={() => setQuantity((currentQuantity) => clampQuantity(currentQuantity + 1))}
          disabled={adding || quantity >= MAX_QUANTITY}
          className="rounded-none"
        >
          +
        </Button>
      </div>

      <Button className="flex-1" onClick={handleClick} disabled={adding} aria-busy={adding}>
        {adding ? (
          <>
            <Spinner /> {t('Adding')}
          </>
        ) : (
          t('Add to Cart')
        )}
      </Button>
    </div>
  );
}
