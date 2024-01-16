// import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "../ResponseApi";
import { SignUpData } from "../../@types/types";
import { useMutation } from "@tanstack/react-query";

const signUp = async (data: SignUpData) => {
  const res = await postSignUp("BUYER", data);
  //   console.log(res);
  return res;
};

export default function useSignUp() {
  const { data, isError, error } = useMutation({ mutationFn: signUp });
  return {
    data,
    isError,
    error,
  };
}
