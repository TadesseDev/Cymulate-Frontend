/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Users from "./pages/users/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
