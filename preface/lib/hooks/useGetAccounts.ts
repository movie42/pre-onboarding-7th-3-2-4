import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AccountModel } from "model/interface";

interface IUseGetAccounts {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "desc" | "asc";
}

const useGetAccounts = ({ page, limit = 20, sort, order }: IUseGetAccounts) => {
  return useQuery(
    ["accounts"],
    async () =>
      await axios.get<{ accounts: AccountModel[]; totalPages: number }>(
        `/api/accounts?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`
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
