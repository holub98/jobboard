import { RouteObject } from "react-router-dom";
import {
  CandidatePage,
  CompanyJobOfferts,
  HomePage,
  LoginView,
  OffersView,
  RegisterView,
  SingleOfferPage,
  SingleOfferView,
} from "./View";
import { ProtectedRoute } from "./components";

export const routes: RouteObject[] = [
  { path: "", element: <HomePage /> },
  { path: "/login", element: <LoginView /> },
  { path: "/signup", element: <RegisterView /> },
  {
    path: "/offers/:search",
    element: <OffersView />,
  },
  {
    path: "/offers",
    element: <OffersView />,
  },
  {
    path: "offer/:offerId",
    element: <SingleOfferView />,
  },
  {
    path: "/my-offerts",
    element: (
      <ProtectedRoute>
        <CompanyJobOfferts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-offerts/:offerId",
    element: (
      <ProtectedRoute>
        <SingleOfferPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-offerts/:offerId/:candidateId",
    element: (
      <ProtectedRoute>
        <CandidatePage />
      </ProtectedRoute>
    ),
  },
];
