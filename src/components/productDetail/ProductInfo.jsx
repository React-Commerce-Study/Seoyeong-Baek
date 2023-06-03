import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductInfoDetail from '../common/product/ProductInfoDetail';
import ProductInfoDescription from './ProductInfoDescription';
import styled from 'styled-components';

export default function ProductInfo() {
  const location = useLocation();
  console.log(location.state);
  const product = location.state;

  return (
    <ProductInfoWrapper>
      <h2>상품 상세페이지</h2>
      <ProductInfoDetail product={product} />
      <ProductInfoDescription />
    </ProductInfoWrapper>
  );
}

const ProductInfoWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;
