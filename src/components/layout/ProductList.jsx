import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import UseScrollChecker from '../../hooks/UseScrollChecker';
import styled from 'styled-components';

export default function ProductList() {
  const [fetchPage, setFetchPage] = useState(1);
  const [productList, setProductList] = useState([]);
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
      // console.log(data);
    } catch (error) {
      console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
    }
  }

  console.log(productList);

  return (
    <MainStyle>
      <ProductItem productList={productList} />
    </MainStyle>
  );
}

const MainStyle = styled.main`
  max-width: 1280px;
  margin: 80px auto 180px;
  box-sizing: border-box;
  box-shadow: inset 0 0 10px red;
`;
