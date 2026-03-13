'use client';

import ShippingAddress from './ShippingAddress';
import ShippingMethod from './ShippingMethod';
import PaymentSection from './PaymentSection';

export default function CheckoutContent() {
  return (
    <div className="flex-1">
      <ShippingAddress />
      <ShippingMethod />
      <PaymentSection />
    </div>
  );
}
