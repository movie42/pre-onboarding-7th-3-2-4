import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface IAuthService {
  login: <TData>(
    endpoint: string,
    { email, password }: IUserVariable
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;
}

export interface IUserVariable {
  email: string;
  password: string;
}

export interface IAccountsService {
  getAccounts: <TData>(
    endpoint: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;

  getAccountDetail: <TData>(
    endpoint: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;

  createAccount: <TData, TVariable>(
    endpoint: string,
    data: TVariable,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;
}

export interface IUserService {
  searchUser: <TData>(
    id?: string | string[]
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;
}
