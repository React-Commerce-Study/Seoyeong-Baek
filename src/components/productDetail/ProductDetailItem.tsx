import { useState } from 'react';
import styled from 'styled-components';
import PurchaseButton from '../common/Buttons/Button';
import ProductPurchase from './ProductPurchase';
import ProductDataImg from '../common/product/ProductDataImg';
import ProductDataInfo from '../common/product/ProductDataInfo';
import { ProductListItemStyle } from '../style/ProductListItemStyle';
import { SModalBackground } from '../style/ModalStyle';
import { Product } from '../../@types/types';
import { mediaQuery, BREAKPOINT_PC, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';

interface ProductItemBoxProps {
  product: Product;
}

export default function ProductItemBox({ product }: ProductItemBoxProps) {
  const [isPurchaseClick, setIsPurchaseClick] = useState(false);

  const handlePurchaseClick = () => {
    isPurchaseClick ? setIsPurchaseClick(false) : setIsPurchaseClick(true);
  };
  return (
    <SProductDetailLayout>
      <ProductDataImg productImg={product.image} imgName={product.product_name} />
      <div className="product-info-container">
        <ProductDataInfo product={product} isDelivery={true} />
        {/* 구매부분 */}
        <SPurchaseModalBackground
          className={isPurchaseClick ? 'open' : ''}
          onClick={handlePurchaseClick}
        ></SPurchaseModalBackground>
        <div className={`${isPurchaseClick ? 'open' : ''} product-purchase-wrapper`}>
          <span className="modal-close-btn" onClick={handlePurchaseClick}></span>
          <ProductPurchase product={product} />
        </div>
      </div>
      <PurchaseButton className="purchase-modal-btn" onClick={handlePurchaseClick} disabled={product.stock === 0}>
        구매하기
      </PurchaseButton>
    </SProductDetailLayout>
  );
}

const SPurchaseModalBackground = styled(SModalBackground)`
  display: none;
  &.open {
    display: block;
    z-index: 1;
  }
`;

const SProductDetailLayout = styled(ProductListItemStyle)`
  max-width: 80rem;
  margin: 80px auto 0;
  display: flex;
  gap: 3rem;
  justify-content: space-between;

  .img-box {
    border-radius: 0;
    width: 37.5rem;
    border: none;
  }

  .product-info-container {
    width: 39.375rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .info-box {
      height: 100%;
      max-height: 327px;
      margin-top: 0;
      max-width: inherit;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .store-name,
      .product-price {
        font-size: var(--font-size-lg);
      }

      .product-name,
      .product-price strong {
        font-size: var(--font-size-xxl);
        line-height: 2.8rem;
      }

      .delivery {
        font-weight: var(--font-weight-light);
        font-size: var(--font-size-md);
        color: var(--dark-gray-color);
      }
    }
  }

  .purchase-modal-btn,
  .modal-close-btn {
    display: none;
  }

  ${mediaQuery(BREAKPOINT_PC)} {
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 0;
    position: relative;

    .img-box {
      width: 100%;
    }

    .product-info-container {
      width: 100%;

      .info-box {
        gap: 2rem;
      }
    }

    /* 웹 아닐땐 모달로 띄울거 */
    .product-purchase-wrapper {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 9;
      width: 100%;
      margin-bottom: -23rem;
      max-height: 23rem;
      padding: 2rem 2rem;
      background-color: #fff;
      border-radius: 20px 20px 0 0;
      box-sizing: border-box;
      transition: all 0.35s ease-in-out;
    }
    .purchase-modal-btn {
      display: block;
      position: fixed;
      max-height: 5rem;
      bottom: 0;
      left: 0;
      border-radius: 0;
      font-size: var(--font-size-lg);
    }
    .product-purchase-wrapper.open {
      margin-bottom: 0;
      box-shadow: rgba(0, 0, 0, 0.15) 0px -5px 15px;
    }

    .product-purchase-wrapper.open .modal-close-btn {
      display: block;
      position: absolute;
      right: 50%;
      top: 1.2rem;
      width: 6rem;
      transform: translateX(50%);
      height: 0.7rem;
      border-radius: 0.7rem;
      background-color: var(--light-gray-color);
    }
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    margin-top: 0;
    gap: 1rem;

    .product-info-container {
      .info-box {
        p:not(:last-child) {
          margin-bottom: 0;
        }
        gap: 0.5rem;
        .store-name,
        .product-price {
          font-size: var(--font-size-md);
        }

        .product-name,
        .product-price strong {
          font-size: var(--font-size-xl);
          line-height: 2.3rem;
        }

        .delivery {
          font-size: var(--font-size-sm);
        }
      }
    }

    .purchase-modal-btn {
      max-height: 3.4rem;
      font-size: var(--font-size-md);
    }
    .product-purchase-wrapper {
      padding: 2rem 1rem;
    }

    .product-purchase-wrapper.open .modal-close-btn {
      width: 3.8rem;
      height: 0.5rem;
      border-radius: 0.5rem;
    }
  }
`;
