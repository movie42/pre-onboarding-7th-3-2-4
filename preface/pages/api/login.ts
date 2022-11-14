import { AxiosError } from "axios";
import { SERVER_BASE_URL } from "lib/constants";
import { IToken } from "model/interface";
import type { NextApiRequest, NextApiResponse } from "next";
import AuthService from "service/AuthService";

const authService = new AuthService(SERVER_BASE_URL);

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<IToken>
) {
  try {
    const {
      body: { email, password }
    } = req;

    const response = await authService.login("/login", { email, password });

    const { accessToken } = response.data;

    res.setHeader(
      "Set-Cookie",
      `accessToken=${accessToken}; path=/;  Max-Age=360000; Secure; HttpOnly;`
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
