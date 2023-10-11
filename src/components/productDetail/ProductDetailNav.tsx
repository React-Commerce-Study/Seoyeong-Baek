import { useState } from 'react';
import styled from 'styled-components';
import ProductDescriptionBtn from '../common/Buttons/ProductDescriptionBtn';
import { mediaQuery, BREAKPOINT_TABLET } from '../style/mediaQuery/MediaQueryType';

export default function ProductInfoDescription() {
  const [activeIndex, setActiveIndex] = useState(0);

  const buttons = ['상세', '리뷰', 'Q&A', '반품/교환정보'];

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <DescriptionStyle>
      {buttons.map((button, index) => (
        <ProductDescriptionBtn
          key={index}
          className={`${activeIndex === index ? 'active' : ''} description-btn`}
          onClick={() => handleClick(index)}
        >
          {button}
        </ProductDescriptionBtn>
      ))}
    </DescriptionStyle>
  );
}

const DescriptionStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  margin: 8.75rem 0 23rem;

  ${mediaQuery(BREAKPOINT_TABLET)} {
    margin-top: 4.7rem;

    .description-btn {
      font-size: var(--font-size-xs);
    }
  }
`;
