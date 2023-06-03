import React from 'react';
import { ProductInfoCardStyle } from '../../style/ProductInfoCardStyle';

export default function ProductInfoCard({ product }) {
  //   console.log(product);
  return (
    <ProductInfoCardStyle>
      <div className="img-box">
        <img src={product.image} alt={product.product_name} />
      </div>
      <div className="info-box">
        <p className="store-name">{product.store_name}</p>
        <p className="product-name">{product.product_name}</p>
        <p className="product-price">
          <strong>{product.price.toLocaleString()}</strong>원
        </p>
      </div>
    </ProductInfoCardStyle>
  );
}
