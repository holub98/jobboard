import { enqueueSnackbar } from "notistack";
import { api } from ".";
export type ExperienceType = {
  companyName: string;
  job: string;
  dateFrom: string;
  dateTo?: string;
};

export type EducationType = {
  schoolName: string;
  dateFrom: string;
  dateTo?: string;
  faculty: string;
};
export type LanguagesType = {
  name: string;
  level: string;
};

export type CandidateType = {
  offerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience?: ExperienceType[];
  education: EducationType[];
  languages: LanguagesType[];
  stack: string[];
  another: string;
};
export const getOfferCadidates = (offerId: string) =>
  api.get(`/candidates/${offerId}`);

export const getSingleCandidate = (offerId: string, candidateId: string) =>
  api.get(`/candidates/${offerId}/${candidateId}`);

export const applyCandidate = (offerId: string, data: CandidateType) => {
  try {
    api.post(`/candidates/${offerId}/send`, data);
    enqueueSnackbar({ variant: "success", message: "Application sent" });
  } catch (err) {
    enqueueSnackbar({ variant: "error", message: `${err}` });
  }
};
