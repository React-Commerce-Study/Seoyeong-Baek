import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCart from '../../../assets/icon/icon-shopping-cart.svg';
import ShoppingCartActive from '../../../assets/icon/icon-shopping-cart-2.svg';
import User from '../../../assets/icon/icon-user.svg';
import UserActive from '../../../assets/icon/icon-user-2.svg';
import ShoppingBagIcon from '../icons/ShoppingBagIcon';
import MyPageModal from '../../modal/MyPageModal';
import Modal from '../../modal/Modal';
import styled from 'styled-components';
import { useIsLogin } from '../../../hooks/UseLoginData';
import { mediaQuery, BREAKPOINT_PC, BREAKPOINT_TABLET } from '../../style/mediaQuery/MediaQueryType';
import Button from '../Buttons/Button';

interface NavProps {
  page?: string;
}

export default function Nav({ page }: NavProps) {
  const navigate = useNavigate();
  const isUserLoggedIn = useIsLogin();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);

  const userType = localStorage.getItem('user_type');

  const handleModalClick = () => {
    isShowModal ? setIsShowModal(false) : setIsShowModal(true);
  };

  const handleLoginModal = () => {
    isUserLoggedIn ? navigate('/cart') : setIsLoginModal(true);
  };

  function renderMyPageButton() {
    return (
      <li className="modal-btn">
        <button className={`nav-btn login ${isShowModal ? 'active' : ''}`} onClick={handleModalClick}>
          마이페이지
        </button>
        {isShowModal && <MyPageModal />}
      </li>
    );
  }

  console.log(isUserLoggedIn);

  return (
    <SNavContainer>
      <SNavList>
        {userType === 'SELLER' && isUserLoggedIn ? (
          <>
            {renderMyPageButton()}
            <li className="seller-center-wrapper">
              <Link to="/seller-center">
                <Button className="seller-center" padding="0.69rem 1.25rem" fontWeight="500">
                  <ShoppingBagIcon />
                  <span>판매자센터</span>
                </Button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li onClick={handleLoginModal}>
              <button className={`nav-btn ${page === 'cart' ? 'active' : ''}`}>장바구니</button>
            </li>
            {isUserLoggedIn ? (
              renderMyPageButton()
            ) : (
              <li>
                <Link to="/login">
                  <button className="nav-btn login">
                    <img src="" alt="" />
                    로그인
                  </button>
                </Link>
              </li>
            )}
          </>
        )}
      </SNavList>

      {isLoginModal && <Modal type={'requiredLogin'} setIsShowModal={setIsLoginModal} />}
    </SNavContainer>
  );
}

const SNavContainer = styled.nav`
  flex-shrink: 1;
`;

const SNavList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.625rem;
  transition: all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

  li.modal-btn {
    position: relative;
  }

  .nav-btn {
    color: var(--dark-gray-color);
    font-size: var(--font-size-xs);
    transition: all 0.25s ease-out;
    max-width: 3.3rem;

    &:hover {
      color: var(--point-color);
    }

    &.active {
      color: var(--point-color);
    }
  }

  .nav-btn::before {
    display: block;
    margin: 0 auto 0.25rem;
    background: url(${ShoppingCart}) no-repeat center / contain;
    content: '';
    width: 2rem;
    height: 2rem;
    transition: all 0.25s ease-out;
  }

  .nav-btn.active::before,
  .nav-btn:hover::before {
    background: url(${ShoppingCartActive}) no-repeat center / contain;
  }

  .login::before {
    background: url(${User}) no-repeat center / contain;
  }

  .login.active::before,
  .login:hover::before {
    background: url(${UserActive}) no-repeat center / contain;
  }
  .seller-center {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover svg path {
      stroke: var(--point-color);
    }
  }

  ${mediaQuery(BREAKPOINT_PC)} {
    gap: 0.4rem;
    position: relative;

    .nav-btn {
      max-width: 2.2rem;
      max-height: 2.2rem;
      min-width: 0;
      font-size: 10px;
      position: relative;
      padding: 0.4rem;
      border-radius: 50%;
      overflow: hidden;
      color: transparent;

      &:hover,
      &.active {
        color: transparent;
      }

      &::before {
        width: 1.5rem;
        height: 1.5rem;
        margin-bottom: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .seller-center {
      padding: 0.5rem 0.8rem;
      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
      span {
        display: none;
      }
    }
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
  }

  .modal-wrapper {
    /* width: 1920px; */
    /* height: 100vh; */
    box-shadow: inset 0 0 10px red;
  }
`;
