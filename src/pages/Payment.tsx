import PaymentMain from 'components/payment/PaymentMain';
import styled from 'styled-components';

import Footer from '../components/common/Footer/Footer';
import Header from '../components/common/Header/Header';
import ScrollTop from '../components/scroll/ScrollTop';

export default function Payment() {
  return (
    <>
      <ScrollTop />
      <Header />
      <SPaymentMain>
        <h2>주문/결제하기</h2>
        <PaymentMain />
      </SPaymentMain>

      <Footer />
    </>
  );
}

const SPaymentMain = styled.main`
  padding: 0 1rem;
  box-sizing: border-box;
  margin: 3.375rem 0;

  h2 {
    margin-bottom: 3.25rem;
    font-size: var(--font-size-xxl);
    text-align: center;
    font-weight: var(--font-weight-bold);
  }
`;
