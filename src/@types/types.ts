interface Product {
  product_id: number;
  image: string;
  product_name: string;
  store_name: string;
  price: number;
  shipping_fee: number;
  stock: number;
}

interface CartProduct {
  my_cart: number;
  cart_item_id: number;
  is_active: boolean;
  product_id: number;
  quantity: number;
}

export type { Product, CartProduct };
