import React from 'react';
import styled, { css } from 'styled-components';

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
  className?: string;
}

export default function Button(props: ButtonProps) {
  return <ButtonStyle {...props}>{props.children}</ButtonStyle>;
}

const buttonStyles = css<ButtonProps>`
  width: 100%;
  height: 100%;
  background-color: ${(props: ButtonProps) => props.bgColor || 'var(--point-color)'};
  color: ${(props: ButtonProps) => props.color || '#fff'};
  font-size: ${(props: ButtonProps) => props.fontSize || 'var( --font-size-lg)'};
  font-weight: ${(props: ButtonProps) => props.fontWeight || '700'};
  padding: ${(props: ButtonProps) => props.padding || '1.1875rem 0'};
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: ${(props: ButtonProps) => props.boxShadow || 'none'};
  transition: all 0.25s ease-out;

  &:disabled {
    background-color: var(--middle-gray-color);
  }

  &:not(:disabled):hover {
    background-color: white;
    box-shadow: inset 0 0 0 1px ${(props: ButtonProps) => props.bgColor || 'var(--point-color)'};
    color: ${(props: ButtonProps) => props.bgColor || 'var(--point-color)'};
  }
`;

const ButtonStyle = styled.button<ButtonProps>`
  ${buttonStyles}

  &.all-delete-btn {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-sm);
    border-radius: 5px;
    border: 0.09rem solid var(--middle-gray-color);
    transition: all 0.25s ease-out;
    padding: 0;
    width: 5rem;
    &.active {
      color: var(--dark-gray-color);
      background: none;
    }
    &:hover,
    &:focus {
      border: 0.09rem solid var(--point-color);
      background-color: var(--point-color);
      color: #fff;
    }
  }
`;
