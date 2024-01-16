import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { RootState } from '../app/store';

// useTypedSelector는 react-redux 라이브러리의 useSelector 훅과 유사한 역할을 수행하며, 타입 안정성을 제공하기 위해 제네릭 타입을 사용
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// useSelector: Redux 스토어의 상태를 선택하기 위한 React Hook. 이 훅은 함수 인자로 콜백 함수를 받아서 해당 콜백 함수 내에서 원하는 상태 값을 추출.
// TypedUseSelectorHook: TypeScript에서 타입 안정성을 제공하기 위해 사용되는 제네릭 타입. 이 타입은 Redux 스토어의 전체 상태 타입(RootState)을 인자로 받아서, 해당 상태에 대한 타입 안전성을 보장.
// RootState: Redux 스토어의 전체 상태를 나타내는 타입.
// 위 코드는 UseTypedSelector라는 커스텀 훅을 정의하고, 해당 훅을 사용하여 Redux 스토어의 상태 값을 선택할 수 있도록 해 TypeScript가 선택된 상태 값에 대한 올바른 타입 검사를 수행.
