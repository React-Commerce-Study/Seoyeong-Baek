import React from 'react';
import Header from '../components/common/Header/Header';
import CartList from 'components/shoppingCart/CartList';
import Footer from '../components/common/Footer/Footer';

export default function Cart() {
  return (
    <>
      <Header />
      <CartList />
      {/* <Footer /> */}
    </>
  );
}
