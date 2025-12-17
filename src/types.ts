import { z } from "zod";

// Definição das categorias
export const categorySchema = z.enum([
  "todos",
  "pizza",
  "combo",
  "bebida",
  "sobremesa",
]);
export type Category = z.infer<typeof categorySchema>;

// Schema do Produto
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string().url(),
  category: z.enum(["pizza", "combo", "bebida", "sobremesa"]), // Subset of Category without "todos"
  popular: z.boolean().optional(),
});
export type Product = z.infer<typeof productSchema>;

// Schema do Item do Carrinho (Extende Produto)
export const cartItemSchema = productSchema.extend({
  quantity: z.number().min(1),
});
export type CartItem = z.infer<typeof cartItemSchema>;

// Schema de Depoimentos
export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  comment: z.string(),
  rating: z.number().min(1).max(5),
  avatar: z.string().url(),
});
export type Testimonial = z.infer<typeof testimonialSchema>;
