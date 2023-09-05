import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductDataImg from '../common/product/ProductDataImg';
import styled from 'styled-components';
import { Product } from '../../@types/types';
import { getProductItem } from '../../services/ResponseApi';

interface PaymentItemProps {
  key: number;
  orderId?: number;
  // product: Product;
  quantity: number;
}

export default function PaymentItem({ key, orderId, quantity }: PaymentItemProps) {
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
          <div className="img-info-box">
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
  padding: 20px 0;
  border-bottom: 1px solid #c4c4c4;
  display: flex;
  align-items: center;
  color: #767676;
  font-weight: 400;
  font-size: 18px;

  .img-info-box {
    flex-basis: 40%;
    display: flex;
    align-items: center;
    gap: 2.25rem;

    .img-box {
      overflow: hidden;
      width: 6.5rem;
      height: 6.5rem;
      box-sizing: border-box;
      border-radius: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info-box {
      flex-grow: 1;

      & > p:not(:nth-child(2)) {
        font-size: 14px;
      }

      .store-name {
        margin-bottom: 6px;
      }

      .product-name {
        color: #000;
        margin-bottom: 10px;
      }
    }
  }

  & > p {
    flex-basis: 20%;
    text-align: center;
  }

  .product-price,
  .product-price strong {
    color: #000;
    font-weight: 700;
  }
`;
