import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Buttons/Button';
import styled from 'styled-components';

export default function SignUpForm() {
  const navigate = useNavigate();
  const URL = 'https://openmarket.weniv.co.kr/';
  const reqPath = 'accounts/signup/';

  const [signUpData, setSignUpData] = useState({
    username: '',
    password: '',
    password2: '',
    phone_number: '', // 전화번호는 010으로 시작하는 10~11자리 숫자
    name: '',
  });
  console.log(signUpData);

  async function handleSignUp(signUpData) {
    try {
      const res = await fetch(URL + reqPath, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(signUpData),
      });
      console.log(signUpData);

      if (res.ok) {
        const json = await res.json();
        console.log('SignUp successful!');
        console.log(json);
        // navigate('/login');
      } else {
        throw new Error();
      }
    } catch {
      console.error('signUp failed!');
      // setIsLoginError(true);
    }
  }

  //   TODO: 에러메세지 저장해놓기

  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);

  const handleError = () => {
    if ((signUpData.username === '' && signUpData.password === '') || signUpData.username === '') {
      setIsUsernameError(true);
    } else if (signUpData.username && signUpData.password === '') {
      setIsPasswordError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(signUpData);
  };

  return (
    <SignUpFormContainer action="" onSubmit={handleSubmit}>
      <SignUpFormStyle>
        <label htmlFor="id">아이디</label>
        <IdContainer>
          <input
            type="text"
            id="id"
            placeholder="아이디"
            value={signUpData.username}
            onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
          />
          <Button type="submit">중복확인</Button>
        </IdContainer>

        {/* <MessageError display={isUsernameError}>이미 사용 중인 아이디입니다.</MessageError> */}

        <label htmlFor="pw">비밀번호</label>
        <input
          type="password"
          id="pw"
          placeholder="비밀번호"
          value={signUpData.password}
          onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
        />
        {/* <MessageError display={isPasswordError}>비밀번호를 입력해 주세요.</MessageError> */}

        <label htmlFor="check-pw">비밀번호 재확인</label>
        <input
          type="password"
          id="check-pw"
          placeholder="비밀번호"
          value={signUpData.password2}
          onChange={(e) => setSignUpData({ ...signUpData, password2: e.target.value })}
        />
        {/* <MessageError display={isPasswordError}>비밀번호가 일치하지 않습니다.</MessageError> */}

        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          value={signUpData.name}
          onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
        />

        <label htmlFor="phone-number">휴대폰 번호</label>
        <input
          type="tel"
          id="phone-number"
          value={signUpData.phone_number}
          onChange={(e) => setSignUpData({ ...signUpData, phone_number: e.target.value })}
        />
      </SignUpFormStyle>

      <label htmlFor="agree">
        <input type="checkbox" id="agreer" />
        호두샵의 <strong>이용약관</strong> 및 <strong>개인정보처리방침</strong>에 대한 내용을 확인하였고 동의합니다.
      </label>
      <Button type="submit">가입하기</Button>
    </SignUpFormContainer>
  );
}
const SignUpFormContainer = styled.form``;

const SignUpFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 34px 35px 36px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: inset 0 0 10px red;

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

const IdContainer = styled.div`
  display: flex;
`;

const MessageError = styled.p`
  color: red;
  margin-top: 26px;
  text-align: left;
  display: ${(props) => (props.display ? 'block' : 'none')};
`;
