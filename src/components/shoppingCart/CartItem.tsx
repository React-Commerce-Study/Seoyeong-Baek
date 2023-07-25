import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../assets/icon/check-round.svg';
import CheckBoxFill from '../../assets/icon/check-round-Fill.svg';
import ProductCountButton from '../common/Buttons/ProductCountButton';
import Button from '../common/Buttons/Button';
import { ProductListItemStyle } from '../style/ProductListItemStyle';
import ProductDataImg from '../common/product/ProductDataImg';
import ProductDataInfo from '../common/product/ProductDataInfo';
import { CartProduct } from '../../@types/types';

// import { useRecoilState } from 'recoil';
// import { totalPriceState } from '../../Atom/Atom';

type CartItemProps = {
  cartProduct: CartProduct;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
};

export default function CartItem({ cartProduct, totalPrice, setTotalPrice }: CartItemProps) {
  console.log(cartProduct);
  // const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  const URL = 'https://openmarket.weniv.co.kr/';
  const navigate = useNavigate();

  const [isFetched, setIsFetched] = useState<boolean>(false);
  // TODO: product 모듈화하기
  const [product, setProduct] = useState<any>({});
  const [count, setCount] = useState<number>(product.stock | 1);

  useEffect(() => {
    fetchCartItem();
  }, []);

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

  // checkbox check여부 확인
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const price = product.stock === 0 ? 0 : count * product.price;
  const [countChange, setCountChange] = useState<string>('');

  useEffect(() => {
    if (countChange === '-') {
      setTotalPrice(totalPrice - product.price);
    } else if (countChange === '+') {
      setTotalPrice(totalPrice + product.price);
    }
  }, [countChange]);

  const handleCheckBoxClick = () => {
    if (isCheck) {
      setIsCheck(false);
      console.log(totalPrice);
      setTotalPrice(totalPrice - price);
    } else {
      setIsCheck(true);
      setTotalPrice(totalPrice + price);
    }
  };

  return (
    <>
      {isFetched && (
        <SCartItemContainer>
          <div className={`check-box ${isCheck ? 'checked' : ''}`} onClick={handleCheckBoxClick}></div>
          <div onClick={handleClick}>
            <ProductDataImg productImg={product.image} imgName={product.product_name} />
          </div>
          <div onClick={handleClick}>
            <ProductDataInfo product={product} isDelivery={true} />
          </div>
          <ProductCountButton
            count={count}
            setCount={setCount}
            productStock={product.stock}
            isCheck={isCheck}
            setCountChange={setCountChange}
          />
          <div className="total-price-wrapper">
            <p className="total-price">{price.toLocaleString()}원</p>
            <Button padding="10px 35px" fontSize="16px" fontWeight="500">
              주문하기
            </Button>
          </div>
          <div className="delete-btn"></div>
        </SCartItemContainer>
      )}
    </>
  );
}

const SCartItemContainer = styled(ProductListItemStyle)`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 36px;
  padding: 20px 30px;
  box-shadow: inset 0 0 10px blue;

  .check-box {
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

  .img-box {
    width: 10rem;
    height: 10rem;
  }

  .info-box {
    cursor: pointer;
    box-shadow: inset 0 0 10px blue;
  }

  .total-price-wrapper {
    box-shadow: inset 0 0 10px blue;
    text-align: center;

    p {
      margin-bottom: 26px;
      color: #eb5757;
      font-size: 18px;
      font-weight: 700;
    }
  }
`;
