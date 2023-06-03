import React from 'react';
import styled from 'styled-components';
import ProductInfoCard from '../common/product/ProductInfoCard';
import { useNavigate } from 'react-router-dom';

export default function ProductItem({ productList }) {
  const navigate = useNavigate();

  return (
    <ProductListContainerStyle>
      {productList &&
        productList.map((product) => {
          return (
            <li key={product.product_id} onClick={() => navigate(`/product/${product.product_id}`, { state: product })}>
              <ProductInfoCard product={product} />
            </li>
          );
        })}
    </ProductListContainerStyle>
  );
}

const ProductListContainerStyle = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 70px;
`;
