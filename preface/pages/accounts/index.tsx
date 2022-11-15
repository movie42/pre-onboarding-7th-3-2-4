import React, { ReactElement, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

import type { NextPageWithLayout } from "pages/_app";
import AccountsContextProvider from "lib/contexts/AccountContextProvider";
import { Layout } from "components/Layout";
import useAccountDashboard from "lib/hooks/useAccountDashboard";
import { maskingAccountNumber } from "lib/utils";
import useGeneratePagination from "lib/hooks/useGeneratePagination";
import SearchPaginationTools from "components/Tools/SearchPaginationTools";

const Accounts: NextPageWithLayout = () => {
  const toolsContainerRef = useRef<HTMLDivElement>(null);
  const stickyToolsContainer = useRef<HTMLDivElement>(null);

  const { query } = useRouter();
  const { newAccounts, totalPage } = useAccountDashboard(query);
  const { pagination, handlePagination } = useGeneratePagination(
    Number(totalPage)
  );

  useEffect(() => {
    const handleVisiblityToolBox = () => {
      if (toolsContainerRef.current) {
        const value = toolsContainerRef.current?.offsetTop;
        if (window.scrollY >= value) {
          stickyToolsContainer.current?.classList.add("sticky");
        } else {
          stickyToolsContainer.current?.classList.remove("sticky");
        }
      }
    };
    window.addEventListener("scroll", handleVisiblityToolBox);
    return () => window.removeEventListener("scroll", handleVisiblityToolBox);
  }, [toolsContainerRef, stickyToolsContainer]);

  return (
    <AccountDashboardContainer>
      <ToolsContainer
        ref={toolsContainerRef}
        pagination={pagination}
        handlePagination={handlePagination}
      />
      <StickyToolsContainer
        ref={stickyToolsContainer}
        pagination={pagination}
        handlePagination={handlePagination}
      />
      <AccountListContainer>
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
          <AccountItem is_profit={account.is_profit} key={`${account?.number}`}>
            <Link
              href={`/accounts/${account.number}?userId=${account?.user_id}`}
              className="grid"
            >
              <span className="center">{account?.user_name}</span>
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
            </Link>
          </AccountItem>
        ))}
      </AccountListContainer>
    </AccountDashboardContainer>
  );
};

Accounts.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountsContextProvider>
      <Layout pageTitle="계좌목록">{page}</Layout>
    </AccountsContextProvider>
  );
};

export default Accounts;

const AccountDashboardContainer = styled.div`
  min-width: 1280px;
  overflow-x: auto;
`;

const ToolsContainer = styled(SearchPaginationTools)``;

const StickyToolsContainer = styled(SearchPaginationTools)`
  visibility: hidden;
  position: fixed;
  top: 1rem;
  opacity: 0;

  &.sticky {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.4s linear;
    ul {
      li {
        background-color: unset;
        &:hover {
          background-color: ${(props) => props.theme.colors.primary3};
        }
      }
    }
  }
`;

const AccountListContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white1};
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 0.3rem;
    font-size: 1.1rem;
  }
  .grid {
    max-width: 2800px;
    min-width: 1280px;
    display: grid;
    grid-template-columns: repeat(5, 1.2fr) 2fr repeat(3, 1.3fr);
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
        `;
      } else if (is_profit === null) {
        return css`
          color: black;
          background-color: white;
        `;
      }
      return css`
        color: #0000aa;
      `;
    }}
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.gray4};
  }
`;
