import { formatCurrency, cn } from "@/lib/utils";

type DisplayPriceProps = {
  price: number;
  discountPercentage?: number;
  className?: string;
  locale: string
  displayPercentage?: boolean;
};

export default function DisplayPrice({
  price,
  discountPercentage,
  className,
  locale,
  displayPercentage = true,
}: Readonly<DisplayPriceProps>) {

  return (
    <>
      {discountPercentage ? (
              <div className={cn("flex gap-2", className)}>
                <div className="line-through text-red-500">
                  {formatCurrency(price, locale)}
                </div>
                {displayPercentage && <div>({discountPercentage}%)</div>}
                <div>
                  {formatCurrency(
                    price -
                      (price * (discountPercentage ?? 0)) / 100,
                    locale,
                  )}
                </div>
              </div>
            ) : (
              <div>Price: {formatCurrency(price, locale)}</div>
            )}
    </>
  );
}