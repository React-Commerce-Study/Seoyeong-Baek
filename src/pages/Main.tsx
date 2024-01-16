import Carousel from '../components/carousel/Carousel';
import ScrollTopButton from '../components/common/Buttons/ScrollTopButton';
import Footer from '../components/common/Footer/Footer';
import Header from '../components/common/Header/Header';
import ProductList from '../components/productList/ProductList';

export default function main() {
  return (
    <>
      <Header />
      <main>
        <Carousel />
        <ProductList />
      </main>
      <ScrollTopButton />
      <Footer />
    </>
  );
}
