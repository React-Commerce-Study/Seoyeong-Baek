import PaymentList from './PaymentList';
import ShippingInfoForm from './ShippingInfoForm';
import PaymentMethod from './PaymentMethod';
import FinalPaymentInfo from './FinalPaymentInfo';
import styled from 'styled-components';

export default function PaymentMain() {
  return (
    <SMainLayout>
      <PaymentList />
      <ShippingInfoForm />
      <div className="payment-wrapper">
        <PaymentMethod />
        <FinalPaymentInfo />
      </div>
    </SMainLayout>
  );
}

const SMainLayout = styled.main`
  max-width: 80rem;
  margin: 0 auto;

  h3 {
    font-size: 1.5rem;
    padding-bottom: 1.125rem;
    border-bottom: 2px solid #c4c4c4;
  }

  .payment-wrapper {
    margin-top: 70px;
    display: flex;
    justify-content: space-between;
    gap: 2.5rem;
  }
`;
