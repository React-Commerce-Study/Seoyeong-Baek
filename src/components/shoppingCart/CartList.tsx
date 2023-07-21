import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckBox from '../../assets/icon/check-round.svg';
import CartItem from './CartItem';

export default function ShoppingCart() {
  const URL = 'https://openmarket.weniv.co.kr/';
  // const [cartList, setCartList] = useState<CartItem[]>([]);
  const [cartItemList, setCartItemList] = useState({});
  const [isFetchCartItem, setIsFetchCartItem] = useState(false);

  useEffect(() => {
    fetchCartItem();
  }, []);

  async function fetchCartItem() {
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
        setCartItemList(data);
        setIsFetchCartItem(true);
      } else {
        throw new Error('네트워크에 문제가 있습니다.');
      }
    } catch (error) {
      console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
    }
  }

  console.log(cartItemList);

  return (
    <SCartListContainer>
      <STitle>장바구니</STitle>
      <SCategoryList>
        <li>
          <img src={CheckBox} alt="" />
        </li>
        <li>상품정보</li>
        <li>수량</li>
        <li>상품금액</li>
      </SCategoryList>
      {isFetchCartItem && <CartItem cartItemList={cartItemList} />}
    </SCartListContainer>
  );
}

const SCartListContainer = styled.main`
  box-shadow: inset 0 0 20px purple;
  max-width: 1280px;
  margin: 0 auto;
`;

const STitle = styled.h2`
  margin: 54px 0 52px;
  font-size: 2.25rem;
  text-align: center;
`;

const SCategoryList = styled.ul`
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  background: #f2f2f2;
  padding: 19px 0;

  li {
    font-size: 18px;
    font-weight: 400;
  }
`;
