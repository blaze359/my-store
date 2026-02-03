"use client";

import cartStore from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/productTypes";


export default function AddToCartButton({ product }: Readonly<{ product: Product }>) {
  function handleClick() {
    if (!product) return;

    // Omit quantity, total, discountedTotal — the store handles them
    const cartData = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
    };

    cartStore.addToCart(cartData, 1);
  }

  return (
    <Button className="my-4" onClick={() => handleClick()}>
      Add to Cart
    </Button>
  );
}