import { useLocation } from 'react-router-dom';
import ProductInfoDescription from './ProductInfoDescription';
import styled from 'styled-components';
import ProductItemBox from './ProductItemBox';

export default function ProductInfo() {
  const location = useLocation();
  // console.log(location.state);
  const product = location.state;

  return (
    <ProductInfoWrapper>
      <h2 className="a11y-hidden">상품 상세페이지</h2>
      <ProductItemBox product={product} />
      <ProductInfoDescription />
    </ProductInfoWrapper>
  );
}

const ProductInfoWrapper = styled.div`
  max-width: 1280px;
  margin: 80px auto 0;
  box-shadow: inset 0 0 40px blue;
`;
