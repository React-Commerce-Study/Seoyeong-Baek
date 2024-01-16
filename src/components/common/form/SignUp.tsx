import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import checkOffIcon from "../../../assets/icon/icon-check-off.svg";
import checkOnIcon from "../../../assets/icon/icon-check-on.svg";
import styled from "styled-components";
import AgreeCheckBox from "./checkBox/AgreeCheckBox";
import {
  BREAKPOINT_TABLET,
  mediaQuery,
} from "components/style/mediaQuery/MediaQueryType";
import { AgreeCheckBoxStyle } from "./checkBox/AgreeCheckBoxStyle";
import {
  nameErrors,
  passwordErrors,
  phoneNumberErrors,
} from "./constants/errorMessages";
import ValidIdTextField from "./formInput/ValidIdTextField";
import { SignUpData } from "../../../@types/types";
import useSignUp from "services/queries/useSignUp";

export default function SignUp() {
  const methods = useForm({
    mode: "onChange",
  });
  const { mutate } = useSignUp();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const {
      "first-tel": firstTel,
      "second-tel": secondTel,
      "last-tel": lastTel,
    } = formData;
    const phoneNumber = firstTel + secondTel + lastTel;
    const newData: SignUpData = {
      phone_number: phoneNumber,
      username: formData.username,
      password: formData.password,
      password2: formData.password2,
      name: formData.name,
    };

    mutate(newData);
    alert(JSON.stringify(newData));
  };

  const idRegisterRules = {
    required: true,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9]{1,20}$/,
  };

  return (
    <FormProvider {...methods}>
      <SSignUpForm onSubmit={methods.handleSubmit(onSubmit)}>
        <SSignUpInputField>
          <ValidIdTextField registerRules={idRegisterRules} />
          <SPasswordWrapper>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              {...methods.register("password", {
                required: true,
                minLength: 8,
                pattern: /^[a-zA-Z0-9]{1,20}$/,
              })}
            />
            {methods.formState.errors.password && (
              <MessageError>
                {
                  passwordErrors[
                    methods.formState.errors.password.type as string
                  ]
                }
              </MessageError>
            )}
          </SPasswordWrapper>
          <SPasswordWrapper>
            <label htmlFor="password2">비밀번호 재확인</label>
            <input
              type="password"
              id="password2"
              {...methods.register("password2", {
                required: true,
              })}
            />
            {methods.formState.errors.password && (
              <MessageError>
                {
                  passwordErrors[
                    methods.formState.errors.password.type as string
                  ]
                }
              </MessageError>
            )}
          </SPasswordWrapper>
          <SNameWrapper className="name">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              {...methods.register("name", {
                required: true,
              })}
            />
            {methods.formState.errors.name && (
              <MessageError>
                {nameErrors[methods.formState.errors.name.type as string]}
              </MessageError>
            )}
          </SNameWrapper>
          <SPhoneNumberWrapper>
            <label htmlFor="tel1 tel2 tel3">휴대폰 번호</label>
            <div className="phone-number-box">
              <select
                id="tel1"
                {...methods.register("first-tel", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              >
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
                <option value="017">017</option>
              </select>
              <input
                type="tel"
                id="tel2"
                {...methods.register("second-tel", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              <input
                type="tel"
                id="tel3"
                {...methods.register("last-tel", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
            </div>
            {methods.formState.errors.phone_number && (
              <MessageError>
                {
                  phoneNumberErrors[
                    methods.formState.errors.phone_number?.type as string
                  ]
                }
              </MessageError>
            )}
          </SPhoneNumberWrapper>
        </SSignUpInputField>
        <SCheckBoxWrapper>
          <AgreeCheckBox success="가입하기">
            호두샵의 이용약관 및 개인정보처리방침에 대한 내용을 확인하였고
            동의합니다.
          </AgreeCheckBox>
        </SCheckBoxWrapper>
      </SSignUpForm>
    </FormProvider>
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
    content: "";
    background: ${(props: {
      isConfirmPassword: boolean;
      isConfirmPassword2: boolean;
    }) => {
      return props.isConfirmPassword || props.isConfirmPassword2
        ? `url(${checkOnIcon}) center no-repeat`
        : `url(${checkOffIcon}) center no-repeat`;
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
  color: ${(props: { usernameSuccess: boolean }) => {
    return props.usernameSuccess ? "var(--point-color)" : "red";
  }};
  margin-top: 10px;
  line-height: normal;
`;
