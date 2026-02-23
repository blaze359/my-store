'use client';
import { useLocale } from 'next-intl';

export default function Search() {
  const locale = useLocale();

  return (
    <form method="get" action={`/${locale}/search`} className="flex md:block">
      <input
        type="text"
        name="q"
        placeholder="Search products..."
        className="border border-gray-300 rounded-md px-2 py-1 mr-2 flex-1"
      />
      <button type="submit" className="bg-primary text-white rounded-md px-4 py-1">
        Search
      </button>
    </form>
  );
}
