import { ProductData, OrderData, CartActiveData } from '../@types/types';

const BASE_URL = 'https://openmarket.weniv.co.kr/';
const token = localStorage.getItem('token');

// 장바구니 리스트 가져오기
export async function fetchCartItemList() {
  console.log(token);
  try {
    const response = await fetch(`${BASE_URL}cart/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      console.log(data.results);
      return data.results;
    } else {
      throw new Error('네트워크에 문제가 있습니다.');
    }
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 장바구니에 담기
export async function postCartList(productData: ProductData) {
  try {
    const response = await fetch(`${BASE_URL}cart/`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.results);
    } else {
      throw new Error('네트워크에 문제가 있습니다.');
    }
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 주문목록 가져오기
export async function getOrderList() {
  try {
    const response = await fetch(`${BASE_URL}order/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      //   console.log(data.results);
      return data.results;
    } else {
      throw new Error('네트워크에 문제가 있습니다.');
    }
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 상품 가져오기
export async function getProductItem(productId: number) {
  try {
    const response = await fetch(`${BASE_URL}products/${productId}/`, {
      method: 'GET',
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('네트워크에 문제가 있습니다.');
    }
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 카트에서 주문하기
export async function postOrderList(orderData: OrderData) {
  try {
    const response = await fetch(`${BASE_URL}order/`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.results);
    } else {
      throw new Error('네트워크에 문제가 있습니다.');
    }
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 장바구니 상품 수량 수정
interface PutCartItemProps {
  urlId: number;
  orderData: CartActiveData;
}

export async function putCartItem({ urlId, orderData }: PutCartItemProps) {
  try {
    const response = await fetch(`${BASE_URL}cart/${urlId}/`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('미친 해결~!~!');

      return data;
    } else {
      throw new Error('네트워크에 문제가 있습니다.');
    }
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}
