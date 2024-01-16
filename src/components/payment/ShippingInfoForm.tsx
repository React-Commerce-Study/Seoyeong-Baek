import { useState, ChangeEvent, useEffect } from 'react';

import styled from 'styled-components';

import { OrderData, ExtendedOrderData, TelData } from '../../@types/types';
import Button from '../common/Buttons/Button';
import AddressModal from '../modal/AddressModal';
import { mediaQuery, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';

interface ShippingInfoFormProps {
  setOrderData: React.Dispatch<React.SetStateAction<OrderData>>;
  setOneOrderData: React.Dispatch<React.SetStateAction<ExtendedOrderData>>;
  order_kind: string;
}

export default function ShippingInfoForm({ setOrderData, setOneOrderData, order_kind }: ShippingInfoFormProps) {
  const [tel, setTel] = useState<TelData>({});

  const handleTelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTel({
      ...tel,
      [name]: value,
    });
  };

  useEffect(() => {
    const combinedTel = tel.tel1 + tel.tel2 + tel.tel3;
    order_kind !== 'cart_order'
      ? setOneOrderData((prevData) => { return { ...prevData, receiver_phone_number: combinedTel.toString() }; })
      : setOrderData((prevData) => { return { ...prevData, receiver_phone_number: combinedTel.toString() }; });
  }, [tel]);

  // 우편번호검색
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleFindAddrClick = () => {
    setIsOpenModal(true);
  };

  const [zoneCode, setZoneCode] = useState('');
  const [address, setAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  // console.log(extraAddress);

  useEffect(() => {
    const combinedAddress = `${address} ${extraAddress}`;
    order_kind !== 'cart_order'
      ? setOneOrderData((prevData) => { return { ...prevData, address: combinedAddress }; })
      : setOrderData((prevData) => { return { ...prevData, address: combinedAddress }; });
  }, [address, extraAddress]);

  const handleReceiverChange = (e: ChangeEvent<HTMLInputElement>) => {
    order_kind !== 'cart_order'
      ? setOneOrderData((prevData) => { return { ...prevData, receiver: e.target.value }; })
      : setOrderData((prevData) => { return { ...prevData, receiver: e.target.value }; });
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    order_kind !== 'cart_order'
      ? setOneOrderData((prevData) => { return { ...prevData, address_message: e.target.value }; })
      : setOrderData((prevData) => { return { ...prevData, address_message: e.target.value }; });
  };

  return (
    <SInfoInputLayout>
      <h3>배송정보</h3>
      <fieldset className="customer-info">
        <legend>주문자 정보</legend>
        <ul>
          <li>
            <label htmlFor="shippingName">이름</label>
            <input type="text" className="input-box" id="shippingName" required />
          </li>
          <li className="tel">
            <label htmlFor="shippingTel">휴대폰</label>
            <div className="tel-input-box">
              <input type="tel" className="tel" id="shippingTel" name="shippingTel" required />
              <span>-</span>
              <input type="tel" className="tel" id="shippingTel" required />
              <span>-</span>
              <input type="tel" className="tel" id="shippingTel" required />
            </div>
          </li>
          <li>
            <label htmlFor="">이메일</label>
            <input type="email" id="shippingMail" required />
          </li>
        </ul>
      </fieldset>

      <fieldset className="address-info">
        <legend>배송지 정보</legend>
        <ul>
          <li>
            <label htmlFor="recipientName">수령인</label>
            <input type="text" className="name" id="recipientName" required onChange={handleReceiverChange} />
          </li>
          <li>
            <label htmlFor="">휴대폰</label>
            <div className="tel-input-box">
              <input type="tel" className="tel" id="recipientTel" name="tel1" required onChange={handleTelChange} />
              <span>-</span>
              <input type="tel" className="tel" id="recipientTel" name="tel2" required onChange={handleTelChange} />
              <span>-</span>
              <input type="tel" className="tel" id="recipientTel" name="tel3" required onChange={handleTelChange} />
            </div>
          </li>
          <li>
            <label htmlFor="recipientAddr">배송주소</label>
            <div className="recipient-addr-wrapper">
              <div className="addr-search">
                <input type="text" className="addr" id="recipientAddr" name="recipientAddr" required readOnly value={zoneCode} />
                <Button type="button" padding="0.625rem 2rem" fontSize="1rem" fontWeight="500" onClick={handleFindAddrClick}>
                  우편번호조회
                </Button>
              </div>
              <input type="text" className="addr" id="recipientAddr" name="recipientAddr" readOnly required value={address} />
              <input
                type="text"
                className="addr"
                id="recipientAddr"
                name="recipientAddr"
                required
                onChange={(e) => { return setExtraAddress(e.target.value); }}
              />
            </div>
          </li>
          <li>
            <label
              htmlFor="
            deliveryMessage"
            >
              배송메세지
            </label>
            <input id="deliveryMessage" type="text" onChange={handleMessageChange} />
          </li>
        </ul>
      </fieldset>
      {isOpenModal && <AddressModal setIsOpenModal={setIsOpenModal} setAddress={setAddress} setZoneCode={setZoneCode} />}
    </SInfoInputLayout>
  );
}

const SInfoInputLayout = styled.article`
  margin-top: 6rem;
  box-sizing: border-box;
  width: inherit;

  h3 {
    border-bottom: 0.125rem solid var(--middle-gray-color);
  }

  fieldset {
    margin-top: 2.5rem;
    max-width: 100%;

    legend {
      font-size: var(--font-size-lg);
      border-bottom: 0.125rem solid var(--middle-gray-color);
      padding-bottom: 0.5rem;
      width: 100%;
    }

    li {
      padding: 0.5rem 0;
      box-sizing: border-box;
      border-bottom: 1px solid var(--middle-gray-color);
      display: flex;
      align-items: center;
      gap: 5.625rem;

      label {
        display: block;
        width: 5rem;
        flex-shrink: 0;
      }

      input {
        flex-shrink: 1;
        box-sizing: border-box;
        border: 1px solid var(--middle-gray-color);
        padding: 0.625rem 0.6rem;
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-light);

        &#shippingName,
        &#shippingMail,
        &#recipientName {
          width: 20.875rem;
        }
        &#deliveryMessage {
          max-width: 50rem;
          width: 100%;
        }
      }

      .tel-input-box {
        display: flex;
        gap: 0.625rem;
        align-items: center;
        width: 100%;

        & > input:not(:first-child) {
          width: 6.25rem;
        }
        & > input:first-child {
          width: 5rem;
        }
      }

      .recipient-addr-wrapper {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 0.5rem;
        width: 100%;
        box-sizing: border-box;
        min-width: 0;

        .addr-search {
          display: flex;
          gap: 0.625rem;
          align-items: center;

          input {
            min-width: 10.625rem;
            width: 100%;
          }
        }

        & > input {
          width: 100%;
          max-width: 50rem;
        }
      }
    }
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    margin-top: 3rem;

    fieldset {
      li {
        padding: 0.6rem 0;

        flex-direction: column;
        gap: 0.3rem;
        align-items: flex-start;

        input {
          &#shippingName,
          &#shippingMail,
          &#recipientName {
            width: 100%;
          }
        }

        .tel-input-box {
          & > input.tel {
            flex-grow: 1;
          }
        }
        .recipient-addr-wrapper {
          .addr-search {
            width: 100%;
          }
        }
      }
    }
  }
`;
