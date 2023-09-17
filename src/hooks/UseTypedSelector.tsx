import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../app/store'; // store 파일에서 정의한 경로에 맞게 수정해주세요.

export const UseTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
