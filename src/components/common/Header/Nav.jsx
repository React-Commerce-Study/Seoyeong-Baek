import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../../../assets/icon/Logo-hodu.png';
import ShoppingCart from '../../../assets/icon/icon-shopping-cart.svg';
import User from '../../../assets/icon/icon-user.svg';
import SearchImg from '../../../assets/icon/search.svg';
import styled from 'styled-components';

export default function Nav() {
  return (
    <NavContainerStyle>
      <nav className="navbar">
        <h1>
          <Link to="/">
            <img src={LogoImg} className="logo" alt="로고 이미지" />
          </Link>
        </h1>

        <form className="search-form">
          <input type="search" placeholder="상품을 검색해보세요!" className="search-input" />
          <button type="submit" className="search-btn">
            <img src={SearchImg} alt="" />
          </button>
        </form>

        <ul className="nav-menu">
          <li>
            <Link to="/cart">
              <button className="nav-btn">장바구니</button>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <button className="nav-btn login">로그인</button>
            </Link>
          </li>
        </ul>
      </nav>
    </NavContainerStyle>
  );
}

const NavContainerStyle = styled.div`
  padding: 22px 0;
  box-sizing: border-box;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);

  .navbar {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1 {
    flex-shrink: 0;
    width: 124px;
    height: 38px;

    .logo {
      width: 100%;
    }
  }

  .search-form {
    width: 400px;
    margin: 0 598px 0 30px;
    box-sizing: border-box;
    position: relative;

    .search-input {
      width: 100%;
      padding: 13px 22px;
      border: 2px solid var(--point-color);
      border-radius: 50px;
      color: #767676;
    }

    .search-btn {
      width: 28px;
      height: 28px;
      position: absolute;
      top: 50%;
      right: 22px;
      transform: translate(0, -50%);
      padding: 0;
    }
  }

  .nav-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 26px;

    .nav-btn {
      color: #767676;
      font-size: 12px;
    }

    .nav-btn::before {
      display: block;
      margin: 0 auto;
      background: url(${ShoppingCart}) no-repeat center;
      background-size: contain;
      content: '';
      width: 32px;
      height: 32px;
    }

    .login::before {
      background: url(${User}) no-repeat center;
    }
  }
`;
