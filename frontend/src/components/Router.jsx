// router
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./RootLayout/RootLayout";
import Home from "../pages/Home";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Chat from "./Chat"; // new chat component
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import Checkout from "./Checkout";
import MyOrders from "./MyOrders";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home},
      {path: "/products", Component: Products},
      {path: "/products/:id", Component: ProductDetails, 
        loader: ({params}) => fetch(`http://localhost:1272/products/${params.id}`)},
      {path: "/cart", Component: Cart},
      {path: "/checkout", Component: Checkout},
      {path: "/register", Component: Register},
      {path: "/signin", Component: SignIn},
      {path: "/orders", Component: MyOrders},
      {path: "/chat", Component: Chat}
    ], 
  },
]);

export default router;