import { LoginResType, LoginType, MessageType, MeType } from "@/app/validate";
import { http } from "./http";

const ReqApi = {
  login: async (values: LoginType) =>
    http.post<LoginResType>("/auth/login", values),
  register: async (values: LoginType) =>
    http.post<LoginResType>("/auth/register", values),
  setToken: async (data: unknown) =>
    http.post("/api", { body: data }, { baseUrl: "http://localhost:3000" }),
  getMe: async (token: string) =>
    http.get<MeType>("/account/me", {
      Authorization: `Bearer ${token}`,
    }),
  logoutToNextServer: async (force?: boolean | undefined) =>
    http.post(
      "/api/logout",
      { body: force },
      { baseUrl: "http://localhost:3000" }
    ),
  logoutToServer: async (token: string) =>
    http.post<MessageType>(
      "/auth/logout",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    ),
};

export default ReqApi;
