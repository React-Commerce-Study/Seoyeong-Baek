import React from 'react';
import styled from 'styled-components';
import ProductDescriptionBtn from '../common/Buttons/ProductDescriptionBtn';

export default function ProductInfoDescription() {
  // const clickHandler = () => {};

  return (
    <DescriptionStyle>
      <ProductDescriptionBtn>버튼</ProductDescriptionBtn>
      <ProductDescriptionBtn>리뷰</ProductDescriptionBtn>
      <ProductDescriptionBtn>Q&A</ProductDescriptionBtn>
      <ProductDescriptionBtn>반품/교환정보 </ProductDescriptionBtn>
    </DescriptionStyle>
  );
}

const DescriptionStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 140px 0 359px;
`;
