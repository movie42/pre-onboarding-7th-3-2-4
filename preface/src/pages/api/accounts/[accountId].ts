import type { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";

import { SERVER_BASE_URL } from "@/lib/constants";
import { COOKIE_KEY } from "@/lib/constants/constants";
import type { AccountModel } from "@/model/interface";
import AccountsService from "@/service/AccountsService";
import CookieService from "@/service/CookieService";

export default async function accountHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { accountId },
      method
    } = req;

    const { accessToken } = CookieService.getCookies(COOKIE_KEY, {
      req,
      res
    });

    const accountService = new AccountsService(SERVER_BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    switch (method) {
      case "GET": {
        const response = await accountService.getAccountDetail<AccountModel[]>(
          `/accounts?q=${accountId}`
        );
        const [account] = response.data;
        return res.status(200).json({ account });
      }
      case "PUT": {
        break;
      }
      case "DELETE": {
        break;
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
