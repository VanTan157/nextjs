import { LoginResType, LoginType } from "@/app/validate";
import { http } from "./http";

const ReqApi = {
  login: async (values: LoginType) =>
    http.post<LoginResType>("/auth/login", values),
  register: async (values: LoginType) =>
    http.post<LoginResType>("/auth/register", values),
  setToken: async (data: unknown) =>
    http.post("/api", { body: data }, { baseUrl: "http://localhost:3000" }),
};

export default ReqApi;
