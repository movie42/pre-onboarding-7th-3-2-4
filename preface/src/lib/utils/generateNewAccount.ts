import { faker } from "@faker-js/faker";
import type { TBrokersKey } from "@/lib/utils/changeBrokerCodeToKorean";
import type { TAccountStatusValue } from "@/lib/utils/changeAccountStatusFromNumberToKorean";

export interface IGenerateNewAccount {
  status: TAccountStatusValue;
  user_id: number;
  broker_id: TBrokersKey;
  name: string;
  payments: string;
  is_active: boolean;
}
export const generateNewAccount = ({
  status,
  user_id,
  broker_id,
  name,
  payments,
  is_active
}: IGenerateNewAccount) => {
  const account = {
    user_id,
    uuid: faker.datatype.uuid(),
    broker_id,
    status,
    number: faker.finance.account(12),
    name,
    assets: payments,
    payments,
    is_active,
    created_at: new Date(),
    updated_at: new Date()
  };
  return account;
};
