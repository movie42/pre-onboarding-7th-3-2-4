import { AxiosError, AxiosResponseHeaders } from "axios";
import { SERVER_BASE_URL } from "lib/constants";
import type { AccountModel } from "model/interface";
import type { NextApiRequest, NextApiResponse } from "next";

import AccountsService from "service/AccountsService";

export default async function accountHandler(
  req: NextApiRequest,
  res: NextApiResponse<{
    accounts: AccountModel[];
    totalPages: number;
  }>
) {
  try {
    const {
      cookies: { accessToken },
      query: { searchString, _page, _limit, _sort, _order }
    } = req;

    const account = new AccountsService(SERVER_BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const response = await account.getAccounts(
      `/accounts?q=${
        searchString ? searchString : ""
      }&_sort=${_sort}&_order=${_order}&_page=${_page}&_limit=${_limit}`
    );

    const responseHeaders = response.headers as AxiosResponseHeaders;

    const accounts = response.data;
    const totalPages = Number(responseHeaders.get("x-total-count")) / 20;

    return res.status(200).json({ accounts, totalPages });
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
