import { useState } from 'react';

import styled from 'styled-components';

import { OrderData, ExtendedOrderData } from '../../@types/types';
import CheckBoxFill from '../../assets/icon/check-round-Fill.svg';
import CheckBox from '../../assets/icon/check-round.svg';

interface PaymentMethodProps {
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  order_kind: string;
  setOneOrderData: React.Dispatch<React.SetStateAction<ExtendedOrderData>>;
}

export default function PaymentMethod({ setOrderData, order_kind, setOneOrderData }: PaymentMethodProps) {
  const paymentMethod = ['CARD', 'DEPOSIT', 'PHONE_PAYMENT', 'NAVERPAY', 'KAKAOPAY'];
  const paymentMethodLabel = ['신용/체크카드', '무통장 입금', '휴대폰 결제', '네이버 페이', '카카오 페이'];

  const [selectedPayment, setSelectedPayment] = useState('');

  const handleRadioChange = (value: string) => {
    setSelectedPayment(value);
    order_kind !== 'cart_order'
      ? setOneOrderData((prevData) => { return { ...prevData, payment_method: value }; })
      : setOrderData((prevData) => { return { ...prevData, payment_method: value }; });
  };

  return (
    <SSectionLayout>
      <h3>결제수단</h3>
      <fieldset className="payment-method">
        <ul className="payment-method-list">
          {paymentMethod.map((method, i) => {
            return (
              <li key={i}>
                <input type="radio" id={method} name="payment-method" value={method} />
                <label
                  htmlFor={method}
                  onClick={() => { return handleRadioChange(method); }}
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

const SSectionLayout = styled.article`
  flex-basis: 47.5rem;

  h3 {
    border-bottom: 0.125rem solid var(--middle-gray-color);
  }

  .payment-method-list {
    display: flex;
    padding: 1.125rem 0.75rem 1.125rem 0.75rem;
    border-bottom: 2px solid var(--middle-gray-color);
    flex-wrap: wrap;
    gap: 1.25rem;

    li {
      flex-shrink: 0;

      input {
        display: none;
      }

      label {
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-light);
        display: flex;
        align-items: center;
        gap: 0.625rem;

        &::before {
          content: '';
          background: url(${CheckBox}) no-repeat center center;
          width: 1.25rem;
          height: 1.25rem;
          transition: all 0.3s ease;
        }

        &.selected::before {
          content: '';
          background: url(${CheckBoxFill}) no-repeat center center;
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }
  }
`;
