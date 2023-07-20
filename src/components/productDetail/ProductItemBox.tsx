import styled from 'styled-components';
import ProductPurchase from './ProductPurchase';
import ProductImg from './ProductImg';
import ProductInfoText from './ProductInfoText';
import { ProductInfoCardStyle } from '../style/ProductInfoCardStyle';

interface Product {
  product_id: number;
  image: string;
  product_name: string;
  store_name: string;
  price: number;
  shipping_fee: boolean;
  stock: number;
}

interface ProductItemBoxProps {
  product: Product;
}

export default function ProductItemBox({ product }: ProductItemBoxProps) {
  return (
    <ProductInfoCardRowStyle>
      <ProductImg productImg={product.image} imgName={product.product_name} />
      <div className="product-info-wrapper">
        <ProductInfoText product={product} isDelivery={true} />
        {/* 구매부분 */}
        <ProductPurchase product={product} />
      </div>
    </ProductInfoCardRowStyle>
  );
}

const ProductInfoCardRowStyle = styled(ProductInfoCardStyle)`
  display: flex;
  gap: 50px;
  box-shadow: inset 0 0 10px red;

  .img-box {
    border-radius: 0;
    width: 600px;
    height: 600px;
    flex-shrink: 0;
  }

  .product-info-wrapper {
    /* width: 100%; */
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: inset 0 0 30px yellow;

    .info-box {
      height: 100%;
      margin-top: 0;
      box-shadow: inset 0 0 20px rosybrown;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .store-name,
      .product-price {
        font-size: 18px;
      }

      .product-name,
      .product-price strong {
        font-size: 36px;
        line-height: 45px;
      }

      .delivery {
        font-weight: 400;
        font-size: 16px;
        color: #767676;
        box-shadow: inset 0 0 20px rosybrown;
      }
    }
  }
`;
