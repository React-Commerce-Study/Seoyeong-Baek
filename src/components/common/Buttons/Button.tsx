import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  bgColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  boxShadow?: string;
  type?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return <ButtonStyle {...props}>{props.children}</ButtonStyle>;
}

const ButtonStyle = styled.button<ButtonProps>`
  width: 100%;
  height: 100%;
  background-color: ${(props: ButtonProps) => props.bgColor || 'var(--point-color)'};
  color: ${(props: ButtonProps) => props.color || '#fff'};
  font-size: ${(props: ButtonProps) => props.fontSize || '18px'};
  font-weight: ${(props: ButtonProps) => props.fontWeight || '700'};
  padding: ${(props: ButtonProps) => props.padding || '19px 0'};
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: ${(props: ButtonProps) => props.boxShadow || 'none'};
  transition: all 0.25s ease-out;

  &:disabled {
    background-color: #c4c4c4;
  }

  &:not(:disabled):hover {
    background-color: white;
    box-shadow: inset 0 0 0 1px ${(props: ButtonProps) => props.bgColor || 'var(--point-color)'};
    color: ${(props: ButtonProps) => props.bgColor || 'var(--point-color)'};
  }
`;
