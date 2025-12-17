import { useState } from "react";
import {
  Clock,
  MapPin,
  Flame,
  UtensilsCrossed,
  Phone,
  Search,
  Star,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductCarousel } from "@/components/ProductCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { PRODUCTS } from "@/data/products";
import { TESTIMONIALS } from "@/data/testimonials";
import { Category } from "@/types";

export const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const popularProducts = PRODUCTS.filter((p) => p.popular);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory =
      activeCategory === "todos" ? true : p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="min-h-screen bg-background font-sans text-foreground">
        {/* HERO SECTION */}
        <section className="relative h-[80vh] md:h-[650px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop"
              alt="Pizza Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pizza-dark via-pizza-dark/70 to-pizza-dark/40" />
          </div>

          <div className="container relative z-10 px-4 text-center text-white">
            <StatusBadge className="mb-6 scale-125 shadow-lg" />

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg">
              A Pizza mais <span className="text-pizza-yellow">Recheada</span>{" "}
              da Cidade
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto drop-shadow-md font-medium">
              Ingredientes premium, muito recheio e aquele sabor inconfundível
              do forno a lenha. Peça no conforto da sua casa.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 text-lg bg-pizza-red hover:bg-red-700 w-full sm:w-auto shadow-lg shadow-pizza-red/20 border-2 border-transparent hover:border-white/20"
                onClick={() => scrollToSection("menu")}
              >
                <UtensilsCrossed className="mr-2 w-5 h-5" />
                Ver Cardápio
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-lg bg-green-600 text-zinc-200 border-green-400 hover:bg-white/10 w-full sm:w-auto backdrop-blur-sm"
              >
                <Phone className="mr-2 w-5 h-5" />
                Chamar no WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* INFO BAR */}
        <div className="bg-card border-b border-border py-6 shadow-sm sticky top-[60px] md:top-0 z-20">
          <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pizza-red/10 rounded-full text-pizza-red">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase">
                  Horário
                </p>
                <p className="font-medium text-foreground">
                  Seg - Sab: 17h às 23h
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pizza-red/10 rounded-full text-pizza-red">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase">
                  Localização
                </p>
                <p className="font-medium text-foreground">
                  Rua das Pizzas, 123 - Centro
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="p-2 bg-pizza-red/10 rounded-full text-pizza-red">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase">
                  Qualidade
                </p>
                <p className="font-medium text-foreground">Forno a Lenha</p>
              </div>
            </div>
          </div>
        </div>

        {/* MENU SECTION */}
        <section id="menu" className="py-12 md:py-20 container mx-auto px-4">
          {/* CAROUSEL */}
          <ProductCarousel
            products={popularProducts}
            title="Destaques da Casa"
          />

          <div className="text-center mb-12 mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cardápio Completo
            </h2>
            <div className="w-20 h-1 bg-pizza-orange mx-auto rounded-full mb-8" />

            {/* Search & Filter */}
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Buscar por sabor..."
                  className="pl-10 h-12 rounded-full border-stone-200 shadow-sm focus:ring-pizza-orange"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: "todos", label: "Todos" },
                  { id: "pizza", label: "Pizzas" },
                  { id: "combo", label: "Combos" },
                  { id: "sobremesa", label: "Sobremesas" },
                  { id: "bebida", label: "Bebidas" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as Category)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? "bg-pizza-red text-white shadow-md scale-105"
                        : "bg-card text-muted-foreground border border-border hover:bg-muted"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-card rounded-xl border border-dashed border-border">
                <p className="text-muted-foreground text-lg">
                  Nenhum produto encontrado com esse nome.
                </p>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("todos");
                  }}
                  className="mt-4 text-pizza-red"
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section
          id="avaliacoes"
          className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                A Galera Aprova
              </h2>
              <div className="w-20 h-1 bg-pizza-orange mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl relative border border-white/10 hover:-translate-y-2 transition-transform duration-300 shadow-xl"
                >
                  <div className="absolute -top-6 left-8">
                    <div className="bg-pizza-red text-white p-3 rounded-xl shadow-lg transform rotate-3">
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                  <div className="mt-6 mb-6">
                    <div className="flex gap-1 mb-4 text-pizza-yellow">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "fill-current"
                              : "text-stone-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-stone-300 italic text-lg leading-relaxed">
                      "{testimonial.comment}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-pizza-orange"
                    />
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-xs text-pizza-green font-bold bg-pizza-green/20 px-2 py-0.5 rounded-full inline-block mt-1">
                        Cliente Verificado
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
