'use client';

import cartStore from '@/lib/cartStore';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/productTypes';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

type AddToCartButtonProps = {
  product: Product;
  className?: string;
};

export default function AddToCartButton({ product, className }: Readonly<AddToCartButtonProps>) {
  const t = useTranslations('Product');
  function handleClick() {
    console.log('Adding to cart:', product);
    if (!product) return;
    console.log('clicked add to cart button for product:', product);
    // Omit quantity, total, discountedTotal — the store handles them
    const cartData = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
    };

    cartStore.addToCart(cartData, 1);
    toast.success('Added to cart', {
      description: product.title,
      duration: 2000,
    });
    console.log('Current cart state:', cartStore.cart);
  }

  return (
    <Button className={`${className ?? ''} max-w-60`} onClick={() => handleClick()}>
      {t('Add to Cart')}
    </Button>
  );
}
