import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NOT_FOUND_REDIRECT_DELAY_MS } from "../constants/api";

export default function NotfoundView() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, NOT_FOUND_REDIRECT_DELAY_MS);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <section className="page-error">
        <div className="page-error-item">
          <h1>404</h1>
        </div>
      </section>
    </>
  );
}
