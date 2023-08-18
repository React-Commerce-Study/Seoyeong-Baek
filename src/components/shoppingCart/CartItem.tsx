import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../assets/icon/check-round.svg';
import CheckBoxFill from '../../assets/icon/check-round-Fill.svg';
import DeleteIcon from '../../assets/icon/icon-delete.svg';
import ProductCountButton from '../common/Buttons/ProductCountButton';
import Button from '../common/Buttons/Button';
import { ProductListItemStyle } from '../style/ProductListItemStyle';
import ProductDataImg from '../common/product/ProductDataImg';
import ProductDataInfo from '../common/product/ProductDataInfo';
import { CartProduct } from '../../@types/types';
import Modal from '../../components/modal/Modal';

type CartItemProps = {
  cartProduct: CartProduct;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  setTotalDeliveryFee: Dispatch<SetStateAction<number>>;
  setCartItemList: Dispatch<SetStateAction<CartProduct[]>>;
  isClickAllCheck: boolean;
  setIsChangeModalValue: Dispatch<SetStateAction<boolean>>;
};

export default function CartItem({
  cartProduct,
  setTotalPrice,
  setTotalDeliveryFee,
  setCartItemList,
  isClickAllCheck,
  setIsChangeModalValue,
}: CartItemProps) {
  console.log(cartProduct);
  const URL = 'https://openmarket.weniv.co.kr/';
  const navigate = useNavigate();

  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [product, setProduct] = useState<any>({});

  const [count, setCount] = useState<number>(cartProduct.quantity);
  const price = product.stock === 0 ? 0 : count * product.price;

  // 모달 상태를 관리하는 상태 변수
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    fetchCartItem();
  }, []);

  // 장바구니 페이지 렌더시 전체선택 버튼을 눌렀을 경우 가격을 변경해주기 위함
  useEffect(() => {
    if (isClickAllCheck) {
      product.price && setTotalPrice((prevTotalPrice) => prevTotalPrice + price);
      product.shipping_fee && setTotalDeliveryFee((prevTotalDeliveryFee) => prevTotalDeliveryFee + product.shipping_fee);
    } else {
      setTotalDeliveryFee(0);
      setTotalPrice(0);
    }
  }, [isClickAllCheck, product]);
  // product의 값이 업데이트돼야 price값이 들어오기 때문에 의존배열에 함께 넣어줌

  async function fetchCartItem() {
    try {
      const response = await fetch(`${URL}products/${cartProduct.product_id}/`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProduct(data);
        setIsFetched(true);
      } else {
        throw new Error('네트워크에 문제가 있습니다.');
      }
    } catch (error) {
      console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
    }
  }

  const handleClick = () => {
    navigate(`/product/${product.product_id}`, { state: product });
  };

  const [countChange, setCountChange] = useState<string>('');

  // 수량 변동 시 가격 빼고 더해주기
  useEffect(() => {
    if (countChange === '-') {
      setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);
    } else if (countChange === '+') {
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
    }
  }, [count]);

  const handleCheckBoxClick = () => {
    if (cartProduct.is_active) {
      // cartProduct.is_active = false;
      // 위와 같이 변경해버리면 cartProduct가 재렌더링이 안됨
      setCartItemList((prevCartItems) =>
        prevCartItems.map((item) =>
          item.product_id === cartProduct.product_id && item.is_active ? { ...item, is_active: false } : item
        )
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice - price);
      setTotalDeliveryFee((prevTotalDeliveryFee) =>
        prevTotalDeliveryFee - product.shipping_fee >= 0 ? prevTotalDeliveryFee - product.shipping_fee : 0
      );
    } else {
      // cartProduct.is_active = true;
      setCartItemList((prevCartItems) =>
        prevCartItems.map((item) =>
          item.product_id === cartProduct.product_id && !item.is_active ? { ...item, is_active: true } : item
        )
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice + price);
      // if (storeNames.every((name) => name !== product.store_name)) {
      setTotalDeliveryFee((prevTotalDeliveryFee) => prevTotalDeliveryFee + product.shipping_fee);
      // }
    }
  };

  return (
    <>
      {isFetched && (
        <SCartItemContainer>
          <label
            htmlFor="checkBox"
            className={`check-box ${cartProduct.is_active ? 'checked' : ''}`}
            onClick={handleCheckBoxClick}
          ></label>
          <input type="checkbox" id="checkBox" />
          <div className="product-info-wrapper">
            <ProductDataImg productImg={product.image} imgName={product.product_name} handleClick={handleClick} />
            <ProductDataInfo product={product} isDelivery={true} />
          </div>
          <div className="product-count-wrapper">
            <ProductCountButton
              count={count}
              setCount={setCount}
              productStock={product.stock}
              isCheck={cartProduct.is_active}
              setCountChange={setCountChange}
            />
          </div>
          <div className="total-price-wrapper">
            <p className="total-price">{price.toLocaleString()}원</p>
            <Button disabled={!cartProduct.is_active} padding="10px 35px" fontSize="16px" fontWeight="500">
              주문하기
            </Button>
          </div>
          <button className="delete-btn" onClick={() => setIsShowModal(true)}></button>
        </SCartItemContainer>
      )}

      {isShowModal && (
        <Modal
          type="delete"
          cartItemId={cartProduct.cart_item_id}
          setIsChangeModalValue={setIsChangeModalValue}
          setIsShowModal={setIsShowModal}
        />
      )}
    </>
  );
}

const SCartItemContainer = styled(ProductListItemStyle)`
  display: flex;
  align-items: center;
  padding: 20px 0;
  position: relative;
  border: 2px solid #e0e0e0;
  border-radius: 10px;

  input {
    display: none;
  }

  .check-box {
    background: url(${CheckBox}) no-repeat center center;
    background-size: contain;
    width: 1.25rem;
    height: 1.25rem;
    transition: all 0.3s ease;
    flex-basis: 5%;
    cursor: pointer;
  }

  .check-box.checked {
    background: url(${CheckBoxFill}) no-repeat center center;
    background-size: contain;
    width: 1.25rem;
    height: 1.25rem;
  }

  .product-info-wrapper {
    display: flex;
    gap: 2.25rem;
    flex-basis: 50%;
    margin-left: 0.7rem;

    .img-box {
      width: 10rem;
      height: 10rem;
      border: none;
    }

    .info-box {
      margin-top: 0;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      color: #767676;
      font-weight: 400;
      font-size: 14px;

      .product-name {
        color: #000;
      }

      .product-price,
      .product-price strong {
        font-size: 16px;
        color: #000;
        font-weight: 700;
        line-height: normal;
      }
    }
  }

  .product-count-wrapper {
    flex-basis: 20%;
    box-sizing: border-box;

    div {
      margin: 0 auto;
    }
  }

  .total-price-wrapper {
    text-align: center;
    flex-basis: 25%;

    button {
      max-width: 130px;
    }

    p {
      margin-bottom: 26px;
      color: #eb5757;
      font-size: 18px;
      font-weight: 700;
    }
  }

  .delete-btn {
    background: url(${DeleteIcon}) no-repeat center center;
    background-size: contain;
    width: 22px;
    height: 22px;
    position: absolute;
    right: 18px;
    top: 18px;
  }
`;
