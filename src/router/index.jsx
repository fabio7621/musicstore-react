import { createHashRouter } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import FrontLayout from "../layout/FrontLayout";
import AdminOrders from "../pages/admin/AdminOrder";
import AdminProducts from "../pages/admin/AdminProducts";
import CartsView from "../pages/CartsView";
import ChartView from "../pages/ChartView";
import CheckoutView from "../pages/CheckoutView";
import HomeView from "../pages/HomeView";
import NotfoundView from "../pages/NotfoundView";
import ProductInner from "../pages/ProductInner";
import ProductView from "../pages/ProductView";
import LoginView from "../pages/LoginView";

const router = createHashRouter([
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "login",
        element: <LoginView />,
      },
      {
        path: "products",
        element: <ProductView />,
      },
      {
        path: "products/:id",
        element: <ProductInner />,
      },
      {
        path: "cart",
        element: <CartsView />,
      },
      {
        path: "chart",
        element: <ChartView />,
      },
      {
        path: "checkout",
        element: <CheckoutView />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
    ],
  },
  {
    path: "*",
    element: <NotfoundView />,
  },
]);

export default router;
