import styled from 'styled-components';
import { OrderData, ExtendedOrderData } from '../../@types/types';
import Button from '../common/Buttons/Button';
import { SModalBackground, SModalLayout, SButtonWrapper } from '../style/ModalStyle';
import CloseButton from '../common/Buttons/CloseButton';

interface SModalBackgroundProps {
  postOrder: () => void;
  orderData: OrderData | ExtendedOrderData;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmPayment({ postOrder, orderData, setIsModalOpen }: SModalBackgroundProps) {
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
        <SButtonWrapper>
          <Button onClick={postOrder}>결제하기</Button>
        </SButtonWrapper>
        <CloseButton onClick={closeModal} />
      </SPaymentModalLayout>
    </SModalBackground>
  );
}

const SPaymentModalLayout = styled(SModalLayout)`
  width: auto;
  /* width: 22.5rem; */
  padding: 2.8rem 4rem;
  background-color: #fff;

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
      line-height: normal;
      margin-bottom: 0;
    }
  }
`;
