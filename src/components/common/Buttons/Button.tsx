import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  bgColor?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  type?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  return <ButtonStyle {...props}>{props.children}</ButtonStyle>;
}

const ButtonStyle = styled.button<ButtonProps>`
  width: 100%;
  height: 100%;
  background-color: ${(props: ButtonProps) => props.bgColor || 'var(--point-color)'};
  color: #fff;
  font-size: ${(props: ButtonProps) => props.fontSize || '18px'};
  font-weight: ${(props: ButtonProps) => props.fontWeight || '700'};
  padding: ${(props: ButtonProps) => props.padding || '19px 0'};
  border-radius: 5px;
  box-sizing: border-box;
`;
