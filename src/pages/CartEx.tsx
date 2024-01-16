import { Key, ReactNode } from 'react';

import useCartList from 'services/queries/useCartList';
import styled from 'styled-components';

interface CartProduct {
  my_cart: number;
  cart_item_id: number;
  is_active: boolean;
  product_id: number;
  quantity: number;
}
export default function CartEx() {
  const {
    data, isLoading, error, isError,
  } = useCartList();
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return (
      <div>
        Error:
        {error?.toString()}
      </div>
    );
  }
  return (
    <SCartListContainer>
      {data.map((item: CartProduct) => {
        return <div key={item.cart_item_id}>{item.cart_item_id}</div>;
      })}
    </SCartListContainer>
  );
}
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
`;
