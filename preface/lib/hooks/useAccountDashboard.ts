import {
  changeAccountStatusFromNumberToKorean,
  changeBrokerCodeToKorean,
  convertUTCTimeToCustomString
} from "lib/utils";
import { useEffect, useState } from "react";
import useGetAccounts from "./useGetAccounts";
import useGetUsers from "./useGetUsers";
import type { AccountModel, UserModel } from "model/interface";

import { ParsedUrlQuery } from "querystring";

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

const useAccountDashboard = (query: ParsedUrlQuery) => {
  const [newAccounts, setNewAccounts] = useState<DashboardModel[]>();
  const [totalPage, setTotalPage] = useState<number>();
  const {
    data: accounts,
    isSuccess: isAccountSuccess,
    refetch
  } = useGetAccounts({
    page: Number(query?._page)
  });

  const userId = accounts?.accounts.map((value) => value.user_id);
  const userIdSet = Array.from(new Set(userId));
  const result = useGetUsers(userIdSet);
  const isUsersSuccess = result.every((value) => value.isSuccess);
  const users = isUsersSuccess && result.map((value) => value.data);

  const changeNewAccount = (
    accounts: AccountModel[],
    users: (UserModel | undefined)[]
  ): DashboardModel[] | undefined =>
    accounts.map((account) => ({
      id: account.id,
      user_id: account.user_id,
      user_name: users.find((user) => user?.id === account.user_id)?.name,
      broker_id: changeBrokerCodeToKorean(account?.broker_id),
      number: account?.number,
      status: changeAccountStatusFromNumberToKorean(account?.status),
      name: account?.name,
      assets: Number(account?.assets).toLocaleString("ko-KR", {
        maximumFractionDigits: 0
      }),
      payments: Number(account?.payments).toLocaleString("ko-KR", {
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
      is_active: account?.is_active ? "활성화" : "비활성화",
      created_at: convertUTCTimeToCustomString(account.created_at),
      updated_at: convertUTCTimeToCustomString(account.updated_at)
    }));

  useEffect(() => {
    if (query._page) {
      refetch();
    }
  }, [query._page]);

  useEffect(() => {
    if (isUsersSuccess && isAccountSuccess && users) {
      const newAccount = changeNewAccount(accounts.accounts, users);
      setNewAccounts(newAccount);
      setTotalPage(accounts.totalPages);
    }
  }, [isUsersSuccess, isAccountSuccess, query._page]);

  return { newAccounts, totalPage };
};

export default useAccountDashboard;
