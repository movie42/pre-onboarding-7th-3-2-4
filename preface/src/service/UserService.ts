import { AxiosHTTPClient } from "@/api";
import type { AxiosRequestConfig } from "axios";

import type { IUserService } from "./interface";

class UserService extends AxiosHTTPClient implements IUserService {
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    super(baseURL, config);
  }

  searchUser = async <TData>(id?: string | string[]) => {
    const response = await this.instance.get<TData>(`/users?id=${id}`);
    return response;
  };
}

export default UserService;
