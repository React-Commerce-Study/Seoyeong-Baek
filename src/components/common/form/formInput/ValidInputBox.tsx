import React, { useState, ChangeEvent } from 'react';

import styled from 'styled-components';

import {
  UserNameData, SignUpData, CompanyRegistrationNumberData, ExtendedSignUpData,
} from '../../../../@types/types';
import { postValidCheck } from '../../../../services/ResponseApi';
import Button from '../../Buttons/Button';

interface ValidInputProps {
  children: React.ReactNode;
  userType?: string;
  setUsernameError: React.Dispatch<React.SetStateAction<string>>;
  setUsernameSuccess: React.Dispatch<React.SetStateAction<string>>;
  setSignUpData?: React.Dispatch<React.SetStateAction<SignUpData | ExtendedSignUpData>>;
  setSellerSignUpData?: React.Dispatch<React.SetStateAction<ExtendedSignUpData>>;
}

export default function ValidInputBox({
  children,
  userType,
  setUsernameError,
  setUsernameSuccess,
  setSignUpData,
  setSellerSignUpData,
}: ValidInputProps) {
  const [usernameData, setUserNameData] = useState<UserNameData>({
    username: '',
  });

  const [companyRegistrationNumberData, setCompanyRegistrationNumberData] = useState<CompanyRegistrationNumberData>({
    company_registration_number: '',
  });

  // 아이디, 사업자등록번호
  const onChangeValidData = (e: ChangeEvent<HTMLInputElement>) => {
    if (children === '아이디') {
      setUserNameData(() => { return { username: e.target.value }; });
    } else if (children === '사업자 등록번호') setCompanyRegistrationNumberData({ company_registration_number: e.target.value });
  };

  //  validation
  const validation = () => {
    if (children === '아이디') usernameValid();
    else if (children === '사업자 등록번호') companyRegistrationNumberValid();
    console.log(usernameData.username);
  };

  async function usernameValid() {
    // ^[a-zA-Z0-9]{1,20}$: 문자열의 시작(^)부터 끝($)까지 1에서 20개의 문자 중에 소문자(a-z), 대문자(A-Z), 숫자(0-9) 중 하나가 포함되어야 함
    if (!/^[a-zA-Z0-9]{1,20}$/.test(usernameData.username)) {
      setUsernameSuccess('');
      setUsernameError('ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.');
    } else {
      const result = await postValidCheck('username', usernameData);

      if (result.Success) {
        setUsernameError('');
        setUsernameSuccess(result.Success);
        userType === 'SELLER'
          ? setSellerSignUpData?.((prevData) => { return { ...prevData, username: usernameData.username }; })
          : setSignUpData?.((prevData) => { return { ...prevData, username: usernameData.username }; });
      } else {
        setUsernameSuccess('');
        setUsernameError(result.FAIL_Message);
      }
    }
  }

  async function companyRegistrationNumberValid() {
    console.log('result');

    if (!/^[0-9]{1,10}$/.test(companyRegistrationNumberData.company_registration_number)) {
      setUsernameSuccess('');
      setUsernameError('사업자등록번호는 10자 이내의 숫자만 가능합니다.');
      console.log('result2');
    } else {
      console.log('result3');

      const result = await postValidCheck('company_registration_number', companyRegistrationNumberData);
      console.log(result);

      if (result.Success && setSellerSignUpData) {
        setUsernameError('');
        setUsernameSuccess(result.Success);
        setSellerSignUpData((prevData) => {
          return {
            ...prevData,
            company_registration_number: companyRegistrationNumberData.company_registration_number,
          };
        });
      } else {
        setUsernameSuccess('');
        setUsernameError(result.FAIL_Message);
      }
    }
  }

  return (
    <SIdWrapper>
      <label htmlFor="username">{children}</label>
      <div className="id-input-check">
        <input type="text" id="username" onChange={onChangeValidData} required />
        <Button
          type="button"
          fontWeight="500"
          padding="17px 0"
          onClick={validation}
          disabled={
            children === '아이디'
              ? usernameData.username.length < 1
              : companyRegistrationNumberData.company_registration_number.length < 1
          }
        >
          {children === '아이디' ? '중복확인' : '인증'}
        </Button>
      </div>
    </SIdWrapper>
  );
}

const SIdWrapper = styled.div`
  .id-input-check {
    display: flex;
    gap: 0.75rem;

    input {
      flex-basis: 21.625rem;
    }

    button {
      flex-basis: 7.625rem;
    }
  }
`;
