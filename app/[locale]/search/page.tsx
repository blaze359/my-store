import { searchProducts } from "@/app/actions/api";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/productTypes";
import { getLocale } from "next-intl/server";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q ?? "";

  const searchResults: Product[] = await searchProducts(query as string);
  const locale = await getLocale();

  return (
    <div>
      <h2 className="text-2xl font-bold">Results for: {query}</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}