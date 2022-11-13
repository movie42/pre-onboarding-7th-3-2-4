import { AxiosError, AxiosResponse } from "axios";
import { AccountModel, IToken, UserModel } from "model/interface";

export interface ServerError {
  statusCode: number;
  message: string;
  error: string;
}

export interface IAuthService {
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
    endpoint: string
  ) => Promise<
    AxiosResponse<AccountModel[]> | AxiosError<ServerError> | undefined
  >;
}

export interface IUserService {
  searchUser: (
    id: number
  ) => Promise<
    AxiosResponse<UserModel[]> | AxiosError<ServerError> | undefined
  >;
}
