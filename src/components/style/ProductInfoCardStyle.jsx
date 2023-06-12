import styled from 'styled-components';

const ProductInfoCardStyle = styled.div`
  .img-box {
    overflow: hidden;
    width: 380px;
    height: 380px;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info-box {
    margin-top: 16px;
    font-weight: 400;
    font-size: 16px;

    p:not(:last-child) {
      margin-bottom: 10px;
    }

    .store-name {
      color: #767676;
    }

    .product-name {
      font-size: 18px;
      line-height: 22px;
    }

    .product-price strong {
      margin-right: 2px;
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
    }
  }
`;

export { ProductInfoCardStyle };
