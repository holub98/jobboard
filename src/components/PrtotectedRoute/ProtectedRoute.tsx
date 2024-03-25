import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
type Props = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const isLogin = localStorage.getItem("auth");
 
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  return children;
};
