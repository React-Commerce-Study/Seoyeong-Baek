import styled from 'styled-components';
import ProductPurchase from './ProductPurchase';
import ProductDataImg from '../common/product/ProductDataImg';
import ProductDataInfo from '../common/product/ProductDataInfo';
import { ProductListItemStyle } from '../style/ProductListItemStyle';
import { Product } from '../../@types/types';

interface ProductItemBoxProps {
  product: Product;
}

export default function ProductItemBox({ product }: ProductItemBoxProps) {
  return (
    <ProductDetailItemStyle>
      <ProductDataImg productImg={product.image} imgName={product.product_name} />
      <div className="product-info-wrapper">
        <ProductDataInfo product={product} isDelivery={true} />
        {/* 구매부분 */}
        <ProductPurchase product={product} />
      </div>
    </ProductDetailItemStyle>
  );
}

const ProductDetailItemStyle = styled(ProductListItemStyle)`
  display: flex;
  gap: 50px;

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

    .info-box {
      height: 100%;
      margin-top: 0;
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
      }
    }
  }
`;
