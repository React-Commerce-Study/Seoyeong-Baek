import styled from 'styled-components';
import SellerProductArticle from './SellerProductArticle';
import { getSaleItems } from '../../services/ResponseApi';
import { useEffect, useState } from 'react';
import { Product } from '../../@types/types';

export default function SellerCenterSaleList() {
  const [saleItems, setSaleItems] = useState<Product[]>([]);
  const [isDeleteItem, setIsDeleteItem] = useState(false);

  const getSaleItem = async () => {
    const response = await getSaleItems();
    setSaleItems(response);
  };

  useEffect(() => {
    getSaleItem();
  }, [isDeleteItem]);

  return (
    <>
      <SSaleInfoCategoryList>
        <li>상품정보</li>
        <li>판매가격</li>
        <li>수량</li>
        <li>삭제</li>
      </SSaleInfoCategoryList>

      {saleItems.map((item) => (
        <SellerProductArticle setIsDeleteItem={setIsDeleteItem} item={item} key={item.product_id} />
      ))}
    </>
  );
}

const SSaleInfoCategoryList = styled.ul`
  display: flex;
  background: #fff;
  padding: 1.125rem 0;
  font-size: var(--font-size-lg);
  text-align: center;
  border-bottom: 1px solid var(--middle-gray-color);

  li:first-child {
    flex-basis: 50%;
  }

  li:nth-child(2) {
    flex-basis: 30%;
  }

  li:nth-child(3),
  li:last-child {
    flex-basis: 10%;
  }
`;
