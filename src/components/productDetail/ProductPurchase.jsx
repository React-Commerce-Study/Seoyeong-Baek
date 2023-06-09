import React, { useState } from 'react';
import ProductCountButton from '../common/Buttons/ProductCountButton';
import PurchaseButton from '../common/Buttons/Button';
import styled from 'styled-components';

export default function ProductPurchase({ product }) {
  const [count, setCount] = useState(1);
  console.log(product);

  return (
    <PurchaseContainerStyle>
      <p className="text">택배배송 / {product.shipping_fee.toLocaleString()}원</p>
      {/* 구매수량 */}
      <div className="product-count-wrapper">
        <ProductCountButton count={count} setCount={setCount} productStock={product.stock} />
      </div>
      {/* 총 금액 */}
      <ProductTotalPriceStyle>
        <p>총 상품 금액</p>
        <div className="total-price-wrapper">
          <p className="total-count">
            총 수량 <strong>{product.stock === 0 ? 0 : count}</strong>개
          </p>
          <p className="total-price">
            <strong>{product.stock === 0 ? 0 : (count * product.price).toLocaleString()}</strong>원
          </p>
        </div>
      </ProductTotalPriceStyle>
      {/* 구매버튼 */}
      <ButtonWrapperStyle>
        <PurchaseButton type="button">바로 구매</PurchaseButton>
        <PurchaseButton type="button" bgColor="#767676">
          장바구니
        </PurchaseButton>
      </ButtonWrapperStyle>
    </PurchaseContainerStyle>
  );
}

const PurchaseContainerStyle = styled.div`
  width: 100%;

  .text {
    font-weight: 400;
    font-size: 16px;
    color: #767676;
  }

  .product-count-wrapper {
    border-top: 2px solid #c4c4c4;
    border-bottom: 2px solid #c4c4c4;
    padding: 30px 0;
    margin: 20px 0 46px;
  }
`;

const ProductTotalPriceStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  font-size: 18px;

  p {
    font-weight: 500;
    color: #000;
  }

  .total-price-wrapper {
    display: flex;
    align-items: center;
    font-weight: 400;

    .total-count {
      color: #767676;

      strong {
        color: var(--point-color);
        font-weight: 700;
      }
    }

    .total-count::after {
      content: '|';
      display: inline-block;
      margin: 0 12px;
      color: #c4c4c4;
    }

    .total-price {
      color: var(--point-color);

      strong {
        font-weight: 700;
        font-size: 36px;
        margin-right: 2px;
      }
    }
  }
`;

const ButtonWrapperStyle = styled.div`
  display: flex;
  gap: 14px;

  button:last-child {
    flex-basis: 45%;
  }
`;
