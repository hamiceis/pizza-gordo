import React from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Flame } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title,
}) => {
  return (
    <div className="w-full mb-12 relative group/carousel   group/carou">
      <div className="flex items-center gap-2 mb-6 px-1">
        <div className="p-2 bg-pizza-orange/10 rounded-full">
          <Flame className="w-6 h-6 text-pizza-orange fill-pizza-orange" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-pizza-dark">
          {title}
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 pb-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
             <ProductCard
                product={product}
                className="h-full shadow-md hover:shadow-xl border-stone-100 transition-all duration-300"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Controles posicionados similar ao original, mas usando os componentes do shadcn */}
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-stone-200 shadow-lg text-pizza-dark opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 -ml-4 md:ml-0 hover:bg-white hover:text-pizza-red hover:border-pizza-red h-12 w-12" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-stone-200 shadow-lg text-pizza-dark opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 -mr-4 md:mr-0 hover:bg-white hover:text-pizza-red hover:border-pizza-red h-12 w-12" />
      </Carousel>
    </div>
  );
};
