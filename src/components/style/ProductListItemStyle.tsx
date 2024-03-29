import styled from 'styled-components';

const ProductListItemStyle = styled.article`
  .img-box {
    overflow: hidden;
    width: inherit;
    height: inherit;
    border: 0.0625rem solid var(--middle-gray-color);
    box-sizing: border-box;
    border-radius: 10px;

    img {
      width: 100%;
      height: 100%;
      aspect-ratio: 1/1;
      object-fit: cover;
    }
  }

  .info-box {
    margin-top: 1rem;
    font-weight: var(--font-weight-light);
    font-size: var(--font-size-md);

    p:not(:last-child) {
      margin-bottom: 0.625rem;
    }

    .store-name {
      color: var(--dark-gray-color);
    }

    .product-name {
      font-size: var(--font-size-lg);
      line-height: 1.375rem;
    }

    .product-price strong {
      margin-right: 0.125rem;
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-xl);
      line-height: 1.875rem;
    }
  }
`;

export { ProductListItemStyle };
