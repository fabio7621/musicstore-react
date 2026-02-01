import { useEffect, useCallback } from "react";
import { Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { API_BASE_URL, API_PATH } from "../../constants/api";
import { updateCartData } from "../../redux/cartSlice";

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

  const getCart = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/v2/api/${API_PATH}/cart`);
      dispatch(updateCartData(res.data.data));
    } catch (error) {
      alert(`取得購物車失敗: ${error.message}`);
    }
  }, [dispatch]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <header className="main-header">
      <div className="section-header-top d-none d-md-block">
        <NavLink to="/" className="section-header-logo d-block">
          <img src="./icon/seven07musicstore.svg" alt="logo" />
        </NavLink>
      </div>
      <div className="music-navbar-main">
        <Navbar bg="light" expand="lg">
          <NavLink to="/" className="section-header-logo d-md-none d-block">
            <img src="./icon/seven07musicstore.svg" alt="logo" />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {routes.map((route) => (
                <li key={route.path} className="nav-item">
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}
              <li className="nav-item">
                <div className="top-nav-box d-flex align-items-center">
                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="top-nav-item position-relative"
                  >
                    <img src="./icon/Shopping Cart.png" alt="cart" />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {carts?.length}
                    </span>
                  </button>
                </div>
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}
