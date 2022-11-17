import { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { SERVER_BASE_URL } from "@/lib/constants";
import { COOKIE_KEY } from "@/lib/constants/constants";
import { IToken, ServerResponse } from "@/model/interface";
import AuthService from "@/service/AuthService";
import CookieService from "@/service/CookieService";

const authService = new AuthService(SERVER_BASE_URL);

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<IToken>
) {
  try {
    const {
      body: { email, password }
    } = req;

    const response = await authService.login<ServerResponse>({
      email,
      password
    });

    const { accessToken, user } = response.data;

    const cookieObj = { accessToken, user };

    CookieService.setCookie(COOKIE_KEY, JSON.stringify(cookieObj), {
      req,
      res,
      maxAge: 3600
    });

    return res.status(200).json({ isLogin: true });
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(400).json({ isLogin: false, error });
    }
  }
}
