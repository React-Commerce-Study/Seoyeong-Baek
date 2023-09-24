import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductDataImg from '../common/product/ProductDataImg';
import styled from 'styled-components';
import { Product } from '../../@types/types';
import { getProductItem } from '../../services/ResponseApi';
import { mediaQuery, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';

interface PaymentItemProps {
  // key: number;
  orderId?: number;
  // product: Product;
  quantity: number;
}

export default function PaymentItem({ orderId, quantity }: PaymentItemProps) {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  const handleClick = () => {
    navigate(`/product/${product?.product_id}`, { state: product });
  };

  useEffect(() => {
    if (orderId)
      (async () => {
        const fetchedProduct = await getProductItem(orderId);
        // console.log(fetchedProduct);
        setProduct(fetchedProduct);
        console.log(product);
      })();
    // 즉시 실행함수
  }, []);

  return (
    <>
      {product === null ? (
        <div>Loading...</div>
      ) : (
        <SOrderItemContainer>
          <div className="img-info-wrapper">
            <ProductDataImg productImg={product.image} imgName={product.product_name} handleClick={handleClick} />
            <div className="info-box">
              <p className="store-name">{product.store_name}</p> <p className="product-name">{product.product_name}</p>
              <p className="product-quantity">수량 : {quantity}개</p>
            </div>
          </div>
          <p className="discount">-</p>
          <p className="delivery">{product.shipping_fee === 0 ? '무료배송' : `${product.shipping_fee.toLocaleString()}원`}</p>
          {product.price && (
            <p className="product-price">
              <strong>{product.price.toLocaleString()}</strong>원
            </p>
          )}
        </SOrderItemContainer>
      )}
    </>
  );
}

const SOrderItemContainer = styled.div`
  padding: 1.25rem 1rem;
  border: 1px solid var(--middle-gray-color);
  display: flex;
  align-items: center;
  color: var(--dark-gray-color);
  font-weight: var(--font-weight-light);
  font-size: var(--font-size-lg);
  margin-bottom: 0.625rem;
  border-radius: 10px;

  .img-info-wrapper {
    flex-basis: 40%;
    display: flex;
    align-items: center;
    gap: 2.25rem;

    .img-box {
      overflow: hidden;
      max-width: 6.5rem;
      max-height: 6.5rem;
      box-sizing: border-box;
      border-radius: 10px;
      border: 1px solid var(--middle-gray-color);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info-box {
      flex-grow: 1;

      & > p:not(:nth-child(2)) {
        font-size: var(--font-size-sm);
      }

      .store-name {
        margin-bottom: 0.375rem;
      }

      .product-name {
        color: #000;
        margin-bottom: 0.625rem;
      }
    }
  }

  & > p {
    flex-basis: 20%;
    text-align: center;
    flex-wrap: wrap;
  }

  .product-price,
  .product-price strong {
    color: #000;
    font-weight: var(--font-weight-bold);
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 0.6rem 0.6rem;
    gap: 0.3rem;

    .img-info-wrapper {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .info-box {
      .product-name {
        font-size: var(--font-size-md);
      }
    }

    & > p {
      font-size: var(--font-size-sm);
      word-break: break-all;
      overflow: hidden;
    }
  }
`;
