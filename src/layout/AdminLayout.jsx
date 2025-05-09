import { Outlet } from "react-router-dom";
import { useEffect, useCallback } from "react";
import ToastMessage from "../components/Toast";
import AdminHeader from "../components/adminCom/adminHeader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function FrontLayout() {
  const dispatch = useDispatch();

  const checkUserLogin = useCallback(async () => {
    try {
      await axios.post(`${apiUrl}/v2/api/user/check`);
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message, status: "failed" }));
    }
  }, [dispatch]);

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)fabio20\s*=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common["Authorization"] = token;
    checkUserLogin();
  }, [checkUserLogin]);
  return (
    <>
      <AdminHeader />
      <Outlet />
      <ToastMessage />
    </>
  );
}
