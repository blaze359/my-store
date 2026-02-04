"use client";
import CartLineItem from "@/components/cart/CartLineItem";
import cartStore from "@/lib/cartStore";
import { observer } from "mobx-react-lite";


const CartPage = observer(function CartPage() {
  return (
    <div className="my-6">
      <h1 className="font-bold text-2xl">
        Cart ({cartStore.cart.totalProducts})
      </h1>
      {cartStore.cart.totalProducts > 0 ? (
        <div>
          <div>
            {cartStore.cart.products.map((item) => (
              <CartLineItem key={item.id} cartItem={item} />
            ))}
          </div>
          <div className="mt-6 font-bold flex justify-end">
            Cart Total: ${cartStore.cart.total.toFixed(2)}
          </div>
        </div>
      ) : (
        <p className="mt-4">Your cart is currently empty.</p>
      )}
    </div>
  );
});

export default CartPage;