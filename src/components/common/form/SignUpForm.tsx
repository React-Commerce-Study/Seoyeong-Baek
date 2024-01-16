import {
  useState, FormEvent, ChangeEvent, useEffect,
} from 'react';

import styled from 'styled-components';

import { SignUpData, ExtendedSignUpData, TelData } from '../../../@types/types';
import checkOffIcon from '../../../assets/icon/icon-check-off.svg';
import checkOnIcon from '../../../assets/icon/icon-check-on.svg';
import { postSignUp } from '../../../services/ResponseApi';
import { mediaQuery, BREAKPOINT_TABLET } from '../../style/mediaQuery/MediaQueryType';

import AgreeCheckBox from './checkBox/AgreeCheckBox';
import { AgreeCheckBoxStyle } from './checkBox/AgreeCheckBoxStyle';
import ValidInputBox from './formInput/ValidInputBox';

interface SignUpFormProps {
  setSuccessUserName: React.Dispatch<React.SetStateAction<string>>;
  userType: string;
}

export default function SignUpForm({ setSuccessUserName, userType }: SignUpFormProps) {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    username: '',
    password: '',
    password2: '',
    phone_number: '',
    name: '',
  });
  // console.log('form', userType);

  const [sellerSignUpData, setSellerSignUpData] = useState<ExtendedSignUpData>({
    username: '',
    password: '',
    password2: '',
    phone_number: '',
    name: '',
    company_registration_number: '',
    store_name: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [password2Error, setPassword2Error] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [nameError, setNameError] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [usernameSuccess, setUsernameSuccess] = useState('');
  const [companyRegistrationNumError, setCompanyRegistrationNumError] = useState('');
  const [companyRegistrationNumSuccess, setCompanyRegistrationNumSuccess] = useState('');

  // 회원가입 폼 post
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!usernameSuccess) {
      setUsernameError('아이디 중복검사를 진행해주세요!');
    } else {
      const result = await postSignUp(userType, userType === 'SELLER' ? sellerSignUpData : signUpData);
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
    }
  };

  // 비밀번호 validation
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    userType === 'SELLER'
      ? setSellerSignUpData((prevData) => { return { ...prevData, password: newPassword }; })
      : setSignUpData((prevData) => { return { ...prevData, password: newPassword }; });
    setPasswordError('');

    if (newPassword.length < 8) setPasswordError((prevErr) => { return `비밀번호는 8자 이상이어야 합니다. \n ${prevErr}`; });
    if (newPassword.match(/[a-z]/g) === null) setPasswordError((prevErr) => { return `비밀번호는 한개 이상의 영소문자가 필수적으로 들어가야 합니다. \n ${prevErr}`; });
    if (newPassword.match(/[0-9]/g) === null) setPasswordError((prevErr) => { return `비밀번호는 한개 이상의 숫자가 필수적으로 들어가야 합니다. \n ${prevErr}`; });

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
    userType === 'SELLER'
      ? setSellerSignUpData((prevData) => { return { ...prevData, password2: newPassword2 }; })
      : setSignUpData((prevData) => { return { ...prevData, password2: newPassword2 }; });
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

  // 전화번호
  const [tel, setTel] = useState<TelData>({
    tel1: '010',
  });

  const handleTel1Change = (e: ChangeEvent<HTMLSelectElement>) => {
    setTel((tel) => {
      return {
        ...tel,
        tel1: e.target.value,
      };
    });
  };

  const handleTelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumberError('');
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setTel({
        ...tel,
        [name]: value,
      });
    } else setPhoneNumberError('숫자만 입력 가능합니다.');
  };

  useEffect(() => {
    const combinedTel = tel.tel1 + tel.tel2 + tel.tel3;
    userType === 'SELLER'
      ? setSellerSignUpData((prevData) => { return { ...prevData, phone_number: combinedTel }; })
      : setSignUpData((prevData) => { return { ...prevData, phone_number: combinedTel }; });
  }, [tel]);

  return (
    <SSignUpForm action="" onSubmit={handleSubmit}>
      <SSignUpInputField>
        <ValidInputBox
          userType={userType}
          setUsernameError={setUsernameError}
          setUsernameSuccess={setUsernameSuccess}
          setSignUpData={setSignUpData}
          setSellerSignUpData={setSellerSignUpData}
        >
          아이디
        </ValidInputBox>

        {(usernameError || usernameSuccess) && (
          <MessageError usernameSuccess={usernameSuccess.length > 0}>{usernameError || usernameSuccess}</MessageError>
        )}

        <SPasswordWrapper isConfirmPassword={isConfirmPassword}>
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            id="pw"
            onChange={onChangePassword}
            value={userType === 'SELLER' ? sellerSignUpData.password : signUpData.password}
            required
          />
        </SPasswordWrapper>
        {passwordError !== '' && <MessageError>{passwordError}</MessageError>}
        <SPasswordWrapper isConfirmPassword2={isConfirmPassword2}>
          <label htmlFor="check-pw">비밀번호 재확인</label>
          <input
            type="password"
            id="check-pw"
            onChange={onChangePassword2}
            value={userType === 'SELLER' ? sellerSignUpData.password2 : signUpData.password2}
            required
          />
        </SPasswordWrapper>
        {password2Error !== '' && <MessageError>{password2Error}</MessageError>}

        <SNameWrapper className="name">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            onChange={(e) => {
              return (userType === 'SELLER'
                ? setSellerSignUpData({ ...sellerSignUpData, name: e.target.value })
                : setSignUpData({ ...signUpData, name: e.target.value }));
            }}
            value={userType === 'SELLER' ? sellerSignUpData.name : signUpData.name}
            required
          />
          {nameError && <MessageError>{nameError}</MessageError>}
        </SNameWrapper>

        <SPhoneNumberWrapper className={userType === 'SELLER' && 'seller'}>
          <label htmlFor="tel1 tel2 tel3">휴대폰 번호</label>
          <div className="phone-number-box">
            <select name="tel1" id="tel1" onChange={handleTel1Change} required>
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
              <option value="017">017</option>
            </select>
            <input type="tel" id="tel2" name="tel2" onChange={handleTelChange} required />
            <input type="tel" id="tel3" name="tel3" onChange={handleTelChange} required />
          </div>
          {phoneNumberError && <MessageError>{phoneNumberError}</MessageError>}
        </SPhoneNumberWrapper>

        {userType === 'SELLER' && (
          <>
            <ValidInputBox
              setUsernameError={setCompanyRegistrationNumError}
              setUsernameSuccess={setCompanyRegistrationNumSuccess}
              setSellerSignUpData={setSellerSignUpData}
            >
              사업자 등록번호
            </ValidInputBox>
            {(companyRegistrationNumError || companyRegistrationNumSuccess) && (
              <MessageError usernameSuccess={companyRegistrationNumSuccess.length > 0}>
                {companyRegistrationNumError || companyRegistrationNumSuccess}
              </MessageError>
            )}

            <SNameWrapper>
              <label htmlFor="storeName">스토어 이름</label>
              <input
                type="text"
                id="storeName"
                value={sellerSignUpData.store_name}
                onChange={(e) => { return setSellerSignUpData({ ...sellerSignUpData, store_name: e.target.value }); }}
                required
              />
              {nameError && <MessageError>{nameError}</MessageError>}
            </SNameWrapper>
          </>
        )}
      </SSignUpInputField>

      <SCheckBoxWrapper>
        <AgreeCheckBox success="가입하기">
          호두샵의 이용약관 및 개인정보처리방침에 대한 내용을 확인하였고 동의합니다.
        </AgreeCheckBox>
      </SCheckBoxWrapper>
    </SSignUpForm>
  );
}
const SSignUpForm = styled.form`
  color: var(--dark-gray-color);
`;

const SSignUpInputField = styled.fieldset`
  padding: 3.125rem 2.1875rem 2.25rem;
  border: 1px solid var(--middle-gray-color);
  border-radius: 10px;

  div {
    text-align: start;
  }

  input,
  select {
    width: 100%;
    border-radius: 5px;
    border: 1px solid var(--middle-gray-color);
    padding: 1.07rem 1rem;
    font-size: var(--font-size-md);
    box-sizing: border-box;
    box-shadow: 0 0 0 1px #fff;
  }

  input:focus,
  select:focus {
    border: 1px solid var(--point-color);
    box-shadow: 0 0 0 1px var(--point-color);
    outline: #fff;
  }

  label:not(:last-child) {
    display: inline-block;
    margin-bottom: 0.625rem;
  }
  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 2.4rem 1.5rem 2.2rem;
    .btn-box {
      margin-top: 2rem;
    }
  }
`;

const SPasswordWrapper = styled.div`
  position: relative;
  margin-top: 0.75rem;

  &::after {
    position: absolute;
    content: '';
    background: ${(props: { isConfirmPassword: boolean; isConfirmPassword2: boolean }) => {
    return (props.isConfirmPassword || props.isConfirmPassword2
      ? `url(${checkOnIcon}) center no-repeat`
      : `url(${checkOffIcon}) center no-repeat`);
  }};

    display: inline-block;
    width: 1.75rem;
    height: 1.75rem;
    bottom: 0.8125rem;
    right: 1rem;
    background-size: contain;
  }
`;

const SNameWrapper = styled.div`
  margin: 1rem 0 0;

  &.name {
    margin: 3.125rem 0 0;
  }
`;

const SPhoneNumberWrapper = styled.div`
  margin: 1rem 0 0;

  .phone-number-box {
    display: flex;
    gap: 0.75rem;

    select {
      text-align: center;
    }
  }

  &.seller {
    margin: 1rem 0 3.125rem;
  }
`;

const SCheckBoxWrapper = styled(AgreeCheckBoxStyle)`
  max-width: 30rem;
  margin: 2.125rem auto 0;

  .check-box {
    text-align: left;
    line-height: normal;
    margin-bottom: 2.125rem;

    label::before {
      align-self: flex-start;
      margin-top: 0.1rem;
    }
  }

  .btn-box {
    width: 100%;
  }
`;

const MessageError = styled.p`
  margin-top: 10px;
  text-align: left;
  white-space: pre-line;

  /* .success */
  color: ${(props: { usernameSuccess: boolean }) => { return (props.usernameSuccess ? 'var(--point-color)' : 'red'); }};
  margin-top: 10px;
  line-height: normal;
`;
