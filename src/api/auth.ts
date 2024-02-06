import { api } from "./api";

type LoginType = {
  email: string;
  password: string;
};

export const login = (data: LoginType) =>
  api
    .post("/auth/login", data)
    .then((res) => {
      console.log(res.data), console.log(res.headers);
    })
    .catch((err) => console.error(err));
