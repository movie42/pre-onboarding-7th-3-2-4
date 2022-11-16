import { AxiosHTTPClient } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import type { IAuthService, IUserVariable, ServerResponse } from "./interface";

class AuthService extends AxiosHTTPClient implements IAuthService {
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    super(baseURL, config);
  }

  login = async (endPoint: string, { email, password }: IUserVariable) => {
    const response = await this.instance.post<
      ServerResponse,
      AxiosResponse<ServerResponse, any>,
      IUserVariable
    >(endPoint, {
      email,
      password
    });

    return response;
  };
}

export default AuthService;
