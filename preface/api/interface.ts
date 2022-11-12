import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface IAxiosHTTPClient {
  get: <TData, TError>(
    endPoint: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TData> | AxiosError<TError> | undefined>;
  post: <TData, TError, TVariable>(
    endPoint: string,
    data: TVariable,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TData> | AxiosError<TError> | undefined>;
}
