import ProductDataImg from 'components/common/product/ProductDataImg';
import ProductDataInfo from 'components/common/product/ProductDataInfo';
import styled from 'styled-components';

import { Product } from '../../@types/types';
import { mediaQuery, BREAKPOINT_PC, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';
import { ProductListItemStyle } from '../style/ProductListItemStyle';

interface ProductItemBoxProps {
  product: Product;
}

export default function ProductInfoCard({ product }: ProductItemBoxProps) {
  return (
    <ProductListItemLayout>
      <ProductDataImg productImg={product.image} imgName={product.product_name} />
      <ProductDataInfo product={product} isDelivery={false} />
    </ProductListItemLayout>
  );
}

const ProductListItemLayout = styled(ProductListItemStyle)`
  .info-box {
    /* margin-top: 1rem; */
    /* font-weight: var(--font-weight-light); */
    /* font-size: var(--font-size-md); */
    /* box-shadow: inset 0 0 10px red; */

    p:not(:last-child) {
      margin-bottom: 10px;
    }

    .store-name {
    }

    .product-name {
      font-size: var(--font-size-lg);
      /* line-height: 22px; */
    }

    .product-price strong {
      /* font-weight: var(--font-weight-bold); */
      font-size: var(--font-size-xl);
      line-height: 30px;
    }
  }
  ${mediaQuery(BREAKPOINT_PC)} {
    position: relative;

    .info-box {
      margin-top: 0.8rem;
      width: 100%;
      position: absolute;
      box-sizing: border-box;
      border-radius: 0 0 10px 10px;
      border: 1px solid var(--middle-gray-color);
      border-top: none;
      bottom: 0;
      padding: 0.9rem 2rem;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.95);

      .product-name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    .info-box {
      position: static;
      border: none;
      padding: 0;
      margin-top: 0.5rem;
      font-size: var(--font-size-xs);
      box-shadow: none;
      background: none;

      p:not(:last-child) {
        margin-bottom: 0.25rem;
      }
      .product-name {
        font-size: var(--font-size-sm);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .product-price strong {
        font-size: var(--font-size-sm);
        line-height: normal;
      }
    }
  }
`;
