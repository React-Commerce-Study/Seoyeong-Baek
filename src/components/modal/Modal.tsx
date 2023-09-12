import Button from '../common/Buttons/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../assets/icon/icon-delete.svg';

interface ModalProps {
  type: string;
  cartItemId?: number;
  setIsChangeModalValue?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  successUserName?: string;
}

export default function Modal({ type, cartItemId, setIsChangeModalValue, setIsShowModal, successUserName }: ModalProps) {
  const navigate = useNavigate();

  const closeModal = () => {
    // 옵셔널 체이닝(Optional Chaining) 연산자(?.)
    // null 또는 undefined일 경우에는 호출하지 않고 그냥 넘어가게 됨. 이렇게 함으로써 해당 함수가 존재하지 않을 때 발생할 수 있는 오류를 방지하고, 안전하게 함수 호출
    setIsShowModal?.(false);
  };

  const deleteItem = () => {
    DeleteCartItem();
    setIsChangeModalValue?.(true);
    closeModal();
  };

  async function DeleteCartItem() {
    const URL = 'https://openmarket.weniv.co.kr/';
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${URL}cart/${cartItemId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `JWT ${token}`,
        },
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

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('token');
    window.location.reload();
    // 현재 웹 페이지 다시 로드
  };

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
          <button className="delete-btn" onClick={closeModal}>
            <img src={DeleteIcon} alt="" />
          </button>
        </SModalLayout>
      ) : type === 'changeCount' ? (
        <SModalLayout>
          <div className="button-container">
            <Button onClick={closeModal} bgColor="inherit" color="#767676" boxShadow="inset 0 0 0 1px #767676">
              취소
            </Button>
            <Button>확인</Button>
          </div>
          <button className="delete-btn" onClick={closeModal}>
            <img src={DeleteIcon} alt="" />
          </button>
        </SModalLayout>
      ) : type === 'requiredLogin' ? (
        <SModalLayout>
          <p>
            로그인이 필요한 서비스입니다. <br />
            로그인 하시겠습니까?
          </p>
          <div className="button-container">
            <Button onClick={closeModal} bgColor="inherit" color="#767676" boxShadow="inset 0 0 0 1px #767676">
              아니오
            </Button>
            <Button onClick={() => navigate('/login')}>네</Button>
          </div>
          <button className="delete-btn" onClick={closeModal}>
            <img src={DeleteIcon} alt="" />
          </button>
        </SModalLayout>
      ) : type === 'logout' ? (
        <SModalLayout>
          <p>정말로 로그아웃 하시겠습니까?</p>
          <div className="button-container">
            <Button onClick={closeModal} bgColor="inherit" color="#767676" boxShadow="inset 0 0 0 1px #767676">
              아니오
            </Button>
            <Button onClick={handleLogout}>네</Button>
          </div>
          <button className="delete-btn" onClick={closeModal}>
            <img src={DeleteIcon} alt="" />
          </button>
        </SModalLayout>
      ) : type === 'addToCart' ? (
        <SModalLayout>
          <p>
            장바구니에 담겼습니다. <br />
            장바구니로 이동 하시겠습니까?
          </p>
          <div className="button-container">
            <Button onClick={closeModal} bgColor="inherit" color="#767676" boxShadow="inset 0 0 0 1px #767676">
              아니오
            </Button>
            <Button onClick={() => navigate('/cart')}>네</Button>
          </div>
          <button className="delete-btn" onClick={closeModal}>
            <img src={DeleteIcon} alt="" />
          </button>
        </SModalLayout>
      ) : type === 'includedCart' ? (
        <SModalLayout>
          <p>
            이미 장바구니에 담긴 상품입니다. <br />
            장바구니로 이동 하시겠습니까?
          </p>
          <div className="button-container">
            <Button onClick={closeModal} bgColor="inherit" color="#767676" boxShadow="inset 0 0 0 1px #767676">
              아니오
            </Button>
            <Button onClick={() => navigate('/cart')}>네</Button>
          </div>
          <button className="delete-btn" onClick={closeModal}>
            <img src={DeleteIcon} alt="" />
          </button>
        </SModalLayout>
      ) : type === 'successSignUp' ? (
        <SModalLayout>
          <p>
            <strong>"{successUserName}"</strong> 님
            <br />
            회원가입을 축하합니다! 🎉
          </p>
          <div className="button-container">
            <Button onClick={closeModal} bgColor="inherit" color="#767676" boxShadow="inset 0 0 0 1px #767676">
              홈
            </Button>
            <Button onClick={() => navigate('/login')}>로그인</Button>
          </div>
          <button className="delete-btn" onClick={closeModal}>
            <img src={DeleteIcon} alt="" />
          </button>
        </SModalLayout>
      ) : null}
    </SModalBackground>
  );
}

// TODO: 모달 스타일 분리하기
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
  padding: 2.5rem 4.5rem;
  background-color: #fff;
  text-align: center;
  border-radius: 0.6rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11),
    0 6px 8px rgba(0, 0, 0, 0.11), 0 8px 16px rgba(0, 0, 0, 0.11);
  box-sizing: border-box;

  p {
    font-size: 1rem;
    margin-bottom: 26px;
    line-height: normal;

    strong {
      font-weight: 800;
      /* color: var(--point-color); */
      font-size: 1.2rem;
    }
  }

  .button-container {
    display: flex;
    gap: 10px;

    & > button {
      font-size: 1rem;
      flex-basis: 50%;
      font-weight: 500;
      padding: 10px 0;
    }
  }

  .delete-btn {
    position: absolute;
    top: 1.125rem;
    right: 1.125rem;
    padding: 0;
    width: 1.38rem;
    height: 1.38rem;
  }
`;
