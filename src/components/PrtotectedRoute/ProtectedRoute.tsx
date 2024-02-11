import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isLogin: boolean;
  children: ReactNode;
};

export const ProtectedROute = ({ isLogin, children }: Props) => {
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  return children;
};
