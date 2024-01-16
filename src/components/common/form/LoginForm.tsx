import { useState, useEffect, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { LoginData } from '../../../@types/types';
import { login } from '../../../features/loginSlice';
import { postLogin } from '../../../services/ResponseApi';
import { mediaQuery, BREAKPOINT_TABLET } from '../../style/mediaQuery/MediaQueryType';
import Button from '../Buttons/Button';

type LoginFormProps = {
  userType: string;
};

export default function LoginForm({ userType }: LoginFormProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
    login_type: userType,
  });

  // userType이 변경될 때 loginData를 업데이트(loginData의 login_type을 동적으로 업데이트하려면 부모 컴포넌트에서 userType이 변경될 때 loginData도 업데이트)
  useEffect(() => {
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        login_type: userType,
      };
    });
  }, [userType]);

  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);

  const handleError = () => {
    if ((loginData.username === '' && loginData.password === '') || loginData.username === '') {
      setIsUsernameError(true);
    } else if (loginData.username && loginData.password === '') {
      setIsPasswordError(true);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleError();
    await postLogin(loginData);
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(login());
      navigate('/');
    } else setIsLoginError(true);
  };

  return (
    <SLoginForm action="" onSubmit={handleSubmit}>
      <label htmlFor="id">
        <input
          type="text"
          id="id"
          placeholder="아이디"
          value={loginData.username}
          onChange={(e) => { return setLoginData({ ...loginData, username: e.target.value }); }}
        />
        {isUsernameError && <MessageError>아이디를 입력해 주세요.</MessageError>}
      </label>

      <label htmlFor="pw">
        <input
          type="password"
          id="pw"
          placeholder="비밀번호"
          value={loginData.password}
          onChange={(e) => { return setLoginData({ ...loginData, password: e.target.value }); }}
        />
        {isPasswordError && <MessageError>비밀번호를 입력해 주세요.</MessageError>}
        {isLoginError && <MessageError>아이디 또는 비밀번호가 일치하지 않습니다.</MessageError>}
      </label>

      <div className="btn-box">
        <Button type="submit">로그인</Button>
      </div>
    </SLoginForm>
  );
}

const SLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2.125rem 2.1875rem 2.25rem;
  border: 1px solid var(--middle-gray-color);
  border-radius: 10px;
  box-sizing: border-box;

  input {
    width: 100%;
    border-bottom: 1px solid var(--middle-gray-color);
    padding: 1.25rem 1rem;
    box-sizing: border-box;
    font-size: var(--font-size-md);

    &:first-child {
      margin-bottom: 1rem;
    }

    &::placeholder {
      color: var(--dark-gray-color);
    }

    &:focus {
      border-radius: 5px;
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0);
      box-shadow: 0 0 0 2px var(--point-color);
      outline: #fff;
    }
  }

  .btn-box {
    margin-top: 2.25rem;
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 2.125rem 1.5rem 2.2rem;
    .btn-box {
      margin-top: 2rem;
    }
  }
`;

const MessageError = styled.p`
  color: red;
  margin-bottom: 1.2rem;
  text-align: left;
`;
