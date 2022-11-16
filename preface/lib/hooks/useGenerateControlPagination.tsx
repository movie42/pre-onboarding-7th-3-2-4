import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

const useGenerateControlPagination = (totalPage: number) => {
  console.log(totalPage);
  const { query, push } = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<number[]>([]);

  const paginationMap = (totalPage: number, currentPage: number) => {
    const array = Array(totalPage)
      .fill(undefined)
      .map((value, index) => index + 1);

    if (currentPage === 1) {
      return [...array.splice(currentPage - 1, 5), totalPage];
    }

    if (totalPage === currentPage) {
      return [1, ...array.splice(currentPage - 6)];
    }

    if (totalPage - currentPage < 5) {
      const value = 5 - (totalPage - currentPage) + 1;
      return [1, ...array.splice(currentPage - value)];
    }

    return [...array.splice(currentPage - 2, 5), totalPage];
  };

  const handlePagination = (page: number) => () => {
    const makeQuery = (query: ParsedUrlQuery) => {
      if (query && Object.keys(query).length !== 0) {
        const queryList: string[] = [];
        for (const key in query) {
          if (key === "_page") {
            queryList.push(`${key}=${page}`);
            break;
          }
          queryList.push(`${key}=${query[key]}`);
        }

        return queryList.join("&");
      }
      return `_page=${page}`;
    };

    const queryString = makeQuery(query);

    push(`/accounts?${queryString}`);
    setCurrentPage(page);
  };

  useEffect(() => {
    if (totalPage && currentPage) {
      const pageArray = paginationMap(Number(totalPage), Number(currentPage));
      setPagination(pageArray);
    }
  }, [totalPage, currentPage]);

  return {
    currentPage,
    setCurrentPage,
    pagination,
    setPagination,
    paginationMap,
    handlePagination
  };
};

export default useGenerateControlPagination;
