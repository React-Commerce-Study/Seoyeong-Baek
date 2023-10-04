import { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Logo from '../Header/logo/Logo';
import styled from 'styled-components';
import { mediaQuery, BREAKPOINT_TABLET } from '../../style/mediaQuery/MediaQueryType';

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
      <SFormLayout>
        <Logo />
        <section className="contents-container">
          <div className="login-type-btn-wrapper">
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
              <LoginForm userType={userType} />
              <SJoinFindWrapper>
                <Link to="/signup">회원가입</Link>
                <Link to="">비밀번호 찾기</Link>
              </SJoinFindWrapper>
            </>
          )}
        </section>
      </SFormLayout>
    </>
  );
}

const SFormLayout = styled.div`
  margin: 6.25rem 0;
  width: 100vw;
  min-width: 19rem;
  text-align: center;
  padding: 0 1rem;
  box-sizing: border-box;

  h1 img {
    max-width: 14.875rem;
    margin-bottom: 4.375rem;
  }

  .contents-container {
    max-width: 34.375rem;
    margin: 0 auto;
  }

  .login-type-btn-wrapper {
    display: flex;
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    margin: 4.5rem 0;

    h1 img {
      max-width: 10rem;
      margin-bottom: 3rem;
    }
  }
`;

type ClickChangeType = {
  clickChange: boolean;
};

const SUserTypeBtn = styled.button`
  flex-grow: 1;
  color: #000;
  margin-bottom: -10px;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-lg);
  line-height: 1.375rem;
  border-radius: 10px 10px 0 0;
  border: 1px solid var(--middle-gray-color);
  border-bottom: ${(props: ClickChangeType) => (props.clickChange ? 'none' : '')};
  background-color: ${(props: ClickChangeType) => (props.clickChange ? '#fff' : '#F2F2F2')};
  padding: 1.25rem 0;
`;

const SJoinFindWrapper = styled.div`
  margin-top: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  a {
    color: #333;
    font-weight: var(--font-weight-light);
    font-size: var(--font-size-md);
    padding: 0.3rem;
  }
  & > :first-child::after {
    content: '|';
    position: absolute;
    display: inline-block;
    margin-left: 1.15rem;
  }
`;
