import CheckoutGuard from "@/components/checkout/CheckoutGuard";
import { getTranslations } from "next-intl/server";

export default async function CheckoutPage() {
  const t = await getTranslations('Checkout');
  return (
    <div className="my-6">
      <h1 className="font-bold text-2xl mb-2">{t('Checkout')}</h1>
      <CheckoutGuard />
    </div>
  );
}