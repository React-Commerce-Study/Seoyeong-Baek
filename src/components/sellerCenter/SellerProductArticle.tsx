import styled from 'styled-components';
import Button from '../common/Buttons/Button';
import { Product } from '../../@types/types';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import ProductDataImg from '../common/product/ProductDataImg';
import { deleteSaleItem } from '../../services/ResponseApi';

interface SellerProductArticleProps {
  item: Product;
  setIsDeleteItem?: Dispatch<SetStateAction<boolean>>;
  key: number;
}

export default function SellerProductArticle({ item, setIsDeleteItem }: SellerProductArticleProps) {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isConfigModal, setIsConfigModal] = useState(false);

  const handleDeleteBtn = () => {
    setIsShowModal(true);
    setIsDeleteItem?.(false);
  };

  const deleteItem = async () => {
    await deleteSaleItem(item.product_id);
  };

  useEffect(() => {
    if (isConfigModal) {
      deleteItem();
      setIsDeleteItem?.(true);
    }
  }, [isConfigModal]);

  const handleClick = () => {
    navigate(`/product/${item.product_id}`, { state: item });
  };

  return (
    <>
      <SSellerProductArticle>
        <div className="product-info-wrapper">
          <ProductDataImg productImg={item.image} imgName={item.product_name} handleClick={handleClick} />
          <div className="product-name-stock">
            <p>{item.product_name}</p>
            <span>재고 : {item.stock}</span>
          </div>
        </div>
        <p>{item.price.toLocaleString()}원</p>
        <div className="btn-box">
          <Button
            padding="10px 0"
            fontSize="var(--font-size-ml)"
            fontWeight="var(--font-weight-light)"
            onClick={() => navigate('/seller/edit/product', { state: item })}
          >
            수정
          </Button>
        </div>
        <div className="btn-box">
          <Button padding="10px 0" fontSize="var(--font-size-ml)" fontWeight="var(--font-weight-light)" onClick={handleDeleteBtn}>
            삭제
          </Button>
        </div>
      </SSellerProductArticle>
      {isShowModal && (
        <Modal type="delete" setIsConfigModal={setIsConfigModal} productId={item.product_id} setIsShowModal={setIsShowModal} />
      )}
    </>
  );
}

const SSellerProductArticle = styled.article`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom: 1px solid var(--middle-gray-color);

  p {
    font-size: var(--ont-size-lg);
  }

  .product-info-wrapper {
    flex-basis: 50%;
    display: flex;
    align-items: center;
    gap: 1.875rem;
    padding-left: 1.875rem;
    box-sizing: border-box;

    img {
      width: 4.375rem;
      height: 4.375rem;
      object-fit: cover;
      border-radius: 50%;
      border: 1px solid var(--light-gray-color);
    }

    .product-name-stock {
      p {
        margin-bottom: 0.625rem;
      }

      span {
        color: var(--dark-gray-color);
      }
    }
  }

  & > p:nth-child(2) {
    flex-basis: 30%;
    text-align: center;
  }

  & > div:nth-child(3),
  & > div:last-child {
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
