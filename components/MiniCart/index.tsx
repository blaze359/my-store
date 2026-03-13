'use client';
import { observer } from 'mobx-react';
import cartStore from '../../lib/cartStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import MiniCartItem from './MiniCartItem';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
import { Skeleton } from '../ui/skeleton';

export default observer(() => {
  const t = useTranslations('Nav');
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const hasItems = mounted && cartStore.cart.totalProducts > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  let cartPopoverContent: React.ReactNode;
  if (!mounted) {
    cartPopoverContent = (
      <div className="m-2 space-y-3">
        {['mini-cart-loading-1', 'mini-cart-loading-2'].map((placeholderKey) => (
          <div key={placeholderKey} className="flex items-center gap-3">
            <Skeleton className="size-12 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    );
  } else if (hasItems) {
    cartPopoverContent = (
      <ul className="m-2">
        {cartStore.cart.products.map((cartItem) => {
          return (
            <MiniCartItem
              cartItem={cartItem}
              key={cartItem.id}
              onLinkClick={() => setOpen(false)}
            />
          );
        })}
      </ul>
    );
  } else {
    cartPopoverContent = <div className="m-2">{t('Your cart is currently empty')}</div>;
  }

  let cartIcon = <FontAwesomeIcon className="h-6!" icon={faShoppingCart} />;

  if (hasItems) {
    cartIcon = (
      <div className="relative">
        <FontAwesomeIcon className="h-6!" icon={faShoppingCart} />
        <span
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white shadow"
          style={{ pointerEvents: 'none' }}
        >
          {cartStore.cart.totalProducts}
        </span>
      </div>
    );
  } else if (!mounted) {
    cartIcon = (
      <div className="relative">
        <FontAwesomeIcon className="h-6!" icon={faShoppingCart} />
        <Skeleton className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full" />
      </div>
    );
  }

  return (
    <div className="hidden md:block">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          tabIndex={0}
          role="button"
          aria-label="View cart"
        >
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer bg-transparent border-0 p-0"
            onClick={() => {
              setOpen(false);
              router.push('/cart');
            }}
            aria-label="Go to cart"
          >
            <div className="relative py-2">{cartIcon}</div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-96"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
            {t('Shopping cart')}
          </h2>
          <hr />
          {cartPopoverContent}
          <Button className="w-full" onClick={() => setOpen(false)}>
            <Link href="/cart" className="w-full h-full block">
              {t('View Cart')}
            </Link>
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
});
