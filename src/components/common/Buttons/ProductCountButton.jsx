import React from 'react';
import MinusImg from '../../../assets/icon/icon-minus-line.svg';
import plusImg from '../../../assets/icon/icon-plus-line.svg';
import styled from 'styled-components';

export default function ProductCount() {
  return (
    <ProductCountStyle>
      <button type="button" className="minus">
        <img src={MinusImg} alt="마이너스 버튼 이미지" />
      </button>
      <p>1</p>
      <button type="button" className="plus">
        <img src={plusImg} alt="플러스 버튼 이미지" />
      </button>
    </ProductCountStyle>
  );
}

const ProductCountStyle = styled.div`
  box-shadow: inset 0 0 10px red;
  width: 150px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  border: 1px solid #c4c4c4;
  border-radius: 5px;

  .minus,
  .plus {
    padding: 0 14px;
    box-shadow: inset 0 0 10px red;
  }

  p {
    border: 1px solid #c4c4c4;
    padding: 14px 21px;
    font-size: 18px;
    color: #000;
    box-shadow: inset 0 0 10px red;
  }
`;
