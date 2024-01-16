import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getCartList } from 'services/api/getCartList';

export default function useCartList() {
  const fetchCartItems = useCallback(getCartList, []);
  // useCallback을 사용하여 메모이제이션

  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryKey: ['cartList'],
    queryFn: fetchCartItems,
  });
  return {
    data, isLoading, isError, error,
  };
}
