import { useEffect, useState } from 'react';
import ProductCountButton from '../common/Buttons/ProductCountButton';
import PurchaseButton from '../common/Buttons/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Product, ProductData } from '../../@types/types';
import Modal from '../modal/Modal';
import { fetchCartItemList, postCartList } from '../../services/ResponseApi';
import { useTypedSelector } from '../../hooks/UseTypedSelector';
import { useDispatch } from 'react-redux';
import { plusPrice, resetPrice } from '../../features/finalPriceSlice';
import { mediaQuery, BREAKPOINT_PC, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';

interface ProductPurchaseProps {
  product: Product;
}

type ButtonType = 'cart' | 'buy'; // 버튼 유형을 나타내는 타입 정의

export default function ProductPurchase({ product }: ProductPurchaseProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  console.log(product);
  const isUserLoggedIn = useTypedSelector((state) => state.isLoggedIn.isLogin);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isCartModal, setIsCartModal] = useState(false);
  const [isIncludedCartModal, setIsIncludedCartModal] = useState(false);

  const [productData, setProductData] = useState<ProductData>({
    product_id: product.product_id,
    quantity: count,
    check: false,
  });

  // 로그인시에만 장바구니에 넣을 수 있고, 장바구니에 있으면 이미 있다고 띄워주기
  const handleClickBtn = (buttonType: ButtonType) => {
    isUserLoggedIn ? requestApi(buttonType) : setIsShowModal(true);

    function requestApi(buttonType: ButtonType) {
      if (buttonType === 'cart') {
        console.log('장바구니 버튼 클릭');
        checkCartItems();
      } else if (buttonType === 'buy') {
        console.log('구매 버튼 클릭');
        const orderListId = [product.product_id];
        const orderListQuantity = [count];
        const order_kind = 'direct_order';

        navigate('/payment', { state: { orderListId, orderListQuantity, order_kind } });

        dispatch(resetPrice());
        dispatch(plusPrice({ price: product.price * count, deliveryFee: product.shipping_fee }));
      }
    }
  };

  // 장바구니 목록을 불러와서 이미 담긴 상품인지 확인
  async function checkCartItems() {
    const cartList = await fetchCartItemList();
    const cartItemIdArr = cartList?.map((cartItem: { product_id: number }) => {
      return cartItem.product_id;
    });

    if (cartItemIdArr?.includes(product.product_id)) {
      console.log('이미 장바구니에 담겨있습니다.');
      // 장바구니 모달
      setIsIncludedCartModal(true);
    } else {
      console.log('장바구니에 담겼습니다.');
      setProductData({ ...productData, check: true });
      postCartList(productData);
      // 장바구니 모달
      setIsCartModal(true);
    }
  }

  // 수량변경될 때마다 post데이터에 넣어주기
  useEffect(() => {
    setProductData({ ...productData, quantity: count });
  }, [count]);

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
        <PurchaseButton
          type="button"
          bgColor="var(--dark-gray-color)"
          onClick={() => handleClickBtn('cart')}
          disabled={product.stock === 0}
        >
          장바구니
        </PurchaseButton>
        <PurchaseButton type="button" onClick={() => handleClickBtn('buy')} disabled={product.stock === 0}>
          바로 구매
        </PurchaseButton>
      </ButtonWrapperStyle>
      {isShowModal && <Modal type="requiredLogin" setIsShowModal={setIsShowModal} />}
      {isCartModal && <Modal type="addToCart" setIsShowModal={setIsCartModal} />}
      {isIncludedCartModal && <Modal type="includedCart" setIsShowModal={setIsIncludedCartModal} />}
    </PurchaseContainerStyle>
  );
}

const PurchaseContainerStyle = styled.div`
  width: 100%;

  .product-count-wrapper {
    border-top: 2px solid var(--middle-gray-color);
    border-bottom: 2px solid var(--middle-gray-color);
    padding: 1.875rem 0;
    margin: 1.25rem 0 2rem;
  }

  ${mediaQuery(BREAKPOINT_PC)} {
    .product-count-wrapper {
      border-top: none;
      border-bottom: 1px solid var(--middle-gray-color);
    }
  }
  ${mediaQuery(BREAKPOINT_TABLET)} {
    .product-count-wrapper {
      padding: 1rem 0;
    }
  }
`;

const ProductTotalPriceStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.375rem;
  font-size: var(--font-size-lg);

  p {
    font-weight: var(--font-weight-medium);
    color: #000;
    flex-shrink: 0;
  }

  .total-price-wrapper {
    display: flex;
    align-items: center;
    font-weight: var(--font-weight-light);

    .total-count {
      color: var(--dark-gray-color);

      strong {
        color: var(--point-color);
        font-weight: var(--font-weight-bold);
      }

      &::after {
        content: '|';
        display: inline-block;
        margin: 0 12px;
        color: var(--middle-gray-color);
      }
    }

    .total-price {
      color: var(--point-color);

      strong {
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-xxl);
        margin-right: 2px;
      }
    }
  }
  ${mediaQuery(BREAKPOINT_PC)} {
    gap: 1rem;
    .total-price-wrapper {
    }
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    gap: 1rem;
    font-size: var(--font-size-sm);

    .total-price-wrapper {
      .total-price {
        color: var(--point-color);

        strong {
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-xl);
          margin-right: 2px;
        }
      }
    }
  }
`;

const ButtonWrapperStyle = styled.div`
  display: flex;
  gap: 0.875rem;

  button:first-child {
    flex-basis: 45%;
  }

  ${mediaQuery(BREAKPOINT_PC)} {
    button {
      flex-basis: 50%;
      flex-grow: 1;
    }
  }
`;
