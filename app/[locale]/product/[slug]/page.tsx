import { getProduct } from "@/app/actions/api";
import AddToCartButton from "@/components/AddToCartButton";
import DisplayPrice from "@/components/DisplayPrice";
import ProductImageCarousel from "@/components/pdp/ProductImageCarousel";
import StockStatus from "@/components/StockStatus";
import { StarRating } from "@/components/ui/StarRating";




export default async function ProductPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  const product = await getProduct(slug);

  return (
    <div className="flex flex-row my-10 gap-10 mx-6">
      <ProductImageCarousel images={product.images} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-sm">SKU: {product.sku}</p>
          </div>
          <StarRating value={product.rating} readOnly />
        </div>
        <div className="">
          <div>Description: {product.description}</div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex-1">
            <StockStatus status={product.availabilityStatus} />
            <DisplayPrice
              price={product.price}
              discountPercentage={product.discountPercentage}
              locale={locale}
            />
          </div>
          <AddToCartButton product={product} className="flex-1 max-w-md h-full" />
        </div>
        <div>
          <div>Return Policy: {product.returnPolicy}</div>
          <div>Shipping: {product.shippingInformation}</div>
          <div>Warranty: {product.warrantyInformation}</div>
        </div>
        <div>
          <h4 className="font-bold">Specifications:</h4>
          <ul className="list-disc list-inside pl-6">
            <li>Height: {product.dimensions.height} in.</li>
            <li>Width: {product.dimensions.width} in.</li>
            <li>Depth: {product.dimensions.depth} in.</li>
            <li>Weight: {product.weight} lbs.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}