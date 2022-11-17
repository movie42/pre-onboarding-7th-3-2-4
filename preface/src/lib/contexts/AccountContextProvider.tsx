import React, { createContext, ReactNode, useContext } from "react";

import { CLIENT_BASE_URL } from "@/lib/constants";
import AccountsService from "@/service/AccountsService";
import type { IAccountsService } from "@/service/interface";

interface IAccountContextProviderProps {
  children: ReactNode;
}

const AccountsContext = createContext<IAccountsService>(null!);

export const useAccountContext = () => useContext(AccountsContext);

const AccountsContextProvider = ({
  children
}: IAccountContextProviderProps) => {
  const accountsService = new AccountsService(CLIENT_BASE_URL);

  return (
    <AccountsContext.Provider value={accountsService}>
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsContextProvider;
