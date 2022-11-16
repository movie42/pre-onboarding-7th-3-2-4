import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";

import type { IUserVariable, ServerError } from "service/interface";
import type { IToken } from "model/interface";
import { CLIENT_BASE_URL } from "lib/constants";
import AuthClientService from "service/AuthClientService";

const authService = new AuthClientService(CLIENT_BASE_URL);

const useLogin = () => {
  const router = useRouter();
  return useMutation<
    AxiosResponse<IToken>,
    AxiosError<ServerError>,
    IUserVariable
  >(
    async ({ email, password }) =>
      await authService.login("/api/login", { email, password }),
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
