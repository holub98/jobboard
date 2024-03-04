import { isLoginAuth } from "~/hooks";
import { api } from "./api";
import { useSetAtom } from "jotai";

type LocalizationType = {
  country: string;
  city: string;
  street: string;
  number: string;
  zipCode: string;
};

type RegisterType = {
  email: string;
  password: string;
  name: string;
  localization: LocalizationType;
};

export const registerCompany = (data: RegisterType) => {
  const setLogin = useSetAtom(isLoginAuth);
  api
    .post("/company/register", data)
    .then((res) => {
      setLogin({ ...res.data });
    })
    .catch((err) => console.error(err));
};

export const getCompany = () => api.get("/company/my-company");
