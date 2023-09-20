import {
  ProductData,
  OrderData,
  ExtendedOrderData,
  SignUpData,
  UserNameData,
  LoginData,
  PutCartItemProps,
} from '../@types/types';

const BASE_URL = 'https://openmarket.weniv.co.kr/';
const token = localStorage.getItem('token');

// 상품 리스트 가져오기
export async function getProductList(fetchPage: number) {
  try {
    const response = await fetch(`${BASE_URL}products/?page=${fetchPage}`, {
      method: 'GET',
    });

    console.log(`${BASE_URL}/?page=${fetchPage}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data.results);
      // console.log(data.next);
      return data;
    }
    throw new Error('네트워크에 문제가 있습니다.');
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 장바구니 리스트 가져오기
export async function fetchCartItemList() {
  try {
    const response = await fetch(`${BASE_URL}cart/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

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

// 장바구니에서 상품 삭제하기
export async function DeleteCartItem(cartItemId: number) {
  try {
    const response = await fetch(`${BASE_URL}cart/${cartItemId}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
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

interface postOrderListProps {
  orderData?: OrderData;
  oneOrderData?: ExtendedOrderData;
}
// 카트에서 주문하기
export async function postOrderList({ orderData, oneOrderData }: postOrderListProps) {
  console.log(orderData);
  console.log(token);

  try {
    const reqData = orderData || oneOrderData;
    const response = await fetch(`${BASE_URL}order/`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(reqData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
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
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 회원가입
export async function postSignUp(signUpData: SignUpData) {
  try {
    const res = await fetch(BASE_URL + 'accounts/signup/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(signUpData),
    });
    console.log(signUpData);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// 회원가입 중복 아이디 체크
export async function postIdCheck(username: UserNameData) {
  try {
    const res = await fetch(BASE_URL + 'accounts/signup/valid/username/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(username),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

//로그인
export async function postLogin(loginData: LoginData) {
  try {
    const res = await fetch(BASE_URL + 'accounts/login/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      const { user_type, token } = data;
      const { username } = loginData;
      console.log('Login successful!');
      localStorage.setItem('username', username);
      localStorage.setItem('user_type', user_type);
      localStorage.setItem('token', token);
      return data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error('Login failed!', error);
  }
}
