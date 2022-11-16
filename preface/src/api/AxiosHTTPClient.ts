import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

abstract class AxiosHTTPClient {
  protected readonly instance: AxiosInstance;
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.instance = axios.create({ baseURL, ...config });
  }
}
export default AxiosHTTPClient;
