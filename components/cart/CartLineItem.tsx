import cartStore from '@/lib/cartStore';
import { CartItem } from '@/lib/cartTypes';
import Image from 'next/image';
import Link from 'next/link';
import DisplayPrice from '../DisplayPrice';

interface CartItemProps {
  cartItem: CartItem;
  locale: string;
}

export default function CartLineItem({ cartItem, locale }: Readonly<CartItemProps>) {
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
          <DisplayPrice
            price={cartItem.price}
            discountPercentage={cartItem.discountPercentage}
            locale={locale}
          />
          <p>Quantity: {cartItem.quantity}</p>
        </div>
        <div>
          <p>Total: ${(cartItem.discountedTotal * cartItem.quantity).toFixed(2)}</p>
          <button
            className="text-sm text-red-500 hover:underline"
            onClick={() => cartStore.removeFromCart(cartItem.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
