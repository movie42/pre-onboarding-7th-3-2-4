import { AxiosHTTPClient } from "api";
import { AxiosRequestConfig } from "axios";
import { AccountModel } from "model/interface";

import type { IAccountsService } from "./interface";

class AccountsService extends AxiosHTTPClient implements IAccountsService {
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    super(baseURL, config);
  }

  getAccounts = async (endpoint: string, config?: AxiosRequestConfig) => {
    const response = await this.instance.get<AccountModel[]>(endpoint, {
      ...config
    });

    return response;
  };
}

export default AccountsService;
