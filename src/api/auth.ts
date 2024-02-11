import { api } from "./api";

type LoginType = {
  email: string;
  password: string;
};

export const login = (data: LoginType) => {
  api.post("/auth/login", data);
};

export const logout = () => {
  api.post("/auth/logout");
};

export const validate = () => {
  api.get("/auth/validate-token");
};
