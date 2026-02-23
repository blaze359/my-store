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

export default observer(function MobileMiniCart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="md:hidden">
      <Sheet>
        {/* Use asChild to ensure SheetTrigger renders as a button for hydration consistency */}
        <SheetTrigger asChild>
          <div
            className="md:hidden py-2 px-4 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Open cart"
          >
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
        </SheetTrigger>

        <SheetContent side="right" className="w-full p-6">
          <SheetTitle className="font-black text-2xl md:text-4xl mb-4">Cart</SheetTitle>
          <div className="flex flex-col gap-4">
            {cartStore.cart.products.map((item) => (
              <MiniCartItem key={item.id} cartItem={item} closeOnLinkClick={true} />
            ))}
          </div>
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
