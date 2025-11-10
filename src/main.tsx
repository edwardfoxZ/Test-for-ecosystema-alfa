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
import { Product } from "./pages/Product.tsx";
import { AddProduct } from "./pages/AddProduct.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/products" />} />
      <Route path="/products" element={<Products />} />
      <Route path="products/product/:id" element={<Product />} />
      <Route path="/create-product" element={<AddProduct />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
