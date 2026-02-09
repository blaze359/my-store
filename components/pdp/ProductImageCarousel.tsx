import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselProgress } from "@/components/ui/carousel";
import Image from "next/image";

type ProductImageCarouselProps = {
  images: string[];
};

export default function ProductImageCarousel({ images }: Readonly<ProductImageCarouselProps>) {
  return (
    <Carousel className="w-full mt-4">
      <CarouselContent>
        {images.map((image: string, index: number) => (
          <CarouselItem key={index}>
            <Image
              src={image}
              alt={`image ${index + 1}`}
              width={500}
              height={500}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <div className="flex justify-between gap-2 mt-4">
          <CarouselPrevious />
          <CarouselProgress />
          <CarouselNext />
        </div>
      )}
    </Carousel>
  );
}