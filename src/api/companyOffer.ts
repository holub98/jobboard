import { enqueueSnackbar } from "notistack";
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

export const createOffer = (data: JobOfferType) => {
  try {
    api.post("/job-offer/create", data);

    enqueueSnackbar({ variant: "success", message: "Offer created" });
  } catch (err) {
    enqueueSnackbar({ variant: "error", message: `${err}` });
  }
};

export const updateOffer = (data: JobOfferType, offerId: string) => {
  try {
    api.put(`job-offer/${offerId}`, data);

    enqueueSnackbar({ variant: "success", message: "Offer updated" });
  } catch (err) {
    enqueueSnackbar({ variant: "error", message: `${err}` });
  }
};

export const deleteOffer = (offerId: string) => {
  try {
    api.delete(`job-offer/${offerId}`);

    enqueueSnackbar({ variant: "success", message: "Offer deleted" });
  } catch (err) {
    enqueueSnackbar({ variant: "error", message: `${err}` });
  }
};

export const getMyOffers = async () => await api.get("/job-offer/my-offer");

export const getMyOfferCount = () => api.get("/job-offer/my-offer-count");

export const getMySingleOffer = (offerId: string) =>
  api.get(`/job-offer/me/${offerId}`);
