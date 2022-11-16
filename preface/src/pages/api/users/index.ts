import { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import UserService from "@/service/UserService";
import CookieService from "@/service/CookieService";
import { SERVER_BASE_URL } from "@/lib/constants";
import { COOKIE_KEY } from "@/lib/constants/constants";
import type { UserModel } from "@/model/interface";

export default async function usersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { id },
      method
    } = req;

    const { accessToken } = CookieService.getCookies(COOKIE_KEY, { req, res });
    const userService = new UserService(SERVER_BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    switch (method) {
      case "GET": {
        const response = await userService.searchUser<UserModel[]>(id);
        const [users] = response.data;
        return res.status(200).json({ users });
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
