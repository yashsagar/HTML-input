import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import FormikComponent from "./FormikComponent.jsx";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App />} />
    <Route path="/formik" element={<FormikComponent />} />
  </>
);

const futureFlag = {
  v7_startTransition: true,
  v7_skipActionErrorRevalidation: true,
  v7_relativeSplatPath: true,
  v7_fetcherPersist: true,
};

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} future={futureFlag} />
  </StrictMode>
);
