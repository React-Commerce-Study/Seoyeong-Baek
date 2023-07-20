import { useLocation } from 'react-router-dom';
import ScrollTop from '../components/scroll/ScrollTop';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';
import styled from 'styled-components';
import ProductDetailItem from '../components/productDetail/ProductDetailItem';
import ProductDetailNav from '../components/productDetail/ProductDetailNav';

export default function ProductDetails() {
  const location = useLocation();
  // console.log(location.state);
  const product = location.state;

  return (
    <>
      <ScrollTop />
      <Header />
      <ProductInfoStyle>
        <h2 className="a11y-hidden">상품 상세페이지</h2>
        <ProductDetailItem product={product} />
        <ProductDetailNav />
      </ProductInfoStyle>
      <Footer />
    </>
  );
}

const ProductInfoStyle = styled.main`
  max-width: 1280px;
  margin: 80px auto 0;
`;
