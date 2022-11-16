import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Server } from "http";
import { AccountModel, IToken, UserModel } from "model/interface";

export interface ServerError {
  statusCode: number;
  message: string;
  error: string;
}

export interface ServerResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export interface IAuthService {
  login: (
    endpoint: string,
    { email, password }: IUserVariable
  ) => Promise<
    AxiosResponse<ServerResponse> | AxiosError<ServerError> | undefined
  >;
}

export interface IAuthClientService {
  login: (
    endpoint: string,
    { email, password }: IUserVariable
  ) => Promise<AxiosResponse<IToken> | AxiosError<ServerError> | undefined>;
}

export interface IUserVariable {
  email: string;
  password: string;
}

export interface IAccountsService {
  getAccounts: (
    endpoint: string,
    config?: AxiosRequestConfig
  ) => Promise<
    AxiosResponse<AccountModel[]> | AxiosError<ServerError> | undefined
  >;

  getAccountDetail: (
    queryString?: string | string[],
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<AccountModel[]> | AxiosError<Server> | undefined>;
}

export interface IUserService {
  searchUser: (
    id?: string | string[]
  ) => Promise<
    AxiosResponse<UserModel[]> | AxiosError<ServerError> | undefined
  >;
}
