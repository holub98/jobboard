import { api } from ".";

export const getOfferCadidates = (offerId: string) =>
  api.get(`/candidates/${offerId}`);

export const getSingleCandidate = (offerId: string, candidateId: string) =>
  api.get(`/candidates/${offerId}/${candidateId}`);
