import { SubmitEventHandler } from 'react';
import cartStore from '@/lib/cartStore';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { useCheckout } from './CheckoutContext';
import { useTranslations } from 'next-intl';

export default function PaymentSection() {
  const t = useTranslations('Checkout');
  const { step, setStep } = useCheckout();
  return (
    <Card title="Payment" className="pt-0 overflow-hidden mt-4">
      <CardHeader className="flex justify-between items-center align-middle bg-primary/25 py-2">
        <h2 className="text-lg font-bold">{t('Payment Method')}</h2>
        {step > 3 ? (
          <Button variant="outline" size="sm" onClick={() => setStep(3)}>
            {t('Edit')}
          </Button>
        ) : null}
      </CardHeader>
      <CardContent>{step == 3 ? <PaymentForm /> : <PaymentSectionReadonly />}</CardContent>
    </Card>
  );
}

function PaymentSectionReadonly() {
  const t = useTranslations('Checkout');
  return (
    <div className="px-4">
      {cartStore.cart.paymentMethod === '' ? (
        <p>{t('No payment method selected')}</p>
      ) : (
        <p>{cartStore.cart.paymentMethod === 'creditCard' ? t('Credit Card') : t('PayPal')}</p>
      )}
    </div>
  );
}

function PaymentForm() {
  const t = useTranslations('Checkout');
  const { step, setStep } = useCheckout();
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const paymentMethod = formData.get('payment') as 'creditCard' | 'paypal' | null;

    if (!paymentMethod) {
      return;
    }

    cartStore.cart.paymentMethod = paymentMethod;
    cartStore.cart.orderPlaced = true;
    console.log('Selected payment method:', cartStore.cart.paymentMethod);
    setStep(step + 1);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
        {t('Demo only')}
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="payment"
            value="creditCard"
            defaultChecked={cartStore.cart.paymentMethod === 'creditCard'}
            className="form-radio h-5 w-5 text-primary"
          />
          <span>{t('Credit Card')}</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="payment"
            value="paypal"
            defaultChecked={cartStore.cart.paymentMethod === 'paypal'}
            className="form-radio h-5 w-5 text-primary"
          />
          <span>{t('PayPal')}</span>
        </label>
      </div>
      <Button type="submit" className="self-end">
        {t('Continue')}
      </Button>
    </form>
  );
}
