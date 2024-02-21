import { atom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { getCompany } from "~/api";

export const isLoginAuth = atom<boolean>(false);

export const useAuth = () => {
  const isLogin = () => {
    const setIsLogin = useSetAtom(isLoginAuth);

    setIsLogin(true);
  };
  const isRegister = () => {
    const setIsLogin = useSetAtom(isLoginAuth);

    setIsLogin(true);
  };
  const isLogout = () => {
    const setIsLogin = useSetAtom(isLoginAuth);

    setIsLogin(false);
  };

  const getMyCompanyId = () => {
    const [data, setData] = useState<string>("");
    useEffect(() => {
      getCompany().then((res) => setData(res.data._id));
    }, []);

    return data;
  };

  return { isLogin, isLogout, isRegister, getMyCompanyId };
};
