import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import Button from '../../components/common/Buttons/Button';
import styled from 'styled-components';
import checkOffIcon from '../../assets/icon/icon-check-off.svg';
import checkOnIcon from '../../assets/icon/icon-check-on.svg';
import { postSignUp, postIdCheck } from '../../services/ResponseApi';
import { SignUpData, UserNameData, TelData } from '../../@types/types';

interface SignUpFormProps {
  setSuccessUserName: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpForm({ setSuccessUserName }: SignUpFormProps) {
  const [usernameData, setUserNameData] = useState<UserNameData>({
    username: '',
  });

  const [signUpData, setSignUpData] = useState<SignUpData>({
    username: '',
    password: '',
    password2: '',
    phone_number: '',
    name: '',
  });
  // console.log(signUpData);

  const [passwordError, setPasswordError] = useState('');
  const [password2Error, setPassword2Error] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [nameError, setNameError] = useState('');

  // 회원가입 폼 post
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await postSignUp(signUpData);
    const blankError = '이 필드는 필수항목 입니다.';
    console.log(result);
    if (result.user_type) {
      console.log('회원가입 성공');
      setSuccessUserName(result.username);
    } else {
      if (result.password) setPasswordError(result.password[0].includes('blank') ? blankError : result.password);
      if (result.phone_number) setPhoneNumberError(result.phone_number[0].includes('blank') ? blankError : result.phone_number);
      if (result.name) setNameError(result.name[0].includes('blank') ? blankError : result.name);
      if (result.password2) setPassword2Error(result.password2[0].includes('blank') ? blankError : result.password2);
      if (result.username) setUsernameError(result.username[0].includes('blank') ? blankError : result.username);
    }
  };

  // 비밀번호 validation
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setSignUpData((prevData) => ({ ...prevData, password: newPassword }));
    setPasswordError('');

    if (newPassword.length < 8) setPasswordError((prevErr) => `비밀번호는 8자 이상이어야 합니다. \n ${prevErr}`);
    if (newPassword.match(/[a-z]/g) === null)
      setPasswordError((prevErr) => `비밀번호는 한개 이상의 영소문자가 필수적으로 들어가야 합니다. \n ${prevErr}`);
    if (newPassword.match(/[0-9]/g) === null)
      setPasswordError((prevErr) => `비밀번호는 한개 이상의 숫자가 필수적으로 들어가야 합니다. \n ${prevErr}`);

    // if (newPassword.length >= 8 && /[a-z]/.test(newPassword) && /[0-9]/.test(newPassword)) {
    //   setIsConfirmPassword(true);
    // } else setIsConfirmPassword(false); ===>
    const isPasswordValid = /^(?=.*[a-z])(?=.*[0-9]).{8,}$/.test(newPassword);
    setIsConfirmPassword(isPasswordValid);
  };

  // 비밀번호2 validation
  const [isConfirmPassword2, setIsConfirmPassword2] = useState(false);
  const onChangePassword2 = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword2 = e.target.value;
    setSignUpData((prevData) => ({ ...prevData, password2: newPassword2 }));
  };

  useEffect(() => {
    if (signUpData.password2 === signUpData.password && signUpData.password2 !== '') {
      setIsConfirmPassword2(true);
      setPassword2Error('');
    } else if (signUpData.password2 !== signUpData.password && signUpData.password2 !== '') {
      setIsConfirmPassword2(false);
      setPassword2Error('비밀번호가 일치하지 않습니다.');
    }
  }, [signUpData.password, signUpData.password2]);

  // 아이디 validation
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameData(() => ({ username: e.target.value }));
    setSignUpData((prevData) => ({ ...prevData, username: e.target.value }));
  };

  const [usernameError, setUsernameError] = useState('');
  const [usernameSuccess, setUsernameSuccess] = useState('');

  // 아이디 중복 검사 및 validation
  const usernameValidation = async () => {
    // ^[a-zA-Z0-9]{1,20}$: 문자열의 시작(^)부터 끝($)까지 1에서 20개의 문자 중에 소문자(a-z), 대문자(A-Z), 숫자(0-9) 중 하나가 포함되어야 함
    if (!/^[a-zA-Z0-9]{1,20}$/.test(usernameData.username)) {
      setUsernameError('ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.');
    } else {
      const result = await postIdCheck(usernameData);

      if (result.Success) {
        setUsernameSuccess(result.Success);
      }
      setUsernameError(result.FAIL_Message);
    }
  };

  // 전화번호
  const [tel, setTel] = useState<TelData>({
    tel1: '010',
  });

  const handleTel1Change = (e: ChangeEvent<HTMLSelectElement>) => {
    setTel((tel) => ({
      ...tel,
      tel1: e.target.value,
    }));
  };

  const handleTelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumberError('');
    const { name, value } = e.target;
    if (/^\d*$/.test(value))
      setTel({
        ...tel,
        [name]: value,
      });
    else setPhoneNumberError('숫자만 입력 가능합니다.');
  };

  useEffect(() => {
    const combinedTel = tel.tel1 + tel.tel2 + tel.tel3;
    setSignUpData((prevData) => ({ ...prevData, phone_number: combinedTel }));
  }, [tel]);

  // 동의하기 눌렀을 때만 가입하기버튼 active
  const [isChecked, setIsChecked] = useState(false);
  const handleCheck = () => {
    console.log('check');
    !isChecked ? setIsChecked(true) : setIsChecked(false);
  };

  return (
    <SSignUpForm action="" onSubmit={handleSubmit}>
      <SSignUpInputField>
        <IdContainer>
          <label htmlFor="username">아이디</label>
          <IdBoxStyle>
            <input type="text" id="username" value={signUpData.username} onChange={onChangeUserName} />
            <Button
              type="button"
              fontWeight="500"
              padding="17px 0"
              onClick={usernameValidation}
              disabled={usernameData.username.length < 1}
            >
              중복확인
            </Button>
          </IdBoxStyle>
        </IdContainer>
        {(usernameError || usernameSuccess) && (
          <MessageError usernameSuccess={usernameSuccess !== ''}>{usernameError || usernameSuccess}</MessageError>
        )}

        <PasswordContainer isConfirmPassword={isConfirmPassword}>
          <label htmlFor="pw">비밀번호</label>
          <input type="password" id="pw" value={signUpData.password} onChange={onChangePassword} />
        </PasswordContainer>
        {passwordError !== '' && <MessageError>{passwordError}</MessageError>}
        <PasswordContainer isConfirmPassword2={isConfirmPassword2}>
          <label htmlFor="check-pw">비밀번호 재확인</label>
          <input type="password" id="check-pw" value={signUpData.password2} onChange={onChangePassword2} />
        </PasswordContainer>
        {password2Error !== '' && <MessageError>{password2Error}</MessageError>}

        <NameContainer>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            value={signUpData.name}
            onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
          />
          {nameError && <MessageError>{nameError}</MessageError>}
        </NameContainer>

        <PhoneNumberContainer>
          <label htmlFor="tel1 tel2 tel3">휴대폰 번호</label>
          <PhoneNumberBoxStyle>
            <select name="tel1" id="tel1" onChange={handleTel1Change}>
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
              <option value="017">017</option>
            </select>
            <input type="tel" id="tel2" name="tel2" onChange={handleTelChange} />
            <input type="tel" id="tel3" name="tel3" onChange={handleTelChange} />
          </PhoneNumberBoxStyle>
          {phoneNumberError && <MessageError>{phoneNumberError}</MessageError>}
        </PhoneNumberContainer>
      </SSignUpInputField>

      <AgreeCheckBox>
        <input type="checkbox" id="agree" />
        <label htmlFor="agree" onClick={handleCheck}>
          호두샵의 <strong>이용약관</strong> 및 <strong>개인정보처리방침</strong>에 대한 내용을 확인하였고 동의합니다.
        </label>
      </AgreeCheckBox>
      <Button type="submit" disabled={!isChecked}>
        가입하기
      </Button>
    </SSignUpForm>
  );
}
const SSignUpForm = styled.form`
  /* box-shadow: inset 0 0 10px blue; */
  color: var(--dark-gray-color);
`;

const SSignUpInputField = styled.fieldset`
  /* display: flex; */
  /* flex-direction: column; */
  padding: 50px 35px 36px;
  border: 1px solid var(--middle-gray-color);
  border-radius: 10px;
  /* box-shadow: inset 0 0 10px red; */

  div {
    text-align: start;
  }

  input,
  select {
    width: 100%;
    border-radius: 5px;
    border: 1px solid var(--middle-gray-color);
    padding: 17px 16px;
    font-size: var(--font-size-md);
    box-sizing: border-box;
  }

  label:not(:last-child) {
    display: inline-block;
    margin-bottom: 10px;
  }
`;

const IdContainer = styled.div`
  box-shadow: inset 0 0 10px red;
  /* margin-top: 12px; */
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
  margin-top: 12px;

  box-shadow: inset 0 0 10px blue;

  &::after {
    position: absolute;
    content: '';
    background: ${(props: { isConfirmPassword: boolean; isConfirmPassword2: boolean }) =>
      props.isConfirmPassword || props.isConfirmPassword2
        ? `url(${checkOnIcon}) center no-repeat`
        : `url(${checkOffIcon}) center no-repeat`};

    display: inline-block;
    width: 28px;
    height: 28px;
    bottom: 13px;
    right: 16px;
    background-size: contain;
  }
`;

const NameContainer = styled.div`
  margin: 50px 0 0;
`;

const PhoneNumberContainer = styled.div`
  margin-top: 16px;
`;
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
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-light);
  line-height: 20.03px;

  label {
    display: inline-block;
    box-shadow: inset 0 0 10px red;
    text-align: start;
  }

  strong {
    font-weight: var(--font-weight-bold);
    border-bottom: 1px solid;
    /* text-decoration: underline; */
  }
`;

const MessageError = styled.p`
  /* color: red; */
  margin-top: 10px;
  text-align: left;
  white-space: pre-line;
  box-shadow: inset 0 0 10px rosybrown;

  /* .success */
  color: ${(props: { usernameSuccess: boolean }) => (props.usernameSuccess ? 'var(--point-color)' : 'red')};
  margin-top: 10px;
  line-height: normal;
`;
