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

  // 모달로 확인한 값이 바뀌는 경우
  const [isChangeModalValue, setIsChangeModalValue] = useState(false);

  useEffect(() => {
    fetchCartItems();

    // 모달 값 초기화
    return setIsChangeModalValue(false);
  }, [isChangeModalValue]);
  // cartItemList을 넣게되면 체크박스를 클릭할 때마다 재렌더링돼서 체크박스 on/off가 되지 않음

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

  useEffect(() => {
    if (isOrderBtnClick) {
      // is_active가 true인 아이템만 필터링
      const orderList = cartItemList.filter((cartItem) => cartItem.is_active);
      const orderListId = orderList.map((cartItem) => cartItem.product_id);
      // TODO:수량이 바뀌기전 수량으로 들어가는데 원인을 모르겠음 => cartItemList의 수량부분 데이터를 업데이트 안해주고 있었음
      const orderListQuantity = orderList.map((cartItem) => cartItem.quantity);
      const order_kind = 'cart_order';
      navigate('/payment', { state: { orderListId, orderListQuantity, order_kind } });
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
          <TotalPriceBox />

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
