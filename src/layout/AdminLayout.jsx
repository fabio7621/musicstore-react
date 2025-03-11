import { Outlet } from "react-router-dom";
import ToastMessage from "../components/Toast";
import AdminHeader from "../components/adminCom/adminHeader";

export default function FrontLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <ToastMessage />
    </>
  );
}
