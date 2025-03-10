import { createHashRouter } from "react-router-dom";
import HomeView from "../pages/HomeView";
import ProductView from "../pages/ProductView.jsx";
import LoginView from "../pages/LoginView";
import CartsView from "../pages/CartsView.jsx";
import ChartView from "../pages/ChartView.jsx";
import FrontLayout from "../layout/FrontLayout";
import NotfoundView from "../pages/NotfoundView.jsx";
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
        path: "/login",
        element: <LoginView />,
      },
      {
        path: "/products",
        element: <ProductView />,
      },
      {
        path: "/cart",
        element: <CartsView />,
      },
      {
        path: "/chart",
        element: <ChartView />,
      },
    ],
  },
  {
    path: "*",
    element: <NotfoundView />,
  },
]);
export default router;
