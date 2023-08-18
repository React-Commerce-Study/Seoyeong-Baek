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

interface ProductData {
  product_id: number;
  quantity: number;
  check: boolean;
}

export type { Product, CartProduct, ProductData };
