import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
type Props = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const isLogin = true;
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  return children;
};
