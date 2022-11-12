import { AxiosInstance, AxiosResponse } from "axios";
import type { IUser } from "model/interface";
import type { IAuthService, IUserVariable } from "./interface";

class AuthService implements IAuthService {
  private instance;
  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  login = async (endPoint: string, { email, password }: IUserVariable) => {
    const response = await this.instance.post<
      IUser,
      AxiosResponse<IUser, any>,
      IUserVariable
    >(endPoint, {
      email,
      password
    });

    return response;
  };
}

export default AuthService;
