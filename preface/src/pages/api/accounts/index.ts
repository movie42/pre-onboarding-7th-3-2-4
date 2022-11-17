import type { NextApiRequest, NextApiResponse } from "next";
import { AxiosError, AxiosResponseHeaders } from "axios";

import AccountsService from "@/service/AccountsService";
import CookieService from "@/service/CookieService";
import type { AccountModel } from "@/model/interface";
import { SERVER_BASE_URL, COOKIE_KEY } from "@/lib/constants";

export default async function accountHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      body,
      query: { searchString, _page, _limit, _sort, _order },
      method
    } = req;

    const { accessToken } = CookieService.getCookies(COOKIE_KEY, { req, res });
    const account = new AccountsService(SERVER_BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    switch (method) {
      case "GET": {
        const response = await account.getAccounts<AccountModel[]>(
          `?q=${searchString}&_sort=${_sort}&_order=${_order}&_page=${_page}&_limit=${_limit}`
        );
        const responseHeaders = response.headers as AxiosResponseHeaders;
        const accounts = response.data;
        const totalItems = Number(responseHeaders.get("x-total-count"));
        return res.status(200).json({ accounts, totalItems });
      }
      case "POST": {
        const response = await account.createAccount<
          AccountModel,
          AccountModel
        >(body);
        const responseHeaders = response.headers as AxiosResponseHeaders;
        const accounts = response.data;
        const totalItems = Number(responseHeaders.get("x-total-count"));
        return res.status(200).json({ accounts, totalItems });
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
