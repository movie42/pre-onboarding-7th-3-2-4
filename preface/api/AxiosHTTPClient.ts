import axios, { AxiosRequestConfig } from "axios";

class AxiosInstance {
  private baseURL;
  private config;
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.baseURL = baseURL;
    this.config = config;
  }
  instance() {
    return axios.create({ baseURL: this.baseURL, ...this.config });
  }
}
export default AxiosInstance;
