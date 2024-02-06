import { RouteObject } from "react-router-dom";
import { LoginView } from "./View";

export const routes: RouteObject[] = [
  { path: "/login", element: <LoginView /> },
];
