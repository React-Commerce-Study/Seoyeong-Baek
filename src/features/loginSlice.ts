import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginData } from '../@types/types';

export interface LoginState {
  isLogin: boolean;
  userData: LoginData;
}

const initialState: LoginState = {
  isLogin: false,
  userData: { username: '', password: '', login_type: '' },
};

export const loginSlice = createSlice({
  name: 'login', //이 slice의 이름 만들기
  initialState, // 초기 값
  reducers: {
    login: (state, action: PayloadAction<LoginState>) => {
      state.isLogin = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  }, // state 바꾸는 함수
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
