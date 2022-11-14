import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AccountModel } from "model/interface";

interface IUseGetAccounts {
  page?: number;
  limit?: number;
  sort?: string;
  searchString?: string;
  order?: "desc" | "asc";
}

const useGetAccounts = ({
  page,
  limit = 20,
  sort,
  order,
  searchString = ""
}: IUseGetAccounts) => {
  return useQuery(
    ["accounts"],
    async () =>
      await axios.get<{ accounts: AccountModel[]; totalPages: number }>(
        `/api/accounts?q=${searchString}&_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`
      ),
    {
      select: ({ data }) => {
        const totalPages = Math.ceil(data.totalPages);
        return { accounts: data.accounts, totalPages };
      }
    }
  );
};

export default useGetAccounts;
