import React, { useEffect, useState } from 'react';
// import ProductItem from './ProductItem';
import UseScrollChecker from '../../hooks/UseScrollChecker';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ProductInfoCard from './ProductListItem';

interface Product {
  product_id: number;
  image: string;
  product_name: string;
  store_name: string;
  price: number;
  shipping_fee: number;
  stock: number;
}

export default function ProductList() {
  const navigate = useNavigate();

  const [fetchPage, setFetchPage] = useState<number>(1);
  const [productList, setProductList] = useState<Product[]>([]);
  const URL = 'https://openmarket.weniv.co.kr/products';

  const isBottom = UseScrollChecker();

  useEffect(() => {
    if (isBottom) {
      setFetchPage((page) => page + 1);
    }
  }, [isBottom]);

  useEffect(() => {
    fetchProducts();
  }, [fetchPage]);

  async function fetchProducts() {
    try {
      const response = await fetch(`${URL}/?page=${fetchPage}`);
      if (!response.ok) {
        throw new Error('네트워크에 문제가 있습니다.');
      }
      const data = await response.json();

      setProductList((preProductList) => {
        // concat 대신 사용할 수 있음, 이전 데이터와 합쳐주기
        return [...preProductList, ...data.results];
      });
      console.log(data);
    } catch (error) {
      console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
    }
  }
  // console.log(productList);

  return (
    <MainStyle>
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
    </MainStyle>
  );
}

const MainStyle = styled.main`
  max-width: 1280px;
  margin: 80px auto 180px;
  box-sizing: border-box;
`;

const ProductListContainerStyle = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 70px;
`;
