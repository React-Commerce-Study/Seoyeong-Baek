import styled from 'styled-components';

const ProductListItemStyle = styled.div`
  .img-box {
    overflow: hidden;
    width: 380px;
    height: 380px;
    border: 1px solid var(--middle-gray-color);
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
    font-weight: var(--font-weight-light);
    font-size: var(--font-size-md);

    p:not(:last-child) {
      margin-bottom: 10px;
    }

    .store-name {
      color: var(--dark-gray-color);
    }

    .product-name {
      font-size: var(--font-size-lg);
      line-height: 22px;
    }

    .product-price strong {
      margin-right: 2px;
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-xl);
      line-height: 30px;
    }
  }
`;

export { ProductListItemStyle };
