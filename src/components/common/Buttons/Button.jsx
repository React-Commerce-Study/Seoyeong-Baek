import React from 'react';
import styled from 'styled-components';

export default function Button(props) {
  return <ButtonStyle {...props}>{props.children}</ButtonStyle>;
}

const ButtonStyle = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor || 'var(--point-color)'};
  color: #fff;
  font-size: ${(props) => props.fontSize || '18px'};
  font-weight: ${(props) => props.fontWeight || '700'};
  padding: ${(props) => props.padding || '19px 0'};
  border-radius: 5px;
  box-sizing: border-box;
`;
