'use client';
import CartLineItem from '@/components/cart/CartLineItem';
import cartStore from '@/lib/cartStore';
import { observer } from 'mobx-react-lite';
import { useLocale } from 'next-intl';

const CartPage = observer(function CartPage() {
  const locale = useLocale();
  return (
    <div className="my-6">
      <h1 className="font-bold text-2xl">Cart ({cartStore.cart.totalProducts})</h1>
      <button className="text-sm text-primary hover:underline" onClick={cartStore.clearCart}>
        Clear Cart
      </button>
      <div className="flex flex-row gap-10">
        <div className="flex-1">
          {cartStore.cart.totalProducts > 0 ? (
            <div>
              <div>
                {cartStore.cart.products.map((item) => (
                  <CartLineItem key={item.id} cartItem={item} locale={locale} />
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-4">Your cart is currently empty.</p>
          )}
        </div>
        <div className="w-96 p-4 border rounded-2xl bg-primary/25 h-fit flex flex-col gap-4">
          <h3 className="text-lg font-bold">Summary</h3>
          <hr className="border-secondary" />
          <div className="font-bold flex justify-between">
            <div>SubTotal:</div>
            <div>${cartStore.cart.total.toFixed(2)}</div>
          </div>
          {cartStore.cart.total > cartStore.cart.discountedTotal && (
            <>
              <div className="font-bold flex justify-between text-red-500">
                <div>Discount:</div>
                <div>-${(cartStore.cart.total - cartStore.cart.discountedTotal).toFixed(2)}</div>
              </div>
              <div className="font-bold flex justify-between">
                <div>Total:</div>
                <div>${cartStore.cart.discountedTotal.toFixed(2)}</div>
              </div>
            </>
          )}
          <hr className="border-secondary" />
          <button className="w-full mt-4 bg-primary text-white py-2 rounded hover:bg-primary/90">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
});

export default CartPage;
