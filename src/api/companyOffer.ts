import { api } from ".";

type Direction = "Remote" | "PartlyRemote" | "Office";

export type JobOfferType = {
  name: string;
  earnings: {
    from: string;
    to: string;
  };
  workDirection: Direction;
  requirements: string[];
  description: string;
};

export const createOffer = (data: JobOfferType) =>
  api.post("/job-offer/create", data);

export const updateOffer = (data: JobOfferType, offerId: string) => {
  api
    .put(`job-offer/${offerId}`, data)
};

export const deleteOffer = (offerId: string) => {
  api.delete(`job-offer/${offerId}`)
};

export const getMyOffers = () => api.get("/job-offer/my-offer");

export const getMyOfferCount = () => api.get("/job-offer/my-offer-count");

export const getMySingleOffer = (offerId: string)=> api.get(`/job-offer/me/${offerId}`);
