import CartHeader from '@/components/cart/CartHeader';
import CartItems from '@/components/cart/CartItems';
import CartSummary from '@/components/cart/CartSummary';

export default function CartPage() {
  return (
    <div className="my-6">
      <CartHeader />
      <div className="flex flex-col md:flex-row gap-10">
        <CartItems />
        <CartSummary />
      </div>
    </div>
  );
}
