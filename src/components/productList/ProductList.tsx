import { useEffect, useState } from 'react';
import UseScrollChecker from '../../hooks/UseScrollChecker';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ProductInfoCard from './ProductListItem';
import { Product } from '../../@types/types';
import { getProductList } from '../../services/ResponseApi';
import { mediaQuery, BREAKPOINT_PC, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';

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

const MainStyle = styled.section`
  width: 100vw;
  margin: 80px 0 180px;
  padding: 0 1.7rem;
  box-sizing: border-box;
  box-shadow: inset 0 0 10px red;

  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 0 0.7rem;
    margin: 3rem 0 8rem;
  }
`;

const ProductListContainerStyle = styled.ul`
  /* width: 100%; */
  margin: 0 auto;
  box-shadow: inset 0 0 10px red;
  max-width: 80rem;
  display: grid;
  /* grid-template-columns: repeat(auto-fill, 23.75rem); */
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 4.3rem;
  column-gap: 2.5rem;
  justify-content: space-between;

  ${mediaQuery(BREAKPOINT_PC)} {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    row-gap: 4rem;

    justify-content: space-between;
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    /* grid-template-columns: 1fr; */
    gap: 1rem;
    row-gap: 1.5rem;

    /* justify-content: space-between; */
    grid-template-columns: 1fr 1fr;
  }
`;
