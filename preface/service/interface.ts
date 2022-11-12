export interface ILoginService {
  login: (email: string, password: string) => Promise<any>;
}
