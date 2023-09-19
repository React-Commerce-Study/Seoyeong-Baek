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
import { Product, CartProduct, CartActiveData, PutCartItemProps } from '../../@types/types';
import { putCartItem, getProductItem } from '../../services/ResponseApi';
import Modal from '../../components/modal/Modal';
import { useDispatch } from 'react-redux';
import { plusPrice, minusPrice, resetPrice } from '../../features/finalPriceSlice';

type CartItemProps = {
  cartProduct: CartProduct;
  setCartItemList: Dispatch<SetStateAction<CartProduct[]>>;
  setIsChangeModalValue: Dispatch<SetStateAction<boolean>>;
  isOrderBtnClick: boolean;
  isClickAllCheck: boolean;
};

export default function CartItem({
  cartProduct,
  setCartItemList,
  setIsChangeModalValue,
  isOrderBtnClick,
  isClickAllCheck,
}: CartItemProps) {
  console.log(cartProduct);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [count, setCount] = useState<number>(cartProduct.quantity);
  const price: number = count * (product?.price || 0);

  // 모달 상태를 관리하는 상태 변수
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    fetchCartItem();

    async function fetchCartItem() {
      const productData = await getProductItem(cartProduct.product_id);
      setProduct(productData);
      // setIsFetched(true);
    }
  }, []);
  console.log(product);

  // 장바구니 페이지 렌더시 전체선택 체크박스를 눌렀을 경우 가격을 변경해주기 위함
  useEffect(() => {
    if (cartProduct.is_active && product) {
      setIsActive(true);
      dispatch(plusPrice({ price: price, deliveryFee: product.shipping_fee }));
    } else {
      setIsActive(false);
      dispatch(resetPrice());
    }
  }, [isClickAllCheck, product]);
  // 전체선택 체크박스를 눌렀을 경우에만 실행, product의 값이 업데이트돼야 price값이 들어오기 때문에 의존배열에 함께 넣어줌

  const handleClick = () => {
    navigate(`/product/${product?.product_id}`, { state: product });
  };

  const [isActive, setIsActive] = useState<boolean>(cartProduct.is_active);

  const handleCheckBoxClick = () => {
    if (cartProduct.is_active && product) {
      setIsActive(false);
      setCartItemList((prevCartItems) =>
        prevCartItems.map((item) =>
          item.product_id === cartProduct.product_id && item.is_active ? { ...item, is_active: false } : item
        )
      );
      dispatch(minusPrice({ price: price, deliveryFee: product.shipping_fee }));
    } else if (!cartProduct.is_active && product) {
      setIsActive(true);
      setCartItemList((prevCartItems) =>
        prevCartItems.map((item) =>
          item.product_id === cartProduct.product_id && !item.is_active ? { ...item, is_active: true } : item
        )
      );
      dispatch(plusPrice({ price: price, deliveryFee: product.shipping_fee }));
    }
  };

  // order목록 보내기(active및 수량 변경)
  const urlId = cartProduct.cart_item_id;

  async function putCartItems({ urlId, orderData }: PutCartItemProps) {
    await putCartItem({ urlId, orderData });
    console.log('yes');
  }

  const [orderData, setOrderData] = useState<CartActiveData>({
    product_id: cartProduct.product_id,
    quantity: count,
    is_active: isActive,
  });

  const [countChange, setCountChange] = useState<string>('');

  useEffect(() => {
    // 카운트가 변경될때마다 orderData의 수량도 변경
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      quantity: count,
    }));

    // 수량 변동 시 가격 빼고 더해주기
    if (countChange === '-' && product) {
      dispatch(minusPrice({ price: product.price, deliveryFee: 0 }));
    } else if (countChange === '+' && product) {
      dispatch(plusPrice({ price: product.price, deliveryFee: 0 }));
    }

    setCartItemList((prevCartItems) =>
      prevCartItems.map((item) =>
        item.product_id === cartProduct.product_id && item.quantity !== count ? { ...item, quantity: count } : item
      )
    );
  }, [count]);

  // isActive 값이 변경될 때마다 orderData의 active도 변경
  useEffect(() => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      is_active: isActive,
    }));
  }, [isActive]);

  const [isOneOrderBtnClick, setIsOneOrderBtnClick] = useState(false);

  // 주문하기 버튼이 클릭됐을 때 주문할 상품들은 is_active를 true로, 주문하지 않을 상품들은 false로 보내주기
  useEffect(() => {
    putCartItems({ urlId, orderData });
  }, [isOrderBtnClick, isOneOrderBtnClick, orderData]);

  const handleOneOrderBtnClick = () => {
    setIsOneOrderBtnClick(true);
  };

  useEffect(() => {
    if (isOneOrderBtnClick) {
      const orderListId = [cartProduct.product_id];
      const orderListQuantity = [count];
      const order_kind = 'cart_one_order';

      navigate('/payment', { state: { orderListId, orderListQuantity, order_kind } });
    }
  }, [isOneOrderBtnClick]);

  return (
    <>
      {product && (
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
            <Button
              disabled={!cartProduct.is_active}
              padding="10px 35px"
              fontSize="var(--font-size-md)"
              fontWeight="var(--font-weight-medium)"
              onClick={handleOneOrderBtnClick}
            >
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
          price={isActive ? price : undefined}
          deliveryFee={isActive ? product?.shipping_fee : undefined}
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
      color: var(--dark-gray-color);
      font-weight: var(--font-weight-light);
      font-size: var(--font-size-sm);

      .product-name {
        color: #000;
      }

      .product-price,
      .product-price strong {
        font-size: var(--font-size-md);
        color: #000;
        font-weight: var(--font-weight-bold);
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
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
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
