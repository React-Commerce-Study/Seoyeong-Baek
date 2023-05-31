import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';

export default function ProductList() {
  const [fetchPage, setFetchPage] = useState(1);
  const [productList, setProductList] = useState([]);
  const url = 'https://openmarket.weniv.co.kr/products';

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(`${url}?page=${fetchPage}`);
      if (!response.ok) {
        throw new Error('네트워크에 문제가 있습니다.');
      }
      const data = await response.json();
      setProductList(data.results);
      // console.log(data);
    } catch (error) {
      console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
    }
  }

  // console.log(productList.results);

  return (
    <main>
      <ProductItem productList={productList} />
    </main>
  );
}
