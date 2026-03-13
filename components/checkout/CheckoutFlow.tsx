'use client';

import { useState } from 'react';
import cartStore from '@/lib/cartStore';
import { CheckoutProvider } from './CheckoutContext';
import CheckoutContent from './CheckoutContent';
import CheckoutSummary from './CheckoutSummary';

function hasSavedShippingAddress() {
  const { shippingAddress, email } = cartStore.cart;
  return (
    email.trim().length > 0 &&
    shippingAddress.firstName.trim().length > 0 &&
    shippingAddress.lastName.trim().length > 0 &&
    shippingAddress.address.trim().length > 0 &&
    shippingAddress.city.trim().length > 0 &&
    shippingAddress.state.trim().length > 0 &&
    shippingAddress.postalCode.trim().length > 0
  );
}

function getSavedCheckoutStep() {
  if (!hasSavedShippingAddress()) {
    return 1;
  }

  if (!cartStore.cart.shippingMethod) {
    return 2;
  }

  if (!cartStore.cart.paymentMethod) {
    return 3;
  }

  return 4;
}

type CheckoutFlowProps = {
  initialStep?: number;
};

export { getSavedCheckoutStep };

export default function CheckoutFlow({ initialStep = 1 }: Readonly<CheckoutFlowProps>) {
  const [step, setStep] = useState(initialStep);

  return (
    <CheckoutProvider step={step} setStep={setStep}>
      <div className="flex flex-col md:flex-row gap-10">
        <CheckoutContent />
        <CheckoutSummary />
      </div>
    </CheckoutProvider>
  );
}
