import { ProductData, OrderData, SignUpData, LoginData, PutCartItemProps } from '../@types/types';

const BASE_URL = 'https://openmarket.weniv.co.kr/';
const token = localStorage.getItem('token') as string; // 타입 단언 사용

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
      console.log(data);
    } else {
      throw new Error('네트워크에 문제가 있습니다.');
    }
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 장바구니 상품 수량 수정 및 상품 active값 변경
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
      console.log('~!~!');

      return data;
    } else {
      throw new Error('네트워크에 문제가 있습니다.');
    }
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 회원가입
export async function postSignUp(signUpData: SignUpData) {
  try {
    const res = await fetch(URL + 'accounts/signup/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(signUpData),
    });
    console.log(signUpData);

    if (res.ok) {
      const data = await res.json();
      console.log('SignUp successful!');
      console.log(data);
    } else {
      throw new Error('네트워크에 문제가 있습니다.');
    }
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

//로그인
export async function postLogin(loginData: LoginData) {
  try {
    const res = await fetch(URL + 'accounts/login/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      console.log('Login successful!');
      localStorage.setItem('token', token);
      // 로그인 성공 값을 전역상태관리해줘야 할 듯 일단은 토큰으로 로그인 성공여부를 불러오기
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error('Login failed!', error);
  }
}
