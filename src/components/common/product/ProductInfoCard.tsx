import React from 'react';
import { ProductInfoCardStyle } from '../../style/ProductInfoCardStyle';
import ProductImg from 'components/productDetail/ProductImg';
import ProductInfoText from 'components/productDetail/ProductInfoText';

interface Product {
  product_id: number;
  image: string;
  product_name: string;
  store_name: string;
  price: number;
  shipping_fee: boolean;
  stock: number;
}

interface ProductItemBoxProps {
  product: Product;
}

export default function ProductInfoCard({ product }: ProductItemBoxProps) {
  return (
    <ProductInfoCardStyle>
      <ProductImg productImg={product.image} imgName={product.product_name} />
      <ProductInfoText product={product} isDelivery={false} />
    </ProductInfoCardStyle>
  );
}
