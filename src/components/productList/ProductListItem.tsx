import React from 'react';
import { ProductListItemStyle } from '../style/ProductListItemStyle';
import ProductDataImg from 'components/common/product/ProductDataImg';
import ProductDataInfo from 'components/common/product/ProductDataInfo';
import { Product } from '../../@types/types';

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
