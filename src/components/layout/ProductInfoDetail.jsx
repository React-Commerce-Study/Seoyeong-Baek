import React from 'react';
import styled from 'styled-components';

export default function ProductInfoDetail({ product }) {
  //   console.log(product);
  return (
    <ProductInfoDetailStyle>
      <div className="img-box">
        <img src={product.image} alt={product.product_name} />
      </div>
      <div className="info-box">
        <p className="store-name">{product.store_name}</p>
        <p className="product-name">{product.product_name}</p>
        <p className="product-price">
          <strong>{product.price.toLocaleString()}</strong>원
        </p>
      </div>
    </ProductInfoDetailStyle>
  );
}

const ProductInfoDetailStyle = styled.div`
  .img-box {
    overflow: hidden;
    width: 380px;
    height: 380px;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info-box {
    margin-top: 16px;
    font-weight: 400;
    font-size: 16px;

    p:not(:last-child) {
      margin-bottom: 10px;
    }

    .store-name {
      color: #767676;
    }

    .product-name {
      font-size: 18px;
      line-height: 22px;
    }

    .product-price strong {
      margin-right: 2px;
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
    }
  }
`;
