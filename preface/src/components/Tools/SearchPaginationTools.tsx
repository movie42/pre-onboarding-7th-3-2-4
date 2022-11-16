import { useRouter } from "next/router";
import Link from "next/link";
import React, { HTMLAttributes, useState } from "react";
import styled, { css } from "styled-components";

interface ISearchPaginationTools {
  currentPage: number;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  pagination: number[];
  handlePagination: (page: number) => () => void;
}

type Ref = HTMLDivElement;

const SearchPaginationTools = React.forwardRef<Ref, ISearchPaginationTools>(
  ({ pagination, handlePagination, className, currentPage }, ref) => {
    const { push } = useRouter();
    const [search, setSearch] = useState("");
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!search) return;
      push(`/accounts?search=${search}`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.currentTarget.value);
    };

    return (
      <ToolsContainer className={className} ref={ref}>
        <Form onSubmit={handleSearch}>
          <input
            placeholder="고객명, 계좌명을 입력해주세요."
            onChange={handleChange}
            value={search}
            type="text"
          />
        </Form>
        <LinkContainer>
          <Link href="/accounts/create">새로운 계좌 만들기</Link>
        </LinkContainer>
        <PagiNation>
          {pagination?.map((value, index) => (
            <Page
              key={index}
              isActive={currentPage === value}
              onClick={handlePagination(value)}
            >
              {value}
            </Page>
          ))}
        </PagiNation>
      </ToolsContainer>
    );
  }
);

SearchPaginationTools.displayName = "SearchPaginationTools";

export default SearchPaginationTools;

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
  min-width: 900px;
`;

const Form = styled.form`
  width: 40%;
  input {
    width: 100%;
    font-size: 1.3rem;
    padding: 0.6rem 1.5rem;
    border-radius: 2rem;
  }
`;

const PagiNation = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Page = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  font-size: 1.4rem;
  padding: 1rem;
  color: white;
  background-color: ${(props) => props.theme.colors.primary1};
  border-radius: 0.5rem;
  ${({ isActive, theme }) => {
    if (isActive) {
      return css`
        background-color: ${theme.colors.second1};
      `;
    }
  }}
  &:hover {
    background-color: ${(props) => props.theme.colors.primary3};
  }
`;

const LinkContainer = styled.div`
  box-sizing: border-box;
  a {
    color: white;
    border-radius: 1rem;
    display: inline-block;
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.primary4};
    font-size: 1.2rem;
    &:hover {
      font-weight: bolder;
      color: ${(props) => props.theme.colors.primary4};
      background-color: ${(props) => props.theme.colors.primary5};
    }
  }
`;
