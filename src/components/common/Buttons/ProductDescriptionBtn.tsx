import styled, { css } from 'styled-components';

interface ProductDescriptionBtnProps {
  key?: number;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const ProductDescriptionBtn: React.FC<ProductDescriptionBtnProps> = (props) => {
  return (
    <DescriptionBtnStyle {...props} type="button">
      {props.children}
    </DescriptionBtnStyle>
  );
};

const DescriptionBtnStyle = styled.button`
  box-sizing: border-box;
  width: 20rem;
  padding: 18px 0;
  color: var(--dark-gray-color);
  font-weight: var(--font-weight-medium);
  border-bottom: 0.375rem solid var(--light-gray-color);
  /* box-shadow: inset 0 0 20px black; */

  font-size: var(--font-size-lg);
  ${(props: { className?: string }) => props.className && props.className.includes('active') && activeStyles}
`;
/* 위 코드에서 props.className 값이 undefined인 경우를 처리하기 위해 props.className이 존재하는지(props.className &&)를 확인. 그런 다음 props.className.includes('active')를 평가하여 'props.className' is possibly 'undefined' 오류를 방지. */

const activeStyles = css`
  color: var(--point-color);
  border-bottom: 0.375rem solid var(--point-color);
`;

export default ProductDescriptionBtn;
