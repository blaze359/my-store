'use client';

import { CartItem, CartType } from '@/lib/cartTypes';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import CartLineItem from './CartLineItem';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import cartStore from '@/lib/cartStore';
import { useTranslations } from 'next-intl';

interface SavedCartProps {
  cart: CartType;
  locale: string;
}

function handleClickMakeActiveCart(cart: CartType) {
  cartStore.cart = cart;
}

export default function SavedCart({ cart, locale }: Readonly<SavedCartProps>) {
  const t = useTranslations('MyAccount');
  return (
    <div className="flex flex-row gap-2 w-full items-center">
      <AccordionItem key={cart.id} value={cart.id.toString()} className="grow">
        <AccordionTrigger>
          <div className="flex justify-between w-full">
            <div>
              <h2 className="font-semibold">{t('Cart ID')}: {cart.id}</h2>
              <p>{t('Total Products')}: {cart.totalProducts}</p>
              <p>{t('Total Quantity')}: {cart.totalQuantity}</p>
            </div>
            <div>
              <p>{t('Total')}: ${cart.total.toFixed(2)}</p>
              <p>{t('Discounted Total')}: ${cart.discountedTotal.toFixed(2)}</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {cart.products.map((item: CartItem) => (
            <CartLineItem key={item.id} cartItem={item} locale={locale} />
          ))}
        </AccordionContent>
      </AccordionItem>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>{t('Make Active Cart')}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('Are you absolutely sure?')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('This will abandon your current active cart and replace it with the saved cart (ID: {cartId}).', { cartId: cart.id })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
            {/* The action only runs when this button is clicked */}
            <AlertDialogAction onClick={() => handleClickMakeActiveCart(cart)}>
              {t('Copy Cart')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
