import axios, { AxiosError, AxiosResponse } from "axios";
import { useQueries, UseQueryOptions } from "@tanstack/react-query";
import type { UserModel } from "model/interface";

const useGetUsers = (ids: number[]) => {
  return useQueries<
    UseQueryOptions<
      AxiosResponse<{ users: UserModel }, any>,
      AxiosError,
      UserModel,
      ["users", number]
    >[]
  >({
    queries: ids.map((id) => ({
      queryKey: ["users", id],
      queryFn: async () =>
        await axios.get<{ users: UserModel }>(`/api/users?id=${id}`),
      select: ({ data: { users } }) => {
        return users;
      }
    }))
  });
};

export default useGetUsers;
