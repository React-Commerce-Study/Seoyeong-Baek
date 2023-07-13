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
        <IdContainer>
          <label htmlFor="id">아이디</label>
          <IdBoxStyle>
            <input
              type="text"
              id="id"
              value={signUpData.username}
              onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
            />
            <Button type="button" fontWeight="500" padding="17px 0">
              중복확인
            </Button>
          </IdBoxStyle>
          {/* <MessageError display={isUsernameError}>이미 사용 중인 아이디입니다.</MessageError> */}
        </IdContainer>
        <PasswordContainer>
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            id="pw"
            value={signUpData.password}
            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
          />
          {/* <MessageError display={isPasswordError}>비밀번호를 입력해 주세요.</MessageError> */}
        </PasswordContainer>
        <Password2Container>
          <label htmlFor="check-pw">비밀번호 재확인</label>
          <input
            type="password"
            id="check-pw"
            value={signUpData.password2}
            onChange={(e) => setSignUpData({ ...signUpData, password2: e.target.value })}
          />
          {/* <MessageError display={isPasswordError}>비밀번호가 일치하지 않습니다.</MessageError> */}
        </Password2Container>

        <NameContainer>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            value={signUpData.name}
            onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
          />
        </NameContainer>

        <PhoneNumberContainer>
          <label htmlFor="phone-number">휴대폰 번호</label>
          <input
            type="tel"
            id="phone-number"
            value={signUpData.phone_number}
            onChange={(e) => setSignUpData({ ...signUpData, phone_number: e.target.value })}
          />
        </PhoneNumberContainer>
      </SignUpFormStyle>

      <AgreeCheckBox>
        <label htmlFor="agree"></label>
        <input type="checkbox" id="agree" />
        호두샵의 <strong>이용약관</strong> 및 <strong>개인정보처리방침</strong>에 대한 내용을 확인하였고 동의합니다.
      </AgreeCheckBox>
      <Button type="submit">가입하기</Button>
    </SignUpFormContainer>
  );
}
const SignUpFormContainer = styled.form`
  box-shadow: inset 0 0 10px blue;
  color: #767676;
`;

const SignUpFormStyle = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  padding: 34px 35px 36px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  box-shadow: inset 0 0 10px red;

  div {
    text-align: start;
  }

  input {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    padding: 17px 16px;
    font-size: 16px;
    box-sizing: border-box;
  }
`;

const IdContainer = styled.div``;
const PasswordContainer = styled.div``;
const Password2Container = styled.div``;
const NameContainer = styled.div``;
const PhoneNumberContainer = styled.div``;
const AgreeCheckBox = styled.div`
  margin: 34px auto;
  max-width: 454px;
  box-shadow: inset 0 0 10px red;
  font-size: 16px;
  font-weight: 400;
  line-height: 20.03px;

  strong {
    font-weight: 700;
    text-decoration: underline;
  }
`;

const IdBoxStyle = styled.div`
  display: flex;
  gap: 12px;
`;

const MessageError = styled.p`
  color: red;
  margin-top: 26px;
  text-align: left;
  display: ${(props) => (props.display ? 'block' : 'none')};
`;
