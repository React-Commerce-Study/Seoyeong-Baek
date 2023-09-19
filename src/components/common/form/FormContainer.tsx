import { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import LogoImg from '../../../assets/icon/Logo-hodu.png';
import styled from 'styled-components';

interface FormContainer {
  setSuccessUserName?: React.Dispatch<React.SetStateAction<string>>;
  // 회원가입 페이지일때만 props가 들어옴
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
          <SUserTypeBtn value="BUYER" onClick={handleLoginType} clickChange={userType === 'BUYER'}>
            구매회원 {setSuccessUserName ? '회원가입' : '로그인'}
          </SUserTypeBtn>
          <SUserTypeBtn value="SELLER" onClick={handleLoginType} clickChange={userType === 'SELLER'}>
            판매회원 {setSuccessUserName ? '회원가입' : '로그인'}
          </SUserTypeBtn>
        </div>

        {setSuccessUserName ? (
          <SignUpForm setSuccessUserName={setSuccessUserName} />
        ) : (
          <>
            <LoginForm loginType={userType} />
            <SJoinFindWrapper>
              <Link to="/signup">회원가입</Link>
              <Link to="">비밀번호 찾기</Link>
            </SJoinFindWrapper>
          </>
        )}
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
`;

type ClickChangeType = {
  clickChange: boolean;
};

const SUserTypeBtn = styled.button`
  margin-bottom: -10px;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-lg);
  line-height: 22px;
  width: 275px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid var(--middle-gray-color);
  border-bottom: ${(props: ClickChangeType) => (props.clickChange ? 'none' : '')};
  background-color: ${(props: ClickChangeType) => (props.clickChange ? '#fff' : '#F2F2F2')};
  padding: 20px;
`;

const SJoinFindWrapper = styled.div`
  margin-top: 30px;
  a {
    color: #333;
    font-weight: var(--font-weight-light);
    font-size: var(--font-size-md);
    &:first-child::after {
      content: '|';
      display: inline-block;
      margin: 0 14px;
    }
  }
`;
