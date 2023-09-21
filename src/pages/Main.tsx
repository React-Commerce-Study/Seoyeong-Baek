import Header from '../components/common/Header/Header';
import Carousel from '../components/carousel/Carousel';
import ProductList from '../components/productList/ProductList';
import Footer from '../components/common/Footer/Footer';
import { useLayoutEffect, useEffect } from 'react';
// import useScrollRestoration from '../hooks/useScrollRestoration';

export default function main() {
  // useEffect(() => {
  //   // if (typeof window !== 'undefined') {
  //   const scrollY = sessionStorage.getItem('y');
  //   console.log(scrollY);

  //   if (scrollY) {
  //     window.scrollTo(0, parseFloat(scrollY));
  //     console.log(scrollY);
  //   }
  //   // console.log(window.scrollY);
  //   // }

  //   return sessionStorage.removeItem('y');
  // }, []);

  // const handleClick = () => {
  //   if (typeof window !== 'undefined') {
  //     sessionStorage.setItem('y', window.scrollY.toFixed(2));
  //     console.log(window.scrollY);
  //   }
  // };

  // useScrollRestoration();

  return (
    <div>
      <Header />
      <main>
        <Carousel />
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}
