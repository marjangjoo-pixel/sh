export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_percent?: number;
  images: string[];
  category_id: string;
  brand?: string;
  stock: number;
  rating?: number;
  review_count?: number;
  features?: Record<string, string>;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
  parent_id?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selected_color?: string;
  selected_size?: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total_amount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: string;
  phone: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
}
