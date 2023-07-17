import React from 'react';
import Header from '../components/common/Header/Header';
import Carousel from '../components/carousel/Carousel';
import ProductList from '../components/productList/ProductList';
import Footer from '../components/common/Footer/Footer';

export default function main() {
  return (
    <div>
      <Header />
      <Carousel />
      <ProductList />
      <Footer />
    </div>
  );
}
