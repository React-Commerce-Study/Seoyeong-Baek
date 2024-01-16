import styled from 'styled-components';

import AgreeCheckBox from '../common/form/checkBox/AgreeCheckBox';
import { AgreeCheckBoxStyle } from '../common/form/checkBox/AgreeCheckBoxStyle';
import { mediaQuery, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';

interface FinalPaymentInfoProps {
  totalPrice: number;
  totalDeliveryFee: number;
}

export default function FinalPaymentInfo({ totalPrice, totalDeliveryFee }: FinalPaymentInfoProps) {
  return (
    <SSectionLayout>
      <h3>최종결제 정보</h3>
      <fieldset className="payment-info">
        <SPaymentInfoList>
          <li>
            <p>- 상품금액</p>
            <p>
              <strong>{totalPrice.toLocaleString()}</strong>
              원
            </p>
          </li>
          <li>
            <p>- 할인금액</p>
            <p>
              <strong>0</strong>
              원
            </p>
          </li>
          <li>
            <p>- 배송비</p>
            <p>
              <strong>{totalDeliveryFee.toLocaleString()}</strong>
              원
            </p>
          </li>
          <li className="final-total-money">
            <p>- 결제금액</p>
            <p>
              <strong>
                {(totalPrice + totalDeliveryFee).toLocaleString()}
                {' '}
                원
              </strong>
            </p>
          </li>
        </SPaymentInfoList>
        <SAgreeCheckBoxWrapper>
          <AgreeCheckBox success="결제하기">주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</AgreeCheckBox>
        </SAgreeCheckBoxWrapper>
      </fieldset>
    </SSectionLayout>
  );
}

const SSectionLayout = styled.article`
  flex-basis: 30rem;

  .payment-info {
    box-sizing: border-box;
    border: 2px solid #21bf48;
    border-radius: 10px;
    overflow: hidden;
  }
`;

const SPaymentInfoList = styled.ul`
  padding: 2rem 1.875rem 1.25rem;

  li {
    display: flex;
    justify-content: space-between;

    &:first-child,
    &:nth-child(2) {
      margin-bottom: 0.75rem;
    }

    p {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-light);

      strong {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        margin-right: 0.25rem;
      }
    }

    &.final-total-money {
      border-top: 1px solid var(--middle-gray-color);
      padding-top: 1.5rem;
      margin-top: 1.1875rem;

      strong {
        color: #eb5757;
        font-size: var(--font-size-xl);
      }
    }
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 2rem 1rem 1.25rem;
  }
`;

const SAgreeCheckBoxWrapper = styled(AgreeCheckBoxStyle)`
  background-color: #f2f2f2;
  padding: 1.875rem 1.875rem 2.125rem;

  .check-box {
    margin-bottom: 1.875rem;
  }

  .btn-box {
    margin: 0 auto;
    max-width: 13.75rem;
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 2rem 1rem 1.25rem;
  }
`;
