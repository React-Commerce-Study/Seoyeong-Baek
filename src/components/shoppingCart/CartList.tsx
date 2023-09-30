import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CartItem from './CartItem';
import TotalPriceBox from './TotalPriceBox';
import Button from '../common/Buttons/Button';
import { CartProduct } from '../../@types/types';
import { fetchCartItemList } from '../../services/ResponseApi';
import RoundCheckBox from './checkBox/RoundCheckBox';
import { mediaQuery, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';
import Modal from '../../components/modal/Modal';

export default function ShoppingCart() {
  const navigate = useNavigate();

  const [cartItemList, setCartItemList] = useState<CartProduct[]>([]);

  // 모달로 확인한 값이 바뀌는 경우
  const [isDeleteItem, setIsDeleteItem] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    fetchCartItems();

    return setIsDeleteItem(false);
  }, [isDeleteItem]);
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

  const handleDeleteAllItem = async () => {
    // await DeleteAllItem();
    // setIsDeleteItem(true);
    setIsShowModal(true);
  };

  useEffect(() => {
    if (isOrderBtnClick) {
      // is_active가 true인 아이템만 필터링
      const orderList = cartItemList.filter((cartItem) => cartItem.is_active);
      const orderListId = orderList.map((cartItem) => cartItem.product_id);
      const orderListQuantity = orderList.map((cartItem) => cartItem.quantity);
      const order_kind = 'cart_order';
      navigate('/payment', { state: { orderListId, orderListQuantity, order_kind } });
    }
  }, [isOrderBtnClick]);

  const btnActive = cartItemList && cartItemList.some((cartItem) => cartItem.is_active);

  return (
    <>
      <SMainLayout>
        <SCategoryList>
          <li>
            <RoundCheckBox className={isAllCheck ? 'checked' : ''} onClick={handleCheckBoxClick} />
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
                  setIsDeleteItem={setIsDeleteItem}
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
              <Button onClick={handleOrderBtnClick} padding="19px 64px" fontSize="var(--font-size-xl)" disabled={!btnActive}>
                주문하기
              </Button>
            </SButtonContainer>
          </>
        )}

        <Button className={`${isAllCheck ? 'active' : ''} all-delete-btn`} disabled={!isAllCheck} onClick={handleDeleteAllItem}>
          전체삭제
        </Button>
      </SMainLayout>
      {isShowModal && <Modal type="deleteAll" setIsShowModal={setIsShowModal} setIsDeleteItem={setIsDeleteItem} />}
    </>
  );
}

const SMainLayout = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  position: relative;

  .all-delete-btn {
    position: absolute;
    height: 32px;
    top: -43.2px;
    right: 0;
  }
  ${mediaQuery(BREAKPOINT_TABLET)} {
    .all-delete-btn {
      top: 12.8px;
    }
  }
`;

const SCategoryList = styled.ul`
  margin-top: 52px;
  display: flex;
  text-align: center;
  border-radius: 10px;
  background: #f2f2f2;
  padding: 19px 0;
  transition: all 0.25s ease-out;

  li {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-light);

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
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    background: none;
    margin-top: 24px;

    li:first-child {
      padding-left: 8px;
    }

    & > li:not(:first-child) {
      display: none;
    }
  }
`;

const SCartListContainer = styled.section`
  margin: 35px 0 80px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .empty-cart {
    margin: 166.4px 0 20.8px;
    text-align: center;

    strong {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
    }
    p {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-light);
      color: var(--dark-gray-color);
      margin-top: 16.96px;
    }
  }
  ${mediaQuery(BREAKPOINT_TABLET)} {
    margin: 0 0 24px 0;
    gap: 8px;
  }
`;

const SButtonContainer = styled.div`
  margin: 40px auto 0;
  width: 220px;

  ${mediaQuery(BREAKPOINT_TABLET)} {
    width: 100%;
    margin-top: 16px;
  }
`;
