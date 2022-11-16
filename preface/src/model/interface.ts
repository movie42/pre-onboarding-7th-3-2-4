import { AxiosError } from "axios";
import type { TAccountStatusValue } from "@/lib/utils/changeAccountStatusFromNumberToKorean";
import type { TBrokersKey } from "@/lib/utils/changeBrokerCodeToKorean";

export interface ServerError {
  statusCode: number;
  message: string;
  error: string;
}

export interface ServerResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export interface IToken {
  isLogin: boolean;
  error?: AxiosError<ServerError>;
}

export interface AccountModel {
  id: number;
  user_id: number;
  uuid: string;
  broker_id: TBrokersKey;
  status: TAccountStatusValue;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserModel {
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: number;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  address: string;
  detail_address: string;
  last_login: string;
  created_at: Date;
  updated_at: Date;
}

export interface DashboardModel {
  id?: number;
  uuid: string;
  user_name?: string;
  user_id?: number;
  broker_id?: TBrokersKey;
  broker_name?: string;
  status?: TAccountStatusValue;
  status_kr?: string;
  number?: string;
  name?: string;
  assets?: string;
  payments?: string;
  profit_rate?: string;
  is_profit: boolean | null;
  is_active?: string;
  created_at?: string;
  updated_at?: string;
}
