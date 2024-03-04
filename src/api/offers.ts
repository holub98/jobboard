import { api } from "./api";

type FilterType = {
  name?: string;
  requirements?: string;
  workDirection?: string;
  localization?: string;
};

export const getSingleOffer = (offerId: string) =>
  api.get(`/job-offer/${offerId}`);

export const getAllOffers = (data: FilterType) =>
  api.get(`/job-offer/`, { params: data });

export const getRecomeneded = () => api.get("/job-offer/recomended");
