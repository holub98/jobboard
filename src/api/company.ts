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

export const registerCompany = async (data: RegisterType) => {
  const response = await api.post("/company/register", data);
  return response;
};

export const getCompany = () => api.get("/company/my-company");

export const getAllCompanies = () => api.get("/company/");

export const getSingleCompany = (companyId: string) =>
  api.get(`/company/${companyId}`);
