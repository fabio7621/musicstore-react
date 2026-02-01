import { Outlet } from "react-router-dom";

import FrontFooter from "../components/frontCom/FrontFooter";
import FrontHeader from "../components/frontCom/FrontHeader";
import PagesChart from "../components/PagesChart";
import ToastMessage from "../components/Toast";

export default function FrontLayout() {
  return (
    <>
      <FrontHeader />
      <Outlet />
      <FrontFooter />
      <PagesChart />
      <ToastMessage />
    </>
  );
}
