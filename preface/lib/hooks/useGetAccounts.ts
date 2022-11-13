import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AccountModel } from "model/interface";

const useGetAccounts = () => {
  return useQuery(
    ["accounts"],
    async () => await axios.get<{ accounts: AccountModel[] }>("/api/accounts"),
    {
      select: ({ data }) => {
        return data.accounts;
      },
      onSuccess: (data) => {
        return data;
      }
    }
  );
};

export default useGetAccounts;
