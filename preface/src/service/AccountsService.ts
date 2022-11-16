import { AxiosHTTPClient } from "@/api";
import { AxiosRequestConfig } from "axios";

import type { IAccountsService } from "./interface";

class AccountsService extends AxiosHTTPClient implements IAccountsService {
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    super(baseURL, config);
  }

  getAccounts = async <TData>(
    endpoint: string,
    config?: AxiosRequestConfig
  ) => {
    const response = await this.instance.get<TData>(endpoint, {
      ...config
    });

    return response;
  };

  getAccountDetail = async <TData>(
    endpoint: string,
    config?: AxiosRequestConfig
  ) => {
    const response = await this.instance.get<TData>(endpoint, { ...config });
    return response;
  };

  createAccount = async <TData, TVariable>(
    endpoint: string,
    data: TVariable,
    config?: AxiosRequestConfig
  ) => {
    const response = await this.instance.post<TData>(
      endpoint,
      { ...data },
      { ...config }
    );
    return response;
  };
}

export default AccountsService;
