import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ModalState {
  totalPrice: number;
  totalDeliveryFee: number;
}

const initialState: ModalState = {
  totalPrice: 0,
  totalDeliveryFee: 0,
};

export const finalPriceSlice = createSlice({
  name: 'finalPrice', //이 slice의 이름 만들기
  initialState, // 초기 값
  reducers: {
    plusPrice: (state, action: PayloadAction<{ price: number; deliveryFee: number }>) => {
      state.totalPrice += action.payload.price;
      state.totalDeliveryFee += action.payload.deliveryFee;
    },
    minusPrice: (state, action: PayloadAction<{ price: number; deliveryFee: number }>) => {
      if (state.totalPrice - action.payload.price >= 0) {
        state.totalPrice -= action.payload.price;
        state.totalDeliveryFee -= action.payload.deliveryFee;
      }
    },
    resetPrice: (state) => {
      // 초기값으로 되돌리기
      state.totalPrice = initialState.totalPrice;
      state.totalDeliveryFee = initialState.totalDeliveryFee;
    },
  }, // state 바꾸는 함수
});

export const { plusPrice, minusPrice, resetPrice } = finalPriceSlice.actions;
export default finalPriceSlice.reducer;
