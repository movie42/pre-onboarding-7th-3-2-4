import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";

import type { IUserVariable } from "@/service/interface";
import type { IToken, ServerError } from "@/model/interface";
import { CLIENT_BASE_URL } from "@/lib/constants";
import AuthService from "@/service/AuthService";

const authService = new AuthService(CLIENT_BASE_URL);

const useLogin = () => {
  const router = useRouter();
  return useMutation<
    AxiosResponse<IToken>,
    AxiosError<ServerError>,
    IUserVariable
  >(
    async ({ email, password }) => await authService.login({ email, password }),
    {
      onSuccess: (data) => {
        router.push("/accounts");
        return data;
      },
      onError: (error) => {
        console.error(error.response?.data.error);
        return error;
      }
    }
  );
};

export default useLogin;
