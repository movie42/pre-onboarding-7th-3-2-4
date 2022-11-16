import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useQueries } from "@tanstack/react-query";

import type {
  UserModel,
  AccountModel,
  DashboardModel
} from "@/model/interface";

import { changeNewAccountDataForDashBoard } from "../utils/changeNewAccountDataForDashBoard";

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
          return [account];
        }
      },
      {
        queryKey: ["user", userId],
        queryFn: async () =>
          await axios.get<{ users: UserModel }>(`/api/users?id=${userId}`),
        select: ({ data: { users } }: UserData) => {
          return [users];
        }
      }
    ]
  });

  const isLoading = result.some((value) => value.isLoading);
  const isSuccess = result.every((value) => value.isSuccess);

  useEffect(() => {
    const [account, user] = result;
    if (isSuccess) {
      const accountData = account.data;
      const userData = user.data;
      if (accountData && userData) {
        const [newData] = changeNewAccountDataForDashBoard(
          accountData,
          userData
        );

        setAccountDetail(newData);
      }
    }
  }, [isSuccess]);

  return { isLoading, isSuccess, newAccountDetail };
};

export default useGetAccountDetail;
