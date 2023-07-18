import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import LogoImg from '../../assets/icon/Logo-hodu.png';
import styled from 'styled-components';

export default function Login() {
  const [loginType, setLoginType] = useState('BUYER');

  const handleLoginType = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'BUYER') {
      setLoginType('BUYER');
    } else if (e.target.value === 'SELLER') {
      setLoginType('SELLER');
    }
  };

  console.log(loginType);

  return (
    <>
      <LoginContainerStyle>
        <h1>
          <Link to="/">
            <img src={LogoImg} alt="로고이미지" />
          </Link>
        </h1>

        <div className="login-type-wrapper">
          <LoginBtnStyle value="BUYER" onClick={handleLoginType} clickChange={loginType === 'BUYER'}>
            구매회원 로그인
          </LoginBtnStyle>
          <LoginBtnStyle value="SELLER" onClick={handleLoginType} clickChange={loginType === 'SELLER'}>
            판매회원 로그인
          </LoginBtnStyle>
        </div>

        <LoginForm loginType={loginType} />

        <div className="join-find-wrapper">
          <Link to="/signup">회원가입</Link>
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

  h1 img {
    max-width: 238px;
    margin-bottom: 70px;
  }

  .join-find-wrapper {
    margin-top: 30px;

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

type ClickChangeType = {
  clickChange: boolean;
};

const LoginBtnStyle = styled.button`
  margin-bottom: -20px;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  width: 275px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #c4c4c4;
  border-bottom: ${(props: ClickChangeType) => (props.clickChange ? 'none' : '')};
  background-color: ${(props: ClickChangeType) => (props.clickChange ? '#fff' : '#F2F2F2')};
  padding: 20px;
`;
