import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { updateCartData } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const apiUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

const routes = [
  { path: "/", name: "首頁" },
  { path: "/products", name: "產品列表" },
  { path: "/cart", name: "購物車" },
  { path: "/chart", name: "流行儀表板" },
];

export default function FrontHeader() {
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const getCart = async () => {
    try {
      const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/cart`);
      dispatch(updateCartData(res.data.data));
    } catch (error) {
      alert(`取得購物車失敗: ${error.message}`);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <header className="main-header">
      <div className="section-header-top d-none d-md-block">
        <NavLink to={"/"} className="section-header-logo d-block">
          <img src="/icon/seven07musicstore.svg" alt="logo" />
        </NavLink>
      </div>
      <div className="music-navbar-main">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <h1 className="sr-only">SEVEN07musicStore</h1>
          <NavLink to={"/"} className="section-header-logo d-block d-md-none">
            <img src="/icon/seven07musicstore.svg" alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className="hb-btn-container">
              <input id="menu-toggle" type="checkbox" />
              <label className="menu-button-container" htmlFor="menu-toggle">
                <div className="menu-button"></div>
              </label>
              <span>MENU</span>
            </div>
          </button>
          <div style={{ position: "relative", zIndex: 99 }} className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {routes.map((route) => (
                <li key={route.path} className="nav-item">
                  <NavLink className="nav-link" to={route.path}>
                    {route.name}
                  </NavLink>
                </li>
              ))}
              <li className="nav-item">
                <div className="top-nav-box d-flex align-items-center">
                  <button type="button" onClick={() => navigate("/cart")} className="top-nav-item position-relative">
                    <img src="/icon/Shopping Cart.png" alt="cart" />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{carts?.length}</span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
