import styled from 'styled-components';

export default function ShippingInfoForm() {
  return (
    <SSectionLayout>
      <h3>배송정보</h3>
      <SCustomerInfoForm action="">
        <fieldset className="customer-info">
          <legend>주문자 정보</legend>
          <ul>
            <li className="input-wrapper">
              <label htmlFor="shippingName">이름</label>
              <input type="text" className="input-box" id="shippingName" />
            </li>
            <li className="input-wrapper tel">
              <label htmlFor="shippingTel">휴대폰</label>
              <input type="text" className="input-box" id="shippingTel" name="shippingTel" />
              <span>-</span>
              <input type="tel" className="tel2" />
              <span>-</span>
              <input type="tel" className="tel3" />
            </li>
            <li className="input-wrapper">
              <label htmlFor="">이메일</label>
              <input type="email" />
            </li>
          </ul>
        </fieldset>

        <fieldset className="address-info">
          <legend>배송지 정보</legend>
          <ul>
            <li className="input-wrapper">
              <label htmlFor="">수령인</label>
              <input type="text" className="name" />
            </li>
            <li className="input-wrapper ">
              <label htmlFor="">휴대폰</label>
              <input type="tel" className="tel1" />
              <span>-</span>
              <input type="tel" className="tel2" />
              <span>-</span>
              <input type="tel" className="tel3" />
            </li>
            <li className="input-wrapper">
              <label htmlFor="shippingAddr">배송주소</label>
              <div>
                <input type="text" className="input-box" id="shippingAddr" name="shippingAddr" />
                <button>우편번호조회</button>
              </div>
              <input type="text" className="input-box" id="shippingAddr" name="shippingAddr" />
              <input type="text" className="input-box" id="shippingAddr" name="shippingAddr" />
            </li>
            <li className="input-wrapper">
              <label htmlFor="">배송메세지</label>
              <input type="text" className="message" />
            </li>
          </ul>
        </fieldset>
      </SCustomerInfoForm>
    </SSectionLayout>
  );
}

const SSectionLayout = styled.section`
  margin-top: 6rem;
`;

const SCustomerInfoForm = styled.form`
  display: flex;
  flex-direction: column;

  fieldset {
    margin-top: 40px;

    legend {
      font-size: 1.125rem;
      border-bottom: 2px solid #c4c4c4;
      padding-bottom: 0.5rem;
    }

    .input-wrapper {
      padding: 0.5rem 0;
      border-bottom: 1px solid #c4c4c4;
      box-shadow: inset 0 0 3px royalblue;
    }

    label {
      display: inline-block;
      width: 5rem;
      box-shadow: inset 0 0 3px rebeccapurple;
      margin-right: 90px;
    }

    input {
      /* display: inline-block; */
      border: 1px solid #c4c4c4;
      padding: 0.4rem 0.6rem;
      font-size: 16px;
      font-weight: 400;
      /* width: 100%; */
    }

    span {
      margin: 0 10px;
    }

    .message {
      width: 50rem;
    }
  }
`;
