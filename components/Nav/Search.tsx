'use client';
import { useLocale, useTranslations } from 'next-intl';

type SearchProps = {
  className?: string;
};

export default function Search({ className }: Readonly<SearchProps>) {
  const locale = useLocale();
  const t = useTranslations('Nav');

  return (
    <form method="get" action={`/${locale}/search`} className={`flex md:block ${className ?? ''}`}>
      <input
        type="text"
        name="q"
        placeholder={t('Search products')}
        className="border border-gray-300 rounded-md px-2 py-1 mr-2 flex-1"
      />
      <button type="submit" className="bg-primary text-white rounded-md px-4 py-1">
        {t('Search')}
      </button>
    </form>
  );
}
