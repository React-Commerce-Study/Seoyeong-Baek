import React from 'react';
import styled from 'styled-components';

export default function ProductDescriptionBtn() {
  return <DescriptionBtnStyle>버튼</DescriptionBtnStyle>;
}

const DescriptionBtnStyle = styled.button`
  box-sizing: border-box;
  padding: 18px 143px;
  color: #767676;
  font-weight: 500;
  /* var(--point-color) */
  box-shadow: 0 6px 0 0 #e0e0e0;
  font-size: 18px;
  /* box-shadow: inset 0 0 10px red; */
`;
