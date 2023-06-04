import React from 'react';
import ScrollTop from '../components/common/ScrollTop';
import Header from '../components/common/Header/Header';
import ProductInfo from '../components/productDetail/ProductInfo';
import Footer from '../components/common/Footer/Footer';

export default function ProductDetails() {
  return (
    <>
      <ScrollTop />
      <Header />
      <ProductInfo />
      <Footer />
    </>
  );
}
