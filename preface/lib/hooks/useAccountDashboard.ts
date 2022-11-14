import {
  changeAccountStatusFromNumberToKorean,
  changeBrokerCodeToKorean,
  convertUTCTimeToCustomString,
  maskingAccountNumber
} from "lib/utils";
import { useEffect, useState } from "react";
import useGetAccounts from "./useGetAccounts";
import useGetUsers from "./useGetUsers";
import type { AccountModel, UserModel } from "model/interface";

export interface DashboardModel {
  id?: number;
  user_id?: string;
  broker_id?: string;
  status?: string;
  number?: string;
  name?: string;
  assets?: string;
  payments?: string;
  is_active?: string;
  created_at?: string;
}

const useAccountDashboard = () => {
  const [newAccounts, setNewAccounts] = useState<DashboardModel[]>();
  const [totalPage, setTotalPage] = useState<number>();
  const { data: accounts, isSuccess: isAccountSuccess } = useGetAccounts({
    page: 0
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
      user_id: users.find((user) => user?.id === account.user_id)?.name,
      broker_id: changeBrokerCodeToKorean(account?.broker_id),
      number: maskingAccountNumber(account?.number),
      status: changeAccountStatusFromNumberToKorean(account?.status),
      name: account?.name,
      assets: Number(account?.assets).toLocaleString("ko-KR"),
      payments: Number(account?.payments).toLocaleString("ko-KR"),
      is_active: account?.is_active ? "활성화" : "비활성화",
      created_at: convertUTCTimeToCustomString(account.created_at)
    }));

  useEffect(() => {
    if (isUsersSuccess && isAccountSuccess && users) {
      const newAccount = changeNewAccount(accounts.accounts, users);
      setNewAccounts(newAccount);
      setTotalPage(accounts.totalPages);
    }
  }, [isUsersSuccess]);

  return { newAccounts, totalPage };
};

export default useAccountDashboard;
