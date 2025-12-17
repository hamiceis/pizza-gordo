import { useEffect, useState } from "react";
import { ShoppingCart, ChefHat } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/UIComponents";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";

export const Navbar = () => {
  const { items, toggleCart } = useCartStore(); // Removido view e setView
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Calcula total de itens para o badge
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  // Manipulador de rolagem para navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate({ to: "/" }).then(() => {
        // Pequeno delay para permitir a navegação antes de rolar
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isCartPage = location.pathname === "/cart";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled || isCartPage
          ? "bg-secondary/95 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="bg-pizza-red p-2 rounded-full border-2 border-white/20">
            <ChefHat className="text-white w-6 h-6" />
          </div>
          <span
            className={`text-2xl font-bold tracking-tight ${
              isScrolled || isCartPage
                ? "text-white"
                : "text-white drop-shadow-md"
            }`}
          >
            Pizza do Gordo
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {["Cardápio", "Avaliações", "Sobre", "Contato"].map((item) => (
            <button
              key={item}
              onClick={() =>
                scrollToSection(
                  item.toLowerCase() === "cardápio"
                    ? "menu"
                    : item.toLowerCase()
                )
              }
              className={`text-sm font-medium hover:text-pizza-yellow transition-colors ${
                isScrolled || isCartPage
                  ? "text-muted-foreground"
                  : "text-muted-foreground hover:text-white drop-shadow"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <Button
          onClick={toggleCart}
          variant="primary"
          className="relative shadow-lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">Carrinho</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-pizza-green text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
              {totalItems}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};
