import React, { useState } from 'react';
import ProductCountButton from '../common/Buttons/ProductCountButton';
import PurchaseButton from '../common/Buttons/Button';
import styled from 'styled-components';
import { Product } from '../../@types/types';
import Modal from '../modal/Modal';
import { fetchCartItemList } from '../../services/ResponseApi';

interface ProductPurchaseProps {
  product: Product;
}

interface ProductData {
  product_id: number;
  quantity: number;
  check: boolean;
}

type ButtonType = 'cart' | 'buy'; // 버튼 유형을 나타내는 타입 정의

export default function ProductPurchase({ product }: ProductPurchaseProps) {
  const [count, setCount] = useState(1);
  console.log(product);
  const token = localStorage.getItem('token');
  const [isShowModal, setIsShowModal] = useState(false);

  const [productData, setProductData] = useState<ProductData>({
    product_id: product.product_id,
    quantity: count,
    check: false,
  });

  // 로그인시에만 장바구니에 넣을 수 있고, 장바구니에 있으면 이미 있다고 띄워주기
  const handleClickBtn = (buttonType: ButtonType) => {
    token ? requestApi(buttonType) : setIsShowModal(true);

    function requestApi(buttonType: ButtonType) {
      if (buttonType === 'cart') {
        console.log('장바구니 버튼 클릭');
        checkCartItems();
      } else if (buttonType === 'buy') {
        console.log('구매 버튼 클릭');
        // 구매 api 요청
        // purchaseProduct()
      }
    }
  };

  async function checkCartItems() {
    const cartList = await fetchCartItemList();
    const cartItemIdArr = cartList.map((cartItem: { product_id: number }) => {
      return cartItem.product_id;
    });

    if (cartItemIdArr.includes(product.product_id)) {
      console.log('이미 장바구니에 담겨있습니다.');
    } else {
      console.log('장바구니에 담겼습니다.');
      setProductData({ ...productData, check: true });
      postCartList(productData);
    }
  }

  async function postCartList(productData: ProductData) {
    const URL = 'https://openmarket.weniv.co.kr/';
    try {
      const response = await fetch(`${URL}cart/`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.results);
      } else {
        throw new Error('네트워크에 문제가 있습니다.');
      }
    } catch (error) {
      console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
    }
  }

  return (
    <PurchaseContainerStyle>
      {/* 구매수량 버튼 */}
      <div className="product-count-wrapper">
        <ProductCountButton count={count} setCount={setCount} productStock={product.stock} />
      </div>
      {/* 총 금액 */}
      <ProductTotalPriceStyle>
        <p>총 상품 금액</p>
        <div className="total-price-wrapper">
          <p className="total-count">
            총 수량 <strong>{product.stock === 0 ? 0 : count}</strong>개
          </p>
          <p className="total-price">
            <strong>{product.stock === 0 ? 0 : (count * product.price).toLocaleString()}</strong>원
          </p>
        </div>
      </ProductTotalPriceStyle>
      {/* 구매버튼 */}
      <ButtonWrapperStyle>
        <PurchaseButton type="button" onClick={() => handleClickBtn('buy')}>
          바로 구매
        </PurchaseButton>
        <PurchaseButton type="button" bgColor="#767676" onClick={() => handleClickBtn('cart')}>
          장바구니
        </PurchaseButton>
      </ButtonWrapperStyle>
      {isShowModal && <Modal type="requiredLogin" setIsShowModal={setIsShowModal} />}
    </PurchaseContainerStyle>
  );
}

const PurchaseContainerStyle = styled.div`
  width: 100%;

  .text {
    font-weight: 400;
    font-size: 16px;
    color: #767676;
  }

  .product-count-wrapper {
    border-top: 2px solid #c4c4c4;
    border-bottom: 2px solid #c4c4c4;
    padding: 30px 0;
    margin: 20px 0 32px;
  }
`;

const ProductTotalPriceStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  font-size: 18px;

  p {
    font-weight: 500;
    color: #000;
  }

  .total-price-wrapper {
    display: flex;
    align-items: center;
    font-weight: 400;

    .total-count {
      color: #767676;

      strong {
        color: var(--point-color);
        font-weight: 700;
      }
    }

    .total-count::after {
      content: '|';
      display: inline-block;
      margin: 0 12px;
      color: #c4c4c4;
    }

    .total-price {
      color: var(--point-color);

      strong {
        font-weight: 700;
        font-size: 36px;
        margin-right: 2px;
      }
    }
  }
`;

const ButtonWrapperStyle = styled.div`
  display: flex;
  gap: 14px;

  button:last-child {
    flex-basis: 45%;
  }
`;
