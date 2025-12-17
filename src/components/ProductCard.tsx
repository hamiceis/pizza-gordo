import { Product } from "@/types";
import { Button, Badge, Card, cn } from "@/components/ui/UIComponents";
import { Plus, Minus, ShoppingBasket } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  const cartItem = items.find((item) => item.id === product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleDecrement = () => {
    if (cartItem && cartItem.quantity === 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, -1);
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden group hover:shadow-xl transition-all duration-300 border-border hover:border-pizza-orange flex flex-col h-full",
        className
      )}
    >
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.popular && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-pizza-yellow text-black font-bold hover:bg-yellow-500 shadow-sm">
              Mais Pedido
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <h3 className="font-bold text-lg text-foreground font-sans leading-tight">
            {product.name}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xl font-bold text-pizza-red">
            {formatPrice(product.price)}
          </span>

          {cartItem ? (
            <div className="flex items-center bg-muted rounded-lg border border-border shadow-inner">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrement();
                }}
                className="w-9 h-9 flex items-center justify-center text-pizza-red hover:bg-red-50 rounded-l-lg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-foreground text-sm">
                {cartItem.quantity}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, 1);
                }}
                className="w-9 h-9 flex items-center justify-center text-pizza-green hover:bg-green-50 rounded-r-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                addItem(product);
              }}
              variant="primary"
              className="rounded-full px-4 shadow-pizza-red/20"
            >
              <ShoppingBasket className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
