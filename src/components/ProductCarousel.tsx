import React, { useRef } from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300; // Largura aproximada do card
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full mb-12 relative group/carousel">
      <div className="flex items-center gap-2 mb-6 px-1">
        <div className="p-2 bg-pizza-orange/10 rounded-full">
          <Flame className="w-6 h-6 text-pizza-orange fill-pizza-orange" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-pizza-dark">
          {title}
        </h2>
      </div>

      {/* Controles */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border border-stone-200 p-3 rounded-full shadow-lg text-pizza-dark opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 -ml-4 md:ml-0 hover:bg-white hover:text-pizza-red"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border border-stone-200 p-3 rounded-full shadow-lg text-pizza-dark opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 -mr-4 md:mr-0 hover:bg-white hover:text-pizza-red"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Container de Rolagem */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[280px] md:min-w-[320px] snap-center"
          >
            <ProductCard
              product={product}
              className="h-full shadow-md hover:shadow-xl border-stone-100"
            />
          </div>
        ))}
        {/* Elemento de preenchimento para rolagem à direita */}
        <div className="min-w-[1rem]" />
      </div>
    </div>
  );
};
