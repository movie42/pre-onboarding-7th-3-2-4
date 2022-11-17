import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface IAuthService {
  login: <TData>({
    email,
    password
  }: IUserVariable) => Promise<AxiosResponse<TData> | AxiosError | undefined>;
}

export interface IUserVariable {
  email: string;
  password: string;
}

export interface IAccountsService {
  getAccounts: <TData>(
    query: string | string[],
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;

  getAccountDetail: <TData>(
    query: string | string[],
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;

  createAccount: <TData, TVariable>(
    data: TVariable,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;

  updateAccount: <TData, TVariable extends { id: number }>(
    data: TVariable,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;
}

export interface IUserService {
  searchUser: <TData>(
    id?: string | string[]
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;
}
