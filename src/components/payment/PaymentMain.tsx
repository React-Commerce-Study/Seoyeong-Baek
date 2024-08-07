import { useState, FormEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PaymentList from './PaymentList';
import ShippingInfoForm from './ShippingInfoForm';
import PaymentMethod from './PaymentMethod';
import FinalPaymentInfo from './FinalPaymentInfo';
import styled from 'styled-components';
import { OrderData, ExtendedOrderData, ReqOrderData } from '../../@types/types';
import { postOrderList } from '../../services/ResponseApi';
import ConfirmModal from '../modal/PaymentModal';
import OrderCompleteModal from '../modal/OrderCompleteModal';
import { useTotalPrice, useTotalDeliveryPrice } from '../../hooks/UseFinalPrice';
import { mediaQuery, BREAKPOINT_PC } from '../style/mediaQuery/MediaQueryType';

export default function PaymentMain() {
  const location = useLocation();
  const { state } = location; // state 추출

  // state에서 orderList와 totalMoney 추출 (orderListId와 orderListQuantity는 배열)
  const { orderListId, orderListQuantity, order_kind } = state;
  const totalPrice = useTotalPrice();
  const totalDeliveryFee = useTotalDeliveryPrice();

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
    setIsModalOpen(true);
  };

  const [successOrder, setSuccessOrder] = useState<boolean>(false);

  const [reqOrderResult, setReqOrderResult] = useState<ReqOrderData>();
  const postOrder = async () => {
    const result = cartOrder ? await postOrderList({ orderData }) : await postOrderList({ oneOrderData });
    setReqOrderResult(result);

    console.log(reqOrderResult);
    alert('Order Success!');

    setIsModalOpen(false);
    setSuccessOrder(true);
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
      {successOrder && reqOrderResult && (
        <OrderCompleteModal reqOrderResult={reqOrderResult} totalPrice={totalPrice} totalDeliveryFee={totalDeliveryFee} />
      )}
    </>
  );
}

const SMainLayout = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  box-sizing: border-box;

  h3 {
    font-size: var(--font-size-xl);
    padding-bottom: 1.125rem;
  }

  .payment-wrapper {
    margin-top: 4.375rem;
    display: flex;
    justify-content: space-between;
    gap: 2.5rem;
  }

  ${mediaQuery(BREAKPOINT_PC)} {
    .payment-wrapper {
      margin-top: 2.5rem;
      display: block;

      & > :first-child {
        margin-bottom: 2.5rem;
      }
    }
  }
`;
