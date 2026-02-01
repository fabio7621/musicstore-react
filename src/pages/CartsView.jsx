import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL, API_PATH } from "../constants/api";
import { clearCartData, updateCartData } from "../redux/cartSlice";
import { pushMessage } from "../redux/toastSlice";

export default function CartsView() {
  const [cart, setCart] = useState({ carts: [] });
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCart = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/v2/api/${API_PATH}/cart`);
      setCart(res.data.data);
      dispatch(updateCartData(res.data.data));
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || ["操作失敗"];
      dispatch(pushMessage({ text: Array.isArray(message) ? message.join(",") : message, status: "failed" }));
    }
  }, [dispatch]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  const removeCart = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/v2/api/${API_PATH}/carts`);
      dispatch(clearCartData());
      getCart();
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || ["操作失敗"];
      dispatch(pushMessage({ text: Array.isArray(message) ? message.join(",") : message, status: "failed" }));
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/v2/api/${API_PATH}/cart/${id}`);
      getCart();
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || ["操作失敗"];
      dispatch(pushMessage({ text: Array.isArray(message) ? message.join(",") : message, status: "failed" }));
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (cart_Id, product_id, qty) => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/v2/api/${API_PATH}/cart/${cart_Id}`, {
        data: { product_id, qty: Number(qty) },
      });
      getCart();
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || ["操作失敗"];
      dispatch(pushMessage({ text: Array.isArray(message) ? message.join(",") : message, status: "failed" }));
    } finally {
      setLoading(false);
    }
  };

  const checkout = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/v2/api/${API_PATH}/order`, data);
      reset();
      getCart();
      navigate("/checkout");
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || ["操作失敗"];
      dispatch(pushMessage({ text: Array.isArray(message) ? message.join(",") : message, status: "failed" }));
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    const { message, ...user } = data;
    const userData = { data: { user, message } };
    checkout(userData);
  });

  return (
    <div>
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
        </div>
      )}

      <section className="pages-bread">
        <div className="pages-bread-main d-flex align-items-center justify-between">
          <ul className="pages-bread-nav">
            <li>
              <a href="#">Index</a>
            </li>
            <li>
              <a href="#">Cart</a>
            </li>
          </ul>
        </div>
      </section>

      <section className="page-product">
        <div className="page-product-main">
          <div className="page-title-box">
            <div className="page-product-title">
              <h1>Shop Cart</h1>
            </div>
          </div>

          <table className="shopcart-list">
            <thead>
              <tr>
                <th>品名</th>
                <th>數量</th>
                <th>價格</th>
                <th>刪除</th>
              </tr>
            </thead>
            <tbody>
              {cart.carts?.map((cartItem) => (
                <tr key={cartItem.id}>
                  <td>
                    <div className="shopcart-title d-flex flex-wrap align-items-center">
                      <div className="shopcart-pic">
                        <img src={cartItem.product.imageUrl} alt="album" />
                      </div>
                      <span>{cartItem.product.title}</span>
                    </div>
                  </td>
                  <td>
                    <div className="btn-group me-2" role="group">
                      <button
                        onClick={() =>
                          updateCart(
                            cartItem.id,
                            cartItem.product_id,
                            cartItem.qty - 1
                          )
                        }
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        disabled={cartItem.qty === 1}
                      >
                        -
                      </button>
                      <span
                        className="btn border border-dark"
                        style={{ width: "50px", cursor: "auto" }}
                      >
                        {cartItem.qty}
                      </span>
                      <button
                        onClick={() =>
                          updateCart(
                            cartItem.id,
                            cartItem.product_id,
                            cartItem.qty + 1
                          )
                        }
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{cartItem.product.price * cartItem.qty}</td>
                  <td>
                    <div
                      onClick={() => removeCartItem(cartItem.id)}
                      className="shopcart-del-pic"
                    >
                      <img src="./icon/Close.png" alt="delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="page-middle-box w-100 d-flex justify-content-center">
            <button
              onClick={removeCart}
              className="page-shop-btn mx-auto"
              type="button"
              disabled={cart.carts?.length === 0 || isLoading}
            >
              清空購物車
            </button>
          </div>

          <form onSubmit={onSubmit} className="page-shop-form">
            <div className="shop-form-item">
              <label htmlFor="email">Email</label>
              <input
                {...register("email", {
                  required: "email必填",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "格式錯誤",
                  },
                })}
                className={errors.email ? "is-invalid" : ""}
                type="email"
                name="email"
                placeholder="請輸入Email"
                id="email"
              />
              {errors.email && (
                <p className="my-2 form-danger">{errors.email.message}</p>
              )}
            </div>

            <div className="shop-form-item">
              <label htmlFor="name">收件人</label>
              <input
                {...register("name", { required: "請輸入姓名" })}
                type="text"
                name="name"
                id="name"
                className={errors.name ? "is-invalid" : ""}
                placeholder="請輸入收件人姓名"
              />
              {errors.name && (
                <p className="my-2 form-danger">{errors.name.message}</p>
              )}
            </div>

            <div className="shop-form-item">
              <label htmlFor="tel">電話</label>
              <input
                {...register("tel", {
                  required: "電話必填",
                  pattern: {
                    value: /^(0[2-8]\d{7}|09\d{8})$/,
                    message: "格式錯誤，請輸入正確的電話號碼",
                  },
                })}
                id="tel"
                type="tel"
                className={errors.tel ? "is-invalid" : ""}
                placeholder="請輸入電話"
              />
              {errors.tel && (
                <p className="my-2 form-danger">{errors.tel.message}</p>
              )}
            </div>

            <div className="shop-form-item">
              <label htmlFor="address">地址</label>
              <input
                {...register("address", { required: "請輸入地址" })}
                id="address"
                type="text"
                placeholder="請輸入地址"
              />
              {errors.address && (
                <p className="my-2 form-danger">{errors.address.message}</p>
              )}
            </div>

            <div className="shop-form-item">
              <label htmlFor="message">留言</label>
              <textarea {...register("message")} id="message" name="message" />
            </div>

            <button
              className="page-shop-btn mx-auto"
              type="submit"
              disabled={cart.carts?.length === 0 || isLoading}
            >
              送出訂單
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
