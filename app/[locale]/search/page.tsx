import { getCategories, searchProducts } from '@/app/actions/api';
import ProductCard from '@/components/ProductCard';
import { Category, Product } from '@/lib/productTypes';
import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export default async function SearchPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const t = await getTranslations('Search');
  const resolvedSearchParams = await searchParams;
  const queryParam = resolvedSearchParams.q ?? '';
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam;

  const cats = await getCategories();
  const selectedCategory = cats.find(
    (cat: Category) =>
      cat.name.toLocaleUpperCase().replaceAll(/[,']/g, '') ===
      query.toLocaleUpperCase().replaceAll(/[,']/g, '')
  );

  if (selectedCategory) {
    redirect(`/products/${selectedCategory.slug}`);
  }

  const searchResults: Product[] = await searchProducts(query);
  const locale = await getLocale();

  return (
    <div>
      <h2 className="text-2xl font-bold">
        {t('Results for')}: {query}
      </h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))
        ) : (
          <p>{t('No results found')}</p>
        )}
      </div>
    </div>
  );
}
