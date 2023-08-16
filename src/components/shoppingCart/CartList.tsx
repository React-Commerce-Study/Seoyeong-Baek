import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckBox from '../../assets/icon/check-round.svg';
import CheckBoxFill from '../../assets/icon/check-round-Fill.svg';
import CartItem from './CartItem';
import TotalPriceBox from './TotalPriceBox';
import Button from '../common/Buttons/Button';
import { CartProduct } from '../../@types/types';

export default function ShoppingCart() {
  const URL = 'https://openmarket.weniv.co.kr/';
  const [cartItemList, setCartItemList] = useState<CartProduct[]>([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState<number>(0);

  // 모달로 확인한 값이 바뀌는 경우
  const [isChangeModalValue, setIsChangeModalValue] = useState(false);

  useEffect(() => {
    fetchCartItemList();
    // 모달 값 초기화
    setIsChangeModalValue(false);
  }, [isChangeModalValue]);

  async function fetchCartItemList() {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${URL}cart/`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(token);
        console.log(data.results);
        setCartItemList(data.results);
      } else {
        throw new Error('네트워크에 문제가 있습니다.');
      }
    } catch (error) {
      console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
    }
  }
  const [isAllCheck, setAllIsCheck] = useState<boolean>(true);

  // cartItem checkbox 클릭시 전체 체크박스 변경
  useEffect(() => {
    const isCheckArr = cartItemList.map((cartItem) => cartItem.is_active);
    // console.log(isCheckArr);
    isCheckArr.includes(false) ? setAllIsCheck(false) : setAllIsCheck(true);
  }, [cartItemList]);

  // 전체 선택을 눌렀을 때를 넘겨주기 위해서
  const [isClickAllCheck, setIsClickAllCheck] = useState<boolean>(true);

  const handleCheckBoxClick = () => {
    if (isAllCheck) {
      setAllIsCheck(false);
      cartItemList.map((cartItem) => {
        cartItem.is_active = false;
      });
      setIsClickAllCheck(false);
    } else {
      setAllIsCheck(true);
      cartItemList.map((cartItem) => {
        cartItem.is_active = true;
      });
      setIsClickAllCheck(true);
    }
  };

  console.log(cartItemList);

  return (
    <SMainLayout>
      <STitle>장바구니</STitle>
      <SCategoryList>
        <li>
          <label htmlFor="checkBox" className={`check-box ${isAllCheck ? 'checked' : ''}`} onClick={handleCheckBoxClick}></label>
          <input type="checkbox" id="checkBox" />
        </li>
        <li>상품정보</li>
        <li>수량</li>
        <li>상품금액</li>
      </SCategoryList>

      <SCartListContainer>
        {cartItemList.length !== 0 ? (
          cartItemList.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.cart_item_id}
                cartProduct={cartItem}
                setTotalPrice={setTotalPrice}
                setTotalDeliveryFee={setTotalDeliveryFee}
                setCartItemList={setCartItemList}
                isClickAllCheck={isClickAllCheck}
                setIsChangeModalValue={setIsChangeModalValue}
              />
            );
          })
        ) : (
          <div className="empty-cart">
            <strong>장바구니에 담긴 상품이 없습니다.</strong>
            <p>원하는 상품을 장바구니에 담아보세요.</p>
          </div>
        )}
      </SCartListContainer>

      {cartItemList.length !== 0 && (
        <>
          <TotalPriceBox totalPrice={totalPrice} totalDeliveryFee={totalDeliveryFee} />

          <SButtonContainer>
            <Button padding="19px 65px" fontSize="24px">
              주문하기
            </Button>
          </SButtonContainer>
        </>
      )}
    </SMainLayout>
  );
}

const SMainLayout = styled.main`
  /* box-shadow: inset 0 0 20px purple; */
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
  text-align: center;
  border-radius: 10px;
  background: #f2f2f2;
  padding: 19px 0;

  li {
    font-size: 18px;
    font-weight: 400;

    &:first-child {
      flex-basis: 5%;
    }

    &:nth-child(2) {
      flex-basis: 50%;
    }

    &:nth-child(3) {
      flex-basis: 20%;
    }

    &:last-child {
      flex-basis: 25%;
    }

    input {
      display: none;
    }

    .check-box {
      display: inline-block;
      background: url(${CheckBox}) no-repeat center center;
      background-size: contain;
      width: 1.25rem;
      height: 1.25rem;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .check-box.checked {
      background: url(${CheckBoxFill}) no-repeat center center;
      background-size: contain;
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

const SCartListContainer = styled.section`
  margin: 35px 0 80px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .empty-cart {
    margin: 10.4rem 0 1.3rem;
    text-align: center;

    strong {
      font-size: 18px;
      font-weight: 700;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      color: #767676;
      margin-top: 17px;
    }
  }
`;

const SButtonContainer = styled.div`
  margin: 40px auto 0;
  width: 220px;
`;
