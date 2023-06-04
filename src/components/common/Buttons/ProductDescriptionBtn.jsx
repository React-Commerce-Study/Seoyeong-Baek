import React from 'react';
import styled, { css } from 'styled-components';

export default function ProductDescriptionBtn(props) {
  return (
    <DescriptionBtnStyle {...props} type="button">
      {props.children}
    </DescriptionBtnStyle>
  );
}

const DescriptionBtnStyle = styled.button`
  box-sizing: border-box;
  width: 320px;
  padding: 18px 0;
  color: #767676;
  font-weight: 500;
  box-shadow: 0 6px 0 0 #e0e0e0;
  font-size: 18px;
  ${(props) => props.className.includes('active') && activeStyles}
`;

const activeStyles = css`
  /* Additional styles for the active class */
  color: var(--point-color);
  box-shadow: 0 6px 0 0 var(--point-color);
`;
