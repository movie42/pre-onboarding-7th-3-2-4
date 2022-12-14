import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AccountModel } from "model/interface";

interface IUseGetAccounts {
  page?: number;
  limit?: number;
  sort?: string;
  searchString?: string;
  order?: string;
}

const useGetAccounts = ({
  page,
  limit = 20,
  sort,
  order,
  searchString
}: IUseGetAccounts) => {
  return useQuery(
    ["accounts", searchString, sort, order, page],
    async () =>
      await axios.get<{ accounts: AccountModel[]; totalItems: number }>(
        `/api/accounts?searchString=${searchString}&_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`
      ),
    {
      select: ({ data }) => {
        const totalItems = Math.ceil(data.totalItems);
        return { accounts: data.accounts, totalItems };
      }
    }
  );
};

export default useGetAccounts;
