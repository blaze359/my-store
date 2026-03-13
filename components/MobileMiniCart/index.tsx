'use client';

import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import cartStore from '@/lib/cartStore';
import { observer } from 'mobx-react';
import Link from 'next/link';
import MiniCartItem from '@/components/MiniCart/MiniCartItem';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export default observer(function MobileMiniCart() {
  const [mounted, setMounted] = useState(false);
  const hasItems = mounted && cartStore.cart.totalProducts > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  const mobileCartItems = mounted
    ? cartStore.cart.products.map((item) => (
        <MiniCartItem key={item.id} cartItem={item} closeOnLinkClick={true} />
      ))
    : ['mobile-mini-cart-loading-1', 'mobile-mini-cart-loading-2'].map((placeholderKey) => (
        <div key={placeholderKey} className="flex items-center gap-3">
          <Skeleton className="size-12 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
      ));

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
    <div className="md:hidden">
      <Sheet>
        {/* Use asChild to ensure SheetTrigger renders as a button for hydration consistency */}
        <SheetTrigger asChild>
          <button
            type="button"
            className="md:hidden py-2 px-4 cursor-pointer bg-transparent border-0"
            aria-label="Open cart"
          >
            {cartIcon}
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="w-full p-6">
          <SheetTitle className="font-black text-2xl md:text-4xl mb-4">Cart</SheetTitle>
          <div className="flex flex-col gap-4">{mobileCartItems}</div>
          {/* Close sheet on button click */}
          <SheetClose asChild>
            <Link href="/cart" className="w-full h-full block">
              <Button className="w-full">View Cart</Button>
            </Link>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
});
