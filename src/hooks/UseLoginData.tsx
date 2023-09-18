import { useTypedSelector } from './UseTypedSelector';

// export function UseToken() {
//   const token = UseTypedSelector((state) => state.loginData.userData.token);

//   console.log(token);
//   return token;
// }

// useSelector를 사용하여 isLogin 값을 가져옴
export const useIsLogin = () => {
  const isLogin = useTypedSelector((state) => state.isLoggedIn.isLogin);

  return isLogin;
};
