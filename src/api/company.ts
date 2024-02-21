import { api } from "./api";

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

export const registerCompany = (data: RegisterType) =>
  api
    .post("/company/register", data)
    .then((res) => {
      console.log(res.data), console.log(res.headers);
    })
    .catch((err) => console.error(err));

export const getCompany = () => api.get("/company/my-company");
