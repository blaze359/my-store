import { getCategories, getProductsByCategory } from '@/app/actions/api';
import ProductCard from '@/components/ProductCard';
import { Category, Product } from '@/lib/productTypes';
import { getLocale } from 'next-intl/server';

export default async function ProductList({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const products = await getProductsByCategory(slug);
  const locale = await getLocale();
  const category = categories.find((cat: Category) => cat.slug === slug);

  return (
    <main className="my-8">
      <h1 className="text-2xl font-bold">{category?.name}</h1>
      <div className="flex flex-wrap gap-4 mt-4">
        {products.products.map((product: Product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </main>
  );
}
