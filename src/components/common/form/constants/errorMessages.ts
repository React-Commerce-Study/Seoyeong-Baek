interface ErrorsMessage {
  [key: string]: string;
}

export const commonErrors: ErrorsMessage = {
  required: "필수 입력값입니다.",
};

export const usernameErrors: ErrorsMessage = {
  ...commonErrors,
  pattern: "ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.",
};

export const passwordErrors: ErrorsMessage = {
  ...commonErrors,
  minLength: "비밀번호는 8자 이상이어야 합니다.",
  pattern:
    "비밀번호는 한 개 이상의 영소문자와 숫자가 필수적으로 들어가야 합니다.",
  mismatch: "비밀번호가 일치하지 않습니다.",
};

export const nameErrors: ErrorsMessage = {
  ...commonErrors,
};

export const phoneNumberErrors: ErrorsMessage = {
  ...commonErrors,
  pattern: "숫자만 입력 가능합니다.",
};
