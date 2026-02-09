import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/lib/productTypes";
import { cn, formatCurrency } from "@/lib/utils";
import { StarRating } from "./ui/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface ProductData {
  product: Product;
  locale: string;
}

function StockStatus({ status }: { status: string }) {
  let colorClass = "text-gray-500";
  let icon = faCircleXmark;
  
  if (status === "In Stock") {
    colorClass = "text-green-500";
    icon = faCircleCheck;
  } else if (status === "Low Stock") {
    colorClass = "text-yellow-500";
    icon = faCircleExclamation;
  } else if (status === "Out of Stock") {
    colorClass = "text-red-500";
    icon = faCircleXmark;
  }
  
  return (
    <div className={cn(colorClass, "flex flex-row items-center gap-1")}>
    <FontAwesomeIcon icon={icon} className="h-4 w-4"/>
    {status}
    </div>
  );
}

export default function ProductCard({ product, locale }: Readonly<ProductData>) {
  console.log(product);
  return (
    <Card key={product.id} className="w-96">
      <div className="relative h-96">
        <Image
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <CardHeader className="bg-gray-100 py-4 flex-1">
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <StarRating value={product.rating} readOnly />
        <CardFooter className="font-bold flex flex-row justify-between items-baseline">
          <StockStatus status={product.availabilityStatus} />
          {product.discountPercentage > 0 ? (
            <div className="flex flex-col">
              <div className="line-through text-red-500">{formatCurrency(product.price, locale)}</div>
              <div>
                {formatCurrency(
                  product.price -
                  (product.price * product.discountPercentage) / 100,
                  locale
                )}
              </div>
            </div>
          ) : ( 
          <div>{formatCurrency(product.price, locale)}</div>
          )}
        </CardFooter>
      </CardHeader>
      <CardFooter className="flex gap-4">
        <Button color="gray" className="flex-1">
          Add to Cart
        </Button>
        <Link href={`/${locale}/product/${product?.id}`}>
          <Button className="flex-1 bg-secondary hover:bg-secondary-foreground text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
            More Info
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}