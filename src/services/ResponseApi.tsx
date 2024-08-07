import {
  ProductData,
  OrderData,
  ExtendedOrderData,
  SignUpData,
  ExtendedSignUpData,
  LoginData,
  PostProductData,
  UnsplashPhoto,
  PutItemProps,
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

// 상품 검색
export async function getSearchProduct(keyword: string) {
  const getProductUrl = `${BASE_URL}products/?search=${keyword}`;
  try {
    const response = await fetch(getProductUrl, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.results);
      return data.results;
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

// 장바구니 상품 전페 삭제하기
export async function DeleteAllItem() {
  try {
    await fetch(`${BASE_URL}cart/`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
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
export async function putCartItem({ urlId, orderData }: PutItemProps) {
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
export async function postSignUp(userType: string, signUpData: SignUpData | ExtendedSignUpData) {
  try {
    const URL = BASE_URL + `accounts/signup${userType === 'SELLER' ? '_seller' : ''}/`;
    const res = await fetch(URL, {
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

// 회원가입 아이디 및 사업자등록번호 검증 체크
export async function postValidCheck(
  validType: string,
  validData: { company_registration_number: string } | { username: string }
) {
  try {
    const URL = BASE_URL + `accounts/signup/valid/${validType}/`;
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(validData),
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

/* seller */
export async function getSaleItems() {
  try {
    const response = await fetchWithToken(`${BASE_URL}seller/`, {
      method: 'GET',
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.results);
      return data.results;
    }
    throw new Error('네트워크에 문제가 있습니다.');
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 상품등록
export async function postProduct(reqData: PostProductData) {
  console.log(reqData);

  try {
    // multipart/form-data로 데이터를 전송할 때, 해당 형식에 맞게 데이터를 FormData 객체에 추가
    const formData = new FormData();

    if (reqData.image instanceof Blob) {
      formData.append('image', reqData.image, 'image.jpg');
    }
    formData.append('price', String(reqData.price));
    formData.append('product_name', String(reqData.product_name));
    formData.append('product_info', String(reqData.product_info));
    formData.append('shipping_fee', String(reqData.shipping_fee));
    formData.append('shipping_method', String(reqData.shipping_method));
    formData.append('stock', String(reqData.stock));

    const response = await fetch(`${BASE_URL}products/`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 상품수정
export async function putEditProduct({ urlId, editData }: PutItemProps) {
  try {
    const formData = new FormData();

    if (editData && editData.image) formData.append('image', editData.image, 'image.jpg');
    formData.append('price', String(editData && editData.price));
    formData.append('product_name', String(editData && editData.product_name));
    formData.append('product_info', String(editData && editData.product_info));
    formData.append('shipping_fee', String(editData && editData.shipping_fee));
    formData.append('shipping_method', String(editData && editData.shipping_method));
    formData.append('stock', String(editData && editData.stock));

    const response = await fetch(`${BASE_URL}products/${urlId}/`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}

// 상품삭제
export async function deleteSaleItem(productId: number) {
  try {
    const response = await fetch(`${BASE_URL}products/${productId}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    // const data = await response.json();

    console.log('delete', response);
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
    throw error;
  }
}
