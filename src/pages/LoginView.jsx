import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";

export default function LoginPage() {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();

  const [account, setAccount] = useState({
    username: "example@test.com",
    password: "example",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/v2/admin/signin`, account);
      const { token, expired } = res.data;

      document.cookie = `fabio20=${token}; expires=${new Date(
        expired
      ).toUTCString()}; path=/`;
      axios.defaults.headers.common["Authorization"] = token;

      dispatch(pushMessage({ text: "登入成功", status: "success" }));
    } catch (error) {
      const message = error.response?.data?.message || "登入失敗，請稍後再試";
      dispatch(pushMessage({ text: message, status: "failed" }));
    }
  };

  return (
    <section className="page-product">
      <div className="page-product-main">
        <div className="page-login-content">
          <form onSubmit={handleLogin} className="page-login-form">
            <h1>LOGIN</h1>
            <div className="page-login-item">
              <label htmlFor="username">Email</label>
              <input
                name="username"
                value={account.username}
                type="email"
                id="username"
                onChange={handleInputChange}
              />
            </div>
            <div className="page-login-item">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                value={account.password}
                onChange={handleInputChange}
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="mx-auto loginbtn">
              gogo!!
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
