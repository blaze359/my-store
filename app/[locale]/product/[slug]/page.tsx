import { getProduct } from "@/app/actions/api";
import AddToCartButton from "@/components/AddToCartButton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselProgress } from "@/components/ui/carousel";
import { StarRating } from "@/components/ui/StarRating";
import Image from "next/image";




export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <div className="flex flex-row my-6 gap-10 mx-6">
      <Carousel className="w-100 mt-4">
        <CarouselContent>
          {product.images.map((image: string, index: number) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                alt={`${product.title} image ${index + 1}`}
                width={300}
                height={300}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-between gap-2">
          <CarouselPrevious />
          <CarouselProgress />
          <CarouselNext />
        </div>
      </Carousel>
      <div>
        <p>{product.brand}</p>
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p>SKU: {product.sku}</p>
        <div>Description: {product.description}</div>
        <div>{product.availabilityStatus}</div>
        {product.discountPercentage ? (
          <div className="flex flex-row gap-2">
            <div className="line-through">${product.price}</div>
            <div>({product.discountPercentage}%)</div>
            <div>
              $
              {(
                product.price -
                (product.price * product.discountPercentage) / 100
              ).toFixed(2)}
            </div>
          </div>
        ) : (
          <div>Price: ${product.price}</div>
        )}
        <AddToCartButton product={product} />
        <StarRating value={product.rating} readOnly />
        <div>Return Policy: {product.returnPolicy}</div>
        <div>Shipping: {product.shippingInformation}</div>
        <div>Warranty: {product.warrantyInformation}</div>
        <div>
          <p>Specifications:</p>
          <ul className="list-disc list-inside">
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