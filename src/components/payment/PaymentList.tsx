import styled from 'styled-components';

import { mediaQuery, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';

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
    <section>
      <SCategoryList>
        <li>상품정보</li>
        <li>할인</li>
        <li>배송비</li>
        <li>주문금액</li>
      </SCategoryList>

      <SCartListContainer>
        {orderListId.length !== 0
          && orderListId.map((orderId, i) => {
            return <PaymentItem key={i} orderId={orderId} quantity={orderListQuantity?.[i] || 1} />;
          })}
      </SCartListContainer>

      <STotalPrice>
        <p>
          총 주문금액
          <strong>
            {finalPrice?.toLocaleString()}
            원
          </strong>
        </p>
      </STotalPrice>
    </section>
  );
}

const SCategoryList = styled.ul`
  display: flex;
  text-align: center;
  border-radius: 10px;
  background: #f2f2f2;
  padding: 1.1875rem 1rem;

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

  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 1rem 0.6rem;

    li {
      font-size: var(--font-size-sm);
    }
  }
`;

const SCartListContainer = styled.section`
  margin: 1rem 0 1.875rem;
  display: flex;
  flex-direction: column;

  ${mediaQuery(BREAKPOINT_TABLET)} {
    margin: 0.7rem 0;
  }
`;

const STotalPrice = styled.div`
  text-align: end;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);

  strong {
    margin: 0.625rem;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: #eb5757;
  }
`;
