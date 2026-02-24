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

export default observer(() => {
  const t = useTranslations('Nav');
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
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
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={() => {
              setOpen(false);
              router.push('/cart');
            }}
          >
            <div className="relative py-2">
              {mounted && cartStore.cart.totalProducts > 0 ? (
                <div className="relative">
                  <FontAwesomeIcon className="!h-6" icon={faShoppingCart} />
                  <span
                    className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white shadow"
                    style={{ pointerEvents: 'none' }}
                  >
                    {cartStore.cart.totalProducts}
                  </span>
                </div>
              ) : (
                <FontAwesomeIcon className="!h-6" icon={faShoppingCart} />
              )}
            </div>
          </div>
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
          {mounted && cartStore.cart.totalProducts > 0 ? (
            <ul className="m-2">
              {cartStore.cart.products.map((cartItem, index) => {
                return (
                  <MiniCartItem
                    cartItem={cartItem}
                    key={index}
                    onLinkClick={() => setOpen(false)}
                  />
                );
              })}
            </ul>
          ) : (
            <div className="m-2">{t('Your cart is currently empty')}</div>
          )}
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
