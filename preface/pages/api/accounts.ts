import { AxiosError } from "axios";
import { SERVER_BASE_URL } from "lib/constants";
import type { AccountModel } from "model/interface";
import type { NextApiRequest, NextApiResponse } from "next";
import AccountsService from "service/AccountsService";

export default async function accountHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ accounts: AccountModel[] }>
) {
  try {
    const {
      cookies: { accessToken }
    } = req;

    const account = new AccountsService(SERVER_BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const response = await account.getAccounts("/accounts");

    const accounts = response.data;

    return res.status(200).json({ accounts });
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
