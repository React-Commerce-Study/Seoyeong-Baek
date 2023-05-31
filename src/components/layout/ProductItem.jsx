import React from 'react';

export default function ProductItem({ productList }) {
  return (
    <ul>
      {productList &&
        productList.map((product) => {
          return (
            <li key={product.product_id}>
              <img src={product.image} alt="" />
              <p>{product.seller_store}</p>
              <p>{product.product_name}</p>
              <p>{product.price}</p>
            </li>
          );
        })}
    </ul>
  );
}
