import { api } from ".";
export type ExperienceType = {
  companyName: string;
  job: string;
  dateFrom: Date;
  dateTo?: Date;
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

export const applyCandidate = (offerId: string, data: CandidateType) =>
  api.post(`/${offerId}/send`, data);
