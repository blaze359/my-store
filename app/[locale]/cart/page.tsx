"use client";
import cartStore from "@/lib/cartStore";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";

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
              <div key={item.id} className="border-b py-4 flex gap-4">
                <div>
                  <Link href={`/product/${item.id}`}>
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </Link>
                </div>
                <div className="flex justify-between w-full">
                  <div>
                    <Link href={`/product/${item.id}`}>
                      <h2 className="font-semibold">{item.title}</h2>
                    </Link>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
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