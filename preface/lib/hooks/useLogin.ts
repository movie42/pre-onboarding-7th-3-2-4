import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";

import AuthService from "service/AuthService";
import type { IUserVariable } from "service/interface";
import type { IUser } from "model/interface";
import { CLIENT_BASE_URL } from "lib/constants";

const authService = new AuthService(CLIENT_BASE_URL);

const useLogin = () => {
  const router = useRouter();
  return useMutation<AxiosResponse<IUser, any>, AxiosError, IUserVariable>(
    async ({ email, password }) =>
      await authService.login("/api/login", { email, password }),
    {
      onSuccess: (data) => {
        router.push("/contents");
        return data;
      },
      onError: (error) => {
        console.error(error);
        return error;
      }
    }
  );
};

export default useLogin;
