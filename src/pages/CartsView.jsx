import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // 取得購物車
  const getCart = async () => {
    try {
      const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/cart`);
      setCart(res.data.data);
    } catch (error) {
      alert(`取得購物車失敗: ${error.message}`);
    }
  };

  // 清空購物車
  const removeCart = async () => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/v2/api/${apiPath}/carts`);
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
      {/* 麵包屑導航 */}
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

      {/* 購物車內容 */}
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
                    {/* <input
                      className=""
                      type="text"
                      name="quantity1"
                      defaultValue={cartItem.qty}
                      onChange={(e) =>
                        updateCart(
                          cartItem.id,
                          cartItem.product_id,
                          e.target.value
                        )
                      }
                    /> */}
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
                  <td>{cartItem.product.price}</td>
                  <td>
                    <div
                      onClick={() => removeCartItem(cartItem.id)}
                      className="shopcart-del-pic"
                    >
                      <img
                        src="@/../../../../public/icon/Close.png"
                        alt="delete"
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {/* <tr>
                <td>
                  <div className="shopcart-title d-flex align-items-center">
                    <div className="shopcart-pic">
                      <img
                        src="@/../../../../public/music/1444.jpg"
                        alt="album"
                      />
                    </div>
                    <span>Lisa - ASDAFW</span>
                  </div>
                </td>
                <td>
                  <input className="" type="text" name="quantity1" />
                </td>
                <td>1220</td>
                <td>
                  <div
                    onClick={() => removeCartItem(cartItem.id)}
                    className="shopcart-del-pic"
                  >
                    <img
                      src="@/../../../../public/icon/Close.png"
                      alt="delete"
                    />
                  </div>
                </td>
              </tr> */}
            </tbody>
          </table>

          {/* 訂單表單 */}
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
              />
              {errors.email && (
                <p className="text-danger my-2">{errors.email?.message}</p>
              )}
            </div>

            <div className="shop-form-item">
              <label htmlFor="name">收件人</label>
              <input
                {...register("name", { required: "請輸入姓名" })}
                type="text"
                name="name" // ✅ 修正成 "name"
                className={errors.name ? "is-invalid" : ""}
              />
              {errors.name && (
                <p className="text-danger my-2">{errors.name?.message}</p>
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
                <p className="text-danger my-2">{errors.tel?.message}</p>
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
                <p className="text-danger my-2">{errors.address?.message}</p>
              )}
            </div>

            <div className="shop-form-item">
              <label htmlFor="message">留言</label>
              <textarea
                {...register("message")}
                id="message"
                name="message"
              ></textarea>
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
// {
//   "success": true,
//   "data": {
//     "carts": [
//       {
//         "coupon": {
//           "code": "testCode",
//           "due_date": 6547658,
//           "id": "-L9uIs5EfPibJpwwTMhN",
//           "is_enabled": 1,
//           "percent": 60,
//           "title": "超級特惠價格"
//         },
//         "final_total": 2160,
//         "id": "-LATwxc_bIJu-AR4AlNj",
//         "product": {
//           "category": "衣服3",
//           "content": "這是內容",
//           "description": "Sit down please 名設計師設計",
//           "id": "-L9tH8jxVb2Ka_DYPwng",
//           "imageUrl": "主圖網址",
//           "imagesUrl": [
//             "圖片網址一",
//             "圖片網址二",
//             "圖片網址三",
//             "圖片網址四",
//             "圖片網址五"
//           ],
//           "is_enabled": 1,
//           "num": 1,
//           "origin_price": 500,
//           "price": 600,
//           "title": "[賣]動物園造型衣服3",
//           "unit": "個"
//         },
//         "product_id": "-L9tH8jxVb2Ka_DYPwng",
//         "qty": 6,
//         "total": 3600
//       }
//     ],
//     "total": 3600,
//     "final_total": 2160
//   },
//   "messages": []
// }
