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

interface CartActiveData {
  product_id: number;
  quantity: number;
  is_active: boolean;
}

interface OrderData {
  total_price: number;
  order_kind: string;
  receiver: string;
  receiver_phone_number: string;
  address: string;
  address_message: string;
  payment_method: string;
}

// props type
interface PutCartItemProps {
  urlId: number;
  orderData: CartActiveData;
}

export type { Product, CartProduct, ProductData, OrderData, CartActiveData, PutCartItemProps };
