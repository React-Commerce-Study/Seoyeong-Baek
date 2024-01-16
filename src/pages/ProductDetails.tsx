import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

import ScrollTopButton from '../components/common/Buttons/ScrollTopButton';
import Footer from '../components/common/Footer/Footer';
import Header from '../components/common/Header/Header';
import ProductDetailItem from '../components/productDetail/ProductDetailItem';
import ProductDetailNav from '../components/productDetail/ProductDetailNav';
import ScrollTop from '../components/scroll/ScrollTop';

export default function ProductDetails() {
  const location = useLocation();
  // console.log(location.state);
  const product = location.state;

  return (
    <>
      <ScrollTop />
      <Header />
      <SProductInfoMain>
        <h2 className="a11y-hidden">상품 상세페이지</h2>
        <ProductDetailItem product={product} />
        <ProductDetailNav />
      </SProductInfoMain>
      <ScrollTopButton />
      <Footer />
    </>
  );
}

const SProductInfoMain = styled.main`
  width: 100vw;
  box-sizing: border-box;
  padding: 0 1rem;
`;
