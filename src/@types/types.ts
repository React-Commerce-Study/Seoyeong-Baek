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

interface ExtendedOrderData extends OrderData {
  product_id: number;
  quantity: number;
}

interface SignUpData {
  username: string;
  password: string;
  password2: string;
  phone_number: string;
  name: string;
}

interface ExtendedSignUpData extends SignUpData {
  company_registration_number: string;
  store_name: string;
}

interface TelData {
  [key: string]: string;
}

interface UserNameData {
  username: string;
}

interface CompanyRegistrationNumberData {
  company_registration_number: string;
}

interface LoginData {
  username: string;
  password: string;
  login_type: string;
}

interface UserData {
  id: string;
  token: string;
  user_type: string;
}

interface ReqOrderData {
  buyer: number;
  order_number: number;
  order_items: number[];
  order_quantity: number[];
  total_price: number;
  order_kind: string;
  receiver: string;
  receiver_phone_number: string;
  address: string;
  address_message: string;
  payment_method: string;
  delivery_status: string;
  created_at: string;
}

//postProduct
interface PostProductData {
  product_name: string;
  image?: Blob;
  price: number;
  shipping_method: string;
  stock: number;
  shipping_fee: number;
  product_info: string;
}

// carousel img
interface UnsplashPhoto {
  urls: {
    regular?: string;
    full?: string;
  };
}

// props type
interface PutItemProps {
  urlId: number;
  orderData?: CartActiveData;
  editData?: PostProductData;
}

export type {
  Product,
  CartProduct,
  ProductData,
  OrderData,
  CartActiveData,
  ExtendedOrderData,
  SignUpData,
  ExtendedSignUpData,
  TelData,
  UserNameData,
  LoginData,
  UserData,
  CompanyRegistrationNumberData,
  ReqOrderData,
  PostProductData,
  UnsplashPhoto,
  PutItemProps,
};
