import Header from '../components/common/Header/Header';
import CartList from 'components/shoppingCart/CartList';
import Footer from '../components/common/Footer/Footer';
import styled from 'styled-components';
import ScrollTopButton from '../components/common/Buttons/ScrollTopButton';

export default function Cart() {
  return (
    <>
      <Header page={'cart'} />
      <SCartListMain>
        <h2 className="title">장바구니</h2>
        <CartList />
      </SCartListMain>
      <ScrollTopButton />

      <Footer />
    </>
  );
}

const SCartListMain = styled.main`
  margin: 0 auto 11.25rem;
  margin-top: 3.375rem;
  padding: 0 1rem;
  box-sizing: border-box;

  .title {
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight-bold);
    text-align: center;
  }
`;
