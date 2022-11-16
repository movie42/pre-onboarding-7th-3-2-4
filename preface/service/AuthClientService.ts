import { AxiosHTTPClient } from "api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IToken } from "model/interface";
import { IAuthClientService, IUserVariable } from "./interface";

class AuthClientService extends AxiosHTTPClient implements IAuthClientService {
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    super(baseURL, config);
  }
  login = async (endpoint: string, { email, password }: IUserVariable) => {
    const response = await this.instance.post<
      IToken,
      AxiosResponse<IToken, any>,
      IUserVariable
    >(endpoint, {
      email,
      password
    });
    return response;
  };
}

export default AuthClientService;
