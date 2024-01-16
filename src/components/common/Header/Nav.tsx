import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { useIsLogin } from '../../../hooks/UseLoginData';
import Modal from '../../modal/Modal';
import MyPageModal from '../../modal/MyPageModal';
import {
  mediaQuery,
  BREAKPOINT_PC,
  BREAKPOINT_TABLET,
} from '../../style/mediaQuery/MediaQueryType';
import Button from '../Buttons/Button';
import ShoppingBagIcon from '../icons/ShoppingBagIcon';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';
import UserIcon from '../icons/UserIcon';

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
        <button
          className={`nav-btn login ${isShowModal ? 'active' : ''}`}
          onClick={handleModalClick}
        >
          <UserIcon />
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
              <Link to="/seller/center">
                <Button
                  className="seller-center"
                  padding="0.69rem 1.25rem"
                  fontWeight="500"
                >
                  <ShoppingBagIcon />
                  <span>판매자센터</span>
                </Button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li onClick={handleLoginModal}>
              <button className={`nav-btn ${page === 'cart' ? 'active' : ''}`}>
                <ShoppingCartIcon />
                장바구니
              </button>
            </li>
            {isUserLoggedIn ? (
              renderMyPageButton()
            ) : (
              <li>
                <Link to="/login">
                  <button className="nav-btn login">
                    <UserIcon />
                    로그인
                  </button>
                </Link>
              </li>
            )}
          </>
        )}
      </SNavList>

      {isLoginModal && (
        <Modal type="requiredLogin" setIsShowModal={setIsLoginModal} />
      )}
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
    max-width: 3.3rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
    transition: all 0.25s ease-out;

    svg {
      width: 2rem;
      height: 2rem;

      path {
        transition: all 0.25s ease-out;
      }
    }

    &:hover {
      color: var(--point-color);

      svg path {
        stroke: var(--point-color);
      }
    }

    &.active {
      color: var(--point-color);

      svg path {
        stroke: var(--point-color);
      }
    }
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

      svg {
        width: 1.5rem;
        height: 1.5rem;
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
