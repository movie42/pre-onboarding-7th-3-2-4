import styled from "styled-components";
import React, { HTMLAttributes, useState } from "react";
import { useRouter } from "next/router";

interface ISearchPaginationTools {
  className?: HTMLAttributes<HTMLDivElement>["className"];
  pagination: number[];
  handlePagination: (page: number) => () => void;
}

type Ref = HTMLDivElement;

const SearchPaginationTools = React.forwardRef<Ref, ISearchPaginationTools>(
  ({ pagination, handlePagination, className }, ref) => {
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
