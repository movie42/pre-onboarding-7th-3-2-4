import { useRouter } from "next/router";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AccountModel } from "@/model/interface";
import AccountsService from "@/service/AccountsService";
import { CLIENT_BASE_URL } from "../constants";

const accountsService = new AccountsService(CLIENT_BASE_URL);

const useCreateNewAccount = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation<AxiosResponse, AxiosError, Omit<AccountModel, "id">>(
    async (account) => await accountsService.createAccount(account),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["accounts"]);
        push("/accounts");
      }
    }
  );
};

export default useCreateNewAccount;
