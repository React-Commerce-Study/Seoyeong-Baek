import {
  ProductData,
  OrderData,
  ExtendedOrderData,
  SignUpData,
  UserNameData,
  LoginData,
  UnsplashPhoto,
  PutCartItemProps,
} from '../@types/types';

const BASE_URL = 'https://openmarket.weniv.co.kr/';
const token = localStorage.getItem('token');

// interceptor
// 로그인하고 장바구니 이동시 장바구니 리스트를 불러오지 못함 -> 새로고침시에는 불러와짐 -> 카트리스트컴포넌트에서 직접적으로 토큰을 넣어주니 잘 되더라~~ 인터셉트 함수를 이용해서 ~~
async function fetchWithToken(url: string, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-type': 'application/json',
    Authorization: `JWT ${token}`,
  };

  return fetch(url, { ...options, headers });
}

// 상품 리스트 가져오기
export async function getProductList(fetchPage?: number) {
  const getProductUrl = fetchPage ? `${BASE_URL}products/?page=${fetchPage}` : `${BASE_URL}products/`;
  try {
    const response = await fetch(getProductUrl, {
      method: 'GET',
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.results);
      return data;
    }
    throw new Error('네트워크에 문제가 있습니다.');
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 장바구니 리스트 가져오기
// export async function fetchCartItemList(token: string) {
//   try {
//     const response = await fetch(`${BASE_URL}cart/`, {
//       method: 'GET',
//       headers: {
//         Authorization: `JWT ${token}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data.results);
//       return data.results;
//     } else {
//       throw new Error('네트워크에 문제가 있습니다.');
//     }
//   } catch (error) {
//     console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
//   }
// }

// 장바구니 리스트 가져오기
export async function fetchCartItemList() {
  try {
    const response = await fetchWithToken(`${BASE_URL}cart/`, {
      method: 'GET',
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

// carousel unsplash api 랜덤 이미지
export async function getRandomImages(): Promise<string[]> {
  try {
    const clientId = 'kCvJPqD4T-o5V3NrHiOjC6RaZU4I4zsuiqn_hmcNg1Y';
    const url = `https://api.unsplash.com/photos/random/?client_id=${clientId}&query=product&orientation=landscape&count=10`;

    const res = await fetch(url, {
      method: 'GET',
    });

    if (res.ok) {
      const data = await res.json();
      const urls = data.map((item: UnsplashPhoto) => item.urls.regular);
      return urls;
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.error('Request failed!', error);
    throw error;
  }
}
