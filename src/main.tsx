import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LayoutView } from "./components/index.ts";
import { Provider, createStore } from "jotai";

const myStore = createStore();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={myStore}>
        <LayoutView>
          <App />
        </LayoutView>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
