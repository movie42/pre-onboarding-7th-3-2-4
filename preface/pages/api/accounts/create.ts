import axios, { AxiosError, AxiosResponseHeaders } from "axios";

import { SERVER_BASE_URL } from "lib/constants";
import { COOKIE_KEY } from "lib/constants/constants";
import type { AccountModel } from "model/interface";
import type { NextApiRequest, NextApiResponse } from "next";

import AccountsService from "service/AccountsService";
import CookieService from "service/CookieService";

export default async function accountHandler(
  req: NextApiRequest,
  res: NextApiResponse<{
    ok: boolean;
  }>
) {
  try {
    console.log(req.body);
    const { accessToken } = CookieService.getCookies(COOKIE_KEY, { req, res });

    const account = new AccountsService(SERVER_BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // const response = await axios.post("/accounts",);

    // const responseHeaders = response.headers as AxiosResponseHeaders;

    // const accounts = response.data;
    // const totalItems = Number(responseHeaders.get("x-total-count"));

    return res.status(200).json({ ok: true });
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
