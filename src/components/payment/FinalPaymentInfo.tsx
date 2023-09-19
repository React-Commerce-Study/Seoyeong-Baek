import styled from 'styled-components';
import AgreeCheckBox from '../common/form/checkBox/AgreeCheckBox';
import { AgreeCheckBoxStyle } from '../common/form/checkBox/AgreeCheckBoxStyle';

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
              <strong>{totalPrice.toLocaleString()}</strong>원
            </p>
          </li>
          <li>
            <p>- 할인금액</p>
            <p>
              <strong>0</strong>원
            </p>
          </li>
          <li>
            <p>- 배송비</p>
            <p>
              <strong>{totalDeliveryFee.toLocaleString()}</strong>원
            </p>
          </li>
          <li className="final-total-money">
            <p>- 결제금액</p>
            <p>
              <strong>{(totalPrice + totalDeliveryFee).toLocaleString()} 원</strong>
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

const SSectionLayout = styled.section`
  flex-basis: 30rem;

  .payment-info {
    box-sizing: border-box;
    border: 2px solid #21bf48;
    border-radius: 10px;
    overflow: hidden;
  }
`;

const SPaymentInfoList = styled.ul`
  padding: 32px 30px 20px;

  li {
    display: flex;
    justify-content: space-between;

    &:first-child,
    &:nth-child(2) {
      margin-bottom: 12px;
    }

    p {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-light);

      strong {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        margin-right: 4px;
      }
    }

    &.final-total-money {
      border-top: 1px solid var(--middle-gray-color);
      padding-top: 24px;
      margin-top: 19px;

      strong {
        color: #eb5757;
        font-size: var(--font-size-xl);
      }
    }
  }
`;

const SAgreeCheckBoxWrapper = styled(AgreeCheckBoxStyle)`
  background-color: #f2f2f2;
  padding: 30px 30px 34px;

  .check-box {
    margin-bottom: 30px;
  }

  .btn-box {
    margin: 0 auto;
    max-width: 220px;
  }
`;
