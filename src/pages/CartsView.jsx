import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import axios from "axios";
import { updateCartData, clearCartData } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 取得購物車
  const getCart = async () => {
    try {
      const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/cart`);
      setCart(res.data.data);
      dispatch(updateCartData(res.data.data));
    } catch (error) {
      alert(`取得購物車失敗: ${error.message}`);
    }
  };

  // 清空購物車
  const removeCart = async () => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/v2/api/${apiPath}/carts`);
      dispatch(clearCartData());
      getCart();
    } catch (error) {
      alert(`清除購物車失敗: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 單項刪除
  const removeCartItem = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/v2/api/${apiPath}/cart/${id}`);
      getCart();
    } catch (error) {
      alert(`刪除購物車單項失敗: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 更新購物車
  const updateCart = async (cart_Id, product_id, qty) => {
    setLoading(true);
    try {
      await axios.put(`${apiUrl}/v2/api/${apiPath}/cart/${cart_Id}`, {
        data: { product_id, qty: Number(qty) },
      });
      getCart();
    } catch (error) {
      alert(`更新購物車失敗: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 結帳
  const checkout = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/v2/api/${apiPath}/order`, data);
      reset();
      getCart();
      navigate("/checkout");
    } catch (error) {
      alert(`訂單失敗: ${error.message}`);
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

  useEffect(() => {
    getCart();
  }, []);

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
                    <div className="shopcart-title d-flex align-items-center">
                      <div className="shopcart-pic">
                        <img src={cartItem.product.imageUrl} alt="album" />
                      </div>
                      <span>{cartItem.product.title}</span>
                    </div>
                  </td>
                  <td>
                    <div className="btn-group me-2" role="group">
                      <button
                        onClick={() => updateCart(cartItem.id, cartItem.product_id, cartItem.qty - 1)}
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        disabled={cartItem.qty === 1}
                      >
                        -
                      </button>
                      <span className="btn border border-dark" style={{ width: "50px", cursor: "auto" }}>
                        {cartItem.qty}
                      </span>
                      <button
                        onClick={() => updateCart(cartItem.id, cartItem.product_id, cartItem.qty + 1)}
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{cartItem.product.price}</td>
                  <td>
                    <div onClick={() => removeCartItem(cartItem.id)} className="shopcart-del-pic">
                      <img src="./icon/Close.png" alt="delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="page-middle-box w-100 d-flex justify-content-center">
            <button onClick={() => removeCart()} className="page-shop-btn mx-auto" type="button">
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
              />
              {errors.email && <p className="text-danger my-2">{errors.email?.message}</p>}
            </div>

            <div className="shop-form-item">
              <label htmlFor="name">收件人</label>
              <input
                {...register("name", { required: "請輸入姓名" })}
                type="text"
                name="name"
                className={errors.name ? "is-invalid" : ""}
                placeholder="請輸入收件人姓名"
              />
              {errors.name && <p className="text-danger my-2">{errors.name?.message}</p>}
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
              {errors.tel && <p className="text-danger my-2">{errors.tel?.message}</p>}
            </div>

            <div className="shop-form-item">
              <label htmlFor="address">地址</label>
              <input {...register("address", { required: "請輸入地址" })} id="address" type="text" placeholder="請輸入地址" />
              {errors.address && <p className="text-danger my-2">{errors.address?.message}</p>}
            </div>

            <div className="shop-form-item">
              <label htmlFor="message">留言</label>
              <textarea {...register("message")} id="message" name="message"></textarea>
            </div>

            <button className="page-shop-btn mx-auto" type="submit">
              送出訂單
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
