import styled from 'styled-components';
import Button from '../common/Buttons/Button';

export default function SellerProductArticle() {
  return (
    <SSellerProductArticle>
      <div className="product-info-wrapper">
        <img src="" alt="" />
        <div>
          <p>상품명</p>
          <span>재고</span>
        </div>
      </div>
      <p>가격</p>
      <div className="btn-box">
        <Button padding="10px 0" fontSize="var(--font-size-ml)" fontWeight="var(--font-weight-light)">
          수정
        </Button>
      </div>
      <div className="btn-box">
        <Button padding="10px 0" fontSize="var(--font-size-ml)" fontWeight="var(--font-weight-light)">
          삭제
        </Button>
      </div>
    </SSellerProductArticle>
  );
}

const SSellerProductArticle = styled.article`
  display: flex;
  align-items: center;

  .product-info-wrapper {
    box-shadow: inset 0 0 10px blue;
    flex-basis: 50%;
  }

  & > p:nth-child(2) {
    box-shadow: inset 0 0 10px blue;
    flex-basis: 30%;
    text-align: center;
  }

  & > div:nth-child(3),
  & > div:last-child {
    box-shadow: inset 0 0 10px blue;
    flex-basis: 10%;
    padding: 0 0.3rem;
    box-sizing: border-box;
  }

  .btn-box {
    text-align: center;

    button {
      max-width: 5rem;
    }
  }
`;
