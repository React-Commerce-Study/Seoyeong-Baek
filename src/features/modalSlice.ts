import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  modalType: string;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: '',
};

export const modalSlice = createSlice({
  name: 'modal', // 이 slice의 이름 만들기
  initialState, // 초기 값
  reducers: {
    openModal: (state, action: PayloadAction<{ modalType: string }>) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  }, // state 바꾸는 함수
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
