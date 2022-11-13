import { Layout } from "components/Layout";

import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "pages/_app";
import AccountsContextProvider from "lib/contexts/AccountContextProvider";
import useGetAccounts from "lib/hooks/useGetAccounts";

const Accounts: NextPageWithLayout = () => {
  const { data: accounts } = useGetAccounts();

  return (
    <div className="bg-white">
      {accounts?.map((value) => (
        <span key={`${value.id} ${value.created_at}`}>{value?.name}</span>
      ))}
    </div>
  );
};

Accounts.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountsContextProvider>
      <Layout>{page}</Layout>
    </AccountsContextProvider>
  );
};

export default Accounts;
