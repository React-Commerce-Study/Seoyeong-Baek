import styled from 'styled-components';
import { OrderData, ExtendedOrderData } from '../../@types/types';
import Button from '../common/Buttons/Button';
import DeleteIcon from '../../assets/icon/icon-delete.svg';

interface SModalBackgroundProps {
  postOrder: () => void;
  orderData: OrderData | ExtendedOrderData;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmPayment({ postOrder, orderData, setIsModalOpen }: SModalBackgroundProps) {
  // total_price: totalPrice + totalDeliveryFee,
  // order_kind: order_kind,
  // receiver: '',
  // receiver_phone_number: '',
  // address: '',
  // address_message: '',
  // payment_method: '',

  const closeModal = () => {
    setIsModalOpen?.(false);
  };

  return (
    <SModalBackground>
      <SPaymentModalLayout>
        <h3>결제 정보 확인</h3>
        <SPaymentInfoList>
          <li>
            <p>수령인</p>
            <p>{orderData.receiver}</p>
          </li>
          <li>
            <p>휴대폰</p>
            <p>{orderData.receiver_phone_number}</p>
          </li>
          <li>
            <p>배송지</p>
            <p>{orderData.address}</p>
          </li>
          <li>
            <p>결제정보</p>
            <p>{orderData.payment_method}</p>
          </li>
          <li>
            <p>결제 금액</p>
            <p>
              <strong>{orderData.total_price.toLocaleString()}</strong>원
            </p>
          </li>
        </SPaymentInfoList>
        <div>
          <Button onClick={postOrder}>결제하기</Button>
        </div>
        <button className="delete-btn" onClick={closeModal}>
          <img src={DeleteIcon} alt="" />
        </button>
      </SPaymentModalLayout>
    </SModalBackground>
  );
}

const SModalBackground = styled.div`
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;

  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(1.8px);
  }
`;

const SPaymentModalLayout = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 22.5rem; */
  padding: 2.8rem 4rem;
  background-color: #fff;
  text-align: center;
  border-radius: 0.6rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11),
    0 6px 8px rgba(0, 0, 0, 0.11), 0 8px 16px rgba(0, 0, 0, 0.11);
  box-sizing: border-box;

  .delete-btn {
    position: absolute;
    top: 1.125rem;
    right: 1.125rem;
    padding: 0;
    width: 1.38rem;
    height: 1.38rem;
  }

  h3 {
    border-bottom: 2px solid #c4c4c4;
    font-size: 1.5rem;
    padding-bottom: 1.125rem;
  }
`;

const SPaymentInfoList = styled.ul`
  margin: 1.25rem 0;

  li {
    /* box-shadow: inset 0 0 10px red; */
    display: flex;
    gap: 2.5rem;
    justify-content: space-between;
    padding: 1rem 0;

    &:not(:last-child) {
      border-bottom: 1px solid #c4c4c4;
    }

    & > p:first-child {
      flex-shrink: 0;
    }
    p {
      font-size: 1rem;
      line-height: normal;
      max-width: 20rem;

      strong {
        font-weight: 800;
        /* color: var(--point-color); */
        font-size: 1.2rem;
      }
    }
  }
`;
