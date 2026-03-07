// router
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./RootLayout/RootLayout";
import Home from "../pages/Home";
import Products from "./Products";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home},
      {path: "/products", Component: Products},
    ],
  },
]);

export default router;