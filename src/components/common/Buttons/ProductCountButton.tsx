import React from 'react';
import MinusImg from '../../../assets/icon/icon-minus-line.svg';
import plusImg from '../../../assets/icon/icon-plus-line.svg';
import styled from 'styled-components';

interface ProductCountProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  productStock: number;
  isCheck?: boolean;
  setCountChange?: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProductCount({ count, setCount, productStock, isCheck, setCountChange }: ProductCountProps) {
  if (productStock === 0) {
    return <ZeroCount>해당상품은 재고가 없습니다.</ZeroCount>;
  }

  const decreaseCount = () => {
    if (count <= 1) return;
    setCount(count - 1);
    if (isCheck && setCountChange) {
      setCountChange('-');
      console.log('0');
    }
  };

  const increaseCount = () => {
    if (count >= productStock) return alert('상품의 재고가 부족합니다.');
    setCount(count + 1);
    if (isCheck && setCountChange) {
      setCountChange('+');
      console.log('0');
    }
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
  font-size: var(--font-size-lg);
`;

const ProductCountStyle = styled.div`
  max-width: 9.375rem;
  height: 3.125rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  border: 1px solid var(--middle-gray-color);
  border-radius: 5px;

  .minus,
  .plus {
    flex-basis: 33%;
    height: inherit;
    min-height: inherit;

    & > img {
      max-width: 1.25rem;
    }
  }

  .minus {
    border-right: 1px solid var(--middle-gray-color);
  }

  .plus {
    border-left: 1px solid var(--middle-gray-color);
  }

  p {
    flex-basis: 33%;
    text-align: center;
    box-sizing: border-box;
    overflow: hidden;
    font-size: var(--font-size-lg);
    color: #000;
  }
`;
