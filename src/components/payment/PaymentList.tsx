import styled from 'styled-components';
import PaymentItem from './PaymentItem';

interface PaymentListProps {
  orderListId: number[];
  finalPrice?: number;
  orderListQuantity?: number[];
}

export default function PaymentList({ orderListId, finalPrice, orderListQuantity }: PaymentListProps) {
  console.log(orderListId);
  console.log(orderListQuantity);

  return (
    <>
      <STitle>주문/결제하기</STitle>
      <SCategoryList>
        <li>상품정보</li>
        <li>할인</li>
        <li>배송비</li>
        <li>주문금액</li>
      </SCategoryList>

      <SCartListContainer>
        {orderListId.length !== 0 &&
          orderListId.map((orderId, i) => {
            return <PaymentItem key={i} orderId={orderId} quantity={orderListQuantity?.[i] || 1} />;
          })}
      </SCartListContainer>

      <STotalPrice>
        <p>
          총 주문금액<strong>{finalPrice?.toLocaleString()}원</strong>
        </p>
      </STotalPrice>
    </>
  );
}

const STitle = styled.h2`
  margin: 54px 0 52px;
  font-size: var(--font-size-xxl) rem;
  font-weight: var(--font-weight-bold);
  text-align: center;
`;

const SCategoryList = styled.ul`
  display: flex;
  text-align: center;
  border-radius: 10px;
  background: #f2f2f2;
  padding: 19px 0;

  li {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-light);

    &:first-child {
      flex-basis: 40%;
    }

    &:not(:first-child) {
      flex-basis: 20%;
    }
  }
`;

const SCartListContainer = styled.section`
  margin: 16px 0 30px;
  display: flex;
  flex-direction: column;
`;

const STotalPrice = styled.div`
  text-align: end;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);

  strong {
    margin: 10px;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: #eb5757;
  }
`;
