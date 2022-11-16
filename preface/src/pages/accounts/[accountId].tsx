import React, { ReactElement, useState } from "react";

import { Layout } from "@/components";
import AccountsContextProvider from "@/lib/contexts/AccountContextProvider";
import useGetAccountDetail from "@/lib/hooks/useGetAccountDetail";
import { Update, Detail } from "@/components/Accounts";

const AccountDetail = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { isLoading, newAccountDetail } = useGetAccountDetail();

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  return isEdit
    ? newAccountDetail && (
        <Update newAccountDetail={newAccountDetail} setIsEdit={setIsEdit} />
      )
    : newAccountDetail && (
        <Detail newAccountDetail={newAccountDetail} setIsEdit={setIsEdit} />
      );
};

export default AccountDetail;

AccountDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountsContextProvider>
      <Layout pageTitle="계좌상세">{page}</Layout>
    </AccountsContextProvider>
  );
};
