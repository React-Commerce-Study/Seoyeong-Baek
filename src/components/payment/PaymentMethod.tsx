import { useState } from 'react';
import styled from 'styled-components';
import CheckBox from '../../assets/icon/check-round.svg';
import CheckBoxFill from '../../assets/icon/check-round-Fill.svg';

export default function PaymentMethod() {
  const paymentMethod = ['creditCard', 'noBankbook', 'mobilePayment', 'naverPay', 'kakaoPay'];

  const [selectedPayment, setSelectedPayment] = useState('');

  const handleRadioChange = (value: string) => {
    // TODO: 여기서 폼으로 보내주기
    console.log(value);
    setSelectedPayment(value);
  };

  return (
    <SSectionLayout>
      <h3>결제수단</h3>
      <fieldset className="payment-method">
        <ul className="payment-method-list">
          {/* TODO: list (paymentMethod)를 map으로 돌리기 */}
          <li>
            <input type="radio" id={paymentMethod[0]} name="payment-method" value={paymentMethod[0]} />
            <label
              htmlFor={paymentMethod[0]}
              onClick={() => handleRadioChange(paymentMethod[0])}
              className={selectedPayment === paymentMethod[0] ? 'selected' : ''}
            >
              신용/체크카드
            </label>
          </li>
          <li>
            <input type="radio" id={paymentMethod[1]} name="payment-method" value={paymentMethod[1]} />
            <label
              htmlFor={paymentMethod[1]}
              onClick={() => handleRadioChange(paymentMethod[1])}
              className={selectedPayment === paymentMethod[1] ? 'selected' : ''}
            >
              무통장 입금
            </label>
          </li>
          <li>
            <input type="radio" id={paymentMethod[2]} name="payment-method" value={paymentMethod[2]} />
            <label
              htmlFor={paymentMethod[2]}
              onClick={() => handleRadioChange(paymentMethod[2])}
              className={selectedPayment === paymentMethod[2] ? 'selected' : ''}
            >
              휴대폰 결제
            </label>
          </li>
          <li>
            <input type="radio" id={paymentMethod[3]} name="payment-method" value={paymentMethod[3]} />
            <label
              htmlFor={paymentMethod[3]}
              onClick={() => handleRadioChange(paymentMethod[3])}
              className={selectedPayment === paymentMethod[3] ? 'selected' : ''}
            >
              네이버 페이
            </label>
          </li>
          <li>
            <input type="radio" id={paymentMethod[4]} name="payment-method" value={paymentMethod[4]} />
            <label
              htmlFor={paymentMethod[4]}
              onClick={() => handleRadioChange(paymentMethod[4])}
              className={selectedPayment === paymentMethod[4] ? 'selected' : ''}
            >
              카카오 페이
            </label>
          </li>
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
