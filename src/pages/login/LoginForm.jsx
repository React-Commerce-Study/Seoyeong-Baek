import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Buttons/Button';
import styled from 'styled-components';

export default function LoginForm({ loginType }) {
  const navigate = useNavigate();
  const URL = 'https://openmarket.weniv.co.kr/';
  const reqPath = 'accounts/login/';

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    login_type: loginType,
  });

  async function handleLogin(loginData) {
    try {
      const res = await fetch(URL + reqPath, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (res.ok) {
        console.log('Login successful!');
        const json = await res.json();
        const token = json.token;
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        throw new Error();
      }
    } catch {
      console.error('Login failed!');
      setIsLoginError(true);
    }
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(loginData);
  };

  return (
    <div>
      <LoginFormStyle action="" onSubmit={handleSubmit}>
        <label htmlFor="id">
          <input
            type="text"
            id="id"
            placeholder="아이디"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          />
          <MessageError display={isUsernameError}>아이디를 입력해 주세요.</MessageError>
        </label>

        <label htmlFor="pw">
          <input
            type="password"
            id="pw"
            placeholder="비밀번호"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <MessageError display={isPasswordError}>비밀번호를 입력해 주세요.</MessageError>
          <MessageError display={isLoginError}>아이디 또는 비밀번호가 일치하지 않습니다.</MessageError>
        </label>

        <div className="btn-box">
          <Button type="submit" onClick={handleError}>
            로그인
          </Button>
        </div>
      </LoginFormStyle>
    </div>
  );
}

const LoginFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  padding: 34px 35px 36px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  box-sizing: border-box;

  input {
    width: 100%;
    border-bottom: 1px solid #c4c4c4;
    padding: 20px 0;
    font-size: 16px;
  }

  input::placeholder {
    color: #767676;
  }

  input:first-child {
    margin-bottom: 6px;
  }

  .btn-box {
    margin-top: 36px;
    /* box-shadow: inset 0 0 10px red; */
  }
`;

const MessageError = styled.p`
  color: red;
  margin-top: 26px;
  text-align: left;
  display: ${(props) => (props.display ? 'block' : 'none')};
`;
