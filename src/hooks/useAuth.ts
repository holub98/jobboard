import { atomWithStorage } from "jotai/utils";

export type Auth = {
  id: string;
  email: string;
};
const isLoginAuth = atomWithStorage<Auth | undefined>("auth", undefined);

export { isLoginAuth };
