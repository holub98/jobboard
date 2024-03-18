import { api } from "./api";

type LocalizationType = {
  country: string;
  city: string;
  street: string;
  number: string;
  zipCode: string;
};

export type CompanyFullType = {
  email: string;
  password: string;
  name: string;
  localization: LocalizationType;
  description: string;
};

export const registerCompany = async (data: CompanyFullType) => {
  const response = await api.post("/company/register", data);
  return response;
};

export const getMyCompany = () => api.get("/company/my-company");

export const getAllCompanies = () => api.get("/company/");

export const getSingleCompany = (companyId: string) =>
  api.get(`/company/${companyId}`);

export const updateCompany = (data: CompanyFullType) => {
  api.put("/company/update-me", data);
};

export const deleteAccount = () => api.delete("/company/delete-account");
