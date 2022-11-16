import { AxiosError } from "axios";
import { SERVER_BASE_URL } from "lib/constants";
import { COOKIE_KEY } from "lib/constants/constants";
import type { AccountModel } from "model/interface";
import type { NextApiRequest, NextApiResponse } from "next";

import AccountsService from "service/AccountsService";
import CookieService from "service/CookieService";

export default async function accountHandler(
  req: NextApiRequest,
  res: NextApiResponse<{
    account: AccountModel;
  }>
) {
  try {
    const {
      query: { accountId }
    } = req;

    const { accessToken } = CookieService.getCookies(COOKIE_KEY, { req, res });

    const accountService = new AccountsService(SERVER_BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const response = await accountService.getAccountDetail(accountId);

    const [account] = response.data;

    return res.status(200).json({ account });
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
