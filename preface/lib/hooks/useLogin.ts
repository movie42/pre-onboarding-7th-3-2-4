import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";

import AxiosInstance from "api/AxiosHTTPClient";
import AuthService from "service/AuthService";
import type { IUserVariable } from "service/interface";
import type { IUser } from "model/interface";

const axios = new AxiosInstance("http://localhost:3000");
const authService = new AuthService(axios.instance());

const useLogin = () => {
  const router = useRouter();
  return useMutation<AxiosResponse<IUser, any>, AxiosError, IUserVariable>(
    async ({ email, password }) =>
      await authService.login("/api/login", { email, password }),
    {
      onSuccess: (data) => {
        router.push("/contents");
        return data;
      }
    }
  );
};

export default useLogin;
