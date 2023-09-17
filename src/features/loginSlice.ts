import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserData } from '../@types/types';

export interface LoginState {
  isLogin: boolean;
  userData: UserData;
}

const initialState: LoginState = {
  isLogin: false,
  userData: { id: '', token: '', user_type: '' },
};

export const loginSlice = createSlice({
  name: 'loginData', //이 slice의 이름 만들기
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
