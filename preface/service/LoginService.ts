import { IAxiosHTTPClient } from "api";
import type { ILoginService } from "./interface";

class LoginService implements ILoginService {
  private httpClient;
  constructor(httpClient: IAxiosHTTPClient) {
    this.httpClient = httpClient;
  }

  login = async (email: string, password: string) => {
    const response = await this.httpClient.post("/login", { email, password });
    return response;
  };
}

export default LoginService;
