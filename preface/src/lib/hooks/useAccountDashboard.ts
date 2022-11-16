import { useEffect, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { useSetRecoilState } from "recoil";

import useGetAccounts from "./useGetAccounts";
import useGetUsers from "./useGetUsers";
import { totalItemsAtom } from "@/lib/atoms/totalItems";
import { changeNewAccountDataForDashBoard } from "../utils/changeNewAccountDataForDashBoard";
import { DashboardModel } from "@/model/interface";

const useAccountDashboard = (query: ParsedUrlQuery) => {
  const setTotalItems = useSetRecoilState(totalItemsAtom);
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
      const newAccount = changeNewAccountDataForDashBoard(
        accounts.accounts,
        users
      );
      setNewAccounts(newAccount);

      setTotalItems(Number(accounts.totalItems));
      const totalPage = Math.ceil(Number(accounts.totalItems) / 20);
      setTotalPage(totalPage);
    }
  }, [isUsersSuccess, isAccountSuccess, query._page, accounts?.accounts]);

  return { newAccounts, totalPage, isSuccess, isLoading };
};

export default useAccountDashboard;
