import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  // Pizzas Salgadas
  {
    id: "1",
    name: "Margherita Suprema",
    description:
      "Molho de tomate artesanal, mussarela de búfala, manjericão fresco e azeite extra virgem.",
    price: 45.0,
    category: "pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop",
    popular: true,
  },
  {
    id: "2",
    name: "Calabresa do Gordo",
    description:
      "Calabresa defumada fatiada, muita cebola roxa, azeitonas pretas e orégano.",
    price: 42.0,
    category: "pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    popular: true,
  },
  {
    id: "3",
    name: "Quatro Queijos",
    description:
      "Mussarela, gorgonzola, parmesão e catupiry original gratinado.",
    price: 49.9,
    category: "pizza",
    image:
      "https://images.unsplash.com/photo-1573821663912-6df460f9c684?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Frango com Catupiry",
    description:
      "Frango desfiado temperado com especiarias e coberto com catupiry original.",
    price: 48.0,
    category: "pizza",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "9",
    name: "Portuguesa",
    description: "Presunto, ovos, cebola, ervilha, mussarela e azeitonas.",
    price: 46.0,
    category: "pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "10",
    name: "Pepperoni",
    description: "Mussarela coberta com fatias de pepperoni crocante.",
    price: 52.0,
    category: "pizza",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
    popular: true,
  },

  // Pizzas Doces
  {
    id: "11",
    name: "Brigadeiro",
    description: "Chocolate ao leite derretido e granulado de chocolate.",
    price: 35.0,
    category: "sobremesa",
    image:
      "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "12",
    name: "Romeu e Julieta",
    description: "Mussarela com goiabada cascão derretida.",
    price: 38.0,
    category: "sobremesa",
    image:
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800&auto=format&fit=crop",
  },

  // Combos
  {
    id: "5",
    name: "Combo Família",
    description:
      "2 Pizzas Grandes + 1 Refrigerante 2L + Borda Recheada Grátis.",
    price: 89.9,
    category: "combo",
    image:
      "https://images.unsplash.com/photo-1595854341625-f33ee104313d?q=80&w=800&auto=format&fit=crop",
    popular: true,
  },
  {
    id: "6",
    name: "Combo Casal",
    description:
      "1 Pizza Grande + 2 Refrigerantes Lata + 1 Pizza Doce Pequena.",
    price: 65.0,
    category: "combo",
    image:
      "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?q=80&w=800&auto=format&fit=crop",
  },

  // Bebidas
  {
    id: "7",
    name: "Coca-Cola 2L",
    description: "Garrafa 2 Litros gelada.",
    price: 14.0,
    category: "bebida",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "8",
    name: "Guaraná Antarctica 2L",
    description: "Garrafa 2 Litros gelada.",
    price: 12.0,
    category: "bebida",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "13",
    name: "Suco Natural Laranja",
    description: "Jarra de 1L de suco natural feito na hora.",
    price: 18.0,
    category: "bebida",
    image:
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop",
  },
];
