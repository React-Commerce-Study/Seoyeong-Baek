import { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Buttons/Button';
import { OrderData, ExtendedOrderData, TelData } from '../../@types/types';
import AddressModal from '../modal/AddressModal';

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
      ? setOneOrderData((prevData) => ({ ...prevData, receiver_phone_number: combinedTel.toString() }))
      : setOrderData((prevData) => ({ ...prevData, receiver_phone_number: combinedTel.toString() }));
  }, [tel]);

  // 우편번호검색
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleFindAddrClick = () => {
    setIsOpenModal(true);
  };

  const [address, setAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  // console.log(extraAddress);

  useEffect(() => {
    const combinedAddress = `${address} ${extraAddress}`;
    order_kind !== 'cart_order'
      ? setOneOrderData((prevData) => ({ ...prevData, address: combinedAddress }))
      : setOrderData((prevData) => ({ ...prevData, address: combinedAddress }));
  }, [address, extraAddress]);

  const handleReceiverChange = (e: ChangeEvent<HTMLInputElement>) => {
    order_kind !== 'cart_order'
      ? setOneOrderData((prevData) => ({ ...prevData, receiver: e.target.value }))
      : setOrderData((prevData) => ({ ...prevData, receiver: e.target.value }));
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    order_kind !== 'cart_order'
      ? setOneOrderData((prevData) => ({ ...prevData, address_message: e.target.value }))
      : setOrderData((prevData) => ({ ...prevData, address_message: e.target.value }));
  };

  return (
    <SSectionLayout>
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
            <div>
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
            <div>
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
                <input type="text" className="addr" id="recipientAddr" name="recipientAddr" required readOnly />
                <Button type="button" padding="10px 31px" fontSize="16px" fontWeight="500" onClick={handleFindAddrClick}>
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
                onChange={(e) => setExtraAddress(e.target.value)}
              />
            </div>
          </li>
          <li>
            <label htmlFor="">배송메세지</label>
            <input type="text" onChange={handleMessageChange} />
          </li>
        </ul>
      </fieldset>
      {isOpenModal && <AddressModal setIsOpenModal={setIsOpenModal} setAddress={setAddress} />}
    </SSectionLayout>
  );
}

const SSectionLayout = styled.section`
  margin-top: 6rem;

  h3 {
    border-bottom: 2px solid var(--middle-gray-color);
  }

  fieldset {
    margin-top: 40px;

    legend {
      font-size: var(--font-size-lg);
      border-bottom: 2px solid var(--middle-gray-color);
      padding-bottom: 0.5rem;
      width: 100%;
    }

    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--middle-gray-color);
      display: flex;
      align-items: center;
      gap: 90px;

      label {
        display: inline-block;
        width: 80px;
      }

      input {
        border: 1px solid var(--middle-gray-color);
        padding: 0.625rem 0.6rem;
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-light);

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
