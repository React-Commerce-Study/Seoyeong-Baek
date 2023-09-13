import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThumbsUpIcon from '../../assets/icon/icon-thumbs-up.gif';
import { useNavigate } from 'react-router-dom';
import { ReqOrderData } from '../../@types/types';
import Button from '../common/Buttons/Button';
import { getProductItem } from '../../services/ResponseApi';

interface OrderCompleteModalProps {
  reqOrderResult: ReqOrderData;
  totalPrice: number;
  totalDeliveryFee: number;
}

export default function OrderCompleteModal({ reqOrderResult, totalPrice, totalDeliveryFee }: OrderCompleteModalProps) {
  const navigate = useNavigate();
  const [productName, setProductName] = useState<string>();

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductItem(reqOrderResult.order_items[0]);

      setProductName(product.product_name);
    };

    getProduct();
  }, []);

  return (
    <SModalBackground>
      <SOrderCompleteLayout>
        <h3>주문이 완료되었습니다!</h3>
        <time>
          {reqOrderResult.created_at.slice(0, 10)} {reqOrderResult.created_at.slice(11, 19)}
        </time>
        <img src={ThumbsUpIcon} alt="주문성공 이미지" />
        <SOrderInfoList>
          <li>
            <p>주문번호</p>
            <p>{reqOrderResult.order_number}</p>
          </li>
          <li>
            <p>주문상품</p>
            <p>
              {reqOrderResult.order_items.length === 1
                ? productName
                : `${productName} 외 ${reqOrderResult.order_items.length - 1}건`}
            </p>
          </li>
          <li>
            <p>결제금액</p>
            <p>
              <strong>{(totalPrice + totalDeliveryFee).toLocaleString()}</strong>원
            </p>
          </li>
          <SPriceListContainer>
            <li>
              <p>총 상품금액</p>
              <p>{totalPrice.toLocaleString()}원</p>
            </li>
            <li>
              <p>총 할인금액</p>
              <p>-0원</p>
            </li>
            <li>
              <p>배송비</p>
              <p>{totalDeliveryFee !== 0 ? totalDeliveryFee.toLocaleString() : 0}원</p>
            </li>
          </SPriceListContainer>
        </SOrderInfoList>
        <SButtonContainer>
          {/* TODO: 주문내역 보기로 이동 */}
          <Button bgColor="#767676" onClick={() => navigate('/')}>
            주문 내역 보기
          </Button>
          <Button onClick={() => navigate('/')}>홈 화면 가기</Button>
        </SButtonContainer>
      </SOrderCompleteLayout>
    </SModalBackground>
  );
}

const SModalBackground = styled.div`
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;

  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(1.8px);
  }
`;

const SOrderCompleteLayout = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  max-width: 22.5rem;
  padding: 2.6rem 3rem;
  background-color: #fff;
  text-align: center;
  border-radius: 0.6rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11),
    0 6px 8px rgba(0, 0, 0, 0.11), 0 8px 16px rgba(0, 0, 0, 0.11);

  .delete-btn {
    position: absolute;
    top: 1.125rem;
    right: 1.125rem;
    padding: 0;
    width: 1.38rem;
    height: 1.38rem;
  }

  h3 {
    font-size: 1.5rem;
    padding-bottom: 1.125rem;
    font-weight: 800;
  }

  time {
    color: #c4c4c4;
    font-size: 0.9rem;
  }

  img {
    display: block;
    width: 10rem;
    text-align: center;
    margin: 1rem auto;
  }
`;

const SOrderInfoList = styled.ul`
  margin: 1.25rem 0;

  & > li:not(:nth-child(3)) {
    border-bottom: 1px solid #c4c4c4;
  }

  li {
    display: flex;
    gap: 2.5rem;
    justify-content: space-between;
    padding: 1rem 0;

    & > p:first-child {
      flex-shrink: 0;
    }

    p {
      font-size: 1rem;
      line-height: normal;
      max-width: 20rem;

      strong {
        font-weight: 800;
        font-size: 1.2rem;
      }
    }
  }
`;

const SPriceListContainer = styled.ul`
  color: #c4c4c4;

  li {
    padding: 0.4rem 0;

    p {
      font-size: 0.9rem;
    }
  }
`;

const SButtonContainer = styled.div`
  display: flex;
  gap: 10px;

  & > button {
    font-size: 1rem;
    flex-basis: 50%;
    font-weight: 500;
    padding: 0.8rem 0;
  }
`;
