import React from 'react';
import styled from 'styled-components';

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
  color: ${(props) => props.color || '#767676'};
  font-weight: 500;
  /* var(--point-color) */
  box-shadow: 0 6px 0 0 #e0e0e0;
  font-size: 18px;
  /* box-shadow: inset 0 0 10px red; */
`;
