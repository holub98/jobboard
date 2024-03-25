import { atomWithStorage } from 'jotai/utils'

export type AuthType ={
  name:string;
  expire: number;
  token:string;
}
export const authAtom = atomWithStorage<AuthType | undefined>('auth', undefined);