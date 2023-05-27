import React from 'react';
import LogoImg from '../../assets/icon/Logo-hodu.png';
import ShoppingCart from '../../assets/icon/icon-shopping-cart.svg';
import User from '../../assets/icon/icon-user.svg';
import SearchImg from '../../assets/icon/search.svg';
import styled from 'styled-components';

const NavContainerStyle = styled.div`
  padding: 22px 0;
  box-shadow: inset 0 0 10px red;
  box-sizing: border-box;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);

  .navbar {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 10px red;
  }

  h1 {
    width: 124px;
    height: 38px;
    box-shadow: inset 0 0 10px red;
  }

  .search-form {
    width: 400px;
    margin: 0 598px 0 30px;
    box-shadow: inset 0 0 10px red;
    box-sizing: border-box;
    position: relative;

    .search-input {
      width: 100%;
      padding: 13px 22px;
      border: 2px solid var(--point-color);
      border-radius: 50px;
      color: #767676;
      box-shadow: inset 0 0 10px red;
    }

    .search-btn {
      box-shadow: inset 0 0 10px red;
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
      box-shadow: inset 0 0 10px red;
    }

    .nav-btn::before {
      display: block;
      background: url(${ShoppingCart}) no-repeat center;
      background-size: contain;
      content: '';
      width: 32px;
      height: 32px;
      box-shadow: inset 0 0 10px red;
    }

    .login::before {
      background: url(${User}) no-repeat center;
    }
  }
`;

export default function Nav() {
  return (
    <NavContainerStyle>
      <nav className="navbar">
        <h1>
          <img src={LogoImg} className="logo" Logo alt="로고 이미지" />
        </h1>

        <form className="search-form">
          <input type="search" placeholder="상품을 검색해보세요!" className="search-input" />
          <button type="submit" className="search-btn">
            <img src={SearchImg} alt="" />
          </button>
        </form>

        <ul className="nav-menu">
          <li>
            <button className="nav-btn">장바구니</button>
          </li>
          <li>
            <button className="nav-btn login">로그인</button>
          </li>
        </ul>
      </nav>
    </NavContainerStyle>
  );
}
