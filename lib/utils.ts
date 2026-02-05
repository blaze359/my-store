import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, locale: string = 'en'): string {
  let fullLocale = 'en-US';
  let currency = 'USD';
  if (locale === 'es') {
    fullLocale = "es-MX";
    currency = 'MXN';
  } else if (locale === 'fr') {
    fullLocale = "fr-CA";
    currency = 'CAD';
  }
  
  return new Intl.NumberFormat(fullLocale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}