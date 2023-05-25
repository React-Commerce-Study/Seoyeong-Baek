import React from 'react';
import Header from '../components/layout/Header';
import Carousel from '../components/layout/Carousel';
import ProductList from '../components/layout/ProductList';
import Footer from '../components/layout/Footer';

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
