import { useQuery } from "react-query";
import { api } from "../api/axios";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
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
    const { id, name, email, createdAt } = user;
    return {
      id,
      name,
      email,
      createdAt: new Date(createdAt).toLocaleDateString("pt-BR", {
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
