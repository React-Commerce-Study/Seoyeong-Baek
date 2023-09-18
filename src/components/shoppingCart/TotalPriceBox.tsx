import styled from 'styled-components';
import MinusIcon from '../../assets/icon/minus-icon_2.svg';
import PlusIcon from '../../assets/icon/plus-icon_2.svg';
import { useTotalPrice, useTotalDeliveryPrice } from '../../hooks/UseFinalPrice';

export default function TotalPriceBox() {
  const totalPrice = useTotalPrice();
  const totalDeliveryFee = useTotalDeliveryPrice();
  const finalPrice = totalPrice + totalDeliveryFee;

  return (
    <SCartTotalPriceContainer>
      <div className="price-box">
        <p>총 상품금액</p>
        <strong>{totalPrice ? totalPrice.toLocaleString() : 0}</strong> 원
      </div>
      <div className="discount-price">
        <p>상품 할인</p>
        <strong>0</strong> 원
      </div>
      <div className="delivery-price">
        <p>배송비</p>
        <strong>{totalDeliveryFee ? totalDeliveryFee.toLocaleString() : 0}</strong> 원
      </div>
      <div className="final-total-price">
        <p>결제 예정 금액</p>
        <strong>{finalPrice ? finalPrice.toLocaleString() : 0}</strong> 원
      </div>
    </SCartTotalPriceContainer>
  );
}

const SCartTotalPriceContainer = styled.section`
  background: #f2f2f2;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 46px 0 42px;
  border-radius: 10px;
  position: relative;

  div {
    flex-basis: 25%;
    text-align: center;
    font-size: 16px;
    font-weight: 400;

    p {
      margin-bottom: 12px;
    }

    strong {
      font-size: 24px;
      font-weight: 700;
    }
  }

  .price-box::after,
  .discount-price::after {
    content: '';
    display: inline-block;
    background: url(${MinusIcon}) no-repeat center center;
    width: 34px;
    height: 34px;
    position: absolute;
    left: 25%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .discount-price::after {
    background: url(${PlusIcon}) no-repeat center center;
    left: 50%;
  }
`;
