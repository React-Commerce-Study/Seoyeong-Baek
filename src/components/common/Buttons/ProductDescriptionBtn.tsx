import React from 'react';
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
  width: 320px;
  padding: 18px 0;
  color: #767676;
  font-weight: 500;
  box-shadow: 0 6px 0 0 #e0e0e0;
  font-size: 18px;
  ${(props: { className?: string }) => props.className && props.className.includes('active') && activeStyles}
`;
/* 위 코드에서 props.className 값이 undefined인 경우를 처리하기 위해 props.className이 존재하는지(props.className &&)를 확인. 그런 다음 props.className.includes('active')를 평가하여 'props.className' is possibly 'undefined' 오류를 방지. */

const activeStyles = css`
  /* Additional styles for the active class */
  color: var(--point-color);
  box-shadow: 0 6px 0 0 var(--point-color);
`;

export default ProductDescriptionBtn;
