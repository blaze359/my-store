'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import type { SubmitEventHandler } from 'react';
import cartStore from '@/lib/cartStore';
import { useCheckout } from './CheckoutContext';

export default function ShippingAddress() {
  const t = useTranslations('Checkout');
  const { step, setStep } = useCheckout();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    cartStore.cart.email = values.email as string;
    cartStore.cart.shippingAddress = {
      firstName: values.firstName as string,
      lastName: values.lastName as string,
      address: values.address as string,
      city: values.city as string,
      state: values.state as string,
      postalCode: values.postalCode as string,
    };
    console.log('cart:', cartStore.cart);
    setStep(step + 1);
  };

  return (
    <Card title={t('Shipping Address')} className="pt-0 overflow-hidden">
      <CardHeader className="flex justify-between items-center align-middle bg-primary/25 py-2">
        <h2 className="text-lg font-bold">{t('Shipping Address')}</h2>
        {step > 1 ? (
          <Button variant="outline" size="sm" onClick={() => setStep(1)}>
            {t('Edit')}
          </Button>
        ) : null}
      </CardHeader>
      <CardContent>
        {step > 1 ? <ShippingAddressReadonly /> : <AddressForm onSubmit={handleSubmit} />}
      </CardContent>
    </Card>
  );
}

function AddressForm({ onSubmit }: Readonly<{ onSubmit: SubmitEventHandler<HTMLFormElement> }>) {
  const t = useTranslations('Checkout');
  const { shippingAddress, email } = cartStore.cart;

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="firstName"
          defaultValue={shippingAddress.firstName}
          placeholder={t('First Name')}
          className="flex-1 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          defaultValue={shippingAddress.lastName}
          placeholder={t('Last Name')}
          className="flex-1 p-2 border rounded"
          required
        />
      </div>
      <input
        type="email"
        name="email"
        defaultValue={email}
        placeholder={t('Email')}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="address"
        defaultValue={shippingAddress.address}
        placeholder={t('Address')}
        className="w-full p-2 border rounded"
        required
      />
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="city"
          defaultValue={shippingAddress.city}
          placeholder={t('City')}
          className="flex-1 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="state"
          defaultValue={shippingAddress.state}
          placeholder={t('State')}
          className="flex-1 p-2 border rounded"
          required
        />
      </div>
      <input
        type="text"
        name="postalCode"
        defaultValue={shippingAddress.postalCode}
        placeholder={t('Postal Code')}
        className="w-full p-2 border rounded"
        required
      />
      <Button className="self-end mt-4" type="submit">
        {t('Continue to Shipping Method')}
      </Button>
    </form>
  );
}

function ShippingAddressReadonly() {
  return (
    <div className="px-4">
      <p>
        {cartStore.cart.shippingAddress.firstName} {cartStore.cart.shippingAddress.lastName}
      </p>
      <p>{cartStore.cart.shippingAddress.address}</p>
      <p>
        {cartStore.cart.shippingAddress.city}, {cartStore.cart.shippingAddress.state}{' '}
        {cartStore.cart.shippingAddress.postalCode}
      </p>
      <p>{cartStore.cart.email}</p>
    </div>
  );
}
