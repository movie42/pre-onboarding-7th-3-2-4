import { AxiosHTTPClient } from "@/api";
import { AxiosRequestConfig } from "axios";

import type { IAccountsService } from "./interface";

class AccountsService extends AxiosHTTPClient implements IAccountsService {
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    super(baseURL, config);
  }

  getAccounts = async <TData>(
    query: string | string[],
    config?: AxiosRequestConfig
  ) => {
    const response = await this.instance.get<TData>(`/accounts${query}`, {
      ...config
    });

    return response;
  };

  getAccountDetail = async <TData>(
    query: string | string[],
    config?: AxiosRequestConfig
  ) => {
    const response = await this.instance.get<TData>(`/accounts?q=${query}`, {
      ...config
    });
    return response;
  };

  createAccount = async <TData, TVariable>(
    data: TVariable,
    config?: AxiosRequestConfig
  ) => {
    const response = await this.instance.post<TData>(
      "/accounts",
      { ...data },
      { ...config }
    );
    return response;
  };

  updateAccount = async <TData, TVariable extends { id: number }>(
    data: TVariable,
    config?: AxiosRequestConfig
  ) => {
    const response = await this.instance.put<TData>(
      `/accounts/${data.id}`,
      { ...data },
      { ...config }
    );

    return response;
  };
}

export default AccountsService;
