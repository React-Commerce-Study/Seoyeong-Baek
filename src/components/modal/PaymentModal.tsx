import styled from 'styled-components';

import { OrderData, ExtendedOrderData } from '../../@types/types';
import Button from '../common/Buttons/Button';
import CloseButton from '../common/Buttons/CloseButton';
import { SModalBackground, SModalLayout, SButtonWrapper } from '../style/ModalStyle';

interface SModalBackgroundProps {
  postOrder: () => void;
  orderData: OrderData | ExtendedOrderData;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmPayment({ postOrder, orderData, setIsModalOpen }: SModalBackgroundProps) {
  const closeModal = () => {
    setIsModalOpen?.(false);
  };

  const confirmInfo = {
    수령인: orderData.receiver,
    휴대폰: orderData.receiver_phone_number,
    배송지: orderData.address,
    결제정보: orderData.payment_method,
    결제금액: orderData.total_price.toLocaleString(),
  };

  return (
    <SModalBackground>
      <SPaymentModalLayout>
        <h3>결제 정보 확인</h3>
        <SPaymentInfoList>
          {Object.entries(confirmInfo).map(([key, value]) => {
            return (
              <li>
                <p>{key}</p>
                <p>
                  {key === '결제금액' ? <strong>{value}</strong> : value}
                  {key === '결제금액' ? ' 원' : null}
                </p>
              </li>
            );
          })}
        </SPaymentInfoList>
        <SButtonWrapper>
          <Button bgColor="var(--middle-gray-color)" onClick={postOrder}>
            취소하기
          </Button>
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
    border-bottom: 2px solid var(--middle-gray-color);
    font-size: var(--font-size-xl);
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
      border-bottom: 1px solid var(--middle-gray-color);
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
