import { AxiosHTTPClient } from "api";
import type { AxiosRequestConfig } from "axios";
import type { UserModel } from "model/interface";

import type { IUserService } from "./interface";

class UserService extends AxiosHTTPClient implements IUserService {
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    super(baseURL, config);
  }

  searchUser = async (id?: string | string[]) => {
    const response = await this.instance.get<UserModel[]>(`/users?id=${id}`);
    return response;
  };
}

export default UserService;
