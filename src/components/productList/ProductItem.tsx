import React from 'react';
import styled from 'styled-components';
import ProductInfoCard from '../common/product/ProductInfoCard';
import { useNavigate } from 'react-router-dom';

interface Product {
  product_id: number;
}

interface ProductItemProps {
  productList: Product[];
}

export default function ProductItem({ productList }: ProductItemProps) {
  const navigate = useNavigate();
  console.log(productList);

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
