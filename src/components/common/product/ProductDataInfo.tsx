import { Product } from '../../../@types/types';

interface ProductItemBoxProps {
  product: Product;
  isDelivery: boolean;
}

export default function ProductInfoText({ product, isDelivery }: ProductItemBoxProps) {
  return (
    <div className="info-box">
      <div>
        <p className="store-name">{product.store_name}</p>
        <p className="product-name">{product.product_name}</p>
        {product.price && (
          <p className="product-price">
            <strong>{product.price.toLocaleString()}</strong>원
          </p>
        )}
      </div>
      {isDelivery && (
        <div>
          <p className="delivery">택배배송 / {product.shipping_fee.toLocaleString()}원</p>
        </div>
      )}
    </div>
  );
}
