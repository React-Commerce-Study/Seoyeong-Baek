import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import LogoImg from '../../assets/icon/Logo-hodu.png';
import styled from 'styled-components';

export default function Login() {
  const [loginType, setLoginType] = useState('BUYER');

  return (
    <>
      <LoginContainerStyle>
        <h1>
          <img src={LogoImg} alt="" />
        </h1>
        <div className="login-type-wrapper">
          <button>구매회원 로그인</button>
          <button onClick={() => setLoginType('SELLER')}>판매회원 로그인</button>
        </div>
        <LoginForm loginType={loginType} />
        <div className="join-find-wrapper">
          <Link to="">회원가입</Link>
          <Link to="">비밀번호 찾기</Link>
        </div>
      </LoginContainerStyle>
    </>
  );
}

const LoginContainerStyle = styled.div`
  margin: 100px auto;
  max-width: 550px;
  text-align: center;
  box-shadow: inset 0 0 10px red;

  h1 img {
    max-width: 238px;
    margin-bottom: 70px;
  }

  .login-type-wrapper {
    button {
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
    }
  }

  .join-find-wrapper {
    margin-top: 30px;
    box-shadow: inset 0 0 10px red;

    a {
      color: #333;
      font-weight: 400;
      font-size: 16px;
    }

    a:first-child::after {
      content: '|';
      display: inline-block;
      margin: 0 14px;
    }
  }
`;
