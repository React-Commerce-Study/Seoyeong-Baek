import styled from 'styled-components';
import Button from '../common/Buttons/Button';
import IconImg from '../../assets/icon/icon-img.png';

export default function PostProductForm() {
  return (
    <SPostProductForm>
      <h3 className="a11y-hidden">postProductForm</h3>
      <SProductInfoContainer>
        <div className="input-wrapper image">
          <label htmlFor="productImg">상품 이미지</label>
          <button type="button"></button>
          <input type="file" className="img" id="productImg" required />
        </div>

        <ul className="info-wrapper">
          <li className="input-wrapper name">
            <label htmlFor="">상품명</label>
            <input type="text" className="" id="" required />
          </li>
          <li className="input-wrapper price">
            <label htmlFor="">판매가</label>
            <input type="number" className="" id="" required />
          </li>
          <li className="input-wrapper delivery">
            <label htmlFor="delivery">배송방법</label>
            <div className="delivery-btn-wrapper">
              <Button fontWeight="var(--font-weight-medium)" fontSize="var(--font-size-md)" padding="1.0625rem 0" type="button">
                배달, 소포, 등기
              </Button>
              <Button
                fontWeight="var(--font-weight-medium)"
                fontSize="var(--font-size-md)"
                padding="1.0625rem 0"
                bgColor="var(--dark-gray-color)"
                type="button"
              >
                직접배송(화물배달)
              </Button>
            </div>
          </li>
          <li className="input-wrapper delivery-fee">
            <label htmlFor="">기본 배송비</label>
            <input type="number" className="" id="" required />
          </li>
          <li className="input-wrapper stock">
            <label htmlFor="">재고</label>
            <input type="number" className="" id="" required />
          </li>
        </ul>
      </SProductInfoContainer>

      <SProductDetailContainer className="input-wrapper">
        <label htmlFor="">상품 상세 정보</label>
        <textarea rows={10} className="" id="" />
      </SProductDetailContainer>

      <SButtonContainer>
        <Button bgColor="var(--dark-gray-color)">취소</Button>
        <Button>저장하기</Button>
      </SButtonContainer>
    </SPostProductForm>
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
    width: 454px;
    height: 454px;
    background-color: var(--middle-gray-color);

    &::after {
      content: '';
      display: block;
      background: url(${IconImg}) center / contain no-repeat;
      width: 3.125rem;
      height: 3.125rem;
      margin: 0 auto;
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
