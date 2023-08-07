import Button from '../common/Buttons/Button';
import ProductCountButton from '../common/Buttons/ProductCountButton';
import styled from 'styled-components';
import DeletIcon from '../../assets/icon/icon-delete.svg';

interface ModalProps {
  closeModal: () => void;
  type: string;
  cartItemId?: number;
}

export default function Modal({ closeModal, type, cartItemId }: ModalProps) {
  const deleteItem = () => {
    console.log(cartItemId);
    DeleteCartItem();
    closeModal();
  };

  async function DeleteCartItem() {
    const URL = 'https://openmarket.weniv.co.kr/';

    try {
      const response = await fetch(`${URL}cart/${cartItemId}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error('네트워크에 문제가 있습니다.');
      }
    } catch (error) {
      console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
    }
  }

  return (
    <SModalBackground>
      {type === 'delete' ? (
        <SModalLayout>
          <p>상품을 삭제하시겠습니까?</p>
          <div className="button-container">
            <Button onClick={closeModal} bgColor="inherit" color="#767676" boxShadow="inset 0 0 0 1px #767676">
              취소
            </Button>
            <Button onClick={deleteItem}>확인</Button>
          </div>
        </SModalLayout>
      ) : type === 'changeCount' ? (
        <SModalLayout>
          <div className="button-container">
            <Button onClick={closeModal}>취소</Button>
            <Button>확인</Button>
          </div>
        </SModalLayout>
      ) : null}
    </SModalBackground>
  );
}
const SModalBackground = styled.div`
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;

  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(1.8px);
  }
`;

const SModalLayout = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22.5rem;
  padding: 3.8rem 4.7rem;
  background-color: #fff;
  text-align: center;
  border-radius: 0.6rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11),
    0 6px 8px rgba(0, 0, 0, 0.11), 0 8px 16px rgba(0, 0, 0, 0.11);

  p {
    font-size: 1rem;
    margin-bottom: 26px;
  }

  .button-container {
    display: flex;
    gap: 10px;

    & > button {
      font-size: 1rem;
      flex-basis: 50%;
      font-weight: 500;
    }
  }
`;
