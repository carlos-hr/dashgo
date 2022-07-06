import { useQuery } from "react-query";
import { api } from "../api/apiClient";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

type GetUserResponse = {
  totalCount: number;
  users: User[];
};

export const getUsers = async (page: number): Promise<GetUserResponse> => {
  const { data, headers } = await api.get("/users", {
    params: { page },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user: User) => {
    const { id, name, email, created_at } = user;
    return {
      id,
      name,
      email,
      created_at: new Date(created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return { users, totalCount };
};

export const useUsers = (page: number) => {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 5,
  });
};
