import { Layout } from "components/Layout";

import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "pages/_app";
import AccountsContextProvider from "lib/contexts/AccountContextProvider";

import styled from "styled-components";

import useAccountDashboard from "lib/hooks/useAccountDashboard";

const Accounts: NextPageWithLayout = () => {
  const { newAccounts, totalPage } = useAccountDashboard();

  return (
    <>
      <div>{totalPage}</div>
      <Container>
        <div className="grid">
          <span>고객명</span>
          <span>브로커명</span>
          <span>계좌번호</span>
          <span>계좌상태</span>
          <span>계좌명</span>
          <span>평가금액</span>
          <span>입금금액</span>
          <span>계좌활성화여부</span>
          <span>계좌개설일</span>
        </div>
        {newAccounts?.map((account) => (
          <div className="grid" key={`${account.id} ${account.created_at}`}>
            <span>{account?.user_id}</span>
            <span>{account?.broker_id}</span>
            <span>{account?.number}</span>
            <span>{account?.status}</span>
            <span>{account?.name}</span>
            <span>{account?.assets}</span>
            <span>{account?.payments}</span>
            <span>{account?.is_active}</span>
            <span>{account.created_at}</span>
          </div>
        ))}
      </Container>
    </>
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

const Container = styled.div`
  min-width: 1280px;
  .grid {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(3rem, auto);
  }
  background-color: ${(props) => props.theme.colors.white1};
  padding: 1rem;

  span {
    display: inline-block;
    place-self: center;
  }
`;
