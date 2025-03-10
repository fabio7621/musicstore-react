import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    // 在這裡可以加入登入 API 呼叫
  };

  return (
    <section className="page-product">
      <div className="page-product-main">
        <div className="page-login-content">
          <div className="page-login-form">
            <h1>LOGIN</h1>
            <div className="page-login-item">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="page-login-item">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="mx-auto loginbtn"
              type="button"
              onClick={handleLogin}
            >
              gogo!!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
