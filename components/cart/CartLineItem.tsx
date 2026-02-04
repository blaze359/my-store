import { CartItem } from "@/lib/cartTypes";
import Image from "next/image";
import Link from "next/link";

interface CartItemProps {
  cartItem: CartItem;
}

export default function CartLineItem( { cartItem }: Readonly<CartItemProps> ) {
  return (
          <div className="border-b py-4 flex gap-4">
            <div>
              <Link href={`/product/${cartItem.id}`}>
                <Image
                  src={cartItem.thumbnail}
                  alt={cartItem.title}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </Link>
            </div>
            <div className="flex justify-between w-full">
              <div>
                <Link href={`/product/${cartItem.id}`}>
                  <h2 className="font-semibold">{cartItem.title}</h2>
                </Link>
                <p>Price: ${cartItem.price}</p>
                <p>Quantity: {cartItem.quantity}</p>
              </div>
              <div>
                <p>Total: ${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
  );
}
