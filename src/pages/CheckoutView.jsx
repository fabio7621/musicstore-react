import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CHECKOUT_REDIRECT_DELAY_MS } from "../constants/api";

export default function CheckoutView() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, CHECKOUT_REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="pages-checkout">
      <div className="pages-checkout-item">
        <h1>Finish</h1>
        <span>Got your order</span>
        <p>將盡速出貨敬請期待</p>
        <button type="button" onClick={() => navigate("/products")}>
          繼續選購
        </button>
      </div>
    </section>
  );
}
