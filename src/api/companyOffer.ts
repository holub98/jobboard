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

export const createOffer = (data: JobOfferType, token: string) => {
  try {
    api.post("/job-offer/create", data, {headers: { Authorization : `Bearer ${token}` }});

    enqueueSnackbar({ variant: "success", message: "Offer created" });
  } catch (err) {
    enqueueSnackbar({ variant: "error", message: `${err}` });
  }
};

export const updateOffer = (data: JobOfferType, offerId: string, token: string) => {
  try {
    api.put(`job-offer/${offerId}`, data,{headers: { Authorization : `Bearer ${token}` }});

    enqueueSnackbar({ variant: "success", message: "Offer updated" });
  } catch (err) {
    enqueueSnackbar({ variant: "error", message: `${err}` });
  }
};

export const deleteOffer = (offerId: string, token: string) => {
  try {
    api.delete(`job-offer/${offerId}`, {headers: { Authorization : `Bearer ${token}` }});

    enqueueSnackbar({ variant: "success", message: "Offer deleted" });
  } catch (err) {
    enqueueSnackbar({ variant: "error", message: `${err}` });
  }
};

export const getMyOffers = async (token: string) => await api.get("/job-offer/my-offer", {headers: { Authorization : `Bearer ${token}` }});

export const getMyOfferCount = (token: string) => api.get("/job-offer/my-offer-count", {headers: { Authorization : `Bearer ${token}` }});

export const getMySingleOffer = (offerId: string, token: string) =>
  api.get(`/job-offer/me/${offerId}`, {headers: { Authorization : `Bearer ${token}` }});
