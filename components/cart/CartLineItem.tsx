import cartStore from '@/lib/cartStore';
import { CartItem } from '@/lib/cartTypes';
import Image from 'next/image';
import Link from 'next/link';
import DisplayPrice from '../DisplayPrice';
import { useTranslations } from 'next-intl';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

interface CartItemProps {
  cartItem: CartItem;
  locale: string;
}

export default function CartLineItem({ cartItem, locale }: Readonly<CartItemProps>) {
  const t = useTranslations('Cart');
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
      <div className="flex justify-between w-full flex-col md:flex-row">
        <div>
          <Link href={`/product/${cartItem.id}`}>
            <h2 className="font-semibold">{cartItem.title}</h2>
          </Link>
          <div className="flex flex-col-reverse">
            <DisplayPrice
              price={cartItem.price}
              discountPercentage={cartItem.discountPercentage}
              locale={locale}
            />
            <p>
              {t('Quantity')}: {cartItem.quantity}
            </p>
          </div>
        </div>
        <div className="md:w-40 shrink-0 text-left md:text-right">
          <p className="whitespace-nowrap">
            {t('Total')}:{' '}
            <span className="inline-block min-w-24 text-right tabular-nums">
              {formatCurrency(cartItem.discountedTotal, locale)}
            </span>
          </p>
          <button
            className="text-sm text-red-500 hover:underline md:ml-auto"
            onClick={() => {
              cartStore.removeFromCart(cartItem.id);
              toast.error('Removed from cart', {
                description: cartItem.title,
                duration: 4000,
              });
            }}
          >
            {t('Remove')}
          </button>
        </div>
      </div>
    </div>
  );
}
