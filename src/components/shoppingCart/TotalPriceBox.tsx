import styled from 'styled-components';
import MinusIcon from '../../assets/icon/minus-icon_2.svg';
import PlusIcon from '../../assets/icon/plus-icon_2.svg';
import { useTotalPrice, useTotalDeliveryPrice } from '../../hooks/UseFinalPrice';
import { mediaQuery, BREAKPOINT_PC, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';

export default function TotalPriceBox() {
  const totalPrice = useTotalPrice();
  const totalDeliveryFee = useTotalDeliveryPrice();
  const finalPrice = totalPrice + totalDeliveryFee;

  return (
    <SCartTotalPriceContainer>
      <li className="price-box">
        <p>총 상품금액</p>
        <p>
          <strong>{totalPrice ? totalPrice.toLocaleString() : 0}</strong> 원
        </p>
      </li>
      <li className="discount-price">
        <p>상품 할인</p>
        <p>
          <strong>0</strong> 원
        </p>
      </li>
      <li className="delivery-price">
        <p>배송비</p>
        <p>
          <strong>{totalDeliveryFee ? totalDeliveryFee.toLocaleString() : 0}</strong> 원
        </p>
      </li>
      <li className="final-total-price">
        <p>결제 예정 금액</p>
        <p>
          <strong>{finalPrice ? finalPrice.toLocaleString() : 0}</strong> 원
        </p>
      </li>
    </SCartTotalPriceContainer>
  );
}

const SCartTotalPriceContainer = styled.ul`
  background: #f2f2f2;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.875rem 0 2.625rem;
  box-sizing: border-box;
  border-radius: 10px;
  position: relative;

  li {
    flex-basis: 25%;
    text-align: center;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-light);

    & > p:first-child {
      margin-bottom: 0.75rem;
    }

    strong {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
    }
  }

  .price-box::after,
  .discount-price::after {
    content: '';
    display: inline-block;
    background: url(${MinusIcon}) no-repeat center center;
    width: 2.125rem;
    height: 2.125rem;
    position: absolute;
    left: 25%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .discount-price::after {
    background: url(${PlusIcon}) no-repeat center center;
    left: 50%;
  }

  .final-total-price > p {
    font-weight: var(--font-weight-bold);
  }

  ${mediaQuery(BREAKPOINT_PC)} {
    flex-direction: column;
    padding: 2rem 2rem;
    gap: 1rem;

    .price-box::after,
    .discount-price::after {
      display: none;
    }

    li {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--font-size-sm);

      & > p:first-child {
        margin-bottom: 0;
      }

      &:last-child {
        padding-top: 1rem;
        border-top: 0.063rem solid var(--middle-gray-color);
        font-size: var(--font-size-md);
      }

      &:not(:last-child) strong {
        font-size: var(--font-size-lg);
      }
    }
  }
  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 2rem 1.2rem;
  }
`;
