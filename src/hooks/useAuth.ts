import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Cookies } from 'react-cookie';

const isAuth = atom<string | null>(null);

const AuthToken = ()=>{
  const setToken = useSetAtom(isAuth)
  const cookies = new Cookies()

  useEffect(()=>{
  const getToken = cookies.get('auth_token') ;

    if(getToken){
      setToken(getToken)
    }
  },[setToken])



}
export { isAuth, AuthToken };
