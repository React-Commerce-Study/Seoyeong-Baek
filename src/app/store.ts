import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 로컬 스토리지 사용

// import modalReducer from '../features/modalSlice';
import finalPriceReducer from '../features/finalPriceSlice';
import isLoggedInReducer from '../features/loginSlice';

const persistConfig = {
  key: 'root', // 저장 키
  storage, // 사용할 스토리지 (로컬 스토리지)
  // serialize: false, // serialize 옵션 추가
};

const persistedLoginReducer = persistReducer(persistConfig, isLoggedInReducer);
const persistedPriceReducer = persistReducer(persistConfig, finalPriceReducer);

export const store = configureStore({
  reducer: {
    // modal: modalReducer,
    isLoggedIn: persistedLoginReducer,
    finalPrice: persistedPriceReducer,
  },
  middleware: (getDefaultMiddleware) => { return getDefaultMiddleware({ serializableCheck: false }); },
});
// Redux의 serializableStateInvariantMiddleware에서 오류 발생. 이 오류는 액션 객체에 직렬화할 수 없는 값이 포함되어 있을 때 발생. 직렬화 가능한 값은 일반적으로 문자열, 숫자, 불리언, 배열 및 객체와 같은 기본 데이터 유형.

// 오류 메시지에서 언급된 register 함수가 액션 객체 내부에 포함되어 있으며, 해당 함수가 직렬화할 수 없는 값을 직렬화하지 않도록 설정

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
