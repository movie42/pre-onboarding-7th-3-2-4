import React, { ReactElement, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

import type { NextPageWithLayout } from "pages/_app";
import AccountsContextProvider from "lib/contexts/AccountContextProvider";
import { Layout } from "components/Layout";
import useAccountDashboard from "lib/hooks/useAccountDashboard";
import { maskingAccountNumber } from "lib/utils";

const Accounts: NextPageWithLayout = () => {
  const toolsContainerRef = useRef<HTMLDivElement>(null);
  const stickyToolsContainer = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<number[]>([]);
  const { push, query } = useRouter();
  const { newAccounts, totalPage } = useAccountDashboard(query);

  const paginationMap = (totalPage: number, currentPage: number) => {
    const array = Array(totalPage)
      .fill()
      .map((value, index) => index + 1);

    if (currentPage === 1) {
      return [...array.splice(currentPage - 1, 5), totalPage];
    }

    if (totalPage === currentPage) {
      return array.splice(currentPage - 6);
    }

    if (totalPage - currentPage < 5) {
      const value = 5 - (totalPage - currentPage) + 1;
      return array.splice(currentPage - value);
    }

    return [...array.splice(currentPage - 2, 5), totalPage];
  };

  const handlePagination = (page: number) => () => {
    push(`/accounts?_page=${page}&_limit=20`);
    setCurrentPage(page);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    push(`/accounts?search=${search}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  useEffect(() => {
    if (totalPage && currentPage) {
      const pageArray = paginationMap(Number(totalPage), Number(currentPage));
      setPagination(pageArray);
    }
  }, [totalPage, currentPage]);

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
      <ToolsContainer ref={toolsContainerRef}>
        <Form onSubmit={handleSearch}>
          <input onChange={handleChange} value={search} type="text" />
        </Form>
        <PagiNation>
          {pagination?.map((value, index) => (
            <li key={index} onClick={handlePagination(value)}>
              {value}
            </li>
          ))}
        </PagiNation>
      </ToolsContainer>
      <StickyToolsContainer ref={stickyToolsContainer}>
        <Form onSubmit={handleSearch}>
          <input onChange={handleChange} value={search} type="text" />
        </Form>
        <PagiNation>
          {pagination?.map((value, index) => (
            <li key={index} onClick={handlePagination(value)}>
              {value}
            </li>
          ))}
        </PagiNation>
      </StickyToolsContainer>
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

const ToolsContainer = styled.div`
  border-radius: 4rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.primary1};
  height: 5rem;
  margin-bottom: 1rem;
  padding: 1rem;
`;

const StickyToolsContainer = styled.div`
  visibility: hidden;
  position: fixed;
  top: 1rem;
  border-radius: 4rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #07162cce;
  height: 5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  opacity: 0;

  &.sticky {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s linear;
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

const Form = styled.form`
  input {
    font-size: 1.4rem;
    padding: 0.4rem 1.5rem;
    border-radius: 2rem;
  }
`;

const PagiNation = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  li {
    cursor: pointer;
    font-size: 1.4rem;
    padding: 1rem;
    color: white;
    background-color: ${(props) => props.theme.colors.primary1};
    border-radius: 0.5rem;
    &:hover {
      background-color: ${(props) => props.theme.colors.primary3};
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
