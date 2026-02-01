import { useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import AdminHeader from "../components/adminCom/AdminHeader";
import ToastMessage from "../components/Toast";
import { API_BASE_URL, AUTH_COOKIE_NAME } from "../constants/api";
import { pushMessage } from "../redux/toastSlice";

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}\\s*=\\s*([^;]*)`));
  return match ? match[1] : "";
}

export default function AdminLayout() {
  const dispatch = useDispatch();

  const checkUserLogin = useCallback(async () => {
    try {
      await axios.post(`${API_BASE_URL}/v2/api/user/check`);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || "驗證失敗";
      dispatch(pushMessage({ text: message, status: "failed" }));
    }
  }, [dispatch]);

  useEffect(() => {
    const token = getCookie(AUTH_COOKIE_NAME);
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
