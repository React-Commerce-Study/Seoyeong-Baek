import { useLocation } from 'react-router-dom';
import { useState, FormEvent, ChangeEvent, MouseEvent, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Buttons/Button';
import IconImg from '../../assets/icon/icon-img.png';
import { PostProductData } from '../../@types/types';
import { postProduct, putEditProduct } from '../../services/ResponseApi';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';

export default function PostProductForm() {
  const location = useLocation();
  const item = location.state;
  const [isShowModal, setIsShowModal] = useState(false);
  const [isConfigModal, setIsConfigModal] = useState(false);
  const navigate = useNavigate();

  const [postProductData, setPostProductData] = useState<PostProductData>({
    product_name: item?.product_name || '',
    price: item?.price || 0,
    shipping_method: item?.shipping_method || '',
    stock: item?.stock || 0,
    shipping_fee: item?.shipping_fee || 0,
    product_info: item?.product_info || '',
  });

  const [fileURL, setFileURL] = useState('');

  useEffect(() => {
    console.log(postProductData);
  }, [postProductData]);

  // 이미지파일
  const handleImgUpload = () => {
    const input = document.querySelector('.img') as HTMLInputElement;
    input.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (e.target.files) {
      const img = e.target.files[0];
      setPostProductData((prevData) => ({ ...prevData, [name]: img }));
      const newFileURL = URL.createObjectURL(img);
      setFileURL(newFileURL);
    } else if (name === 'product_name') {
      console.log(value);
      setPostProductData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setPostProductData((prevData) => ({ ...prevData, [name]: parseInt(value) }));
    }
  };

  const handleShippingMethod = (e: MouseEvent<HTMLButtonElement>) => {
    const shippingMethod = e.currentTarget.getAttribute('data-value');
    if (shippingMethod) setPostProductData((prevData) => ({ ...prevData, shipping_method: shippingMethod }));
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postProductData.shipping_method === '') {
      alert('배송방법을 선택해주세요.');
    } else {
      setIsShowModal(true);
    }
  };

  useEffect(() => {
    if (isConfigModal) postItem();
  }, [isConfigModal]);

  const postItem = async () => {
    if (item) {
      const urlId = item.product_id;
      const editData = postProductData;
      await putEditProduct({ urlId, editData });
    } else await postProduct(postProductData);

    navigate('/seller/center');
  };

  return (
    <>
      <SPostProductForm onSubmit={handleSubmit}>
        <h3 className="a11y-hidden">postProductForm</h3>
        <SProductInfoContainer>
          <div className={`input-wrapper image ${fileURL !== '' && 'uploaded'}`}>
            <label htmlFor="productImg">상품 이미지</label>
            <button type="button" onClick={handleImgUpload}>
              {fileURL && <img src={fileURL} alt={postProductData.product_name} />}
              {item && <img src={item.image} alt={postProductData.product_name} />}
            </button>
            <input
              type="file"
              className="img"
              id="productImg"
              onChange={handleInputChange}
              name="image"
              accept="image/*"
              required={!item}
            />
          </div>

          <ul className="info-wrapper">
            <li className="input-wrapper name">
              <label htmlFor="">상품명</label>
              <input
                type="text"
                className=""
                id=""
                name="product_name"
                onChange={handleInputChange}
                required
                defaultValue={item ? item.product_name : ''}
              />
            </li>
            <li className="input-wrapper price">
              <label htmlFor="">판매가</label>
              <input
                type="number"
                className=""
                id=""
                name="price"
                onChange={handleInputChange}
                required
                defaultValue={item && item.price}
              />
            </li>
            <li className="input-wrapper delivery">
              <label htmlFor="delivery">배송방법</label>
              <div className="delivery-btn-wrapper">
                <Button
                  fontWeight="var(--font-weight-medium)"
                  fontSize="var(--font-size-md)"
                  padding="1.0625rem 0"
                  type="button"
                  data-value="PARCEL"
                  onClick={handleShippingMethod}
                >
                  배달, 소포, 등기
                </Button>
                <Button
                  fontWeight="var(--font-weight-medium)"
                  fontSize="var(--font-size-md)"
                  padding="1.0625rem 0"
                  bgColor="var(--dark-gray-color)"
                  type="button"
                  data-value="DELIVERY"
                  onClick={handleShippingMethod}
                >
                  직접배송(화물배달)
                </Button>
              </div>
            </li>
            <li className="input-wrapper delivery-fee">
              <label htmlFor="">기본 배송비</label>
              <input
                type="number"
                className=""
                id=""
                name="shipping_fee"
                onChange={handleInputChange}
                required
                defaultValue={item && item.shipping_fee}
              />
            </li>
            <li className="input-wrapper stock">
              <label htmlFor="">재고</label>
              <input
                type="number"
                className=""
                id=""
                name="stock"
                onChange={handleInputChange}
                required
                defaultValue={item && item.stock}
              />
            </li>
          </ul>
        </SProductInfoContainer>

        <SProductDetailContainer className="input-wrapper">
          <label htmlFor="">상품 상세 정보</label>
          <textarea
            rows={10}
            className=""
            id=""
            name="product_info"
            onChange={handleTextAreaChange}
            required
            defaultValue={item?.product_info || ''}
          />
        </SProductDetailContainer>

        <SButtonContainer>
          <Button bgColor="var(--dark-gray-color)">취소</Button>
          <Button type="submit">{item ? '수정하기' : '저장하기'}</Button>
        </SButtonContainer>
      </SPostProductForm>
      {isShowModal && <Modal setIsShowModal={setIsShowModal} setIsConfigModal={setIsConfigModal} type={item ? 'edit' : 'post'} />}
    </>
  );
}

const SPostProductForm = styled.form`
  width: 82.5rem;
  line-height: normal;

  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;

    label {
      color: var(--dark-gray-color);
    }

    input,
    textarea {
      border-radius: 5px;
      border: 1px solid var(--middle-gray-color);
      padding: 1rem 1.0625rem;
      box-sizing: border-box;
      transition: all 0.25s ease-in-out;
      font-size: var(--font-size-md);

      &:focus {
        border-color: var(--point-color);
        box-shadow: 0 0 0 1px var(--point-color);
        outline: #fff;
      }

      &[type='file'] {
        display: none;
      }
    }
  }
`;

const SProductInfoContainer = styled.fieldset`
  display: flex;
  gap: 2.5rem;

  .image button {
    width: 28.375rem;
    height: 28.375rem;
    background-color: var(--middle-gray-color);

    &::after {
      content: '';
      background: url(${IconImg}) center / contain no-repeat;
      width: 3.125rem;
      height: 3.125rem;
      margin: 0 auto;
      display: block;
    }

    &.uploaded::after {
      display: none;
    }
  }

  .info-wrapper {
    width: 100%;

    li:not(:first-child) {
      margin-top: 1.13rem;
    }

    li:not(:first-child, :nth-child(3)) {
      position: relative;
      max-width: 220px;

      input {
        background-color: transparent;
        padding-right: 4.3rem;
      }

      &::after {
        content: '원';
        display: inline-block;
        color: #fff;
        background: var(--middle-gray-color);
        padding: 1rem 1.25rem;
        position: absolute;
        border-radius: 0 4px 4px 0;
        right: 1px;
        bottom: 1px;
        z-index: -1;
      }
      &.stock::after {
        content: '개';
      }
    }

    .delivery-btn-wrapper {
      display: flex;
      gap: 10px;
      max-width: 450px;
    }
  }
`;

const SProductDetailContainer = styled.fieldset`
  margin: 2.5rem 0 3.125rem;

  textarea {
    max-height: 43.75rem;
  }
`;

const SButtonContainer = styled.div`
  display: flex;
  width: 414px;
  gap: 0.875rem;
  margin-left: auto;
`;
