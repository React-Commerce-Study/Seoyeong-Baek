import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductDataImg from '../common/product/ProductDataImg';
import ProductDataInfo from '../common/product/ProductDataInfo';
import styled from 'styled-components';
import { ProductListItemStyle } from '../style/ProductListItemStyle';
import { Product } from '../../@types/types';
import { getProductItem } from '../../services/ResponseApi';

interface PaymentItemProps {
  key?: number;
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
    <SOrderItemContainer>
      {product === null ? (
        <div>Loading...</div>
      ) : (
        <>
          <ProductDataImg productImg={product.image} imgName={product.product_name} handleClick={handleClick} />
          <ProductDataInfo product={product} type="payment" quantity={quantity} />
        </>
      )}
    </SOrderItemContainer>
  );
}

const SOrderItemContainer = styled(ProductListItemStyle)`
  display: flex;
  align-items: center;
  gap: 2.25rem;
  padding: 20px 0;
  border-bottom: 1px solid #c4c4c4;
  margin-left: 0.7rem;

  .img-box {
    width: 6.5rem;
    height: 6.5rem;
    border: none;
  }

  .info-box {
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 2.5rem;
    color: #767676;
    font-weight: 400;
    font-size: 14px;
    box-shadow: inset 0 0 10px red;
    flex-grow: 1;

    &:first-child {
      flex-basis: 40%;
      box-shadow: inset 0 0 10px blue;
    }

    &:not(:first-child) {
      flex-basis: 20%;
    }

    p {
      margin-bottom: 0;
    }

    .store-name {
      margin-bottom: 6px;
    }
    .product-name {
      color: #000;
      margin-bottom: 10px;
    }

    .product-price,
    .product-price strong {
      font-size: 16px;
      color: #000;
      font-weight: 700;
      line-height: normal;
    }
  }

  .product-count-wrapper {
    flex-basis: 20%;
    box-sizing: border-box;

    div {
      margin: 0 auto;
    }
  }

  .total-price {
    text-align: center;
    flex-basis: 25%;
    margin-bottom: 26px;
    color: #eb5757;
    font-size: 18px;
    font-weight: 700;
  }
`;
