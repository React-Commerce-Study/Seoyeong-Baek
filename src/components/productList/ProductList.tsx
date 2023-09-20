import { useEffect, useState } from 'react';
import UseScrollChecker from '../../hooks/UseScrollChecker';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ProductInfoCard from './ProductListItem';
import { Product } from '../../@types/types';
import { getProductList } from '../../services/ResponseApi';

export default function ProductList() {
  const navigate = useNavigate();
  const [fetchPage, setFetchPage] = useState<number>(1);
  const [productList, setProductList] = useState<Product[]>([]);

  const isBottom = UseScrollChecker();

  useEffect(() => {
    if (isBottom) {
      setFetchPage((page) => page + 1);
    }
  }, [isBottom]);

  useEffect(() => {
    fetchProducts();

    async function fetchProducts() {
      const productData = await getProductList(fetchPage);
      console.log(productData);
      if (productData.next === null) return;
      else setProductList((preProductList) => [...preProductList, ...productData.results]);
    }
  }, [fetchPage]);

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
