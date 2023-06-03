import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductPurchase from './ProductPurchase';
import ProductInfoDescription from './ProductInfoDescription';
import { ProductInfoCardStyle } from '../style/ProductInfoCardStyle';
import styled from 'styled-components';

export default function ProductInfo() {
  const location = useLocation();
  console.log(location.state);
  const product = location.state;

  return (
    <ProductInfoWrapper>
      <h2 className="a11y-hidden">상품 상세페이지</h2>
      {/* <ProductInfoCard product={product} /> */}
      <ProductInfoCardRowStyle>
        <div className="img-box">
          <img src={product.image} alt={product.product_name} />
        </div>
        <div className="product-info-wrapper">
          <div className="info-box">
            <p className="store-name">{product.store_name}</p>
            <p className="product-name">{product.product_name}</p>
            <p className="product-price">
              <strong>{product.price.toLocaleString()}</strong>원
            </p>
          </div>
          {/* 구매부분 */}
          <ProductPurchase />
        </div>
      </ProductInfoCardRowStyle>
      <ProductInfoDescription />
    </ProductInfoWrapper>
  );
}

const ProductInfoWrapper = styled.div`
  max-width: 1280px;
  margin: 80px auto 0;
`;

const ProductInfoCardRowStyle = styled(ProductInfoCardStyle)`
  display: flex;
  gap: 50px;

  .img-box {
    border-radius: 0;
    width: 600px;
    height: 600px;
    flex-shrink: 0;
  }

  .product-info-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .info-box {
      margin-top: 0;
      margin-bottom: 138px;

      .store-name,
      .product-price {
        font-size: 18px;
      }

      .product-name,
      .product-price strong {
        font-size: 36px;
        line-height: 45px;
      }
    }
  }
`;
