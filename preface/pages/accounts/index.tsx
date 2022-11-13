import { Layout } from "components/Layout";

import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "pages/_app";
import AccountsContextProvider from "lib/contexts/AccountContextProvider";
import useGetAccounts from "lib/hooks/useGetAccounts";
import styled from "styled-components";
import {
  changeAccountStatusFromNumberToKorean,
  changeBrokerCodeToKorean,
  convertUTCTimeToCustomString,
  maskingAccountNumber
} from "lib/utils";

const Accounts: NextPageWithLayout = () => {
  const { data: accounts } = useGetAccounts();

  return (
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
      {accounts?.map((value) => (
        <div className="grid" key={`${value.id} ${value.created_at}`}>
          <span>{value?.user_id}</span>
          <span>{changeBrokerCodeToKorean(value?.broker_id)}</span>
          <span>{maskingAccountNumber(value?.number)}</span>
          <span>{changeAccountStatusFromNumberToKorean(value?.status)}</span>
          <span>{value?.name}</span>
          <span>{Number(value?.assets).toLocaleString("ko-KR")}</span>
          <span>{Number(value?.payments).toLocaleString("ko-KR")}</span>
          <span>{value?.is_active ? "활성화" : "비활성화"}</span>
          <span>{convertUTCTimeToCustomString(value.created_at)}</span>
        </div>
      ))}
    </Container>
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
