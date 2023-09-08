import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CheckBox from '../../assets/icon/check-round.svg';
import CheckBoxFill from '../../assets/icon/check-round-Fill.svg';
import CartItem from './CartItem';
import TotalPriceBox from './TotalPriceBox';
import Button from '../common/Buttons/Button';
import { CartProduct } from '../../@types/types';
import { fetchCartItemList } from '../../services/ResponseApi';

export default function ShoppingCart() {
  const navigate = useNavigate();

  const [cartItemList, setCartItemList] = useState<CartProduct[]>([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState<number>(0);

  // 모달로 확인한 값이 바뀌는 경우
  const [isChangeModalValue, setIsChangeModalValue] = useState(false);

  useEffect(() => {
    fetchCartItems();

    // 모달 값 초기화
    setIsChangeModalValue(false);
  }, [isChangeModalValue]);

  async function fetchCartItems() {
    const cartList = await fetchCartItemList();
    console.log(cartList);
    setCartItemList(cartList);
  }

  // 전체 선택상태 일때
  const [isAllCheck, setAllIsCheck] = useState<boolean>(true);

  // 전체 선택 체크박스를 눌렀을 때
  const [isClickAllCheck, setIsClickAllCheck] = useState<boolean>(true);

  // 장바구니 아이템이 하나라도 비활성화 시 전체 체크박스 상태 변경
  useEffect(() => {
    const isCheckArr = cartItemList.map((cartItem) => cartItem.is_active);
    // console.log(isCheckArr);
    isCheckArr.includes(false) ? setAllIsCheck(false) : setAllIsCheck(true);
  }, [cartItemList]);

  // cartItem checkbox 클릭시 전체 체크박스 상태 변경
  const handleCheckBoxClick = () => {
    if (isClickAllCheck) {
      setAllIsCheck(false);
      setIsClickAllCheck(false);
      cartItemList.map((cartItem) => {
        cartItem.is_active = false;
      });
    } else {
      setAllIsCheck(true);
      setIsClickAllCheck(true);
      cartItemList.map((cartItem) => {
        cartItem.is_active = true;
      });
    }
  };

  const [isOrderBtnClick, setIsOrderBtnClick] = useState(false);
  const handleOrderBtnClick = () => {
    setIsOrderBtnClick(true);
  };

  // TODO: 이부분 cartItem으로 옮겨야함
  // 수량이 count로 들어가야 오류가 안날듯, 지금은 이전 수량으로 들어감
  useEffect(() => {
    if (isOrderBtnClick) {
      console.log(isOrderBtnClick);
      const orderListId = cartItemList
        .filter((cartItem) => cartItem.is_active) // is_active가 true인 아이템만 필터링
        .map((cartItem) => cartItem.product_id);

      const orderListQuantity = cartItemList.filter((cartItem) => cartItem.is_active).map((cartItem) => cartItem.quantity);

      // const finalPrice = totalPrice + totalDeliveryFee;
      navigate('/payment', { state: { orderListId, totalPrice, totalDeliveryFee, orderListQuantity } });
    }
  }, [isOrderBtnClick]);

  const btnActive = cartItemList.some((cartItem) => cartItem.is_active);

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
        {cartItemList?.length !== 0 ? (
          cartItemList?.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.cart_item_id}
                cartProduct={cartItem}
                setTotalPrice={setTotalPrice}
                setTotalDeliveryFee={setTotalDeliveryFee}
                setCartItemList={setCartItemList}
                setIsChangeModalValue={setIsChangeModalValue}
                isOrderBtnClick={isOrderBtnClick}
                isClickAllCheck={isClickAllCheck}
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
            <Button onClick={handleOrderBtnClick} padding="19px 65px" fontSize="24px" disabled={!btnActive}>
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
