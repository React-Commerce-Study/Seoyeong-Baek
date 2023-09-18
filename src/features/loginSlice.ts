import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface LoginState {
  isLogin: boolean;
}

const initialState: LoginState = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: 'isLoggedIn', //이 slice의 이름 만들기
  initialState, // 초기 값
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  }, // state 바꾸는 함수
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
