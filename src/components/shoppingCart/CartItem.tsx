import React from 'react';
import styled from 'styled-components';
import CheckBox from '../../assets/icon/check-round.svg';
import CheckBoxFill from '../../assets/icon/check-round-fill.svg';

interface CartItem {
  count: number;
  next: string | null;
  previous: string | null;
  results: [
    {
      my_cart: number; // 카트 고유번호, User가 바뀌지 않는이상 번호가 바뀌지 않음
      cart_item_id: number; // cartItem의 고유번호, 요청시마다 번호가 바뀜
      is_active: boolean;
      product_id: number; // 상품 아이디
      quantity: number; // 장바구니에 담긴 상품의 개수
    }
  ];
}

type CartItemProps = {
  cartItemList: CartItem;
};

export default function CartItem({ cartItemList }: CartItemProps) {
  return (
    <>
      {cartItemList && (
        <SCartItemContainer>
          <div>CartItem</div>
          <div>CartItem</div>
          <div>CartItem</div>
        </SCartItemContainer>
      )}
    </>
  );
}

const SCartItemContainer = styled.div`
  display: flex;
`;
