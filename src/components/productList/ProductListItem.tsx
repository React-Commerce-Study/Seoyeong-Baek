import React from 'react';
import { ProductListItemStyle } from '../style/ProductListItemStyle';
import ProductDataImg from 'components/common/product/ProductDataImg';
import ProductDataInfo from 'components/common/product/ProductDataInfo';

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
    <ProductListItemStyle>
      <ProductDataImg productImg={product.image} imgName={product.product_name} />
      <ProductDataInfo product={product} isDelivery={false} />
    </ProductListItemStyle>
  );
}
