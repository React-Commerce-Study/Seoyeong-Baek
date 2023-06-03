import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductInfoDetail from '../common/product/ProductInfoDetail';
import ProductInfoDescription from './ProductInfoDescription';

export default function ProductInfo() {
  const location = useLocation();
  console.log(location.state);
  const product = location.state;

  return (
    <div>
      <h2>상품 상세페이지</h2>
      <ProductInfoDetail product={product} />
      <ProductInfoDescription />
    </div>
  );
}
