import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getCurrencyConfig(locale: string = 'en') {
  let fullLocale = 'en-US';
  let currency = 'USD';

  if (locale === 'es') {
    fullLocale = 'es-MX';
    currency = 'MXN';
  } else if (locale === 'fr') {
    fullLocale = 'fr-CA';
    currency = 'CAD';
  }

  return { fullLocale, currency };
}

function roundToCurrencyPrecision(amount: number, locale: string = 'en'): number {
  const { fullLocale, currency } = getCurrencyConfig(locale);
  const formatter = new Intl.NumberFormat(fullLocale, {
    style: 'currency',
    currency,
  });
  const maximumFractionDigits = formatter.resolvedOptions().maximumFractionDigits ?? 2;
  const factor = 10 ** maximumFractionDigits;

  return Math.round((amount + Number.EPSILON) * factor) / factor;
}

export function hasEffectiveDiscount(
  originalPrice: number,
  discountedPrice: number,
  locale: string = 'en'
): boolean {
  return (
    discountedPrice < originalPrice &&
    roundToCurrencyPrecision(originalPrice, locale) !==
      roundToCurrencyPrecision(discountedPrice, locale)
  );
}

export function formatCurrency(amount: number, locale: string = 'en'): string {
  const { fullLocale, currency } = getCurrencyConfig(locale);

  return new Intl.NumberFormat(fullLocale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
