import { RegisterOptions, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { postValidCheck } from "../../../../services/ResponseApi";
import Button from "../../Buttons/Button";
import { usernameErrors } from "../constants/errorMessages";
import { useState } from "react";

interface ValidIdTextFieldProps {
  registerRules: RegisterOptions;
}

export default function ValidIdTextField({
  registerRules,
}: ValidIdTextFieldProps) {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const userName = watch("username") || "";

  const handleValid = async () => {
    const username = watch("username");
    const res = await postValidCheck("username", { username: username });
    if (res.Success) {
      setMessage(() => res.Success);
      setIsSuccess(() => true);
      return;
    }
    setMessage(() => res.FAIL_Message);
  };

  return (
    <SValidId>
      <label htmlFor="username">아이디</label>
      <div className="id-input-check">
        <input
          type="text"
          id="id"
          {...register("username", registerRules)} // registerRules prop 사용
        />
        <Button
          type="button"
          fontWeight="500"
          padding="17px 0"
          onClick={handleValid}
          disabled={userName?.length < 1}
        >
          중복확인
        </Button>
      </div>
      {errors.username && (
        <MessageError>
          {usernameErrors[errors.username.type as string]}
        </MessageError>
      )}
      {message && message.length > 0 && (
        <MessageError usernameSuccess={isSuccess}>{message}</MessageError>
      )}
    </SValidId>
  );
}
const SValidId = styled.div`
  .id-input-check {
    display: flex;
    gap: 0.75rem;

    input {
      width: 100%;
      border-radius: 5px;
      border: 1px solid var(--middle-gray-color);
      padding: 1.07rem 1rem;
      font-size: var(--font-size-md);
      box-sizing: border-box;
      box-shadow: 0 0 0 1px #fff;
    }

    input:focus {
      border: 1px solid var(--point-color);
      box-shadow: 0 0 0 1px var(--point-color);
      outline: #fff;
    }

    label:not(:last-child) {
      display: inline-block;
      margin-bottom: 0.625rem;
    }

    button {
      flex-basis: 7.625rem;
    }
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
