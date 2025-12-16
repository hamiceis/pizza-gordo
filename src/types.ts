export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'pizza' | 'combo' | 'bebida' | 'sobremesa';
  popular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  avatar: string;
}
