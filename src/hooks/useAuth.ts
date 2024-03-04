import { atom } from "jotai";

export type Auth = {
  email: string;
};
const isLoginAuth = atom<Auth | undefined>(undefined);

export { isLoginAuth };
