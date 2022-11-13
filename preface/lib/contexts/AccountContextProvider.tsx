import React, { createContext, ReactNode, useContext } from "react";
import { IAccountsService } from "service/interface";
import { CLIENT_BASE_URL } from "lib/constants";
import AccountsService from "service/AccountService";

interface IAccountContextProviderProps {
  children: ReactNode;
}

const AccountsContext = createContext<IAccountsService>(null!);

export const useAccountContext = () => useContext(AccountsContext);

const AccountsContextProvider = ({
  children
}: IAccountContextProviderProps) => {
  const accountService = new AccountsService(CLIENT_BASE_URL);

  return (
    <AccountsContext.Provider value={accountService}>
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsContextProvider;
