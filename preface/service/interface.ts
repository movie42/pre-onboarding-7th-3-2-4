import { AxiosError, AxiosResponse } from "axios";
import { IUser } from "model/interface";

export interface ServerError {
  statusCode: number;
  message: string;
  error: string;
}

export interface IAuthService {
  login: (
    endpoint: string,
    { email, password }: IUserVariable
  ) => Promise<AxiosResponse<IUser> | AxiosError<ServerError> | undefined>;
}

export interface IUserVariable {
  email: string;
  password: string;
}
