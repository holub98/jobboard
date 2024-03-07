import { atom } from "jotai";

export type OfferFilterType = {
  name?: string;
  requirements?: string;
  workDirection?: string;
  localization?: string;
};
export const filterAtom = atom<OfferFilterType | {}>({});
