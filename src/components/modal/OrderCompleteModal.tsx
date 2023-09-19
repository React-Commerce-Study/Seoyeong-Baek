import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThumbsUpIcon from '../../assets/icon/icon-thumbs-up.gif';
import { useNavigate } from 'react-router-dom';
import { ReqOrderData } from '../../@types/types';
import Button from '../common/Buttons/Button';
import { getProductItem } from '../../services/ResponseApi';
import { SModalBackground, SModalLayout, SButtonWrapper } from '../style/ModalStyle';

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

  const OrderInfo = {
    주문번호: reqOrderResult.order_number,
    주문상품:
      reqOrderResult.order_items.length === 1 ? productName : `${productName} 외 ${reqOrderResult.order_items.length - 1}건`,
    결제금액: (totalPrice + totalDeliveryFee).toLocaleString(),
  };

  return (
    <SModalBackground>
      <SOrderCompleteLayout>
        <h3>주문이 완료되었습니다!</h3>
        <time>
          {reqOrderResult.created_at.slice(0, 10)} {reqOrderResult.created_at.slice(11, 19)}
        </time>
        <img src={ThumbsUpIcon} alt="주문성공 이미지" />
        <SOrderInfoList>
          {Object.entries(OrderInfo).map(([key, value]) => {
            return (
              <li>
                <p>{key}</p>
                <p>
                  {key === '결제금액' ? <strong>{value}</strong> : value}
                  {key === '결제금액' ? ' 원' : null}
                </p>
              </li>
            );
          })}

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
        <SButtonWrapper>
          {/* TODO: 주문내역 보기로 이동 */}
          <Button bgColor="var(--dark-gray-color)" onClick={() => navigate('/')}>
            주문 내역 보기
          </Button>
          <Button onClick={() => navigate('/')}>홈 화면 가기</Button>
        </SButtonWrapper>
      </SOrderCompleteLayout>
    </SModalBackground>
  );
}

const SOrderCompleteLayout = styled(SModalLayout)`
  max-width: 30rem;
  min-width: 26rem;
  padding: 2.6rem 3rem;

  h3 {
    font-size: var(--font-size-xl);
    padding-bottom: 1.125rem;
    font-weight: var(--font-weight-black);
  }

  time {
    color: var(--middle-gray-color);
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
    border-bottom: 1px solid var(--middle-gray-color);
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
      margin-bottom: 0;
    }
  }
`;

const SPriceListContainer = styled.ul`
  color: var(--middle-gray-color);

  li {
    padding: 0.4rem 0;

    p {
      font-size: 0.9rem;
    }
  }
`;
