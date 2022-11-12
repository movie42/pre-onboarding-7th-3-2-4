import AxiosInstance from "api/AxiosHTTPClient";
import { AxiosError } from "axios";
import { BASE_URL } from "lib/constants";
import { IUser } from "model/interface";
import type { NextApiRequest, NextApiResponse } from "next";
import AuthService from "service/AuthService";

const axios = new AxiosInstance(BASE_URL);
const authService = new AuthService(axios.instance());

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<IUser>
) {
  try {
    const {
      body: { email, password }
    } = req;

    const response = await authService.login("/login", { email, password });

    const { accessToken } = response.data;

    return res.status(200).json({ accessToken });
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
