import { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Buttons/Button';
import CheckBox from '../../assets/icon/check-box.svg';
import CheckBoxFill from '../../assets/icon/check-fill-box.svg';

export default function FinalPaymentInfo() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    console.log('check');
    !isChecked ? setIsChecked(true) : setIsChecked(false);
  };
  return (
    <SSectionLayout>
      <h3>최종결제 정보</h3>
      <fieldset className="payment-info">
        <SPaymentInfoList>
          <li>
            <p>- 상품금액</p>
            <p>
              <strong>0</strong>원
            </p>
          </li>
          <li>
            <p>- 상품금액</p>
            <p>
              <strong>0</strong>원
            </p>
          </li>
          <li>
            <p>- 배송비</p>
            <p>
              <strong>0</strong>원
            </p>
          </li>
          <li className="final-total-money">
            <p>- 결제금액</p>
            <p>
              <strong>0 원</strong>
            </p>
          </li>
        </SPaymentInfoList>
        <SPaymentConfirmWrapper>
          <div className="payment-confirm">
            <input type="checkbox" id="agree" />
            <label htmlFor="agree" onClick={handleCheck} className={isChecked ? 'checked' : ''}>
              주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
            </label>
          </div>
          <div className="btn-container">
            <Button fontSize="24px" disabled={!isChecked}>
              결제하기
            </Button>
          </div>
        </SPaymentConfirmWrapper>
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
      font-size: 16px;
      font-weight: 400;

      strong {
        font-size: 18px;
        font-weight: 700;
        margin-right: 4px;
      }
    }

    &.final-total-money {
      border-top: 1px solid #c4c4c4;
      padding-top: 24px;
      margin-top: 19px;

      strong {
        color: #eb5757;
        font-size: 24px;
      }
    }
  }
`;

const SPaymentConfirmWrapper = styled.div`
  background-color: #f2f2f2;
  padding: 30px 30px 34px;

  .payment-confirm {
    margin-bottom: 30px;

    input {
      display: none;
    }

    label {
      display: flex;
      align-items: center;
      gap: 10px;

      &::before {
        content: '';
        background: url(${CheckBox}) no-repeat center center;
        width: 16px;
        height: 16px;
        transition: all 0.3s ease;
      }

      &.checked::before {
        content: '';
        background: url(${CheckBoxFill}) no-repeat center center;
        width: 16px;
        height: 16px;
      }
    }
  }

  .btn-container {
    margin: 0 auto;
    max-width: 220px;
  }
`;
