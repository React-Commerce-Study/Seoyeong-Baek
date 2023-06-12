import React from 'react';
import MinusImg from '../../../assets/icon/icon-minus-line.svg';
import plusImg from '../../../assets/icon/icon-plus-line.svg';
import styled from 'styled-components';

export default function ProductCount({ count, setCount, productStock }) {
  if (productStock === 0) {
    return <ZeroCount>해당상품은 재고가 없습니다.</ZeroCount>;
  }

  const decreaseCount = () => {
    if (count <= 1) return;
    setCount(count - 1);
  };

  const increaseCount = () => {
    if (count >= productStock) return alert('상품의 재고가 부족합니다.');
    setCount(count + 1);
  };

  return (
    <ProductCountStyle>
      <button type="button" className="minus" onClick={decreaseCount}>
        <img src={MinusImg} alt="마이너스 버튼 이미지" />
      </button>
      <p>{count}</p>
      <button type="button" className="plus" onClick={increaseCount}>
        <img src={plusImg} alt="플러스 버튼 이미지" />
      </button>
    </ProductCountStyle>
  );
}

const ZeroCount = styled.div`
  font-size: 18px;
`;

const ProductCountStyle = styled.div`
  width: 150px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  border: 1px solid #c4c4c4;
  border-radius: 5px;

  .minus,
  .plus {
    padding: 0 14px;
  }

  p {
    border: 1px solid #c4c4c4;
    padding: 14px 0;
    font-size: 18px;
    color: #000;
  }
`;
