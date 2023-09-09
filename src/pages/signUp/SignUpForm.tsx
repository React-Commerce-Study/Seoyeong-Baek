import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Buttons/Button';
import styled from 'styled-components';
import checkOffIcon from '../../assets/icon/icon-check-off.svg';
import checkOnIcon from '../../assets/icon/icon-check-on.svg';
import { postSignUp, postIdCheck } from '../../services/ResponseApi';
import { SignUpData, UserNameData } from '../../@types/types';

interface SignUpFormProps {
  signUpType: string;
}

export default function SignUpForm({ signUpType }: SignUpFormProps) {
  const navigate = useNavigate();

  const [usernameData, setUserNameData] = useState<UserNameData>({
    username: '',
  });

  const [signUpData, setSignUpData] = useState<SignUpData>({
    username: '',
    password: '',
    password2: '',
    phone_number: '', // 전화번호는 010으로 시작하는 10~11자리 숫자
    name: '',
  });
  // console.log(signUpData);

  // 회원가입 폼 post
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postSignUp(signUpData);
  };

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameData(() => ({ username: e.target.value }));
    setSignUpData((prevData) => ({ ...prevData, username: e.target.value }));
  };

  const [usernameError, setUsernameError] = useState('');
  // 아이디 중복 검사
  const usernameValidation = async () => {
    const result = await postIdCheck(usernameData);
    setUsernameError(result.FAIL_Message || result.Success);
  };

  return (
    <SSignUpForm action="" onSubmit={handleSubmit}>
      <SSignUpInputField>
        <IdContainer>
          <label htmlFor="username">아이디</label>
          <IdBoxStyle>
            <input type="text" id="username" value={signUpData.username} onChange={handleUserNameChange} />
            <Button type="button" fontWeight="500" padding="17px 0" onClick={usernameValidation}>
              중복확인
            </Button>
          </IdBoxStyle>
          {usernameError && <MessageError>{usernameError}</MessageError>}
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
        <PasswordContainer>
          <label htmlFor="check-pw">비밀번호 재확인</label>
          <input
            type="password"
            id="check-pw"
            value={signUpData.password2}
            onChange={(e) => setSignUpData({ ...signUpData, password2: e.target.value })}
          />
          {/* <MessageError display={isPasswordError}>비밀번호가 일치하지 않습니다.</MessageError> */}
        </PasswordContainer>

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
          <PhoneNumberBoxStyle>
            <select name="tel" id="phone-number" required>
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
              <option value="017">017</option>
              <option value="python">Python</option>
            </select>
            <input
              type="tel"
              id="phone-number"
              value={signUpData.phone_number}
              onChange={(e) => setSignUpData({ ...signUpData, phone_number: e.target.value })}
            />
            <input
              type="tel"
              id="phone-number"
              value={signUpData.phone_number}
              onChange={(e) => setSignUpData({ ...signUpData, phone_number: e.target.value })}
            />
          </PhoneNumberBoxStyle>
        </PhoneNumberContainer>
      </SSignUpInputField>

      <AgreeCheckBox>
        <input type="checkbox" id="agree" />
        <label htmlFor="agree">
          호두샵의 <strong>이용약관</strong> 및 <strong>개인정보처리방침</strong>에 대한 내용을 확인하였고 동의합니다.
        </label>
      </AgreeCheckBox>
      <Button type="submit">가입하기</Button>
    </SSignUpForm>
  );
}
const SSignUpForm = styled.form`
  /* box-shadow: inset 0 0 10px blue; */
  color: #767676;
`;

const SSignUpInputField = styled.fieldset`
  /* display: flex; */
  /* flex-direction: column; */
  padding: 50px 35px 36px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  /* box-shadow: inset 0 0 10px red; */

  div {
    text-align: start;
  }

  input,
  select {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    padding: 17px 16px;
    font-size: 16px;
    box-sizing: border-box;
  }

  label:not(:last-child) {
    display: inline-block;
    margin-bottom: 10px;
  }
`;

const IdContainer = styled.div`
  box-shadow: inset 0 0 10px red;
  margin-bottom: 12px;
`;
const IdBoxStyle = styled.div`
  display: flex;
  gap: 12px;

  input {
    flex-basis: 346px;
  }

  button {
    flex-basis: 122px;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
  margin-bottom: 12px;

  &::after {
    position: absolute;
    content: '';
    background: url(${checkOffIcon}) center no-repeat;
    display: inline-block;
    width: 28px;
    height: 28px;
    bottom: 13px;
    right: 16px;
    background-size: contain;
  }
`;

const NameContainer = styled.div`
  margin: 50px 0 16px;
`;

const PhoneNumberContainer = styled.div``;
const PhoneNumberBoxStyle = styled.div`
  display: flex;
  gap: 12px;

  select {
    text-align: center;
  }
`;

const AgreeCheckBox = styled.div`
  margin: 34px auto;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 480px;
  box-shadow: inset 0 0 10px red;
  font-size: 16px;
  font-weight: 400;
  line-height: 20.03px;

  label {
    display: inline-block;
    box-shadow: inset 0 0 10px red;
    text-align: start;
  }

  strong {
    font-weight: 700;
    border-bottom: 1px solid;
    /* text-decoration: underline; */
  }
`;

const MessageError = styled.p`
  color: red;
  margin-top: 26px;
  text-align: left;
  /* display: ${(props: { display: boolean }) => (props.display ? 'block' : 'none')}; */
`;
