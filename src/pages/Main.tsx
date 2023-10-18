import Header from '../components/common/Header/Header';
import Carousel from '../components/carousel/Carousel';
import ProductList from '../components/productList/ProductList';
import Footer from '../components/common/Footer/Footer';
import ScrollTopButton from '../components/common/Buttons/ScrollTopButton';

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
