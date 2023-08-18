import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCart from '../../../assets/icon/icon-shopping-cart.svg';
import ShoppingCartActive from '../../../assets/icon/icon-shopping-cart-2.svg';
import User from '../../../assets/icon/icon-user.svg';
import UserActive from '../../../assets/icon/icon-user-2.svg';
import MyPageModal from '../../modal/MyPageModal';
import styled from 'styled-components';

interface NavProps {
  page?: string;
}

export default function Nav({ page }: NavProps) {
  const token = localStorage.getItem('token');

  const [isShowModal, setIsShowModal] = useState(false);

  const handleModalClick = () => {
    isShowModal ? setIsShowModal(false) : setIsShowModal(true);
  };

  return (
    <SNavContainer>
      <ul className="nav-menu">
        <li>
          <Link to="/cart">
            <button className={`nav-btn ${page === 'cart' ? 'active' : ''}`}>장바구니</button>
          </Link>
        </li>
        {token ? (
          <li className="modal-btn">
            <Link to="/">
              <button className={`nav-btn login ${isShowModal ? 'active' : ''}`} onClick={handleModalClick}>
                마이페이지
              </button>
            </Link>
            {isShowModal && <MyPageModal />}
          </li>
        ) : (
          <li>
            <Link to="/login">
              <button className="nav-btn login">로그인</button>
            </Link>
          </li>
        )}
      </ul>
    </SNavContainer>
  );
}

const SNavContainer = styled.div`
  .nav-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.625rem;

    li.modal-btn {
      position: relative;
    }

    .nav-btn {
      color: #767676;
      font-size: 12px;
      transition: all 0.25s ease-out;

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

    .modal-wrapper {
      /* width: 1920px; */
      /* height: 100vh; */
      box-shadow: inset 0 0 10px red;
    }
  }
`;
