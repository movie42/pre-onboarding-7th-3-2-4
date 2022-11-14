import { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import type { UserModel } from "model/interface";

import UserService from "service/UserService";
import { SERVER_BASE_URL } from "lib/constants";

export default async function usersHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ users: UserModel }>
) {
  try {
    const {
      cookies: { accessToken },
      query: { id }
    } = req;

    const userService = new UserService(SERVER_BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const response = await userService.searchUser(id);

    const [users] = response.data;

    return res.status(200).json({ users });
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
