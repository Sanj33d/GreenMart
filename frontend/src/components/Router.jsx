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
import ManageOrders from "./ManageOrders";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Profile from "./Profile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "/products", Component: Products },
      {
        path: "/products/:id",
        Component: ProductDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:1272/products/${params.id}`),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      // { path: "/checkout", Component: Checkout },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      { path: "/register", Component: Register },
      { path: "/signin", Component: SignIn },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-orders",
        element: (
          <AdminRoute>
            <ManageOrders />
          </AdminRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      { path: "/chat", Component: Chat },
    ],
  },
]);

export default router;
