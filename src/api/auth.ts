import { api } from "./api";

type LoginType = {
  email: string;
  password: string;
};

export const login = async (data: LoginType) => {
  const response = await api.post("/auth/login", data);
  return response;
};

export const logout = () => {
  api.post("/auth/logout");
};

export const validate = () => {
  api.get("/auth/validate-token");
};
