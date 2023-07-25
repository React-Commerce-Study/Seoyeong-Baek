import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckBox from '../../assets/icon/check-round.svg';
import CartItem from './CartItem';
import TotalPriceBox from './TotalPriceBox';
import Button from '../common/Buttons/Button';
import { CartProduct } from '../../@types/types';

export default function ShoppingCart() {
  const URL = 'https://openmarket.weniv.co.kr/';
  const [cartItemList, setCartItemList] = useState<CartProduct[]>([]); // null로 초기값 설정;

  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    fetchCartItemList();
  }, []);

  async function fetchCartItemList() {
    try {
      const response = await fetch(`${URL}cart/`, {
        method: 'GET',
        headers: {
          Authorization:
            'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYnV5ZXIxIiwiZXhwIjoxNjkwNTQ5Njc0fQ.kaarG2FoPRIT4iIRiTg5LA39xdjptnbYhp5_bK2kzSM',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.results);
        setCartItemList(data.results);
      } else {
        throw new Error('네트워크에 문제가 있습니다.');
      }
    } catch (error) {
      console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
    }
  }

  return (
    <SMainLayout>
      <STitle>장바구니</STitle>
      <SCategoryList>
        <li>
          <img src={CheckBox} alt="" />
        </li>
        <li>상품정보</li>
        <li>수량</li>
        <li>상품금액</li>
      </SCategoryList>

      <SCartListContainer>
        {cartItemList !== null ? ( // null 체크 추가
          cartItemList.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.cart_item_id}
                cartProduct={cartItem}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
              />
            );
          })
        ) : (
          <div>
            <strong>장바구니에 담긴 상품이 없습니다.</strong>
            <p>원하는 상품을 장바구니에 담아보세요.</p>
          </div>
        )}
      </SCartListContainer>
      <TotalPriceBox totalPrice={totalPrice} />

      <SButtonContainer>
        <Button padding="19px 65px" fontSize="24px">
          주문하기
        </Button>
      </SButtonContainer>
    </SMainLayout>
  );
}

const SMainLayout = styled.main`
  box-shadow: inset 0 0 20px purple;
  max-width: 1280px;
  margin: 0 auto 180px;
`;

const STitle = styled.h2`
  margin: 54px 0 52px;
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
`;

const SCategoryList = styled.ul`
  display: flex;
  /* justify-content: space-around; */
  border-radius: 10px;
  background: #f2f2f2;
  padding: 19px 0;

  li {
    font-size: 18px;
    font-weight: 400;
    box-shadow: inset 0 0 10px red;
    flex-basis: 25%;
  }
`;

const SCartListContainer = styled.section`
  margin: 35px 0 80px;
`;

const SButtonContainer = styled.div`
  margin: 40px auto 0;
  width: 220px;
`;
