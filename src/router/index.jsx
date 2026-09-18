import { createHashRouter } from "react-router-dom";

import FrontLayout from "../layout/FrontLayout";
import HomeView from "../pages/HomeView";
import NotfoundView from "../pages/NotfoundView";

const page = (load) => () => load().then((m) => ({ Component: m.default }));

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
        lazy: page(() => import("../pages/LoginView")),
      },
      {
        path: "products",
        lazy: page(() => import("../pages/ProductView")),
      },
      {
        path: "products/:id",
        lazy: page(() => import("../pages/ProductInner")),
      },
      {
        path: "cart",
        lazy: page(() => import("../pages/CartsView")),
      },
      {
        path: "chart",
        lazy: page(() => import("../pages/ChartView")),
      },
      {
        path: "checkout",
        lazy: page(() => import("../pages/CheckoutView")),
      },
    ],
  },
  {
    path: "/admin",
    lazy: page(() => import("../layout/AdminLayout")),
    children: [
      {
        path: "products",
        lazy: page(() => import("../pages/admin/AdminProducts")),
      },
      {
        path: "orders",
        lazy: page(() => import("../pages/admin/AdminOrder")),
      },
    ],
  },
  {
    path: "*",
    element: <NotfoundView />,
  },
]);

export default router;
