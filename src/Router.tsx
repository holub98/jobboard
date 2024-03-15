import { RouteObject } from "react-router-dom";
import {
  CandidatePage,
  CompaniesPage,
  CompanyJobOfferts,
  CompanySinglePage,
  HomePage,
  LoginView,
  MyCompany,
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
    path: "/company",
    element: <CompaniesPage />,
  },
  {
    path: "/company/:companyId",
    element: <CompanySinglePage />,
  },
  {
    path: "/me",
    element: (
      <ProtectedRoute>
        <MyCompany />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-offers",
    element: (
      <ProtectedRoute>
        <CompanyJobOfferts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-offers/:offerId",
    element: (
      <ProtectedRoute>
        <SingleOfferPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-offers/:offerId/:candidateId",
    element: (
      <ProtectedRoute>
        <CandidatePage />
      </ProtectedRoute>
    ),
  },
];
