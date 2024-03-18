import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Cookies } from "react-cookie";

const isAuth = atom<string | null>(null);

const AuthToken = () => {
  const setToken = useSetAtom(isAuth);
  const cookies = new Cookies();
  const getToken = cookies.get("auth_token");

  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    } else {
      setToken(null);
    }
  }, [setToken, getToken]);
};
export { isAuth, AuthToken };
