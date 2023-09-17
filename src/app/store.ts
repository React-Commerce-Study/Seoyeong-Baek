import { configureStore } from '@reduxjs/toolkit';
// import modalReducer from '../features/modalSlice';
import loginReducer from '../features/loginSlice';

export const store = configureStore({
  reducer: {
    // modal: modalReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
