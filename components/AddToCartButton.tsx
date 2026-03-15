'use client';

import cartStore from '@/lib/cartStore';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/productTypes';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useState } from 'react';
import { Spinner } from './ui/spinner';

type AddToCartButtonProps = {
  product: Product;
  className?: string;
};

export default function AddToCartButton({ product, className }: Readonly<AddToCartButtonProps>) {
  const t = useTranslations('Product');
  const [adding, setAdding] = useState(false);

  async function handleClick() {
    if (!product || adding) return;
    setAdding(true);
    // Omit quantity, total, discountedTotal — the store handles them
    const cartData = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
    };

    await new Promise((resolve) => setTimeout(resolve, 800));
    cartStore.addToCart(cartData, 1);
    toast.success('Added to cart', {
      description: product.title,
      duration: 4000,
    });
    setAdding(false);
  }

  return (
    <Button
      className={`${className ?? ''} max-w-60`}
      onClick={handleClick}
      disabled={adding}
      aria-busy={adding}
    >
       {adding ? <><Spinner /> {t('Adding')}</> : t('Add to Cart')}
    </Button>
  );
}
