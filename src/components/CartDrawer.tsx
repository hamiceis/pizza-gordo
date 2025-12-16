import React from "react";
import { useCartStore } from "@/store/cartStore";
import { Button, cn } from "@/components/ui/UIComponents";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";

export const CartDrawer: React.FC = () => {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotal } =
    useCartStore();
  const total = getTotal();
  const navigate = useNavigate();

  const handleGoToCart = () => {
    navigate({ to: "/cart" });
    toggleCart();
  };

  return (
    <>
      {/* Camada de Fundo */}
      <div
        className={cn(
          "fixed inset-0 bg-pizza-dark/60 z-40 transition-opacity duration-300 backdrop-blur-sm",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleCart}
      />

      {/* Gaveta Lateral */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col border-l border-stone-200",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-pizza-red" />
            <h2 className="text-lg font-bold text-pizza-dark">Seu Pedido</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <X className="w-5 h-5 text-pizza-dark" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-stone-100 p-6 rounded-full">
                <ShoppingBag className="w-12 h-12 text-stone-400" />
              </div>
              <p className="text-stone-500">Seu carrinho está vazio.</p>
              <Button variant="outline" onClick={toggleCart}>
                Ver Cardápio
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-stone-100 pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-pizza-dark">{item.name}</h4>
                  <p className="text-pizza-red font-bold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-stone-200 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-stone-100 text-stone-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-stone-100 text-stone-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-stone-100 bg-stone-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-600">Total</span>
              <span className="text-2xl font-bold text-pizza-red">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)}
              </span>
            </div>
            <Button
              className="w-full bg-pizza-green hover:bg-pizza-green/90 h-12 text-lg"
              onClick={handleGoToCart}
            >
              Ver Carrinho e Finalizar
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
