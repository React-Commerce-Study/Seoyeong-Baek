import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import LogoImg from '../../assets/icon/Logo-hodu.png';
import styled from 'styled-components';
// import Button from '../../components/common/Buttons/Button';

export default function SignUp() {
  const [signUpType, setSignUpType] = useState('BUYER');

  const handleLoginType = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'BUYER') {
      setSignUpType('BUYER');
    } else if (e.target.value === 'SELLER') {
      setSignUpType('SELLER');
    }
  };

  console.log(signUpType);

  return (
    <>
      <LoginContainerStyle>
        <h1>
          <Link to="/">
            <img src={LogoImg} alt="로고이미지" />
          </Link>
        </h1>

        <div className="login-type-wrapper">
          <LoginBtnStyle value="BUYER" onClick={handleLoginType} clickChange={signUpType === 'BUYER'}>
            구매회원 회원가입
          </LoginBtnStyle>
          <LoginBtnStyle value="SELLER" onClick={handleLoginType} clickChange={signUpType === 'SELLER'}>
            판매회원 회원가입
          </LoginBtnStyle>
        </div>

        <SignUpForm signUpType={signUpType} />
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
    color: #333;
    font-weight: 400;
    font-size: 16px;
  }
`;

type ClickChangeType = {
  clickChange: boolean;
};

const LoginBtnStyle = styled.button`
  margin-bottom: -10px;
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
