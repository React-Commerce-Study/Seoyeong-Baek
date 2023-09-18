import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Buttons/Button';
import styled from 'styled-components';
import { postLogin } from '../../services/ResponseApi';
import { LoginData, UserData } from '../../@types/types';
import { useDispatch } from 'react-redux';
import { login } from '../../features/loginSlice';

type LoginFormProps = {
  loginType: string;
};

export default function LoginForm({ loginType }: LoginFormProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
    login_type: loginType,
  });

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
    <>
      <SLoginForm action="" onSubmit={handleSubmit}>
        <label htmlFor="id">
          <input
            type="text"
            id="id"
            placeholder="아이디"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          />
          {isUsernameError && <MessageError>아이디를 입력해 주세요.</MessageError>}
        </label>

        <label htmlFor="pw">
          <input
            type="password"
            id="pw"
            placeholder="비밀번호"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          {isPasswordError && <MessageError>비밀번호를 입력해 주세요.</MessageError>}
          {isLoginError && <MessageError>아이디 또는 비밀번호가 일치하지 않습니다.</MessageError>}
        </label>

        <div className="btn-box">
          <Button type="submit">로그인</Button>
        </div>
      </SLoginForm>
    </>
  );
}

const SLoginForm = styled.form`
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

    &:first-child {
      margin-bottom: 6px;
    }

    &::placeholder {
      color: #767676;
    }
  }

  .btn-box {
    margin-top: 36px;
  }
`;

const MessageError = styled.p`
  color: red;
  margin-top: 26px;
  text-align: left;
`;
