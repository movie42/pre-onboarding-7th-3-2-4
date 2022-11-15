import axios, { AxiosResponse } from "axios";
import { useQueries } from "@tanstack/react-query";
import { useRouter } from "next/router";

import type { UserModel, AccountModel } from "model/interface";
import {
  changeAccountStatusFromNumberToKorean,
  changeBrokerCodeToKorean,
  convertUTCTimeToCustomString
} from "lib/utils";
import { useEffect, useState } from "react";
import generateAccountWithHypen from "lib/utils/generateAccountNumberWithHyphen";

export interface DashboardModel {
  id?: number;
  user_name?: string;
  user_id?: number;
  broker_id?: string;
  status?: string;
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

const useGetAccountDetail = () => {
  const [newAccountDetail, setAccountDetail] = useState<DashboardModel>();
  const {
    query: { accountId, userId }
  } = useRouter();

  type AccountData = AxiosResponse<{ account: AccountModel }>;
  type UserData = AxiosResponse<{ users: UserModel }>;

  const result = useQueries({
    queries: [
      {
        queryKey: ["AccountDetail", accountId],
        queryFn: async () =>
          await axios.get<{ account: AccountModel }>(
            `/api/accounts/${accountId}`
          ),
        select: ({ data: { account } }: AccountData) => {
          return account;
        }
      },
      {
        queryKey: ["user", userId],
        queryFn: async () =>
          await axios.get<{ users: UserModel }>(`/api/users?id=${userId}`),
        select: ({ data: { users } }: UserData) => {
          return users;
        }
      }
    ]
  });

  const isLoading = result.some((value) => value.isLoading);
  const isSuccess = result.every((value) => value.isSuccess);

  const changeNewAccount = (
    account?: AccountModel,
    user?: UserModel
  ): DashboardModel => ({
    id: account?.id,
    user_id: user?.id,
    user_name: user?.name,
    broker_id:
      account?.broker_id && changeBrokerCodeToKorean(account?.broker_id),
    number:
      account?.broker_id &&
      generateAccountWithHypen(account?.broker_id, account?.number),
    status:
      account?.status && changeAccountStatusFromNumberToKorean(account?.status),
    name: account?.name,
    assets: Number(account?.assets).toLocaleString("ko-KR", {
      maximumFractionDigits: 0
    }),
    payments: Number(account?.payments).toLocaleString("ko-KR", {
      maximumFractionDigits: 0
    }),
    profit_rate: (
      (Number(account?.assets) / Number(account?.payments)) *
      100
    ).toFixed(2),
    is_profit:
      Number(account?.assets) - Number(account?.payments) > 0
        ? true
        : Number(account?.assets) - Number(account?.payments) === 0
        ? null
        : false,
    is_active: account?.is_active ? "활성화" : "비활성화",
    created_at:
      account?.created_at && convertUTCTimeToCustomString(account?.created_at),
    updated_at:
      account?.updated_at && convertUTCTimeToCustomString(account?.updated_at)
  });

  useEffect(() => {
    if (isSuccess) {
      const [account, user] = result;
      const accountData = account.data;
      const userData = user.data;

      const newData = changeNewAccount(accountData, userData);
      setAccountDetail(newData);
    }
  }, [isSuccess]);

  return { isLoading, isSuccess, newAccountDetail };
};

export default useGetAccountDetail;
