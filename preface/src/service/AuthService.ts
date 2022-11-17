import { AxiosHTTPClient } from "@/api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import type { IAuthService, IUserVariable } from "./interface";

class AuthService extends AxiosHTTPClient implements IAuthService {
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    super(baseURL, config);
  }

  login = async <TData>({ email, password }: IUserVariable) => {
    const response = await this.instance.post<
      TData,
      AxiosResponse<TData, any>,
      IUserVariable
    >("/login", {
      email,
      password
    });

    return response;
  };
}

export default AuthService;
