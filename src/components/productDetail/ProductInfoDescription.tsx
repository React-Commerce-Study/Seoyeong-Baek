import React, { useState } from 'react';
import styled from 'styled-components';
import ProductDescriptionBtn from '../common/Buttons/ProductDescriptionBtn';

export default function ProductInfoDescription() {
  const [activeIndex, setActiveIndex] = useState(0);

  const buttons = ['버튼', '리뷰', 'Q&A', '반품/교환정보'];

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <DescriptionStyle>
      {buttons.map((button, index) => (
        <ProductDescriptionBtn key={index} className={activeIndex === index ? 'active' : ''} onClick={() => handleClick(index)}>
          {button}
        </ProductDescriptionBtn>
      ))}
    </DescriptionStyle>
  );
}

const DescriptionStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 140px 0 359px;
`;
