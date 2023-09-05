import styled from 'styled-components';
import Button from '../common/Buttons/Button';

export default function ShippingInfoForm() {
  return (
    <SSectionLayout>
      <h3>배송정보</h3>
      <fieldset className="customer-info">
        <legend>주문자 정보</legend>
        <ul>
          <li>
            <label htmlFor="shippingName">이름</label>
            <input type="text" className="input-box" id="shippingName" />
          </li>
          <li className="tel">
            <label htmlFor="shippingTel">휴대폰</label>
            <div>
              <input type="tel" className="tel" id="shippingTel" name="shippingTel" />
              <span>-</span>
              <input type="tel" className="tel" id="shippingTel" />
              <span>-</span>
              <input type="tel" className="tel" id="shippingTel" />
            </div>
          </li>
          <li>
            <label htmlFor="">이메일</label>
            <input type="email" id="shippingMail" />
          </li>
        </ul>
      </fieldset>

      <fieldset className="address-info">
        <legend>배송지 정보</legend>
        <ul>
          <li>
            <label htmlFor="recipientName">수령인</label>
            <input type="text" className="name" id="recipientName" />
          </li>
          <li>
            <label htmlFor="">휴대폰</label>
            <div>
              <input type="tel" className="tel" id="recipientTel" name="recipientTel" />
              <span>-</span>
              <input type="tel" className="tel" id="recipientTel" />
              <span>-</span>
              <input type="tel" className="tel" id="recipientTel" />
            </div>
          </li>
          <li>
            <label htmlFor="recipientAddr">배송주소</label>
            <div className="recipient-addr-wrapper">
              <div className="addr-search">
                <input type="text" className="addr" id="recipientAddr" name="recipientAddr" readOnly />
                <Button padding="10px 31px" fontSize="16px" fontWeight="500">
                  우편번호조회
                </Button>
              </div>
              <input type="text" className="addr" id="recipientAddr" name="recipientAddr" />
              <input type="text" className="addr" id="recipientAddr" name="recipientAddr" />
            </div>
          </li>
          <li>
            <label htmlFor="">배송메세지</label>
            <input type="text" />
          </li>
        </ul>
      </fieldset>
    </SSectionLayout>
  );
}

const SSectionLayout = styled.section`
  margin-top: 6rem;

  h3 {
    border-bottom: 2px solid #c4c4c4;
  }

  fieldset {
    margin-top: 40px;

    legend {
      font-size: 1.125rem;
      border-bottom: 2px solid #c4c4c4;
      padding-bottom: 0.5rem;
      width: 100%;
    }

    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #c4c4c4;
      display: flex;
      align-items: center;
      gap: 90px;

      label {
        display: inline-block;
        width: 80px;
      }

      input {
        border: 1px solid #c4c4c4;
        padding: 0.625rem 0.6rem;
        font-size: 16px;
        font-weight: 400;

        &#shippingName,
        &#shippingMail,
        &#recipientName {
          width: 334px;
        }

        &[type='tel'] {
          width: 100px;

          &:first-child {
            width: 80px;
          }
        }
      }

      span {
        margin: 0 10px;
      }

      .recipient-addr-wrapper {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        gap: 8px;

        .addr-search {
          display: flex;
          gap: 10px;
          align-items: center;

          input {
            width: 170px;
          }
        }
        & > input {
          width: 800px;
        }
      }
    }

    &.address-info {
      input {
        width: 800px;
      }
    }
  }
`;
