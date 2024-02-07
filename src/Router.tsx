import { RouteObject } from "react-router-dom";
import { LoginView, RegisterView } from "./View";

export const routes: RouteObject[] = [
  { path: "/login", element: <LoginView /> },
  { path: "/signup", element: <RegisterView /> },
];
