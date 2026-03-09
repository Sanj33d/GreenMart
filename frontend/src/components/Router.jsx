// router
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./RootLayout/RootLayout";
import Home from "../pages/Home";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home},
      {path: "/products", Component: Products},
      {path: "/products/:id", Component: ProductDetails, 
        loader: ({params}) => fetch(`http://localhost:1272/products/${params.id}`)},
      {path: "/cart", Component: Cart}
    ], 
  },
]);

export default router;