import { AxiosError } from "axios";
import { SERVER_BASE_URL } from "lib/constants";
import type { AccountModel } from "model/interface";
import type { NextApiRequest, NextApiResponse } from "next";

import AccountsService from "service/AccountsService";

export default async function accountHandler(
  req: NextApiRequest,
  res: NextApiResponse<{
    account: AccountModel;
  }>
) {
  try {
    const {
      cookies: { accessToken },
      query: { accountId }
    } = req;

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
