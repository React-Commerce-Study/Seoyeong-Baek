import { useState, FormEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentList from './PaymentList';
import ShippingInfoForm from './ShippingInfoForm';
import PaymentMethod from './PaymentMethod';
import FinalPaymentInfo from './FinalPaymentInfo';
import styled from 'styled-components';
import { OrderData, ExtendedOrderData } from '../../@types/types';
import { postOrderList } from '../../services/ResponseApi';
import ConfirmModal from '../modal/PaymentModal';

export default function PaymentMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location; // state 추출

  // state에서 orderList와 totalMoney 추출 (orderListId와 orderListQuantity는 배열)
  const { orderListId, totalPrice, totalDeliveryFee, orderListQuantity, order_kind } = state;

  const [orderData, setOrderData] = useState<OrderData>({
    total_price: totalPrice + totalDeliveryFee,
    order_kind: order_kind,
    receiver: '',
    receiver_phone_number: '',
    address: '',
    address_message: '',
    payment_method: '',
  });

  const [oneOrderData, setOneOrderData] = useState<ExtendedOrderData>({
    product_id: orderListId[0],
    quantity: orderListQuantity[0],
    total_price: totalPrice + totalDeliveryFee,
    order_kind: order_kind,
    receiver: '',
    receiver_phone_number: '',
    address: '',
    address_message: '',
    payment_method: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartOrder = order_kind === 'cart_order';

  useEffect(() => {
    if (cartOrder) {
      setOrderData((prevData) => ({ ...prevData, total_price: totalPrice + totalDeliveryFee }));
      console.log(orderData);
    } else {
      setOneOrderData((prevData) => ({ ...prevData, total_price: totalPrice + totalDeliveryFee }));
      console.log(oneOrderData);
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 모달 띄워서 결제정보 확인
    setIsModalOpen(true);
  };

  const postOrder = async () => {
    const result = cartOrder ? await postOrderList({ orderData }) : await postOrderList({ oneOrderData });

    console.log(result);
    alert('Order Success!');
    navigate('/order_complete', { state: { result, totalPrice, totalDeliveryFee } });
  };

  return (
    <>
      <SMainLayout>
        <PaymentList orderListId={orderListId} finalPrice={totalPrice + totalDeliveryFee} orderListQuantity={orderListQuantity} />
        <form action="" onSubmit={handleSubmit}>
          <ShippingInfoForm setOrderData={setOrderData} order_kind={order_kind} setOneOrderData={setOneOrderData} />
          <div className="payment-wrapper">
            <PaymentMethod setOrderData={setOrderData} order_kind={order_kind} setOneOrderData={setOneOrderData} />
            <FinalPaymentInfo totalPrice={totalPrice} totalDeliveryFee={totalDeliveryFee} />
          </div>
        </form>
      </SMainLayout>
      {isModalOpen && (
        <ConfirmModal postOrder={postOrder} orderData={cartOrder ? orderData : oneOrderData} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
}

const SMainLayout = styled.main`
  max-width: 80rem;
  margin: 0 auto 200px;

  h3 {
    font-size: 1.5rem;
    padding-bottom: 1.125rem;
  }

  .payment-wrapper {
    margin-top: 70px;
    display: flex;
    justify-content: space-between;
    gap: 2.5rem;
  }
`;
