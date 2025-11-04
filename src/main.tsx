import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { Products } from "./pages/Products.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<Navigate to="/products" />} />
      <Route index path="/products" element={<Products />} />
      {/* <Route path="/products/:id" element={} /> */}
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
