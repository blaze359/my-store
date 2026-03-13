import cartStore from "@/lib/cartStore";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import type { SubmitEventHandler } from 'react';
import { useCheckout } from './CheckoutContext';
import { useTranslations } from "next-intl";

export default function ShippingMethod() {
  const t = useTranslations('Checkout');
  const { step, setStep } = useCheckout();
  return (
    <Card title={t("Shipping Method")} className="pt-0 overflow-hidden mt-4">
      <CardHeader className="flex justify-between items-center align-middle bg-primary/25 py-2">
        <h2 className="text-lg font-bold">{t("Shipping Method")}</h2>
        {step > 2 ? (
          <Button variant="outline" size="sm" onClick={() => setStep(2)}>
            {t("Edit")}
          </Button>
        ) : null}
      </CardHeader>
      <CardContent>
        {step == 2 ?  <ShippingMethodForm /> : <ShippingMethodReadonly />}
      </CardContent>
    </Card>
  );
}

function ShippingMethodReadonly() {
  const t = useTranslations('Checkout');
  return (
    <div className="px-4">
      {cartStore.cart.shippingMethod === '' ? (
        <p>{t("No shipping method selected")}</p>
      ) : (
        <p>
          {cartStore.cart.shippingMethod === 'standard'
            ? t("standardRate")
            : t("expressRate")}
        </p>
      )}
    </div>
  );
}

function ShippingMethodForm() {
  const t = useTranslations('Checkout');
  const { step, setStep } = useCheckout();
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const shippingMethod = formData.get('shipping') as string;
    cartStore.cart.shippingMethod = shippingMethod as 'standard' | 'express';
    setStep(step + 1);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="shipping"
            value="standard"
            defaultChecked={cartStore.cart.shippingMethod === 'standard'}
          />
          <span>{t("standardRate")}</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="shipping"
            value="express"
            defaultChecked={cartStore.cart.shippingMethod === 'express'}
          />
          <span>{t("expressRate")}</span>
        </label>
      </div>
      <Button className="self-end mt-4" type="submit">
        {t("Continue to Payment")}
      </Button>
    </form>
  );
}