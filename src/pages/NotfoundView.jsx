import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotfounView() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 1500);

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
