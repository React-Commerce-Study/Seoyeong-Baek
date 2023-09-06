import { useState } from 'react';
import styled from 'styled-components';
import CheckBox from '../../assets/icon/check-round.svg';
import CheckBoxFill from '../../assets/icon/check-round-Fill.svg';
import { OrderData } from '../../@types/types';

interface PaymentMethodProps {
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
}

export default function PaymentMethod({ setOrderData }: PaymentMethodProps) {
  const paymentMethod = ['CARD', 'DEPOSIT', 'PHONE_PAYMENT', 'NAVERPAY', 'KAKAOPAY'];
  const paymentMethodLabel = ['신용/체크카드', '무통장 입금', '휴대폰 결제', '네이버 페이', '카카오 페이'];

  const [selectedPayment, setSelectedPayment] = useState('');

  const handleRadioChange = (value: string) => {
    setSelectedPayment(value);
    setOrderData((prevData) => ({ ...prevData, payment_method: value }));
  };

  return (
    <SSectionLayout>
      <h3>결제수단</h3>
      <fieldset className="payment-method">
        <ul className="payment-method-list">
          {paymentMethod.map((method, i) => {
            return (
              <li>
                <input type="radio" id={method} name="payment-method" value={method} />
                <label
                  htmlFor={method}
                  onClick={() => handleRadioChange(method)}
                  className={selectedPayment === method ? 'selected' : ''}
                >
                  {paymentMethodLabel[i]}
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </SSectionLayout>
  );
}

const SSectionLayout = styled.section`
  /* width: 47.5rem; */
  flex-basis: 47.5rem;

  h3 {
    border-bottom: 2px solid #c4c4c4;
  }

  .payment-method-list {
    display: flex;
    padding: 1.125rem 0 1.125rem 0.75rem;
    border-bottom: 2px solid #c4c4c4;

    li {
      margin-right: 1.25rem;
      flex-shrink: 0;

      input {
        display: none;
      }

      label {
        font-size: 16px;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 0.625rem;

        &::before {
          content: '';
          background: url(${CheckBox}) no-repeat center center;
          width: 20px;
          height: 20px;
          transition: all 0.3s ease;
        }

        &.selected::before {
          content: '';
          background: url(${CheckBoxFill}) no-repeat center center;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;
