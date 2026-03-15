import { formatCurrency, cn, hasEffectiveDiscount } from '@/lib/utils';
import { useTranslations } from 'next-intl';

type DisplayPriceProps = {
  price: number;
  discountPercentage?: number;
  className?: string;
  locale: string;
  displayPercentage?: boolean;
};

export default function DisplayPrice({
  price,
  discountPercentage,
  className,
  locale,
  displayPercentage = true,
}: Readonly<DisplayPriceProps>) {
  const t = useTranslations('Product');
  const discountedPrice = price - (price * (discountPercentage ?? 0)) / 100;
  const showDiscountState = Boolean(
    discountPercentage && hasEffectiveDiscount(price, discountedPrice, locale)
  );

  return (
    <>
      {showDiscountState ? (
        <div className={cn('flex gap-2 flex-row', className)}>
          <div className="line-through text-red-800">{formatCurrency(price, locale)}</div>
          {displayPercentage && <div>({discountPercentage}%)</div>}
          <div>{formatCurrency(discountedPrice, locale)}</div>
        </div>
      ) : (
        <div>
          {t('Price')}: {formatCurrency(price, locale)}
        </div>
      )}
    </>
  );
}
