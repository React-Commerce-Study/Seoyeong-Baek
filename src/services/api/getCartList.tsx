// const BASE_URL = "https://openmarket.weniv.co.kr/";
// const token = localStorage.getItem('token');

async function fetchWithToken(url: string, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-type": "application/json",
    Authorization: `JWT ${token}`,
  };

  return fetch(url, { ...options, headers });
}

export async function getCartList() {
  const response = await fetchWithToken(
    `${process.env.REACT_APP_BASE_URL}cart/`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data.results;
}
