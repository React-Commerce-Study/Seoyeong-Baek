import { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../../../pages/signUp/SignUpForm';
import LoginForm from '../../../pages/login/LoginForm';
import LogoImg from '../../../assets/icon/Logo-hodu.png';
import styled from 'styled-components';

interface FormContainer {
  setSuccessUserName?: React.Dispatch<React.SetStateAction<string>>;
}

export default function FormContainer({ setSuccessUserName }: FormContainer) {
  const [userType, setUserType] = useState('BUYER');

  const handleLoginType = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'BUYER') {
      setUserType('BUYER');
    } else if (e.target.value === 'SELLER') {
      setUserType('SELLER');
    }
  };

  console.log(userType);

  return (
    <>
      <SFormContainer>
        <h1>
          <Link to="/">
            <img src={LogoImg} alt="로고이미지" />
          </Link>
        </h1>

        <div className="login-type-wrapper">
          <LoginBtnStyle value="BUYER" onClick={handleLoginType} clickChange={userType === 'BUYER'}>
            구매회원 회원가입
          </LoginBtnStyle>
          <LoginBtnStyle value="SELLER" onClick={handleLoginType} clickChange={userType === 'SELLER'}>
            판매회원 회원가입
          </LoginBtnStyle>
        </div>
        {setSuccessUserName ? <SignUpForm setSuccessUserName={setSuccessUserName} /> : <LoginForm loginType={userType} />}
      </SFormContainer>
    </>
  );
}

const SFormContainer = styled.div`
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
