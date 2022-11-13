import { TAccountStatusValue } from "lib/utils/changeAccountStatusFromNumberToKorean";
import { TBrokersKey } from "lib/utils/changeBrokerCodeToKorean";

export interface IToken {
  accessToken: string;
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
