import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { AuthTokenError } from "../../errors/AuthTokenError";
import { signOut } from "../../utils/signOut";

let isRefreshing = false;
let failedRequestsQueue = [];

export const setAuthClient = (ctx = undefined) => {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3000/api",
  });

  const authApi = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["dashgo.token"]}`,
    },
  });

  authApi.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === "token.expired") {
          cookies = parseCookies(ctx);

          const { "dashgo.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;
            authApi
              .post("/refresh", {
                refreshToken,
              })
              .then((response) => {
                const { token } = response.data;

                setCookie(ctx, "dashgo.token", token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/",
                });

                setCookie(
                  ctx,
                  "dashgo.refreshToken",
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: "/",
                  }
                );

                failedRequestsQueue.forEach((request) =>
                  request.resolve(token)
                );
                failedRequestsQueue = [];

                authApi.defaults.headers["Authorization"] = `Bearer ${token}`;
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.reject(err));
                failedRequestsQueue = [];

                if (typeof window !== "undefined") {
                  signOut();
                } else {
                  return Promise.reject(new AuthTokenError());
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              resolve: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                resolve(authApi(originalConfig));
              },
              reject: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          signOut();
        }
      }

      return Promise.reject(error);
    }
  );
  return { api, authApi };
};
