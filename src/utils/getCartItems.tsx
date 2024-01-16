// import { fetchCartItemList } from '../services/ResponseApi';
// import { useIsLogin } from '../hooks/UseLoginData';

// export default async function getCartItems(addDelete?: string) {
//   const isUserLoggedIn = useIsLogin();
//   const isCartList = localStorage.getItem('cartList');

//   const fetchAndStoreCartList = async () => {
//     if (
//       (isUserLoggedIn && !isCartList) ||
//       (isUserLoggedIn && addDelete === 'addItem') ||
//       (isUserLoggedIn && addDelete === 'deleteItem')
//     ) {
//       const cartList = await fetchCartItemList();
//       console.log(cartList);
//       localStorage.setItem('cartList', JSON.stringify(cartList));
//     }
//   };

//   fetchAndStoreCartList();
// }
