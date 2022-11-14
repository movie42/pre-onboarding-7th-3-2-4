import { Layout } from "components/Layout";

import React, { ReactElement, useEffect } from "react";
import type { NextPageWithLayout } from "pages/_app";
import AccountsContextProvider from "lib/contexts/AccountContextProvider";

import styled, { css } from "styled-components";

import useAccountDashboard from "lib/hooks/useAccountDashboard";
import { maskingAccountNumber } from "lib/utils";
import { useRouter } from "next/router";

const Accounts: NextPageWithLayout = () => {
  const { push, query } = useRouter();
  const { newAccounts, totalPage } = useAccountDashboard(query);
  const pagination = Array(totalPage && +totalPage).fill((_, i) => i + 1);

  const handlePagination = (index: number) => () => {
    push(`/accounts?_page=${index}&_limit=20`);
  };

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <>
      <div>
        <PagiNation>
          {pagination?.map((_, index) => (
            <li key={index} onClick={handlePagination(index)}>
              {index + 1}
            </li>
          ))}
        </PagiNation>
      </div>
      <Container>
        <div className="grid header">
          <span className="center">고객명</span>
          <span className="center">브로커명</span>
          <span className="center">계좌번호</span>
          <span className="center">계좌상태</span>
          <span className="center">계좌명</span>
          <span className="center">평가금액</span>
          <span className="center">입금금액</span>
          <span className="center">계좌활성화여부</span>
          <span className="center">계좌개설일</span>
        </div>
        {newAccounts?.map((account) => (
          <AccountItem
            className="grid"
            is_profit={account.is_profit}
            key={`${account?.number}`}
          >
            <span className="center">{account?.user_id}</span>
            <span className="center">{account?.broker_id}</span>
            <span className="center">
              {account.number && maskingAccountNumber(account?.number)}
            </span>
            <span className="center">{account?.status}</span>
            <span className="left center ">{account?.name}</span>
            <span className="right profit number">
              {account.is_profit ? "+" : "-"} {account?.assets} 원
            </span>
            <span className="right number">{account?.payments} 원</span>
            <span className="center">{account?.is_active}</span>
            <span className="center">{account.created_at}</span>
          </AccountItem>
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

const PagiNation = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  li {
    cursor: pointer;
    font-size: 1.4rem;
    padding: 1rem;
    color: white;
    background-color: ${(props) => props.theme.colors.primary1};
    &:hover {
      background-color: ${(props) => props.theme.colors.primary3};
    }
  }
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white1};
  min-width: 1280px;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 0.3rem;
    font-size: 1.2rem;
  }
  .grid {
    max-width: 2800px;
    display: grid;
    grid-template-columns: 1.1fr 1.2fr 1fr 1.1fr 1.5fr repeat(4, 1.3fr);
    grid-auto-rows: minmax(4rem, auto);
  }
  .grid.header {
    background-color: #f1f1f1;
    font-weight: bold;
    border-bottom: 1px solid #e9e9e9;
    span {
      &:not(:last-child) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }

  span.center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span.right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  span.left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  span.number {
    letter-spacing: 0.2px;
  }
`;

const AccountItem = styled.div<{ is_profit: boolean | null | undefined }>`
  .profit {
    align-self: center;
    justify-self: end;
    font-weight: 700;
    ${({ is_profit }) => {
      if (is_profit) {
        return css`
          color: #c20000;
          background-color: #ffcdcd;
        `;
      } else if (is_profit === null) {
        return css`
          color: black;
          background-color: white;
        `;
      }
      return css`
        color: #0000aa;
        background-color: #ccccff;
      `;
    }}
  }
`;
