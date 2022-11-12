import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "lib/constants";
import type { IAxiosHTTPClient } from "./interface";

class AxiosHTTPClient implements IAxiosHTTPClient {
  private instance;
  constructor() {
    this.instance = axios.create({ baseURL: BASE_URL });
  }

  get = async <TData, TError>(
    endPoint: string,
    config?: AxiosRequestConfig
  ) => {
    try {
      const response = await this.instance.get<TData>(endPoint, { ...config });
      return response;
    } catch (error) {
      if (error instanceof AxiosError<TError>) {
        return error;
      }
    }
  };

  post = async <TData, TError, TVariable>(
    endPoint: string,
    data: TVariable,
    config?: AxiosRequestConfig
  ) => {
    try {
      const response = await this.instance.post<TData>(
        endPoint,
        { ...data },
        { ...config }
      );
      return response;
    } catch (error) {
      if (error instanceof AxiosError<TError>) {
        return error;
      }
    }
  };
}

export default AxiosHTTPClient;
