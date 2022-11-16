import { AccountModel, DashboardModel, UserModel } from "@/model/interface";

import changeAccountStatusFromNumberToKorean from "./changeAccountStatusFromNumberToKorean";
import changeBrokerCodeToKorean from "./changeBrokerCodeToKorean";
import convertUTCTimeToCustomString from "./convertUTCTimeToCustomString";

export const changeNewAccountDataForDashBoard = (
  accounts: AccountModel[],
  users: UserModel[]
): DashboardModel[] =>
  accounts.map((account) => ({
    id: account.id,
    uuid: account.uuid,
    user_id: account.user_id,
    user_name: users.find((user) => user.id === account.user_id).name,
    broker_id: account.broker_id,
    broker_name: changeBrokerCodeToKorean(account.broker_id),
    number: account.number,
    status: account.status,
    status_kr: changeAccountStatusFromNumberToKorean(account.status),
    name: account.name,
    assets: Number(account.assets).toLocaleString("ko-KR", {
      maximumFractionDigits: 0
    }),
    payments: Number(account.payments).toLocaleString("ko-KR", {
      maximumFractionDigits: 0
    }),
    profit_rate: (
      (Number(account.assets) / Number(account.payments)) *
      100
    ).toFixed(2),
    is_profit:
      Number(account.assets) - Number(account.payments) > 0
        ? true
        : Number(account.assets) - Number(account.payments) === 0
        ? null
        : false,
    is_active: account.is_active,
    is_active_kr: account.is_active ? "활성화" : "비활성화",
    created_at: convertUTCTimeToCustomString(account.created_at),
    updated_at: convertUTCTimeToCustomString(account.updated_at)
  }));
