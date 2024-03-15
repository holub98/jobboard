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
    .then((res) => console.log(res.data))
    .catch((error) => console.error(error));
};

export const deleteOffer = (offerId: string) => {
  api.delete(`job-offer/${offerId}`).catch((error) => console.error(error));
};

export const getMyOffers = () => api.get("/job-offer/my-offer");

export const getMyOfferCount = () => api.get("/job-offer/my-offer-count");
