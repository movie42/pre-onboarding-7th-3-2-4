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
import { TBrokersKey } from "lib/utils/changeBrokerCodeToKorean";
import { TAccountStatusValue } from "lib/utils/changeAccountStatusFromNumberToKorean";

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

const useAccountDashboard = (query: ParsedUrlQuery) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [newAccounts, setNewAccounts] = useState<DashboardModel[]>();
  const [totalPage, setTotalPage] = useState<number>();
  const {
    data: accounts,
    isSuccess: isAccountSuccess,
    isLoading: isAccountLoading,
    refetch
  } = useGetAccounts({
    page: Number(query?._page),
    searchString: query?.search ? String(query?.search) : "",
    sort: query?.sort ? String(query?.sort) : "",
    order: query?.order ? String(query?.order) : "asc"
  });

  const userId = accounts?.accounts.map((value) => value.user_id);
  const userIdSet = Array.from(new Set(userId));
  const result = useGetUsers(userIdSet);
  const isUsersSuccess = result.every((value) => value.isSuccess);
  const isUserLoading = result.some((value) => value.isLoading);
  const users = isUsersSuccess && result.map((value) => value.data);

  const changeNewAccount = (
    accounts: AccountModel[],
    users: (UserModel | undefined)[]
  ): DashboardModel[] | undefined =>
    accounts.map((account) => ({
      id: account.id,
      uuid: account.uuid,
      user_id: account.user_id,
      user_name: users.find((user) => user?.id === account.user_id)?.name,
      broker_id: account?.broker_id,
      broker_name: changeBrokerCodeToKorean(account?.broker_id),
      number: account?.number,
      status: account?.status,
      status_kr: changeAccountStatusFromNumberToKorean(account?.status),
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
    const success = [isAccountSuccess, isUsersSuccess];
    if (success.every((value) => value)) {
      setIsSuccess(true);
      return;
    }
    setIsSuccess(false);
  }, [isAccountSuccess, isUsersSuccess]);

  useEffect(() => {
    const loading = [isAccountLoading, isUserLoading];
    if (loading.some((value) => value)) {
      setIsLoading(true);
      return;
    }
    setIsLoading(false);
  }, [isAccountLoading, isUserLoading]);

  useEffect(() => {
    refetch();
  }, [query.sort, query.order, query._page]);

  useEffect(() => {
    if (isUsersSuccess && isAccountSuccess && users) {
      const newAccount = changeNewAccount(accounts.accounts, users);
      setNewAccounts(newAccount);
      setTotalPage(accounts.totalPages);
    }
  }, [isUsersSuccess, isAccountSuccess, query._page, accounts?.accounts]);

  return { newAccounts, totalPage, isSuccess, isLoading };
};

export default useAccountDashboard;
