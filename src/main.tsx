import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LayoutView } from "./components/index.ts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { pl } from "date-fns/locale";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
      <BrowserRouter>
        <LayoutView>
          <App />
        </LayoutView>
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>
);
